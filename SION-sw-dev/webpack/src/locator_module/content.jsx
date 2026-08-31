import { h, render, Component } from 'preact';
import { w3cwebsocket } from 'websocket';

import Header from './../header.jsx';
import constants from './../constants.js';

import ReportForm from './report-form.jsx';

const wsURL = `ws://${URLWS}/ws`;

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],

      vehicles: [],
      markers_: [],

      view: false,
    };
  }

  componentDidMount() {
    $('.collapsible').collapsible();

    this.getVehicles();

    window.initMap = this.initMap();

    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ7lfWMFuJfAp7eXWVYJMZ69t4tX8-ZU8&callback=initMap')

    //this.serviceWS();

    this.getNotifications();
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
          console.log(o);
          return;
        }
      
        if (o.evt == constants.EVENT_UDAPTE_VEHICLE) {
          let content = o.content;
          if (content) {
            let vehicleId = content.vehicle_id;
            if (vehicleId) {
              let vehicles = self.state.vehicles;
              let size = vehicles.length;

              let contentTitle = false;

              for (let i = 0; i < size; i++) {
                const vehicle = vehicles[i];
                if (vehicle) {
                  if (vehicle.id === vehicleId) {
                    vehicles[i].latitude = content.latitude;
                    vehicles[i].longitude = content.longitude;
                    vehicles[i].timestamp = content.timestamp;
                    vehicles[i].speed = content.speed;

                    contentTitle = `
                      <div>
                        <div class="bodyContent">
                          <p>
                            <span class="bodyContentInfo">${vehicles[i].alias}</span>
                            <br/>
                            <span class="bodyContentInfo">${vehicles[i].speed}</span>
                            <br/>
                            <span class="bodyContentInfo">${vehicles[i].timestamp}</span>
                          </p>
                        </div>
                      </div>
                    `;

                    break;
                  }
                }
              }

              let markers = self.state.markers_;
              size = markers.length;

              for (let i = 0; i < size; i++) {
                const marker = markers[i];
                if (marker) {
                  let vehicle = marker.vehicle;
                  if (vehicle) {
                    if (vehicle.id == vehicleId) {
                      markers[i].vehicle.speed = speed;
                      markers[i].vehicle.timestamp = timestamp;

                      if (contentTitle) {
                        if (markers[i].infoWindow) {
                          markers[i].infoWindow.setContent(contentTitle);
                        }
                      }

                      markers[i].setPosition({ lat: content.latitude, lng: content.longitude });
                      break;
                    }
                  }
                }
              }
            }
          }
        }

      } catch (e) {
        console.log('WebSocket.ERROR: JSON.parse', s);
      }
    }
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

    xhr.fail((res, status, respose) => {
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

    xhr.fail((res, status, respose) => {
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

  getVehicles() {
    let self = this;

    let url = `${constants.URL_SERVER_VEHICLES}/list?user_id=self`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ vehicles: res.docs });
      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  updateVisibilityVehicle() {
    let self = this;

    let fn = (json, id) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_VEHICLES}/${id}/visibility`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          self.updateItem(null, res.doc);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);
        }
      });

      xhr.fail((res, status, respose) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  initMap() {
    let self = this;

    let fn = () => {
      self.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 17.9964399, lng: -92.9977579 },
        zoom: 10
      });

      self.addMarkers();
    };

    return fn;
  }

  addMarkers() {
    let self = this;

    let vehicles = this.state.vehicles;

    let bounds = false;
    let size = vehicles.length;
    if (size >= 2) {
      bounds = new google.maps.LatLngBounds();
    }

    for (let i = 0; i < size; i++) {
      const vehicle = vehicles[i];
      if (vehicle) {

        let latLng = { lat: vehicle.latitude, lng: vehicle.longitude };

        let visible = false;
        if (vehicle.visible) {
          visible = true;
        }

        let marker = new google.maps.Marker({
          map: self.map,
          position: latLng,
          visible: visible,
          icon: '/static/images/location/icon_ranger.png',
          title: vehicle.alias,
        });

        if (vehicle.marker_icon) {
          let marker_icon = vehicle.marker_icon;
          let image = `/static/images/vehicles/${marker_icon}`;
          marker.setIcon(image);
        }

        let contentTitle = `
          <div>
            <div class="bodyContent">
              <table>
                <tr>
                  <td>Vehiculo:</td>
                  <td>
                    <span class="bodyContentInfo">${vehicle.alias}</span>
                  </td>
                </tr>
                <tr>
                  <td>Velocidad: </td>
                  <td>
                    <span class="bodyContentInfo">${vehicle.speed} Km.</span>
                  </td>
                </tr>
                <tr>
                  <td>Hora: </td>
                  <td>
                    <span class="bodyContentInfo">${vehicle.timestamp}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        `;

        let infoWindow = new google.maps.InfoWindow({
          content: contentTitle
        });

        marker.addListener('click', function () {
          marker.infoWindow.open(self.map, marker);
        });

        if (bounds) {
          bounds.extend(marker.getPosition());
        }

        marker.infoWindow = infoWindow;
        marker.vehicle = vehicle;

        this.state.markers_.push(marker);
      }
    }

    if (bounds) {
      this.setCenterInMap(bounds);
    } else {
      this.map.setZoom(10);
    }
  }

  removeMarkers() {
    let markers_ = this.state.markers_;
    if (markers_) {
      for (let i = 0; i < markers_.length; i++) {
        const marker = markers_[i];
        marker.setMap(null);
      }

      this.state.markers_ = [];
    }
  }

  updateItem(err, o) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);
      return;
    }

    if (o.vehicle_id) {
      let vehicles = this.state.vehicles;
      for (let i = 0; i < vehicles.length; i++) {
        let vehicle = vehicles[i];
        if (o.vehicle_id == vehicle.id) {
          vehicles[i].visible = o.visible;
          break;
        }
      }

      this.setState({ vehicles: vehicles }, () => {
        self.removeMarkers();
        self.addMarkers();
      });
    }
  }

  setCenterInMap(bounds) {
    if (this.map) {
      this.map.fitBounds(bounds);
      this.map.setZoom(10);
    }
  }

  handleCancel() {
    let self = this;

    let fn = () => {
      self.setState({ view: false });
    };

    return fn;
  }

  handleGetReport() {
    let self = this;

    let fn = (json) => {
      if (self.ws) {
        let o = {
          evt: constants.EVENT_REQUEST_REPORT_LOCATOR,
          content: json
        };

        try {
          let s = JSON.stringify(o);
          self.ws.send(s);

          $('#static-map').hide();
          $('#static-map').attr('src', '/static/images/logo_ogm.svg');

        } catch(e) {
          let message = 'Ocurrió un error al solicitar el reporte';
          Materialize.toast(message, 2500);
        }
      }
    };

    return fn;
  }

  handleItemVehicle() {
    let self = this;

    let fn = (vehicle) => {
      
    };

    return fn;
  }

  handleItemVehicleReport() {
    let self = this;

    let fn = (vehicle) => {

    };

    return fn;
  }  

  handleItemVehicleReport() {
    let self = this;

    let fn = (vehicle) => {
      self.setState({ view: <ReportForm vehicle={vehicle} onGetReport={self.handleGetReport()} onCancel={self.handleCancel()} /> });
      $('.button-collapse').sideNav('hide');
    };

    return fn;
  }

  render(props, state) {
    let notifications = state.notifications_;

    let o = { vehicles: state.vehicles };

    return (
      <div>
        <Header o={o} module={constants.LOCATOR_MODULE}
                notifications={notifications}
                onItemVehicle={this.handleItemVehicle()}
                onItemVehicleReport={this.handleItemVehicleReport()}
                onUpdateVisibilityVehicle={this.updateVisibilityVehicle()}
                onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">
          <div className="row">
            <div className="settings">
              {state.view}
              <div hidden={state.view} id="map" style="height:500px; width:100%; z-index: 1"></div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

render(<Content />, document.getElementById('content-main'));
