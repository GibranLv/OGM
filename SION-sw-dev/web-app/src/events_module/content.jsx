import { h, render, Component } from 'preact';

import Header from './../header.jsx';
import constants from './../constants.js';

import Alarm from './alarm/content.jsx';
import General from './general/content.jsx';
import Chart from './chart/content.jsx';

class EventsModule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],
    };
  }

  componentDidMount() {
    this.getNotifications();

    $('ul.tabs').tabs_materialize();
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
        Materialize.toast(res.message, 2500);
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
        Materialize.toast(res.message, 2500);
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

  render(props, state) {
    let notifications = state.notifications_;

    return (
      <div>
        <Header module={constants.EVENTS_MODULE}
          notifications={notifications}
          onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">

          <div className="row">
            <div className="settings">
              <div className="container">

                <h4>Eventos</h4>

                <div className="col m12">
                  <ul className="tabs" id="sion-events-panel">
                  <li className="tab col s2"><a className="active" href="#alarms">Alarmas</a></li>
                    <li className="tab col s2"><a href="#events">Generales</a></li>
                    <li className="tab col s2"><a href="#chart-events">Gráficas</a></li>
                  </ul>
                </div>

                <div className="col m12 content-panel">

                <div id="alarms" className="col s12">
                    <Alarm />
                  </div>

                  <div id="events" className="col s12">
                    <General />
                  </div>

                  <div id="chart-events" className="col s12">
                    <Chart />
                  </div>

                </div>

              </div>
            </div>
          </div>

        </section>

        <div className="background"></div>
      </div>
    );
  }
}

export default EventsModule