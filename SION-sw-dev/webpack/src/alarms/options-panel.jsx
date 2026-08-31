import { h, render, Component, options } from 'preact';
import { parallel } from 'async';

import constants from './../constants';

const VARIABLE = 1;
const CUSTOM_VARIABLE = 2;

class OptionsForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      variables_: [],
      custom_variables_: [],

      variables: [],
      custom_variables: [],

      devices_: [],
      device: false,
      custom_device: false
    };
  }

  componentDidMount() {
    let self = this;

    parallel({
      variables: (fn) => {
        self.getVariables(fn);
      },
      custom_variables: (fn) => {
        self.getCustomVariables(fn);
      }
    },
    (err, res) => {
      if (err) {
        Materialize.toast(err, 2500);;
        return;
      }

      let variables_ = res.variables;
      let custom_variables_ = res.custom_variables;

      if (!variables_) variables_ = [];
      if (!custom_variables_) custom_variables_ = [];

      let devices_ = self.getDevices(variables_, custom_variables_);

      self.setState({
        variables_: variables_,
        custom_variables_: custom_variables_,
        devices_: devices_
      },
      () => {
        $('select').material_select();
      });
    });

    this.insertNotifications();
    this.getVariablesForAlarm();
    this.getCustomVariablesForAlarm();

    $('ul.tabs').tabs_materialize();
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

        self.setState({ variables_: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

        if (fn) {
          fn(null, []);
          return;
        }

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);

        if (fn) {
          fn(null, []);
          return;
        }
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }

      if (fn) {
        fn(null, []);
        return;
      }
    });
  }

  getCustomVariables(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list`;

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

        self.setState({ custom_variables_: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

        if (fn) {
          fn(null, []);
          return;
        }

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);

        if (fn) {
          fn(null, []);
          return;
        }
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }

      if (fn) {
        fn(null, []);
        return;
      }
    });
  }

  insertNotifications() {
    let alarm = this.props.item;
    if (!alarm) {
      let message = 'No se encontró la información de la alarma';
      Materialize.toast(message, 2500);
      return;
    }

    let inputEmail = document.querySelector('#input-o-send-email');
    let inputSMS = document.querySelector('#input-o-send-sms');

    inputEmail.checked = alarm.send_email;
    inputSMS.checked = alarm.send_sms;
  }

  getVariablesForAlarm() {
    let self = this;

    let alarm = this.props.item;
    if (!alarm) {
      let message = 'No se encontró la información de la alarma';
      Materialize.toast(message, 2500);
      return;
    }

    let url = `${constants.URL_SERVER_VARIABLES}/list?alarm_id=${alarm.id}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ variables: res.docs });

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

  getCustomVariablesForAlarm() {
    let self = this;

    let alarm = this.props.item;
    if (!alarm) {
      let message = 'No se encontró la información de la alarma';
      Materialize.toast(message, 2500);
      return;
    }

    let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list?alarm_id=${alarm.id}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ custom_variables: res.docs });

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


  handleChangeDevice() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      self.setState({ device: value });
    };

    return fn;
  }

  handleChangeCustomDevice() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      self.setState({ custom_device: value });
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

  handleInsert(value) {
    let self = this;

    let fn = () => {
      let selector = false;

      if (value == VARIABLE) {
        selector = '#input-variable';
      } else if (value == CUSTOM_VARIABLE) {
        selector = '#input-custom-variable';
      }

      let inputValue = document.querySelector(selector);
      let sId = inputValue.value.trim();
      if (sId == '') return;

      let id = parseInt(sId);

      let insertValue = false;
      let items_ = [];

      if (value == VARIABLE) {
        items_ = self.state.variables_;
      } else if (value == CUSTOM_VARIABLE) {
        items_ = self.state.custom_variables_;
      }

      for (let i = 0; i < items_.length; i++) {
        const item_ = items_[i];
        if (item_.id == id) {
          insertValue = item_;
          break;
        }
      }

      if (insertValue) {
        let items = [];

        if (value == VARIABLE) {
          items = self.state.variables;
        } else if (value == CUSTOM_VARIABLE) {
          items = self.state.custom_variables;
        }

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.id == insertValue.id) return;
        }

        items.push(insertValue);

        if (value == VARIABLE) {
          self.setState({ variables: items });
        } else if (value == CUSTOM_VARIABLE) {
          self.setState({ custom_variables: items });
        }
      }
    };

    return fn;
  }

  handleUpdate(value) {
    let self = this;

    let fn = () => {
      let alarm = self.props.item;
      if (!alarm) {
        let message = 'No se cuenta con la información de la alarma';
        return;
      }

      let items = [];
      let key = false;

      if (value == VARIABLE) {
        items = self.state.variables;
        key = 'variables';
      } else if (value == CUSTOM_VARIABLE) {
        items = self.state.custom_variables;
        key = 'custom_variables';
      }

      let size = items.length;
      if (size == 0) {
        let message = 'La lista de elementos esta vacia, si desea eliminar los elementos, use el boton de limpiar';
        return;
      }

      let s = [];
      for (let i = 0; i < size; i++) {
        const item = items[i];
        let id = item.id;
        s.push(id);
      }

      let id = alarm.id;

      let json = {};
      json[key] = s;

      self.props.onUpdateOptions(json, id);
    };

    return fn;
  }

  handleUpdateClear(value) {
    let self = this;

    let fn = () => {
      let alarm = self.props.item;
      if (!alarm) {
        let message = 'No se cuenta con la información de la alarma';
        Materialize.toast(message, 2500);
        return;
      }

      let items = [];
      let key = false;

      if (value == VARIABLE) {
        key = 'variables';
      } else if (value == CUSTOM_VARIABLE) {
        key = 'custom_variables';
      }

      let id = alarm.id;

      let json = {};
      json[key] = [-1];

      self.props.onUpdateOptions(json, id);
    };

    return fn;
  }

  handleRemove(item, value) {
    let self = this;

    let fn = () => {
      let items = [];

      if (value == VARIABLE) {
        items = self.state.variables;

      } else if (value == CUSTOM_VARIABLE) {
        items = self.state.custom_variables;
      }

      let id = item.id;
      let update = false;
      for (let i = 0; i < items.length; i++) {
        const o = items[i];
        if (o.id == id) {
          items.splice(i, 1);
          update = true;
        }
      }

      if (update) {
        if (value == VARIABLE) {
          self.setState({ variables: items });

        } else if (value == CUSTOM_VARIABLE) {
          self.setState({ custom_variables: items });
        }
      }
    };

    return fn;
  }

  handleUpdateNotification() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = this.props.item;
      if (!o) {
        let message = 'No se encontró la información de la alarma';
        Materialize.toast(message, 2500);
        return;
      }

      let inputEmail = document.querySelector('#input-o-send-email');
      let inputSMS = document.querySelector('#input-o-send-sms');

      let send_email = inputEmail.checked;
      let send_sms = inputSMS.checked;

      let json = {};

      json.send_email = send_email;
      json.send_sms = send_sms;

      self.props.onUpdateNotification(json, o.id);
    };

    return fn;
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

  createOptCustomVariable() {
    let self = this;

    let fn = (item, index) => {
      let device = self.state.custom_device;
      if (device == item.device) {
        return <option key={index} value={item.id}>{item.name}</option>
      }

      return;
    };

    return fn;
  }

  createItem(value) {
    let self = this;

    let fn = (item, index) => {
      return (
        <tr>
          <td>{item.device}.{item.name}</td>
          <td>
            <a href="#" className="waves-effect waves-teal btn-flat sion-link" onClick={self.handleRemove(item, value)}>
              <span aria-hidden="true">&times;</span>
            </a>
          </td>
        </tr>
      );
    };

    return fn;
  }

  render(props, state) {
    let alarm = props.item;

    return (
      <section>

        <div className="row">
          <div className="col m2">
            <button type="button" className="btn blue" onClick={this.handleBack()}>
              <i className="material-icons">arrow_back</i>
            </button>
          </div>
          <div className="col m10">
            <h5>
              Alarma: {alarm.name}
            </h5>
            <h6>Expresión: {alarm.expression}</h6>
          </div>
        </div>

        <div className="row">
          <div className="col m12">
            <ul className="tabs" id="sion-alarms-panel">
              <li class="tab col s3"><a className="active"  href="#variables">Variables</a></li>
              <li class="tab col s3"><a href="#custom-variables">Variables personalizadas</a></li>
              <li class="tab col s3"><a href="#notifications">Notificaciones</a></li>
            </ul>
          </div>

          <div className="col m12 content-panel sion-content-panel">

            <div id="variables" class="col s12">

              <h5>Variables</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-device" onChange={this.handleChangeDevice()}>
                    <option>Dispositivos</option>
                    {state.devices_.map(this.createOptDevice())}
                  </select>
                </div>

                <div className="col m4">
                  <select className="browser-default sion-select"  id="input-variable">
                    <option>Variables</option>
                    {state.variables_.map(this.createOptVariable())}
                  </select>
                </div>

                <div className="col m2">
                  <button type="button" className="btn blue" onClick={this.handleInsert(VARIABLE)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m1">
                  <button type="button" className="btn green" onClick={this.handleUpdate(VARIABLE)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m1">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(VARIABLE)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.variables.map(this.createItem(VARIABLE))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            <div id="custom-variables" class="col s12">

              <h5>Variables personalizadas</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-c-device" onChange={this.handleChangeCustomDevice()}>
                    <option>Dispositivos</option>
                    {state.devices_.map(this.createOptDevice())}
                  </select>
                </div>

                <div className="col m4">
                  <select className="browser-default sion-select"  id="input-custom-variable">
                    <option>Variables personalizadas</option>
                    {state.custom_variables_.map(this.createOptCustomVariable())}
                  </select>
                </div>

                <div className="col m2">
                  <button type="button" className="btn blue" onClick={this.handleInsert(CUSTOM_VARIABLE)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m1">
                  <button type="button" className="btn green" onClick={this.handleUpdate(CUSTOM_VARIABLE)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m1">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(CUSTOM_VARIABLE)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.custom_variables.map(this.createItem(CUSTOM_VARIABLE))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            <div id="notifications" class="col s12">

              <h5>Notificaciones</h5>

              <div className="row">

                <form onSubmit={this.handleUpdateNotification()} >
                  <div className="row">
                    <div className="col s12 m6">
                      <p>
                        <input type="checkbox" id="input-o-send-email" />
                        <label htmlFor="input-o-send-email">Enviar Correo</label>
                      </p>
                    </div>

                    <div className="col s12 m6">
                      <p>
                        <input type="checkbox" id="input-o-send-sms" />
                        <label htmlFor="input-o-send-sms">Enviar SMS</label>
                      </p>
                    </div>

                    <div className="col s12 m12">
                      <br />
                      <button type="submit" className="btn red">Guardar</button>
                    </div>

                  </div>
                </form>

              </div>

            </div>


          </div>

        </div>


      </section>
    );
  }
}

export default OptionsForm;
