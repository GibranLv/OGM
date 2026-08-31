import { h, render, Component } from 'preact';

import Header from './../header.jsx';
import constants from './../constants.js';

import ContentAlarms from './../alarms/content.jsx';
import ContentCharts from './../charts/content.jsx';
import ContentCustomVariables from './../custom_variables/content.jsx';
import ContentGPSDevices from './../gps_devices/content.jsx';
import ContentGroups from './../groups/content.jsx';
import ContentMatrices from './../matrices/content.jsx';
import ContentReports from './../reports/content.jsx';
import ContentUnits from './../units/content.jsx';
import ContentVariables from './../variables/content.jsx';
import ContentVehicles from './../vehicles/content.jsx';
import ContentUsers from './../users/content.jsx';

const ALARMS = 1;
const CHARTS = 2;
const GROUPS = 3;
const MATRICES = 4;
const REPORTS = 5;
const UNITS = 6;
const VARIABLES = 7;
const CUSTOMVARIABLES = 8;
const VEHICLES = 9;
const GPSDEVICES = 10;
const USERS = 11;

class ConfigurationContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],

      arrow_menu: true
    };
  }

  componentDidMount() {
    $('#mostrar_menu').sideNav('destroy');

    this.getNotifications();
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
        self.setState({ notifications_: res.docs });

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

      let view = <ContentMatrices />

      if (value == ALARMS) {
        view = <ContentAlarms />;
      } else if (value == CHARTS) {
        view = <ContentCharts />;
      } else if (value == GROUPS) {
        view = <ContentGroups />;
      } else if (value == REPORTS) {
        view = <ContentReports />;
      } else if (value == UNITS) {
        view = <ContentUnits />;
      } else if (value == VARIABLES) {
        view = <ContentVariables />;
      } else if (value == CUSTOMVARIABLES) {
        view = <ContentCustomVariables />;
      } else if (value == VEHICLES) {
        view = <ContentVehicles />;
      } else if (value == GPSDEVICES) {
        view = <ContentGPSDevices />;
      } else if (value == USERS) {
        view = <ContentUsers />;
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

  render(props, state) {
    let notifications = state.notifications_;

    let view = state.view;
    if (!view) {
      view = <ContentMatrices />;
    }

    let menuClass = 'col s12 m3 sion-menu_alt_hide';
    let contentClass = 'col s12 m12';

    let arrow_menu = <i className="material-icons">arrow_forward</i>;
    if (state.arrow_menu) {
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
                <a id="ocultar_menu" className="btn-floating ttx_btn" href="#" onClick={this.handleButtonMenu()}>
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
                        <a href="#" onClick={this.handleOpenModule(USERS)}>- Usuarios</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(ALARMS)}>- Alarmas</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(CHARTS)}>- Graficas</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(GROUPS)}>- Grupos</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(MATRICES)}>- Matrices</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(REPORTS)}>- Reportes</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(UNITS)}>- Unidades</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(VARIABLES)}>- Variables</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(CUSTOMVARIABLES)}>- Variables Personalizadas</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(VEHICLES)}>- Vehículos</a>
                      </li>
                      <li className="tab">
                        <a href="#" onClick={this.handleOpenModule(GPSDEVICES)}>- Dispositivos GPS</a>
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

render(<ConfigurationContent />, document.getElementById('content-main'));
