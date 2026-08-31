import { h, render, Component } from 'preact';

import constants from './../constants';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      variables_: [],
      variables: [],

      devices_: [],
      device: false
    };
  }

  componentDidMount() {
    this.getVariables();

    let o = this.props.item;
    if (o) {
      let inputName = document.querySelector('#input-u-name');
      let inputDevice = document.querySelector('#input-u-device');
      let inputUnit = document.querySelector('#input-u-unit');
      let inputStatus = document.querySelector('#input-u-status');

      inputName.value = o.name;
      inputDevice.value = o.device;
      inputUnit.value = o.unit;
      inputStatus.checked = o.status;
    }
  }

  replaceAll(s, old, n) {
    s = s.split(old).join(n)

    /*s = s.replace(old, n);
    let i = s.indexOf(old);
    if (i >= 0) {
      this.replaceAll(s, old, n);
    }*/

    return s
  }

  getDevices(variables, custom_variables) {
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

    for (let i = 0; i < custom_variables.length; i++) {
      const variable = custom_variables[i];
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

  getVariables() {
    let self = this;

    let url = `${constants.URL_SERVER_VARIABLES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {

        let devices_ = self.getDevices([], res.docs);

        self.setState({ variables_: res.docs, devices_: devices_ }, () => {
          let o = self.props.item;
          if (o) {
            let expression = o.expression;

            let variablesIn = o.variables_json;
            if (variablesIn) {
              let variables = [];
              for (let i = 0; i < variablesIn.length; i++) {
                const id = variablesIn[i];
                let variables_ = self.state.variables_;
                for (let j = 0; j < variables_.length; j++) {
                  const variable_ = variables_[j];
                  if (id == variable_.id) {
                    variables.push(variable_);

                    let old = '${'+ id +'}';
                    let n = '${' + variable_.device + '.' + variable_.name + '}';
                    expression = self.replaceAll(expression, old, n)
                  }
                }
              }

              if (variables.length > 0) self.setState({ variables: variables });
            }

            let inputExpression = document.querySelector('#input-u-expression');
            inputExpression.value = expression;
          }

          $('#input-variable').material_select();
          $('#input-device').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = self.props.item;
      if (!o) {
        let message = 'No se encontro la información de la variable';
        Materialize.toast(message, 2500);
        return;
      }

      let inputName = document.querySelector('#input-u-name');
      let inputDevice = document.querySelector('#input-u-device');
      let inputExpression = document.querySelector('#input-u-expression');
      let inputUnit = document.querySelector('#input-u-unit');
      let inputStatus = document.querySelector('#input-u-status');

      let name = inputName.value.trim();
      let device = inputDevice.value.trim();
      let expression = inputExpression.value.trim();
      let unit = inputUnit.value.trim();
      let status = inputStatus.checked;

      let variables = self.state.variables;
      let size = variables.length;
      if (size == 0) {
        let message = 'La lista de variables esta vacia';
        Materialize.toast(message, 2500);
        return;
      }

      if (expression == '') {
        let message = 'La expresión es nula';
        Materialize.toast(message, 2500);
        return;
      }

      let variables_json = [];
      for (let i = 0; i < size; i++) {
        const variable = variables[i];
        let id = variable.id;
        if (id) {
          let old = '${' + variable.device + '.' + variable.name + '}';
          let n = '${' + id + '}';

          expression = self.replaceAll(expression, old, n)

          let v = parseInt(id);
          variables_json.push(v);
        }
      }

      let json = {};

      json.name = name;
      json.device = device;
      json.expression = expression;
      json.unit = unit;
      json.status = status;
      json.variables_json = variables_json;

      let id = o.id;

      self.props.onUpdate(json, id);
    };

    return fn;
  }

  handleInsert() {
    let self = this;

    let fn = () => {
      let inputVariable = document.querySelector('#input-variable');
      let sId = inputVariable.value.trim();

      let id = parseInt(sId);

      let variables = self.state.variables;
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id == id) return;
      }

      let items = self.state.variables_;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.id == id) {
          variables.push(item);
          break;
        }
      }

      self.setState({ variables: variables });
    };

    return fn;
  }

  handleRemove(id) {
    let self = this;

    let fn = () => {
      let variables = self.state.variables;
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id == id) {
          variables.splice(i, 1);
          self.setState({ variables: variables });

          return;
        }
      }
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = () => {
      self.props.onBack();
    };

    return fn;
  }

  handleChangeDevice() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      self.setState({ device: value });
    };

    return fn;
  }

  createOptDevice() {
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item}>{item}</option>
    };

    return fn;
  }

  createOptVariable() {
    let self = this;

    let fn = (item, index) => {
      let device = self.state.device;
      if (device == item.device) {
        return <option key={index} value={item.id}>{item.name}</option>
      }

      return;
    };

    return fn;
  }

  /*createOptName() {
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.device}.{item.name}</option>;
    };

    return fn;
  }*/

  createItem() {
    let self = this;

    let fn = (item, index) => {
      return (
        <li className="collection-item sion-cv-variable" key={item.id}>
          <div>
            {item.device}.{item.name}
            <a href="#!" className="secondary-content" onClick={self.handleRemove(item.id)}>
              <i className="material-icons">delete</i>
            </a>
          </div>
        </li>
      );
    };

    return fn;
  }

  render(props, state) {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <h5>Editar Variable Personalizada</h5>

            <form onSubmit={this.handleUpdate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-name" placeholder="Nombre" />
                  <label htmlFor="input-u-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-device" placeholder="Dispositivo" />
                  <label htmlFor="input-u-device" className="active">Dispositivo</label>
                </div>

                <div className="input-field col s12 m4">
                  <textarea type="text" id="input-u-expression" placeholder={'${DEVICE.VARIABLE}: Clave de la variable'} />
                  <label htmlFor="input-u-expression" className="active">Expresión Aritmetica</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-unit" placeholder="Ejemplo: Pa, Kg/cm2, PSI" />
                  <label htmlFor="input-u-unit" className="active">Unidad</label>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-status" />
                    <label htmlFor="input-u-status">Activo</label>
                  </p>
                </div>

              </div>

              <div className="row" style={{ marginTop: '10px' }}>


                <div className="col s12 m4">
                  <select className="browser-default sion-select" id="input-device" onChange={this.handleChangeDevice()}>
                    <option>Dispositivos</option>
                    {state.devices_.map(this.createOptDevice())}
                  </select>
                </div>

                <div className="col s12 m4">
                  <select className="browser-default sion-select" id="input-variable">
                    <option>Variables</option>
                    {state.variables_.map(this.createOptVariable())}
                  </select>
                </div>

                <div className="col s12 m4">
                  <button type="button" className="btn blue" onClick={this.handleInsert()}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col s12 m12" style={{ marginTop: '10px' }}>
                  <ul className="collection">
                    {state.variables.map(this.createItem())}
                  </ul>
                </div>

              </div>

              <div className="col s12 m12">
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
