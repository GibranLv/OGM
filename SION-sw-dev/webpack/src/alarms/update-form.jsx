import { h, render, Component } from 'preact';
import { isNumber, isNaN } from 'underscore';

import constants from './../constants';

const INSTRUCTIONS = '${name}: Nombre de la Alarma\n${variable}: Nombre de la Variable\n${value}: Valor de la Variable\n${timestamp}: Estampa de tiempo de la variable';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      units_: [],
      is_timeout: false
    };
  }

  componentDidMount() {
    let o = this.props.item;
    if (!o) {
      let message = 'No se encontró la información de la alarma';
      Materialize.toast(message, 2500);
      return;
    }

    let inputName = document.querySelector('#input-u-name');
    let inputAlias = document.querySelector('#input-u-alias');
    let inputColor = document.querySelector('#input-u-color');
    let inputMessage = document.querySelector('#input-u-message');
    let inputSetpoint = document.querySelector('#input-u-setpoint');
    let inputStatus = document.querySelector('#input-u-status');
    let inputSound = document.querySelector('#input-u-sound');
    let inputPriorityLevel = document.querySelector('#input-u-priority-level');
    let inputEmail = document.querySelector('#input-u-send-email');
    let inputSMS = document.querySelector('#input-u-send-sms');

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
      let inputIsTimeout = document.querySelector('#input-u-is-timeout');
      let inputTimeout = document.querySelector('#input-u-timeout');

      inputIsTimeout.checked = o.is_timeout;
      inputTimeout.value = o.timeout;

      this.setState({ is_timeout: o.is_timeout });

    } else {
      let inputIsTimeout = document.querySelector('#input-u-is-timeout');
      let inputExpression = document.querySelector('#input-u-expression');
      inputExpression.value = o.expression;

      if (inputIsTimeout) inputIsTimeout.checked = o.is_timeout;
    }

    this.getUnits();
  }

  getUnits() {
    let self = this;

    let url = `${constants.URL_SERVER_UNITS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.setState({ units_: res.docs }, () => {

          let o = this.props.item;
          if (o) {
            let inputUnit = document.querySelector('#input-u-unit');
            if (o.unit_id) inputUnit.value = o.unit_id;
          }

          $('#input-u-unit').material_select();
          $('#input-u-sound').material_select();
        });

      } else if (response.status === constants.STATUS_ACCEPTED) {
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

      let o = this.props.item;
      if (!o) {
        let msg = 'No se encontró la información de la alarma';
        Materialize.toast(message, 2500);
        return;
      }

      let inputName = document.querySelector('#input-u-name');
      let inputAlias = document.querySelector('#input-u-alias');
      let inputUnit = document.querySelector('#input-u-unit');
      let inputColor = document.querySelector('#input-u-color');
      let inputIsTimeout = document.querySelector('#input-u-is-timeout');
      let inputTimeout = document.querySelector('#input-u-timeout');
      let inputExpression = document.querySelector('#input-u-expression');
      let inputPriorityLevel = document.querySelector('#input-u-priority-level');
      let inputMessage = document.querySelector('#input-u-message');
      let inputSetpoint = document.querySelector('#input-u-setpoint');
      let inputSound = document.querySelector('#input-u-sound');
      let inputStatus = document.querySelector('#input-u-status');
      let inputEmail = document.querySelector('#input-u-send-email');
      let inputSMS = document.querySelector('#input-u-send-sms');

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
        $('#input-u-unit').material_select();
        $('#input-u-sound').material_select();
      });
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

  clearForm() {
    let inputName = document.querySelector('#input-u-name');
    let inputUnit = document.querySelector('#input-u-unit');
    let inputColor = document.querySelector('#input-u-color');
    let inputIsTimeout = document.querySelector('#input-u-is-timeout');
    let inputTimeout = document.querySelector('#input-u-timeout');
    let inputExpression = document.querySelector('#input-u-expression');
    let inputPriorityLevel = document.querySelector('#input-u-priority-level');
    let inputMessage = document.querySelector('#input-u-message');
    let inputSound = document.querySelector('#input-u-sound');
    let inputStatus = document.querySelector('#input-u-status');
    let inputEmail = document.querySelector('#input-u-send-email');
    let inputSMS = document.querySelector('#input-u-send-sms');

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
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.name}</option>;
    };

    return fn;
  }

  render(props, state) {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <h5>Editar Alarma</h5>

            <form onSubmit={this.handleUpdate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-name" placeholder="Nombre" />
                  <label htmlFor="input-u-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-u-alias" placeholder="Alias" />
                  <label htmlFor="input-u-alias" className="active">Alias</label>
                </div>

                <div className="col s12 m3">
                  <select className="browser-default sion-select sion-margin-select" id="input-u-unit">
                    <option value="-1">Ninguna</option>
                    {state.units_.map(this.createOpt())}
                  </select>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color"  type="color" id="input-u-color" placeholder="Color" />
                  <label htmlFor="input-u-color" className="active">Color</label>
                </div>

              </div>


              <div className="row">

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-is-timeout" onChange={this.handleChangeTimeout()} />
                    <label htmlFor="input-u-is-timeout">Tiempo de Espera</label>
                  </p>
                </div>

                <div className="input-field col s12 m4" hidden={!state.is_timeout}>
                  <input type="text" id="input-u-timeout" placeholder="Tiempo (Minutos)" />
                  <label htmlFor="input-u-timeout" className="active">Tiempo</label>
                </div>

                <div className="input-field col s12 m4" hidden={state.is_timeout}>
                  <textarea type="text" id="input-u-expression" placeholder={'${value}: Valor de la Variable'} />
                  <label htmlFor="input-u-expression" className="active">Expresión Matematica</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-setpoint" placeholder="Setpoint" hidden={state.is_timeout} />
                  <label htmlFor="input-u-setpoint" className="active" hidden={state.is_timeout}>Setpoint</label>
                </div>

                <div className="input-field col s12 m4" hidden={!state.is_timeout}></div>

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
                  <textarea type="text" id="input-u-message" placeholder={'${value}: Valor de la Variable'} />
                </div>

                <div className="col s12 m6">
                  <label htmlFor="input-u-sound">Sonido</label>
                  <select className="browser-default sion-select" id="input-u-sound">
                    <option selected value="-1">Sin sonido</option>
                    <option value={constants.WARNING_VALUE}>Advertencia</option>
                    <option value={constants.DANGER_VALUE}>Peligro</option>
                    <option value={constants.TIMEOUT_VALUE}>Timeout</option>
                  </select>
                </div>

                <div className="input-field col s12 m6">
                  <input type="text" id="input-u-priority-level" placeholder="Nivel de Prioridad" />
                  <label htmlFor="input-u-priority-level" className="active">Nivel de Prioridad</label>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-send-email" />
                    <label htmlFor="input-u-send-email">Enviar Correo</label>
                  </p>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-send-sms" />
                    <label htmlFor="input-u-send-sms">Enviar SMS</label>
                  </p>
                </div>

                <div className="col s12 m4">
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

              </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default UpdateForm;
