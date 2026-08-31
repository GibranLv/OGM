import React from 'react';

import constants from '../constants';

class CustomCreateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      variables_: [],
      variables: []
    };

    this.nameRef = React.createRef();
    this.deviceRef = React.createRef();
    this.unitRef = React.createRef();
    this.expressionRef = React.createRef();
    this.statusRef = React.createRef();
    this.variableRef = React.createRef();
  }

  componentDidMount() {
    this.getVariables();
  }

  replaceAll(s, old, n) {
    s = s.split(old).join(n)
    return s
  }

  getVariables() {
    let self = this;

    let url = `${constants.URL_SERVER_VARIABLES}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.setState({ variables_: res.docs }, () => {
          window.$(self.variableRef.current).material_select();
        });

      } else if (response.status === constants.STATUS_ACCEPTED) {
        window.Materialize.toast(res.message, 2500);

      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        window.Materialize.toast(json.message, 2500);
      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = self.nameRef.current;
      let inputDevice = self.deviceRef.current;
      let inputExpression = self.expressionRef.current;
      let inputUnit = self.unitRef.current;
      let inputStatus = self.statusRef.current;

      let name = inputName.value.trim();
      let device = inputDevice.value.trim();
      let expression = inputExpression.value.trim();
      let unit = inputUnit.value.trim();
      let status = inputStatus.checked;

      let variables = self.state.variables;
      let size = variables.length;
      if (size === 0) {
        let message = 'La lista de variables esta vacia';
        window.Materialize.toast(message, 2500);
        return;
      }

      if (expression === '') {
        let message = 'La expresión es nula';
        window.Materialize.toast(message, 2500);
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

    let fn = (evt) => {
      evt.preventDefault();

      let inputVariable = self.variableRef.current;
      let sId = inputVariable.value.trim();

      let id = parseInt(sId);

      let variables = self.state.variables;
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id === id) return;
      }

      let items = self.state.variables_;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.id === id) {
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

    let fn = (evt) => {
      evt.preventDefault();

      let variables = self.state.variables;
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id === id) {
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

    let fn = (evt) => {
      evt.preventDefault();

      self.props.onBack();
    };

    return fn;
  }

  createOptName() {
    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.device}.{item.name}</option>;
    };

    return  fn;
  }

  createItem() {
    let self = this;

    let fn = (item, index) => {
      return (
        <li className="collection-item sion-cv-variable" key={index}>
          <div>
            <span style={{color: '#424242'}}>{item.device}.{item.name}</span>
            <a href="#remove" className="secondary-content" onClick={self.handleRemove(item.id)}>
              <i className="material-icons" style={{color: '#F44336'}}>delete</i>
            </a>
          </div>
        </li>
      );
    };

    return fn;
  }

  render() {
    let isEmpty = this.state.variables.length === 0;

    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <h5>Crear Variable Personalizada</h5>

            <form onSubmit={this.handleCreate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-c-name" placeholder="Nombre" ref={this.nameRef} />
                  <label htmlFor="input-c-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-c-device" placeholder="Dispositivo" ref={this.deviceRef} />
                  <label htmlFor="input-c-device" className="active">Dispositivo</label>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-status"  ref={this.statusRef} />
                    <label htmlFor="input-c-status">Activo</label>
                  </p>
                </div>

                <div className="input-field col s12 m6">
                  <textarea type="text" id="input-c-expression" placeholder={'${DEVICE.VARIABLE}: Clave de la variable'} ref={this.expressionRef} />
                  <label htmlFor="input-c-expression" className="active">Expresión Aritmetica</label>
                </div>

                <div className="input-field col s12 m6">
                  <input type="text" id="input-c-unit" placeholder="Ejemplo: Pa, Kg/cm2, PSI" ref={this.unitRef} />
                  <label htmlFor="input-c-unit" className="active">Unidad</label>
                </div>

              </div>

              <div className="row" style={{ marginTop: '10px' }}>

                <div className="col s12 m4">
                  <select className="browser-default sion-select" id="input-variable" ref={this.variableRef}>
                    <option>Variables</option>
                    {this.state.variables_.map(this.createOptName())}
                  </select>
                </div>

                <div className="col s12 m8">
                  <button type="button" className="btn green" onClick={this.handleInsert()}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col s12 m12" style={{ marginTop: '10px' }}>
                  <ul className="collection">
                    <li className="collection-item" hidden={!isEmpty}>
                      <span style={{color: '#424242'}}>Sin variables</span>
                    </li>

                    {this.state.variables.map(this.createItem())}
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

export default CustomCreateForm;
