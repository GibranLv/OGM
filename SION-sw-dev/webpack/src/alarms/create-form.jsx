import { h, render, Component } from 'preact';
import { isNumber, isNaN } from 'underscore';

import constants from './../constants';

class CreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      units_: [],
      is_timeout: false,
    };
  }

  componentDidMount() {
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
          $('#input-c-unit').material_select();
          $('#input-c-sound').material_select();
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

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputIsTimeout = document.querySelector('#input-c-is-timeout');
      let inputName = document.querySelector('#input-c-name');
      let inputAlias = document.querySelector('#input-c-alias');
      let inputUnit = document.querySelector('#input-c-unit');
      let inputColor = document.querySelector('#input-c-color');
      let inputSound = document.querySelector('#input-c-sound');
      let inputPriorityLevel = document.querySelector('#input-c-priority-level');
      let inputMessage = document.querySelector('#input-c-message');
      let inputSetpoint = document.querySelector('#input-c-setpoint');
      let inputStatus = document.querySelector('#input-c-status');
      let inputTimeout = document.querySelector('#input-c-timeout');
      let inputExpression = document.querySelector('#input-c-expression');
      let inputEmail = document.querySelector('#input-c-send-email');
      let inputSMS = document.querySelector('#input-c-send-sms');

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
        $('#input-c-unit').material_select();
        $('#input-c-sound').material_select();
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
    let inputName = document.querySelector('#input-c-name');
    let inputUnit = document.querySelector('#input-c-unit');
    let inputColor = document.querySelector('#input-c-color');
    let inputIsTimeout = document.querySelector('#input-c-is-timeout');
    let inputTimeout = document.querySelector('#input-c-timeout');
    let inputExpression = document.querySelector('#input-c-expression');
    let inputPriorityLevel = document.querySelector('#input-c-priority-level');
    let inputMessage = document.querySelector('#input-c-message');
    let inputSound = document.querySelector('#input-c-sound');
    let inputStatus = document.querySelector('#input-c-status');
    let inputEmail = document.querySelector('#input-c-send-email');
    let inputSMS = document.querySelector('#input-c-send-sms');

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
          <div className="col-md-12">
            <h5>Crear Alarma</h5>

            <form onSubmit={this.handleCreate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-c-name" placeholder="Nombre" />
                  <label htmlFor="input-c-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias" placeholder="Alias" />
                  <label htmlFor="input-c-alias" className="active">Alias</label>
                </div>

                <div className="col s12 m3">
                  <select className="browser-default sion-select sion-margin-select" id="input-c-unit">
                    <option selected>Unidad</option>
                    {state.units_.map(this.createOpt())}
                    <option value="-1">Ninguno</option>
                  </select>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color" placeholder="Color" />
                  <label htmlFor="input-c-color" className="active">Color</label>
                </div>

              </div>

              <div className="row">

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-is-timeout" onChange={this.handleChangeTimeout()} />
                    <label htmlFor="input-c-is-timeout">Tiempo de Espera</label>
                  </p>
                </div>

                <div className="input-field col s12 m4" hidden={!state.is_timeout}>
                  <input type="text" id="input-c-timeout" placeholder="Tiempo (Minutos)" />
                  <label htmlFor="input-c-timeout" className="active">Tiempo</label>
                </div>

                <div className="input-field col s12 m4" hidden={state.is_timeout}>
                  <textarea type="text" id="input-c-expression" placeholder={'${value}: Valor de la Variable'} />
                  <label htmlFor="input-c-expression" className="active">Expresión Matematica</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-c-setpoint" placeholder="Setpoint" hidden={state.is_timeout} />
                  <label htmlFor="input-c-setpoint" className="active" hidden={state.is_timeout}>Setpoint</label>
                </div>

                <div className="input-field col s12 m4" hidden={!state.is_timeout}></div>

                <div className="col s12 m12">
                  <label htmlFor="input-c-message">
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
                  <textarea type="text" id="input-c-message" placeholder={'${value}: Valor de la Variable'} />
                </div>

                <div className="input-field col s12 m6">
                  <input type="text" id="input-c-priority-level" placeholder="Nivel de Prioridad" />
                  <label htmlFor="input-c-priority-level" className="active">Nivel de Prioridad</label>
                </div>

                <div className="col s12 m6">
                  <select className="browser-default sion-select sion-margin-select" id="input-c-sound">
                    <option selected value="-1">Sin sonido</option>
                    <option value={constants.WARNING_VALUE}>Advertencia</option>
                    <option value={constants.DANGER_VALUE}>Peligro</option>
                    <option value={constants.TIMEOUT_VALUE}>Timeout</option>
                  </select>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-send-email" />
                    <label htmlFor="input-c-send-email">Enviar Correo</label>
                  </p>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-send-sms" />
                    <label htmlFor="input-c-send-sms">Enviar SMS</label>
                  </p>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-c-status" />
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

export default CreateForm;
