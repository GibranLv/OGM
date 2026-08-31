import { h, render, Component } from 'preact';

import constants from './../constants';

class CreateForm extends Component {

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

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = document.querySelector('#input-c-name');
      let inputDevice = document.querySelector('#input-c-device');
      let inputExpression = document.querySelector('#input-c-expression');
      let inputUnit = document.querySelector('#input-c-unit');
      let inputStatus = document.querySelector('#input-c-status');

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
          variables_json.push(v)
        }
      }

      let json = {};

      json.name = name;
      json.device = device;
      json.expression = expression;
      json.unit = unit;
      json.status = status;
      json.variables_json = variables_json;

      self.props.onCreate(json);
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

  /*createOptName() {
    let self = this;

    let fn = (item, index) => {
      return <option key={item.id} value={item.id}>{item.device}.{item.name}</option>;
    };

    return  fn;
  }*/

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

  createItem() {
    let self = this;

    let fn = (item, index) => {
      return (
        <li className="collection-item sion-cv-variable" key={item.id}>
          <div>
            <span style="color: #424242">{item.device}.{item.name}</span>
            <a href="#!" className="secondary-content" onClick={self.handleRemove(item.id)}>
              <i className="material-icons" style="color: #F44336">delete</i>
            </a>
          </div>
        </li>
      );
    };

    return fn;
  }

  render(props, state) {
    let isEmpty = state.variables.length == 0;

    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <h5>Crear Variable Personalizada</h5>

            <form onSubmit={this.handleCreate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-c-name" placeholder="Nombre" />
                  <label htmlFor="input-c-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-c-device" placeholder="Dispositivo" />
                  <label htmlFor="input-c-device" className="active">Dispositivo</label>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-status" />
                    <label htmlFor="input-c-status">Activo</label>
                  </p>
                </div>

                <div className="input-field col s12 m6">
                  <textarea type="text" id="input-c-expression" placeholder={'${DEVICE.VARIABLE}: Clave de la variable'} />
                  <label htmlFor="input-c-expression" className="active">Expresión Aritmetica</label>
                </div>

                <div className="input-field col s12 m6">
                  <input type="text" id="input-c-unit" placeholder="Ejemplo: Pa, Kg/cm2, PSI" />
                  <label htmlFor="input-c-unit" className="active">Unidad</label>
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
                  <button type="button" className="btn green" onClick={this.handleInsert()}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col s12 m12" style={{ marginTop: '10px' }}>
                  <ul className="collection">
                    <li className="collection-item" hidden={!isEmpty}>
                      <span style="color: #424242;">Sin variables</span>
                    </li>

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

export default CreateForm;
