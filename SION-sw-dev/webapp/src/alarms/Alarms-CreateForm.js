import React, { Component } from "react";
import { isNumber, isNaN } from 'underscore';

import constants from '../constants';

class AlarmsCreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      units_: [],
      is_timeout: false,
    };

    this.nameRef = React.createRef();
    this.aliasRef = React.createRef();
    this.colorRef = React.createRef();
    this.messageRef = React.createRef();
    this.setpointRef = React.createRef();
    this.statusRef = React.createRef();
    this.soundRef = React.createRef();
    this.priorityLevelRef = React.createRef();
    this.sendEmailRef = React.createRef();
    this.sendSMSRef = React.createRef();
    this.isTimeoutRef = React.createRef();
    this.timeoutRef = React.createRef();
    this.expressionRef = React.createRef();
    this.unitRef = React.createRef();
  }

  componentDidMount() {
    this.getUnits();
  }

  getUnits() {
    let self = this;

    let url = `${constants.URL_SERVER_UNITS}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.setState({ units_: res.docs }, () => {
          let inputUnit = self.unitRef.current;
          let inputSound = self.soundRef.current;

          window.$(inputUnit).material_select();
          window.$(inputSound).material_select();
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
      let inputAlias = self.aliasRef.current;
      let inputUnit = self.unitRef.current;
      let inputColor = self.colorRef.current;
      let inputIsTimeout = self.isTimeoutRef.current;
      let inputTimeout = self.timeoutRef.current;
      let inputExpression = self.expressionRef.current;
      let inputPriorityLevel = self.priorityLevelRef.current;
      let inputMessage = self.messageRef.current;
      let inputSetpoint = self.setpointRef.current;
      let inputSound = self.soundRef.current;
      let inputStatus = self.statusRef.current;
      let inputEmail = self.sendEmailRef.current;
      let inputSMS = self.sendSMSRef.current;

      let name = inputName.value.trim();
      let alias = inputAlias.value.trim();
      let unit = inputUnit.value.trim();
      let color = inputColor.value.trim();
      let is_timeout = inputIsTimeout.checked;
      let message = inputMessage.value.trim();
      let setpoint = inputSetpoint.value.trim();
      let sound = inputSound.value.trim();
      let status = inputStatus.checked;
      let send_email = inputEmail.checked;
      let send_sms = inputSMS.checked;
      let priority_level = inputPriorityLevel.value.trim();

      if (name === '') return;
      if (alias === '') return;

      let expression, timeout;

      if (is_timeout) {
        timeout = inputTimeout.value.trim();
        timeout = parseInt(timeout);

        if (isNaN(timeout)) timeout = constants.TIMEOUT_DEFAULT;
        if (!isNumber(timeout)) timeout = constants.TIMEOUT_DEFAULT;

      } else {
        timeout = 0;
        expression = inputExpression.value.trim();
      }

      let json = {};

      if (unit !== '') {
        let unit_id = parseInt(unit);
        if (isNaN(unit_id)) unit_id = -1;
        if (!isNumber(unit_id)) unit_id = -1;

        json.unit_id = unit_id;
      }

      if (setpoint === '') {
        json.setpoint = 0;

      } else {
        json.setpoint = parseFloat(setpoint);

        if (isNaN(setpoint)) json.setpoint = 0;
        if (!isNumber(setpoint)) json.setpoint = 0;
      }

      if (sound === '') {
        sound = -1;
      } else {
        sound = parseInt(sound);

        if (isNaN(sound)) sound = 0;
        if (!isNumber(sound)) sound = 0;
      }

      if (priority_level === '') {
        priority_level = 1;
      } else {
        priority_level = parseInt(priority_level);

        if (isNaN(priority_level)) priority_level = 1;
        if (!isNumber(priority_level)) priority_level = 1;
      }

      json.name = name;
      json.alias = alias;
      json.color = color;
      json.expression = expression;
      json.is_timeout = is_timeout;
      json.timeout = timeout;
      json.message = message;
      json.sound = sound;
      json.status = status;
      json.send_email = send_email;
      json.send_sms = send_sms;
      json.priority_level = priority_level;

      self.props.onCreate(json, () => {
        self.clearForm();
      });
    };

    return fn;
  }

  handleChangeTimeout() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.checked;
      self.setState({ is_timeout: value }, () => {
        let inputUnit = self.unitRef.current;
        let inputSound = self.soundRef.current;

        window.$(inputUnit).material_select();
        window.$(inputSound).material_select();
      });
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

  clearForm() {
    let inputName = this.nameRef.current;
    let inputUnit = this.unitRef.current;
    let inputColor = this.colorRef.current;
    let inputIsTimeout = this.isTimeoutRef.current;
    let inputTimeout = this.timeoutRef.current;
    let inputExpression = this.expressionRef.current;
    let inputPriorityLevel = this.priorityLevelRef.current;
    let inputMessage = this.messageRef.current;
    let inputSound = this.soundRef.current;
    let inputStatus = this.statusRef.current;
    let inputEmail = this.sendEmailRef.current;
    let inputSMS = this.sendSMSRef.current;

    inputName.value = '';
    inputUnit.value = '';
    inputColor.value = '';
    inputIsTimeout.value = '';
    inputTimeout.value = '';
    inputExpression.value = '';
    inputPriorityLevel.value = '';
    inputMessage.value = '';
    inputSound.value = '';
    inputStatus.checked = false;
    inputEmail.checked = false;
    inputSMS.checked = false;
  }

  createOpt() {
    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.name}</option>;
    };

    return fn;
  }

  render() {
    let self = this;

    let inputMinute = false;
    let inputExpression = false;
    let inputSetpoint = false;
    let inputIsTimeout = false;

    if (this.state.is_timeout) {
      inputMinute = (() => {
        return (
          <div className="input-field col s12 m4">
            <input type="text" id="input-i-timeout" placeholder="Tiempo (Minutos)" ref={self.timeoutRef} />
            <label htmlFor="input-i-timeout" className="active">Tiempo</label>
          </div>
        );
      })();

      inputIsTimeout = (() => {
        return (
          <div className="input-field col s12 m4"></div>
        );
      })();

      inputExpression = (() => {
        return (
          <div className="input-field col s12 m4"></div>
        );
      })();

    } else {
      inputExpression = (() => {
        return (
          <div className="input-field col s12 m4">
            <textarea type="text" id="input-i-expression" placeholder={"${value}: Valor de la Variable"} ref={self.expressionRef} />
            <label htmlFor="input-i-expression" className="active">Expresión Matematica</label>
          </div>
        );
      })();

      inputSetpoint = (() => {
        return (
          <div className="input-field col s12 m4">
            <input type="text" id="input-i-setpoint" placeholder="Setpoint" ref={self.setpointRef} />
            <label htmlFor="input-i-setpoint" className="active">Setpoint</label>
          </div>
        );
      })();
    }

    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <h5>Crear Alarma</h5>

            <form onSubmit={this.handleCreate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-c-name" placeholder="Nombre" ref={this.nameRef} />
                  <label htmlFor="input-c-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias" placeholder="Alias" ref={this.aliasRef} />
                  <label htmlFor="input-c-alias" className="active">Alias</label>
                </div>

                <div className="col s12 m3">
                  <select className="browser-default sion-select sion-margin-select" id="input-c-unit" ref={this.unitRef} >
                    <option selected>Unidad</option>
                    {this.state.units_.map(this.createOpt())}
                    <option value="-1">Ninguno</option>
                  </select>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color" placeholder="Color" ref={this.colorRef}  />
                  <label htmlFor="input-c-color" className="active">Color</label>
                </div>

              </div>

              <div className="row">

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-is-timeout" onChange={this.handleChangeTimeout()} ref={this.isTimeoutRef}  />
                    <label htmlFor="input-c-is-timeout">Tiempo de Espera</label>
                  </p>
                </div>

                {inputMinute}

                {inputExpression}

                {inputSetpoint}

                {inputIsTimeout}

                <div className="col s12 m12">
                  <label htmlFor="input-c-message">
                    Mensaje
                  <br />
                    {"${name}: Nombre de la Alarma"}
                    <br />
                    {"${variable}: Nombre de la Variable"}
                    <br />
                    {"${value}: Valor de la Variable"}
                    <br />
                    {"${timestamp}: Estampa de tiempo de la variable"}
                  </label>
                  <textarea type="text" id="input-c-message" placeholder={"${value}: Valor de la Variable"} ref={this.messageRef} />
                </div>

                <div className="input-field col s12 m6">
                  <input type="text" id="input-c-priority-level" placeholder="Nivel de Prioridad" ref={this.priorityLevelRef} />
                  <label htmlFor="input-c-priority-level" className="active">Nivel de Prioridad</label>
                </div>

                <div className="col s12 m6">
                  <select className="browser-default sion-select sion-margin-select" id="input-c-sound" ref={this.soundRef} >
                    <option selected value="-1">Sin sonido</option>
                    <option value={constants.WARNING_VALUE}>Advertencia</option>
                    <option value={constants.DANGER_VALUE}>Peligro</option>
                    <option value={constants.TIMEOUT_VALUE}>Timeout</option>
                  </select>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-send-email" ref={this.sendEmailRef} />
                    <label htmlFor="input-c-send-email">Enviar Correo</label>
                  </p>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-send-sms" ref={this.sendSMSRef} />
                    <label htmlFor="input-c-send-sms">Enviar SMS</label>
                  </p>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-status" ref={this.statusRef} />
                    <label htmlFor="input-c-status">Activo</label>
                  </p>
                </div>

                <div className="col s12 m12">
                  <br />
                  <button type="button" className="btn grey darken-3" onClick={this.handleBack()}>Cancelar</button>
                  <button type="submit" className="btn red">Guardar</button>
                </div>

              </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default AlarmsCreateForm;
