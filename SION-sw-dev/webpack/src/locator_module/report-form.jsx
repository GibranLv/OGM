import { h, render, Component } from 'preact';
import { isString } from 'underscore';

import constants from './../constants.js';

class ReportForm extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15,
      format: 'dd-mm-yyyy',
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: true,
      monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
      weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    });

    $('.timepicker').pickatime({
      default: 'now',
      fromnow: 0,
      twelvehour: false,
      donetext: 'OK',
      cleartext: 'Limpiar',
      canceltext: 'Cancelar',
      autoclose: false,
      ampmclickable: true
    });

    $('select').material_select();

    this.initMap();
  }

  initMap() {
    let self = this;

    self.map = new google.maps.Map(document.getElementById('preview-map'), {
      center: { lat: 17.9964399, lng: -92.9977579 },
      zoom: 16
    });
  }  

  getPointsOfVehicle(json) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_VEHICLES}/points`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.insertPointsInMap(null, res.docs);
      } else if (response.status == constants.STATUS_ACCEPTED) {
        self.insertPointsInMap(res.message);
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

  handleCancel() {
    let self = this;

    let fn = () => {
      self.props.onCancel();
    };

    return fn;
  }

  handleGetReport() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let vehicle = self.props.vehicle;
      if (!vehicle) {
        let message = 'No se pudo obtener la información del vehiculo';
        alert(message);
        return;
      }

      let inputDateOf = document.querySelector('#input-date-of');
      let inputTimeOf = document.querySelector('#input-time-of');
      let inputDateTo = document.querySelector('#input-date-to');
      let inputTimeTo = document.querySelector('#input-time-to');
      let inputSpeed = document.querySelector('#input-speed');

      let dateOf = inputDateOf.value.trim();
      let timeOf = inputTimeOf.value.trim();
      let dateTo = inputDateTo.value.trim();
      let timeTo = inputTimeTo.value.trim();
      let speed = inputSpeed.value.trim();

      if (dateOf == '') {
        let message = 'Fecha de, campo requerido';
        alert(message);
        return;
      }

      if (dateTo == '') {
        let message = 'A, campo requerido';
        alert(message);
        return;
      }

      if (timeOf == '') {
        let message = 'Hora de, campo requerido';
        alert(message);
        return;
      }

      if (timeTo == '') {
        let message = 'Hora de, campo requerido';
        alert(message);
        return;
      }

      speed = parseInt(speed);

      dateOf = self.parseDate(dateOf);
      dateTo = self.parseDate(dateTo);

      let json = {
        start_date: `${dateOf} ${timeOf}:00`,
        final_date: `${dateTo} ${timeTo}:00`,
        speed: speed,
        vehicle_id: vehicle.id
      };

      let srcMap = $('#static-map').attr('src');
      if (srcMap) {
        let canvas = document.getElementById('canvas-static-map');
        let context = canvas.getContext('2d');

        let img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = srcMap

        img.onload = () => {
          context.drawImage(img, 0, 0);
          let dataURL = canvas.toDataURL("image/jpeg", 1);
          json.image = dataURL;

          // ENVIAR PKG POR CLIENTE WS
          self.props.onGetReport(json);
        };
      }      
    };

    return fn;
  }

  handleGetPoints() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let vehicle = self.props.vehicle;
      if (!vehicle) {
        let message = 'No se pudo obtener la información del vehiculo';
        alert(message);
        return;
      }      

      let inputDateOf = document.querySelector('#input-date-of');
      let inputTimeOf = document.querySelector('#input-time-of');
      let inputDateTo = document.querySelector('#input-date-to');
      let inputTimeTo = document.querySelector('#input-time-to');
      let inputSpeed = document.querySelector('#input-speed');

      let dateOf = inputDateOf.value.trim();
      let timeOf = inputTimeOf.value.trim();
      let dateTo = inputDateTo.value.trim();
      let timeTo = inputTimeTo.value.trim();
      let speed = inputSpeed.value.trim();

      if (dateOf == '') {
        let message = 'Fecha de, campo requerido';
        alert(message);
        return;
      }

      if (dateTo == '') {
        let message = 'A, campo requerido';
        alert(message);
        return;
      }

      if (timeOf == '') {
        let message = 'Hora de, campo requerido';
        alert(message);
        return;
      }

      if (timeTo == '') {
        let message = 'Hora de, campo requerido';
        alert(message);
        return;
      }

      speed = parseInt(speed);

      dateOf = self.parseDate(dateOf);
      dateTo = self.parseDate(dateTo);

      let o = {
        start_date: `${dateOf} ${timeOf}:00`,
        final_date: `${dateTo} ${timeTo}:00`,
        speed: speed,
        vehicle_id: vehicle.id
      };

      self.getPointsOfVehicle(o);
    };

    return fn;
  }

  handleGetImage() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      if (self.map) {
        let zoom = self.map.getZoom();
        let center = self.map.getCenter();

        let width = $('#preview-map').width();
        if (!width) {
          width = 600;
        }

        let urlMap = `https://maps.googleapis.com/maps/api/staticmap?size=${width}x300&maptype=roadmap`;

        if (!self.flightPaths) {
          self.flightPaths = [];
        }

        let size = self.flightPaths.length;
        for (let i = 0; i < size; i++) {
          const flightPath = self.flightPaths[i];
          let pathOut = flightPath.getPath();
          let points = pathOut.getArray();

          for (let j = 0; j < points.length; j++) {
            const p = points[j];
            
            if (j == 0) {
              urlMap = urlMap + '&markers=color:green%7Clabel:' + 'I' + '%7C' + p.lat() + ',' + p.lng();
            }

            if (j == (points.length - 1)) {
              urlMap = urlMap + '&markers=color:red%7Clabel:' + 'F' + '%7C' + p.lat() + ',' + p.lng();
            }
          }

          urlMap = urlMap + '&path=color:0x0000ff|weight:5';
          for (let j = 0; j < points.length; j++) {
            const p = points[j];
            urlMap = urlMap + '|' + p.lat() + ',' + p.lng();
          }

          urlMap = urlMap + '&zoom=' + zoom;
          urlMap = urlMap + '&center=' + center.lat() + ',' + center.lng() + '&key=AIzaSyDQ7lfWMFuJfAp7eXWVYJMZ69t4tX8-ZU8';
        }

        $('#static-map').show();
        $('#static-map').attr('src', urlMap);
      }
    };

    return fn;
  }

  insertPointsInMap(err, points) {
    if (err) {
      alert(err);
      return;
    }

    if (this.map) {
      if (this.flightPaths) {
        for (let i = 0; i < this.flightPaths.length; i++) {
          this.flightPaths[i].setMap(null);
          this.flightPaths.splice(i, 1);
        }
      }

      let flightPlanCoordinates = [];

      let size = points.length;

      let bounds = false;
      if (size >= 2) {
        bounds = new google.maps.LatLngBounds();
      }

      for (let i = 0; i < size; i++) {
        const point = points[i];

        let latLng = new google.maps.LatLng(point.latitude, point.longitude);
        flightPlanCoordinates.push(latLng);
        bounds.extend(latLng);
      }

      let flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      if (this.map) {
        flightPath.setMap(this.map);
        
        if (bounds) {        
          this.map.fitBounds(bounds);
        }
      }

      if (!this.flightPaths) {
        this.flightPaths = [];
      }
      
      this.flightPaths.push(flightPath);
    }
  }

  parseDate(s) {
    if (s) {
      if (isString(s)) {
        let elements = s.split('-');
        elements = elements.reverse();

        let value = '';
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (i == 0) {
            value = `${element}`;
          } else {
            value = `${value}-${element}`;
          }
        }

        return value;
      }
    }

    return s;
  }  

  render(props, state) {
    return (
      <div className="row">
        <div className="col s2"></div>
        <div className="col s8">
          
          <div className="col s12" style="text-align: center;">
            <h5>Reporte de Vehiculo: {props.vehicle.alias}</h5>
          </div>

          <form className="formulario" onSubmit={this.handleGetReport()}>

            <div className="col s12">
              <div className="input-field col s6">
                <label htmlFor="input-date-of">Fecha de</label>
                <input type="date" id="input-date-of" className="datepicker" />
              </div>
            
              <div className="input-field col s6">
                <label htmlFor="input-time-of">Hora de</label>
                <input type="text" id="input-time-of" className="timepicker" style="border-bottom: 1px solid #9e9e9e;"/>
              </div>
            </div>

            <div className="col s12">
              <div className="input-field col s6">
                <label htmlFor="input-date-to">A</label>
                <input type="date" id="input-date-to" className="datepicker" />
              </div>

              <div className="input-field col s6">
                <label htmlFor="input-time-to">Hora de</label>
                <input type="text" id="input-time-to" className="timepicker" style="border-bottom: 1px solid #9e9e9e;"/>
              </div>
            </div>

            <div className="col s12">
              <div className="col s6">
                <select className="browser-default sion-select" id="input-speed">
                  <option value="1">Incluir velocidad mayor a 0 km/h</option>
                  <option value="2">Incluir velocidad de 0 km/h</option>
                </select>
              </div>

              <div className="input-field col s6">
                <button type="button" className="btn waves-effect blue" onClick={this.handleGetPoints()}>
                  <i className="material-icons" style="line-height: 38px;">timeline</i>
                </button>
                <button type="button" className="btn waves-effect blue" onClick={this.handleGetImage()}>
                  <i className="material-icons" style="line-height: 38px;">image</i>
                </button>
              </div>
            </div>
            
            <div className="col s12">
              <div className="input-field">
                <div className="col s12">
                  <a id="link-report" className="waves-effect waves-light blue btn" href="#">
                    Descargar
                  <i className="material-icons right">file_download</i>
                  </a>
                </div>              
              </div>
            </div>

            <div className="col s12">
              <img id="static-map" src="/static/images/logo_ogm.svg" alt="Imagen del recorrido" style="height:300px; width:100%; display: none;" />
              <div id="preview-map" style="height:300px; width:100%;"></div>
            </div>

            <div className="col s12">
              <button type="submit" className="btn red">Generar</button>
              <button type="button" className="modal-action modal-close btn grey darken-3" onClick={this.handleCancel()}>
                Cancelar
              </button>            
            </div>
          </form>
        </div>
        <div className="col s2"></div>
      </div>
    );
  }
}

export default ReportForm;

/*
<select id="input-c-zoom">
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  <option value="11">11</option>
  <option value="12">12</option>
  <option value="13">13</option>
  <option value="14">14</option>
  <option value="15">15</option>
  <option value="16">16</option>
</select>
*/