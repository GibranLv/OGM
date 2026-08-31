import React, { Component } from "react";

import Header from '../Header.js';
import constants from '../constants.js';

import Alarms from '../alarms/Alarms.js';
import Charts from '../charts/Charts.js';
import CustomVariables from '../custom_variables/CustomVariables.js';
import Groups from '../groups/Groups.js';
import Matrices from '../matrices/Matrices.js';
import Reports from '../reports/Reports.js';
import Units from '../units/Units.js';
import Variables from '../variables/Variables.js';
import Users from '../users/Users.js';

const ALARMS = 1;
const CHARTS = 2;
const GROUPS = 3;
const MATRICES = 4;
const REPORTS = 5;
const UNITS = 6;
const VARIABLES = 7;
const CUSTOMVARIABLES = 8;
const USERS = 11;

class Configuration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],

      arrow_menu: true
    };
  }

  componentDidMount() {
    window.$('#mostrar_menu').sideNav('destroy');

    this.getNotifications();
  }

  /* Notificaciones */

  getNotifications() {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_EVENTS}/notifications?is_seen=false`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.setState({ notifications_: res.docs });

      } else if (response.status === constants.STATUS_ACCEPTED) {
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
    let xhr = window.$.ajax({
      url: `${constants.URL_SERVER_LOG_EVENTS}/notifications/${id}`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        console.log('Notificación Ok');

      } else if (response.status === constants.STATUS_ACCEPTED) {
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
        if (id === notification.id) {
          self.updateEventAsSeen(id);

          notifications.splice(i, 1);

          self.setState({ notifications_: notifications });
          return;
        }
      }
    };

    return fn;
  }

  /* Notificaciones */

  handleOpenModule(value) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let view = <Matrices />

      if (value === ALARMS) {
        view = <Alarms />;
      } else if (value === CHARTS) {
        view = <Charts />;
      } else if (value === GROUPS) {
        view = <Groups />;
      } else if (value === REPORTS) {
        view = <Reports />;
      } else if (value === UNITS) {
        view = <Units />;
      } else if (value === VARIABLES) {
        view = <Variables />;
      } else if (value === CUSTOMVARIABLES) {
        view = <CustomVariables />;
      } else if (value === USERS) {
        view = <Users />;
      }

      self.setState({ view: view });
    };

    return fn;
  }

  handleButtonMenu() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let arrow_menu = self.state.arrow_menu;
      self.setState({ arrow_menu: !arrow_menu });
    };

    return fn;
  }

  render() {
    let notifications = this.state.notifications_;

    let view = this.state.view;
    if (!view) {
      view = <Matrices />;
    }

    let menuClass = 'col s12 m3 sion-menu_alt_hide';
    let contentClass = 'col s12 m12';

    let arrow_menu = <i className="material-icons">arrow_forward</i>;
    if (this.state.arrow_menu) {
      arrow_menu = <i className="material-icons">arrow_back</i>;

      menuClass = 'col s12 m3 menu_alt';
      contentClass = 'col s12 m9 menu_body';
    }

    let o = false;

    return (
      <div>
        <Header o={o} module={constants.CONFIGURATION_MODULE}
          notifications={notifications}
          onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">
          <div className="settings">

            <div className="row">
              <div className="col s12 m12">
                <a id="ocultar_menu" className="btn-floating ttx_btn" href="#menu" onClick={this.handleButtonMenu()}>
                  {arrow_menu}
                </a>
              </div>
            </div>

            <div class="row">
              <div class="col s12 m12">

                <div className={menuClass}>
                  <div>
                    <h5>Configuración </h5>
                    <ul className="tabs">
                      <li className="tab">
                        <a href="#users" onClick={this.handleOpenModule(USERS)}>- Usuarios</a>
                      </li>
                      <li className="tab">
                        <a href="#alarms" onClick={this.handleOpenModule(ALARMS)}>- Alarmas</a>
                      </li>
                      <li className="tab">
                        <a href="#charts" onClick={this.handleOpenModule(CHARTS)}>- Graficas</a>
                      </li>
                      <li className="tab">
                        <a href="#groups" onClick={this.handleOpenModule(GROUPS)}>- Grupos</a>
                      </li>
                      <li className="tab">
                        <a href="#matrices" onClick={this.handleOpenModule(MATRICES)}>- Matrices</a>
                      </li>
                      <li className="tab">
                        <a href="#reports" onClick={this.handleOpenModule(REPORTS)}>- Reportes</a>
                      </li>
                      <li className="tab">
                        <a href="#units" onClick={this.handleOpenModule(UNITS)}>- Unidades</a>
                      </li>
                      <li className="tab">
                        <a href="#variables" onClick={this.handleOpenModule(VARIABLES)}>- Variables</a>
                      </li>
                      <li className="tab">
                        <a href="#custom_variables" onClick={this.handleOpenModule(CUSTOMVARIABLES)}>- Variables Personalizadas</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={contentClass}>
                  <div>
                    {view}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </section>

      </div>
    );
  }
}

export default Configuration;
