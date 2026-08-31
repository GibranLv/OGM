import { h, render, Component } from 'preact';
import { w3cwebsocket } from 'websocket';
import { isNumber, isArray } from 'underscore';

import Header from './../header.jsx';
import constants from './../constants.js';

const wsURL = `ws://${URLWS}/ws`;

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],

      matrices_: [],
      markers_: [],
      structure: [],
      matrix: false,
    };
  }

  componentDidMount() {
    $('.collapsible').collapsible();

    window.initMap = this.initMap();

    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ7lfWMFuJfAp7eXWVYJMZ69t4tX8-ZU8&callback=initMap')

    //this.serviceWS();

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

  handleCloseMenuLateral() {
    let self = this;

    let fn = (evt) => {
      $('.button-collapse').sideNav('hide');
    };

    return fn;
  }

  serviceWS() {
    let self = this;

    this.ws = new w3cwebsocket(wsURL, constants.TTX_PROTOCOOL);

    this.ws.onerror = () => {
      console.log('WebSocket: connection Error');
    };

    this.ws.onopen = (evt) => {
      console.log('WebSocket connected');

      self.getContent();
    };

    this.ws.onclose = (evt) => {
      console.log('WebSocket closed');

      setTimeout(() => {
        self.serviceWS();
      }, 1000);
    }

    this.ws.onmessage = (evt) => {
      let s = evt.data;
      try {
        let o = JSON.parse(s);
        if (o.err) {
          return;
        }

        if (o.evt == constants.EVENT_UDAPTE_VARIABLES_VALUE) {

        } else if (o.evt == constants.EVENT_UPDATE_VARIABLE_COMMENT) {

        }

      } catch (e) {
        console.log('WebSocket.ERROR: JSON.parse', s);
      }
    }
  }

  getMatrices() {
    let self = this;

    let url = `${constants.URL_SERVER_MATRICES}/list?user_id=self&with_structure=true&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ matrices_: res.docs }, () => {
          $('select').material_select();

          if (self.state.matrices_.length > 0) {
            let position = 0;

            if (window.MatrixID > 0) {
              let matrices = self.state.matrices_;
              for (let i = 0; i < matrices.length; i++) {
                const matrix = matrices[i];
                if (matrix.id == window.MatrixID) {
                  position = i;
                  break;
                }
              }
            }

            let m = self.state.matrices_[position];
            let s = m.structure;

            self.setState({ matrix: m, structure: s }, () => {
              self.addMarkers();
            });
          }

        });

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


  /* Header: Ubicación */
  handleRestoreMatrix() {
    let self = this;

    let fn = (evt) => {
      let m = self.state.matrix;
      if (m) {
        if (!m.structure) m.structure = [];

        let structure = m.structure;

        self.setState({ structure: structure }, () => {
          self.removeMarkers();
          self.addMarkers();
        });
      }
    }

    return fn;
  }

  handleItemGroup() {
    let self = this;

    let fn = (s) => {
      self.setState({ structure: s }, () => {
        self.removeMarkers();
        self.addMarkers();
      });
    };

    return fn;
  }

  handleChangeMatrix(value) {
    let self = this;

    let fn = (m, s) => {
      self.setState({ matrix: m, structure: s }, () => {
        self.removeMarkers();
        self.addMarkers();
      });
    };

    return fn;
  }

  /* Header: Ubicación */


  initMap() {
    let self = this;

    let fn = () => {
      self.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 17.9964399, lng: -92.9977579 },
        zoom: 4
      });

      self.getMatrices();
    };

    return fn;
  }

  addMarkers(sIn) {
    let self = this;

    let structure = sIn;
    if (!sIn) structure = self.state.structure

    if (!isArray(structure)) return

    let size = structure.length;
    let bounds = new google.maps.LatLngBounds();

    let insertMarkers = 0;

    for (let i = 0; i < size; i++) {
      const s = structure[i];
      if (s) {
        let latitude = s.latitude;
        let longitude = s.longitude;

        let isNumbers = isNumber(latitude) && isNumber(longitude);
        let isZero = latitude == 0 && longitude == 0;

        if (isNumbers && !isZero) {
          let latLng = { lat: latitude, lng: longitude };

          let marker = new google.maps.Marker({
            map: self.map,
            label: s.name,
            position: latLng
          });

          if (s.marker_icon) {
            let image = `/static/images/groups/${s.marker_icon}`;
            marker.setIcon(image);
          }

          marker.addListener('click', function () {
            let variables = s.variables

            if (variables) {
              if (variables.length) {
                let matrix = self.state.matrix;
                if (matrix) {
                  let matrix_id = matrix.id;
                  let group_id = s.id;

                  location.href = `/dynamic_graphics/${matrix_id}/${group_id}`
                }
              }
            }

            let sons = s.sons;
            if (sons) {
              if (sons.length > 0) {
                self.removeMarkers();

                self.addMarkers(s.sons);
              }
            }

          });

          bounds.extend(marker.getPosition());
          this.state.markers_.push(marker);

          insertMarkers = insertMarkers + 1;
        }
      }
    }

    if (insertMarkers > 0) this.setCenterInMap(bounds);
  }

  removeMarkers() {
    let markers = this.state.markers_;
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        marker.setMap(null);
      }

      this.state.markers_ = [];
    }
  }

  setCenterInMap(bounds) {
    if (this.map) {
      this.map.fitBounds(bounds);
      this.map.setZoom(10);
    }
  }

  render(props, state) {
    let notifications = state.notifications_;

    let s = state.structure;
    let matrix = state.matrix;

    if (!matrix) {
      matrix = { id: 0, name: false, structure: [] };
    }

    let o = {
      matrix: matrix,
      matrices_: state.matrices_,
    };

    return (
      <div>
        <Header o={o} module={constants.LOCATION_MODULE}
                notifications={notifications}
                onRestoreMatrix={this.handleRestoreMatrix()}
                onItemGroup={this.handleItemGroup()}
                onChangeMatrix={this.handleChangeMatrix()}
                onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">
          <div className="row">
            <div className="settings">
              {state.view}
              <div hidden={state.view} id="map" style="height:500px; width:100%;"></div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

render(<Content />, document.getElementById('content-main'));
