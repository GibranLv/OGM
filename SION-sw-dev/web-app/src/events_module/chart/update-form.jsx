import { h, render, Component } from 'preact';
import { parallel } from 'async';
import { isArray, isDate, isNumber, isString } from 'underscore';

import constants from './../../constants.js';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      variables_: [],
      created_at_date_of: '',

      files: [],
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
    }, (err, res) => {
      if (err) {
        Materialize.toast(err, 2500);
        return;
      }

      let variables = [];
      let custom_variables = [];
      let variables_ = [];

      if (res.variables) variables = res.variables;
      if (res.custom_variables) custom_variables = res.custom_variables;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];

        let o = {
          id: variable.id,
          name: variable.name,
          device: variable.device,
          is_custom: false,
          in_variables: false,
        };

        variables_.push(o);
      }

      for (let i = 0; i < custom_variables.length; i++) {
        const variable = custom_variables[i];

        let o = {
          id: variable.id,
          name: variable.name,
          device: variable.device,
          is_custom: true,
          in_variables: false,
        };

        variables_.push(o);
      }

      if (variables_.length > 0) self.setState({ variables_: variables_ }, () => {

        let o = self.props.item;

        let inputName = document.querySelector('#input-ce-name');
        let inputDescription = document.querySelector('#input-ce-description');
        let inputVariable = document.querySelector('#input-ce-variable');

        if (inputName) {
          if (o.name) inputName.value = o.name;
        }

        if (inputDescription) {
          if (o.description) inputDescription.value = o.description;
        }

        if (inputVariable) {
          if (o.variable_id) {
            if (isNumber(o.variable_id)) {
              let prefix = '';
              if (o.is_custom) {
                prefix = 'c';
              }

              inputVariable.value = `${prefix}v_${o.variable_id}`;
            }
          }
        }

        let filesIn = o.files;
        if (!filesIn) filesIn = [];

        self.setState({ files: filesIn });

        /*if (o.created_at) {
          let created_at = new Date(o.created_at);
          if (isDate(created_at)) {
            let s = self.getDateToString(created_at);

            let chunks = s.split(' ');
            if (chunks.length == 2) {
              let dateString = self.parseDate(chunks[0]);
              let timeString = self.parseTime(chunks[1]);

              let inputDate = document.querySelector('#input-ce-date-created-at');
              let inputTime = document.querySelector('#input-ce-time-created-at');

              if (inputDate) inputDate.value = dateString;
              if (inputTime) inputTime.value = timeString;
            } 
          }
        }

        self.initializePickers();*/
      });

    }); 
  }

  handleChangeFile() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let filesIn = self.state.files;
      if (!isArray(filesIn)) filesIn = [];

      let files = evt.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        for (let j = 0; j < filesIn.length; j++) {
          const fileIn = filesIn[j]; 
          if (fileIn.alias === file.name) {
            let message = `El archivo ${file.name} sera reemplazado`;
            Materialize.toast(message, 2500);
          }
        }

        filesIn.push(file);
      }

      self.setState({ files: filesIn });
    };

    return fn;
  }

  handleRemoveFile(index) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let files = self.state.files;
      files.splice(index, 1);

      self.setState({ files: files });
    };

    return fn;
  }  

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = self.props.item;
      if (!o) return;

      let id = o.id;
      if (!isNumber(id)) return;

      let inputName = document.querySelector('#input-ce-name');
      let inputDescription = document.querySelector('#input-ce-description');
      let inputVariable = document.querySelector('#input-ce-variable');
      /*let inputDate = document.querySelector('#input-ce-date-created-at');
      let inputTime = document.querySelector('#input-ce-time-created-at');*/

      let json = {
        files: []
      };

      if (inputName) json.name = inputName.value.trim();
      if (inputDescription) json.description = inputDescription.value.trim();
      
      /*let date = inputDate.value.trim();
      let time = inputTime.value.trim();

      let created_at = `${date} ${time}:00`;
      let d = new Date(created_at);
      if (!isDate(d)) {
        let message = 'La fecha es invalida';
        Materialize.toast(message, 2500);
      }

      json.created_at = created_at;*/

      let variable = inputVariable.value.trim();
      let chunks = variable.split('_');
      if (chunks.length == 2) {
        let variable_id = chunks[1];
        variable_id = parseInt(variable_id);

        if (isNumber(variable_id)) json.variable_id = variable_id;
        if (chunks[0] == 'cv') json.is_custom = true;
      }
      
      let formData = new FormData();
      
      let files = self.state.files;
      let size = files.length;
      for (let i = 0; i < size; i++) {
        const file = files[i];
        if (file.size) {
          let key = `file_${i + 1}`;
          formData.append(key, file);
          
        } else {
          json.files.push(file);
        }
      }

      formData.append('size', size);
      formData.append('json', JSON.stringify(json));


      self.props.onUpdate(formData, id);
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = (evt) => {
      self.props.onCancel();
    }

    return fn;
  }

  getHash() {
    let key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 4; i++)
      key += possible.charAt(window.Math.floor(window.Math.random() * possible.length));

    return key;
  }

  getDateToString(date) {
    let str = 'N/A';

    if (isDate(date) || isNumber(date)) {
      date = new Date(date);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      let hour = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      if (hour < 10) {
        hour = `0${hour}`;
      }

      if (min < 10) {
        min = `0${min}`;
      }

      if (sec < 10) {
        sec = `0${sec}`;
      }

      str = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    return str
  }

  parseDate(s) {
    if (s) {
      if (isString(s)) {
        let elements = s.split('-');
        elements = elements.reverse();

        let value = '';
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (i === 0) {
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

  parseTime(s) {
    if (s) {
      if (isString(s)) {
        let elements = s.split(':');
        if (elements.length === 3) {
          let hours = elements[0];
          let minutes = elements[1];
          let value = `${hours}:${minutes}`;

          return value;
        }
      }
    }

    return s;
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
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        fn(json.message);
      } else {
        fn(constants.MESSAGE_ERROR);
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
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        fn(json.message);
      } else {
        fn(constants.MESSAGE_ERROR);
      }
    });
  }

  initializePickers() {
    let self = this;

    let created_at_date_of = this.state.created_at_date_of;
    if (!created_at_date_of) created_at_date_of = '';

    $('#input-ce-date-created-at').on('change', (evt) => {
      self.state.created_at_date_of = evt.target.value;
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

    $('.datepicker').pickadate({
      selectMonths: false,
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
  }  

  createOptVariable() {
    let self = this;

    let fn = (item, index) => {
      let pre = 'v';
      if (item.is_custom) pre = 'cv';

      let value = `${pre}_${item.id}`;

      return (
        <option key={index} value={value} disabled={item.in_variables}>
          {item.device}.{item.name}
        </option>
      );
    };

    return fn;
  }

  createItemFile() {
    let self = this;

    let fn = (item, index) => {
      let name = item.alias;
      
      if (!name) name = item.name;
      if (!name) name = '¿?';

      if (name.length > 43) {
        name = name.substring(0, 44);
        name = `${name}...`;
      }

      return (
        <div className="sion-chip" key={index}>
          {name}
          <i className="close material-icons" onClick={self.handleRemoveFile(index)}>
            close
          </i>
        </div>
      );
    };

    return fn;
  }

  render() {
    return (
      <form className="formulario" onSubmit={this.handleUpdate()}>
        <div className="all_notes">
          <div className="variable">
            <div className="input-field col s12 m12">
              <input id="input-ce-name" type="text" className="validate" placeholder="Nombre" />
            </div>
            <div className="input-field col s12 m12">
              <input id="input-ce-description" type="text" className="validate" placeholder="Descripción" />
            </div>
            <div className="dates col s12 m12">
              <select className="browser-default sion-select" id="input-ce-variable" style="margin-bottom: 22px;">
                <option value="" disabled selected>Variables</option>
                {this.state.variables_.map(this.createOptVariable())}
              </select>              
            </div>


            <div className="file-field input-field col s12 m12" style="margin-bottom: 10px;">
              <div className="btn rojottx_btn" style="width: 20%;">
                <span>Subir</span>
                <input id="input-ce-file" type="file" multiple onChange={this.handleChangeFile()} />
              </div>
            </div>

            <div className="chips_var">
              {this.state.files.map(this.createItemFile())}
            </div>

            <button type="button" className="modal-action modal-close btn btn_ttx_error darken-3" 
                    onClick={this.handleBack()}>Cancelar</button>

            <button type="submit" className="btn btn_ttx_success">Aceptar</button>
          </div>
        </div>
      </form>
    );
  }
}

/*

  <div className="dates col s12 m6">
    <input id="input-ce-date-created-at" className="datepicker" placeholder="Fecha" />
  </div>
  <div className="dates col s12 m6">
    <input id="input-ce-time-created-at" className="timepicker" placeholder="Hora" />
  </div>

*/

export default UpdateForm;