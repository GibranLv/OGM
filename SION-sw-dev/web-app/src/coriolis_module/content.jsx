import { h, render, Component } from 'preact';
import { isNumber, isNaN, isString } from 'underscore';
import { parallel } from 'async';

import Header from './../header.jsx';
import constants from './../constants.js';

import ItemVariable from './item-variable.jsx';

class Content extends Component {

  constructor() {
    super();

    this.state = {
      device: false,
      devices_: [],
      variables_: [],
      all: [],

      variables: [],
    };
  }

  componentDidMount() {
    let self = this;

    this.getNotifications();

    parallel({
      variables: (fn) => {
        self.getVariables(fn);
      },
      custom_variables: (fn) => {
        self.getCustomVariables(fn);
      },
    }, (err, res) => {
      if (err) {
        Materialize.toast(err, 2500);;
        return;
      }

      let variables_ = res.variables;
      let custom_variables_ = res.custom_variables;

      if (!variables_) variables_ = [];
      if (!custom_variables_) custom_variables_ = [];

      let devices_ = self.getDevices(variables_, custom_variables_);

      let all = [];

      for (let i = 0; i < variables_.length; i++) {
        const variable_ = variables_[i];
        let o = {
          name: variable_.name,
          device: variable_.device,
          id: `v_${variable_.id}`,
        };

        all.push(o);
      }

      for (let i = 0; i < custom_variables_.length; i++) {
        const custom_variable_ = custom_variables_[i];
        let o = {
          name: custom_variable_.name,
          device: custom_variable_.device,
          id: `cv_${custom_variable_.id}`,
        };

        all.push(o);
      }

      self.setState({
        devices_: devices_,
        variables_: variables_,
        custom_variables_: custom_variables_,
        all: all,
      }, () => {
        $('select').material_select();
      });

    });
  }

  /* Notificaciones */

