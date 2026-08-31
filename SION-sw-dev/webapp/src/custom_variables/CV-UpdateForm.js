import React from 'react';

import constants from '../constants';

class CustomUpdateForm extends React.Component {

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

    let o = this.props.item;
    if (o) {
      let inputName   = this.nameRef.current;
      let inputDevice = this.deviceRef.current;
      let inputUnit   = this.unitRef.current;
      let inputStatus = this.statusRef.current;

      inputName.value = o.name;
      inputDevice.value = o.device;
      inputUnit.value = o.unit;
      inputStatus.checked = o.status;
    }
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
                  if (id === variable_.id) {
                    variables.push(variable_);

                    let old = '${'+ id +'}';
                    let n = '${' + variable_.device + '.' + variable_.name + '}';
                    expression = self.replaceAll(expression, old, n)
                  }
                }
              }

              if (variables.length > 0) self.setState({ variables: variables });
            }

            let inputExpression = self.expressionRef.current;
            inputExpression.value = expression;
          }

          window.$('#input-variable').material_select();
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

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = self.props.item;
      if (!o) {
        let message = 'No se encontro la información de la variable';
        window.Materialize.toast(message, 2500);
        return;
      }

      let inputName       = self.nameRef.current;
      let inputDevice     = self.deviceRef.current;
      let inputExpression = self.expressionRef.current;
      let inputUnit       = self.unitRef.current;
      let inputStatus     = self.statusRef.current;

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

    return fn;
  }

  createItem() {
    let self = this;

    let fn = (item, index) => {
      return (
        <li className="collection-item sion-cv-variable" key={index}>
          <div>
            {item.device}.{item.name}
            <a href="#remove" className="secondary-content" onClick={self.handleRemove(item.id)}>
              <i className="material-icons">delete</i>
            </a>
          </div>
        </li>
      );
    };

    return fn;
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <h5>Editar Variable Personalizada</h5>

            <form onSubmit={this.handleUpdate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-name" placeholder="Nombre" ref={this.nameRef} />
                  <label htmlFor="input-u-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-device" placeholder="Dispositivo" ref={this.deviceRef} />
                  <label htmlFor="input-u-device" className="active">Dispositivo</label>
                </div>

                <div className="input-field col s12 m4">
                  <textarea type="text" id="input-u-expression" placeholder={"${DEVICE.VARIABLE}: Clave de la variable"} ref={this.expressionRef} />
                  <label htmlFor="input-u-expression" className="active">Expresión Aritmetica</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-unit" placeholder="Ejemplo: Pa, Kg/cm2, PSI" ref={this.unitRef} />
                  <label htmlFor="input-u-unit" className="active">Unidad</label>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-status" ref={this.statusRef} />
                    <label htmlFor="input-u-status">Activo</label>
                  </p>
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
                  <button type="button" className="btn blue" onClick={this.handleInsert()}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col s12 m12" style={{ marginTop: '10px' }}>
                  <ul className="collection">
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

export default CustomUpdateForm;
