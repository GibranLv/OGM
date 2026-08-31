import React, { Component } from "react";
import { isNumber, isNaN } from 'underscore';

import constants from '../constants';

class AlarmsUpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      units_: [],
      is_timeout: false
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
    let o = this.props.item;
    if (!o) {
      let message = 'No se encontró la información de la alarma';
      window.Materialize.toast(message, 2500);
      return;
    }

    let inputName = this.nameRef.current;
    let inputAlias = this.aliasRef.current;
    let inputColor = this.colorRef.current;
    let inputMessage = this.messageRef.current;
    let inputSetpoint = this.setpointRef.current;
    let inputStatus = this.statusRef.current;
    let inputSound = this.soundRef.current;
    let inputPriorityLevel = this.priorityLevelRef.current;
    let inputEmail = this.sendEmailRef.current;
    let inputSMS = this.sendSMSRef.current;

    inputName.value = o.name;
    inputAlias.value = o.alias;
    inputColor.value = o.color;
    inputMessage.value = o.message;
    inputSetpoint.value = o.setpoint;
    inputStatus.checked = o.status;
    inputEmail.checked = o.send_email;
    inputSMS.checked = o.send_sms;
    inputSound.value = o.sound;
    inputPriorityLevel.value = o.priority_level;

    if (o.is_timeout) {
      let inputIsTimeout = this.isTimeoutRef.current;
      let inputTimeout = this.timeoutRef.current;

      inputIsTimeout.checked = o.is_timeout;
      inputTimeout.value = o.timeout;

      this.setState({ is_timeout: o.is_timeout });

    } else {
      let inputIsTimeout = this.isTimeoutRef.current;
      let inputExpression = this.expressionRef.current;
      inputExpression.value = o.expression;

      if (inputIsTimeout) inputIsTimeout.checked = o.is_timeout;
    }

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

          let o = this.props.item;
          if (o) {
            if (o.unit_id) inputUnit.value = o.unit_id;
          }

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

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = this.props.item;
      if (!o) {
        let msg = 'No se encontró la información de la alarma';
        window.Materialize.toast(msg, 2500);
        return;
      }

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
        expression = '';

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
        setpoint = 0;

      } else {
        setpoint = parseFloat(setpoint);

        if (isNaN(setpoint)) setpoint = 0;
        if (!isNumber(setpoint)) setpoint = 0;
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
      json.setpoint = setpoint;
      json.sound = sound;
      json.status = status;
      json.send_email = send_email;
      json.send_sms = send_sms;
      json.priority_level = priority_level;

      self.clearForm();

      self.props.onUpdate(json, o.id);
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
            <input type="text" id="input-u-timeout" placeholder="Tiempo (Minutos)" ref={self.timeoutRef} />
            <label htmlFor="input-u-timeout" className="active">Tiempo</label>
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
            <textarea type="text" id="input-u-expression" placeholder={'${value}: Valor de la Variable'} ref={self.expressionRef} />
            <label htmlFor="input-u-expression" className="active">Expresión Matematica</label>
          </div>
        );
      })();

      inputSetpoint = (() => {
        return (
          <div className="input-field col s12 m4">
            <input type="text" id="input-u-setpoint" placeholder="Setpoint" ref={self.setpointRef} />
            <label htmlFor="input-u-setpoint" className="active">Setpoint</label>
          </div>
        );
      })();
    }

    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <h5>Editar Alarma</h5>

            <form onSubmit={this.handleUpdate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-name" placeholder="Nombre" ref={this.nameRef} />
                  <label htmlFor="input-u-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-u-alias" placeholder="Alias" ref={this.aliasRef} />
                  <label htmlFor="input-u-alias" className="active">Alias</label>
                </div>

                <div className="col s12 m3">
                  <select className="browser-default sion-select sion-margin-select" id="input-u-unit" ref={this.unitRef} >
                    <option value="-1">Ninguna</option>
                    {this.state.units_.map(this.createOpt())}
                  </select>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color"  type="color" id="input-u-color" placeholder="Color" ref={this.colorRef} />
                  <label htmlFor="input-u-color" className="active">Color</label>
                </div>

              </div>


              <div className="row">

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-is-timeout" onChange={this.handleChangeTimeout()} ref={this.isTimeoutRef} />
                    <label htmlFor="input-u-is-timeout">Tiempo de Espera</label>
                  </p>
                </div>

                {inputMinute}

                {inputExpression}

                {inputSetpoint}

                {inputIsTimeout}

                <div className="col s12 m12">
                  <label htmlFor="input-u-message">
                    Mensaje
                  <br />
                    {'${name}: Nombre de la Alarma'}
                    <br />
                    {'${variable}: Nombre de la Variable'}
                    <br />
                    {'${value}: Valor de la Variable'}
                    <br />
                    {'${timestamp}: Estampa de tiempo de la variable'}
                  </label>
                  <textarea type="text" id="input-u-message" placeholder={'${value}: Valor de la Variable'} ref={this.messageRef} />
                </div>

                <div className="col s12 m6" >
                  <label htmlFor="input-u-sound">Sonido</label>
                  <select className="browser-default sion-select" id="input-u-sound" ref={this.soundRef} >
                    <option selected value="-1">Sin sonido</option>
                    <option value={constants.WARNING_VALUE}>Advertencia</option>
                    <option value={constants.DANGER_VALUE}>Peligro</option>
                    <option value={constants.TIMEOUT_VALUE}>Timeout</option>
                  </select>
                </div>

                <div className="input-field col s12 m6">
                  <input type="text" id="input-u-priority-level" placeholder="Nivel de Prioridad" ref={this.priorityLevelRef} />
                  <label htmlFor="input-u-priority-level" className="active">Nivel de Prioridad</label>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-send-email" ref={this.sendEmailRef} />
                    <label htmlFor="input-u-send-email">Enviar Correo</label>
                  </p>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-send-sms" ref={this.sendSMSRef} />
                    <label htmlFor="input-u-send-sms">Enviar SMS</label>
                  </p>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-status" ref={this.statusRef} />
                    <label htmlFor="input-u-status">Activo</label>
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

export default AlarmsUpdateForm;