  getNotifications() {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_EVENTS}/notifications?is_seen=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ notifications_: res.docs }, () => {
          $('select').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        alert(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        alert(json.message);
      } else {
        alert(constants.MESSAGE_ERROR);
      }
    });
  }

  updateEventAsSeen(id) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_LOG_EVENTS}/notifications/${id}`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        console.log('Notificación Ok');

      } else if (response.status == constants.STATUS_ACCEPTED) {
        alert(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        alert(json.message);
      } else {
        alert(constants.MESSAGE_ERROR);
      }
    });
  }

  handleRemoveNotification() {
    let self = this;

    let fn = (id) => {
      let notifications = self.state.notifications_;
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (id == notification.id) {
          self.updateEventAsSeen(id);

          notifications.splice(i, 1);

          self.setState({ notifications_: notifications }, () => {
            $('select').material_select();
          });

          return;
        }
      }
    };

    return fn;
  }
  /* Notificaciones */

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
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);

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

        Materialize.toast(json.message, 2500);
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);

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

        Materialize.toast(json.message, 2500);
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
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

  handleChangeDevice() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      self.setState({ device: value });
    };

    return fn;
  }

  updateVariables(json) {
    let self = this;

    let xhr = $.ajax({
      url: constants.URL_SERVER_CORIOLIS,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let message = 'La cambios se guardaron correctamente';
        Materialize.toast(message, 2500);

        self.setState({ variables: [] });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);;
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  handleInsertAll() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variables = self.state.variables;
      self.updateVariables(variables);
    };

    return fn;
  }

  handleInsert() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputVariable = document.querySelector('#input-variable');
      let inputValue = document.querySelector('#input-value');
      let inputTimestamp = document.querySelector('#input-timestamp');

      let variable_id = 0;
      let is_custom = false;
      let valueIn = 0;
      let timestamp = '';

      if (inputVariable) {
        let value = inputVariable.value;
        if (value) {
          let part = value.split('_');
          if (part.length == 2) {
            if (part[0] === 'cv') is_custom = true;
            if (part[0] === 'v') is_custom = false;
            if (part[1]) variable_id = parseInt(part[1]);
          }
        }
      }

      if (inputValue) {
        let value = inputValue.value;
        if (value) {
          valueIn = parseFloat(value);
        }
      }

      if (inputTimestamp) {
        let value = inputTimestamp.value.trim();
        if (value) {
          let content = value.split(' ');
          if (content.length == 2) {
            let contentDate = content[0];
            let fPart = contentDate.split('-');
            if (!fPart) {
              let message = 'El formato de la fecha es invalido';
              Materialize.toast(message, 2500);
              return;
            }

            if (fPart.length != 3) {
              let message = 'El formato de la fecha es invalido';
              Materialize.toast(message, 2500);
              return;
            }

            if (fPart.length == 3) {
              for (let i = 0; i < 2; i++) {
                const p = fPart[i];
                if (p.length != 2) {
                  let message = 'El formato de la fecha es invalido';
                  Materialize.toast(message, 2500);
                  return;
                }
              }
            }

            let contentTime = content[1];
            if (!contentTime) {
              let message = 'El formato de la hora es invalido';
              Materialize.toast(message, 2500);
              return;
            }

            let tPart = contentTime.split(':');
            if (tPart.length == 2) {
              contentTime = `${contentTime}:00`;

            } else if (tPart.length == 1 || tPart.length > 3) {
              let message = 'El formato de la hora es invalido';
              Materialize.toast(message, 2500);
              return;
            }

            if (tPart.length == 3) {
              for (let i = 0; i < tPart.length; i++) {
                const p = tPart[i];
                if (p.length != 2) {
                  let message = 'El formato de la hora es invalido';
                  Materialize.toast(message, 2500);
                  return;
                }
              }
            }

            timestamp = `${fPart[2]}-${fPart[1]}-${fPart[0]} ${contentTime}`;
          }

        } else {
          let message = 'El formato de la fecha es invalido';
          Materialize.toast(message, 2500);
          return;
        }
      }

      if (variable_id == 0 || timestamp == '') return;
      if (!isNumber(valueIn) || isNaN(valueIn)) return;

      let o = {
        variable_id: variable_id,
        is_custom: is_custom,
        value: valueIn,
        timestamp: timestamp,
      };

      o = self.getExtra(o);

      let variables = self.state.variables;
      variables.push(o);

      self.setState({ variables: variables });

      inputVariable.value = '';
      inputValue.value = '';
    };

    return fn;
  }

  getExtra(o) {
    if (!o.is_custom) {
      let variables = this.state.variables_;
      for (let i = 0; i < variables.length; i++) {
        const v = variables[i];
        if (o.variable_id === v.id) {
          o.device = v.device;
          o.name = v.name;
          break;
        }
      }

    } else {
      let custom_variables = this.state.custom_variables_;
      for (let i = 0; i < custom_variables.length; i++) {
        const v = custom_variables[i];
        if (o.variable_id === v.id) {
          o.device = v.device;
          o.name = v.name;
          break;
        }
      }
    }

    return o;
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

  handleRemove() {
    let self = this;

    let fn = (index) => {
      let variables = self.state.variables;
      variables.splice(index, 1);

      self.setState({ variables: variables });
    };

    return fn;
  }

  createItemVariable() {
    let self = this;

    let fn = (item, index) => {
      item.index = index;
      return <ItemVariable key={index} item={item} onRemove={self.handleRemove()} />;
    };

    return fn;
  }

  render(props, state) {
    let notifications = state.notifications_;

    return (
      <div>
        <Header module={constants.CORIOLIS_MODULE}
                notifications={notifications}
                onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">
          <div className="reports">
            <div className="container">

              <div className="row">

                <div className="col m3">
                  <div className="row">
                    <div className="col m12">
                      <label htmlFor="input-value" className="active">&nbsp;</label>
                      <select className="browser-default sion-select" id="input-device" onChange={this.handleChangeDevice()}>
                        <option>Dispositivos</option>
                        {state.devices_.map(this.createOptDevice())}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col m3">
                  <div className="row">
                    <div className="col m12">
                      <label htmlFor="input-value" className="active">&nbsp;</label>
                      <select className="browser-default sion-select" id="input-variable">
                        <option>Variables</option>
                        {state.all.map(this.createOptVariable())}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col m3">
                  <div className="row">
                    <div className="col m12">
                      <div className="input-field col s12">
                        <input id="input-value" type="text" placeholder="Valor" />
                        <label htmlFor="input-value" className="active">Valor</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col m3">
                  <div className="row">
                    <div className="col m12">
                      <div className="input-field col s12">
                        <input id="input-timestamp" type="text" placeholder="DD-MM-YYYY HH:MM:SS" />
                        <label htmlFor="input-timestamp" className="active">Estampa de tiempo</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col m12">
                  <div className="row">
                    <div className="col m6">
                      <button type="button" className="btn blue" onClick={this.handleInsert()}>
                        <i className="material-icons">add</i>
                      </button>
                    </div>
                    <div className="col m6">
                      <button type="button" className="btn green" onClick={this.handleInsertAll()}>
                        ENVIAR TODAS LAS VARIABLES
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col m12">
                <table className="responsive-table centered">
                  <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Valor</th>
                      <th>Estampa de tiempo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.variables.map(this.createItemVariable())}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>
      </div>
    );

  }
}

render(<Content />, document.getElementById('content-main'));