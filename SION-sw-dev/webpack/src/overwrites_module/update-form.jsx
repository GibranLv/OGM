import { h, render, Component } from 'preact';
import { isNumber, isNaN } from 'underscore';

import constants from './../constants.js';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      devices_: [],
      variables_: [],

      device: '',
      operator: ''
    };
  }

  componentDidMount() {
    let o = this.props.item;
    if (o) {
      let inputValueI   = document.querySelector('#input-u-value-i');
      let inputValueF   = document.querySelector('#input-u-value-f');
      let inputOperator = document.querySelector('#input-u-operator');
      let inputStatus   = document.querySelector('#input-u-status');

      inputValueI.value = o.value_i;
      inputValueF.value = o.value_f;
      inputOperator.value = o.operator;
      inputStatus.checked = o.status;
    }

    this.getVariables();
  }

  getVariables(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_VARIABLES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs);
          return;
        }

        let devices = self.getDevices(res.docs);

        self.setState({ devices_: devices, variables_: res.docs }, () => {
          let inputDevice   = document.querySelector('#input-u-device');
          let inputVariable = document.querySelector('#input-u-variable');

          let o = self.props.item;
          if (o) {
            inputDevice.value = o.variable_device;
            inputVariable.value = o.variable_id;
          }

          $('select').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);;

      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;

        if (fn) {
          fn(json.message);
          return;
        }

        Materialize.toast(json.message, 2500);;
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  getDevices(variables) {
    let devices = [];

    for (let i = 0; i < variables.length; i++) {
      const variable = variables[i];
      let isNew = true;
      for (let j = 0; j < devices.length; j++) {
        const device = devices[j];
        if (variable.device == device) {
          isNew = false;
          break;
        }
      }

      if (isNew) devices.push(variable.device);
    }

    return devices;
  }
  
  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputVariable = document.querySelector('#input-u-variable');
      let inputValueI   = document.querySelector('#input-u-value-i');
      let inputValueF   = document.querySelector('#input-u-value-f');
      let inputOperator = document.querySelector('#input-u-operator');
      let inputStatus   = document.querySelector('#input-u-status');

      let variable = inputVariable.value.trim();
      let valueI   = inputValueI.value.trim();
      let valueF   = inputValueF.value.trim();
      let operator = inputOperator.value.trim();
      let status   = inputStatus.checked;

      let json = {};

      if (variable === '') {
        Materialize.toast('La variable es requerida', 2500);
        return;
      }

      let variableId = parseInt(variable);
      if (!isNumber(variableId) || isNaN(variableId)) {
        Materialize.toast('La variable debe ser un entero', 2500);
        return;
      }

      valueI = parseFloat(valueI);
      valueF = parseFloat(valueF);

      if (!isNumber(valueI) || isNaN(valueI)) {
        Materialize.toast('El valor inicial debe ser numerico', 2500);
      }

      if (!isNumber(valueF) || isNaN(valueF)) {
        Materialize.toast('El valor limit debe ser numerico', 2500);
      }

      json.variable_id = variableId;
      json.value_i = valueI;
      json.value_f = valueF;
      json.operator = operator;
      json.status = status;

      let o = self.props.item;
      if (o) {
        if (!isNumber(o.id) || isNaN(o.id)) return;

        self.props.onUpdate(json, o.id);
      }

    };

    return fn;
  }

  handleChangeDevice () {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      
      self.setState({ device: value });
    }

    return fn;
  } 

  handleChangeOperator () {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      
      self.setState({ operator: value });
    }

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = () => {
      self.props.onBack();
    };

    return fn;
  }

  createOptionDevice() {
    let fn = (name, index) => {
      return (
        <option key={index} value={name}>{name}</option>
      );
    }

    return fn;
  }

  createOptionVariable() {
    let fn = (item, index) => {
      return (
        <option key={index} value={item.id}>{item.name}</option>
      );
    }

    return fn;
  }

  render(props, state) {
    return (
      <section className="sw-margin-tb">
        <div className="row">
          <div className="col s12 m12">
            <form onSubmit={this.handleUpdate()} >

              <div className="col s12 m4">
                <select className="browser-default sion-select" id="input-u-device"
                  onChange={this.handleChangeDevice()}>
                  <option value="" selected>Dispositivos</option>
                  {this.state.devices_.map(this.createOptionDevice())}
                </select>
              </div>
              
              <div className="col s12 m4">
                <select className="browser-default sion-select" id="input-u-variable">
                  <option value="" selected>Todos</option>
                  {this.state.variables_.map(this.createOptionVariable())}
                </select>
              </div>

              <div className="col s12 m4">
                <select className="browser-default sion-select" id="input-u-operator"
                  onChange={this.handleChangeOperator()}>
                  <option value="" selected>Operador</option>
                  <option value="+" selected>Sumar</option>
                  <option value="-" selected>Resta</option>
                  <option value="=" selected>Igual</option>
                  <option value="xf" selected>Promedio</option>
                </select>
              </div>

              <div className="input-field col s12 m4">
                <input type="text" id="input-u-value-i" placeholder="Valor Inicial" />
              </div>

              <div className="input-field col s12 m4">
                <input type="text" id="input-u-value-f" placeholder="Valor Limite" />
              </div>

              <div className="col s12 m4 TTx-input-check">
                <p>
                  <input type="checkbox" id="input-u-status" />
                  <label htmlFor="input-u-status">Activo</label>
                </p>
              </div>

              <div className="col s12 m12">
                <br />
                <button type="button" className="btn grey darken-3" onClick={this.handleBack()}>Cancelar</button>
                <button type="submit" className="btn red">Guardar</button>
              </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default UpdateForm;