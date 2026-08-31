import { h, render, Component } from 'preact';
import { isString, isNaN } from 'underscore';
import { parallel } from 'async';

import constants from './../../constants.js';

class SearchForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      variables: [],
      variables_: [],


      created_at_date: '',
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
        Materialize.toast(err, 2500);;
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

      if (variables_.length > 0) self.setState({ variables_: variables_ });
      this.initializePickers();
    });    
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

    let created_at_date_to = this.state.created_at_date_to;
    if (!created_at_date_to) created_at_date_to = '';

    $('#content-created-at-date-of-chart').html('');
    $('#content-created-at-date-of-chart').append(`<input type="text" id="input-created-at-date-of-chart" class="datepicker" placeholder="De: "  value="${created_at_date_of}" />`);

    $('#content-created-at-date-to-chart').html('');
    $('#content-created-at-date-to-chart').append(`<input type="text" id="input-created-at-date-to-chart" class="datepicker" placeholder="Hasta: "  value="${created_at_date_to}" />`);

    $('#input-created-at-date-of-chart').on('change', (evt) => {
      self.state.created_at_date_of = evt.target.value;
    });

    $('#input-created-at-date-to-chart').on('change', (evt) => {
      self.state.created_at_date_to = evt.target.value;
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

  handleChangeVariable() {
    let self = this;

    let fn = (evt) => {
      let keyInput = `#input-variable`;

      let variablesIn = self.state.variables;
      let size = variablesIn.length;
      if (size >= 15) {
        return;
      }

      let value = evt.target.value;
      if (value === '') return;

      let values = value.split('_');

      let is_custom = values[0] === 'cv';
      let id = parseInt(values[1]);

      let variables = self.state.variables_;
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id === id) {
          if (variable.is_custom === is_custom) {
            if (!variable.in_variables) {
              variables[i].in_variables = true;

              variablesIn.push(variable);

              self.setState({ variables: variablesIn, variables_: variables }, () => {
                $(keyInput).val('');
                self.initializePickers();
              });
            }
          }

          break;
        }
      }
    };

    return fn;
  }

  handleSearch() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onSearch;
      if (f) {

        let variablesOut = [];

        let variables = self.state.variables;
        for (let i = 0; i < variables.length; i++) {
          const variable = variables[i];
          let o = {
            id: variable.id,
            is_custom: variable.is_custom
          };

          variablesOut.push(o);
        }

        if (variablesOut.length === 0) return;

        let inputSearchAtDateOf = document.querySelector('#input-created-at-date-of-chart');
        let inputSearchAtTimeOf = document.querySelector('#content-created-at-time-of-chart');

        let inputSearchAtDateTo = document.querySelector('#input-created-at-date-to-chart');
        let inputSearchAtTimeTo = document.querySelector('#content-created-at-time-to-chart');

        let dateOf = inputSearchAtDateOf.value.trim();
        let timeOf = inputSearchAtTimeOf.value.trim();

        let dateTo = inputSearchAtDateTo.value.trim();
        let timeTo = inputSearchAtTimeTo.value.trim();

        dateOf = self.parseDate(dateOf);
        dateTo = self.parseDate(dateTo);

        let start_date = false;
        let final_date = false;

        if (dateOf !== '' && dateTo !== '') {

          start_date = `${dateOf} ${timeOf}:00`;
          final_date = `${dateTo} ${timeTo}:00`;

          let json = {
            variables: variablesOut,
            start_date: start_date,
            final_date: final_date,
            is_table: true,
          };

          f(json);
        }
      }
    };

    return fn;
  }

  handleRemoveItem(index) {
    let self = this;

    let fn = (evt) => {
      let keyInput = `#input-variable`;
      let variables = self.state.variables;

      let v = variables[index];
      if (v) {
        let variables_ = self.state.variables_;
        for (let i = 0; i < variables_.length; i++) {
          let variable = variables_[i];
          if (variable.id === v.id) {
            variables_[i].in_variables = false;
            variables.splice(index, 1);
            break;
          }
        }

        self.setState({ variables: variables, variables_: variables_ }, () => {
          $(keyInput).val('');
        });
      }

    };

    return fn;
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

  createItemVariable() {
    let self = this;

    let fn = (item, index) => {
      return (
        <div className="sion-chip" key={index}>
          {item.device}.{item.name}
          <i className="close material-icons" onClick={self.handleRemoveItem(index)}>close</i>
        </div>
      );
    };

    return fn;
  }

  render(props, state) {
    return (
      <form className="formulario" onSubmit={this.handleSearch()}>
        <div className="all_notes">
          <div className="variable">

            <div className="col s12">
              <div className="tools_vars">
                <div className="variable">
                  <label style="line-height: 5px;">Tipo de Variable</label>
                  <select className="browser-default sion-select" id="input-variable" onChange={this.handleChangeVariable()}>
                    <option value="" disabled selected>Variables</option>
                    {state.variables_.map(this.createOptVariable())}
                  </select>
                </div>
                <div className="chips_var">
                  {state.variables.map(this.createItemVariable())}
                </div>
              </div>
            </div>

            <div className="col m12">
              <div id="content-created-at-date-of-chart" className="dates col s6 m6"></div>
              <div className="dates col s6 m6">
                <input id="content-created-at-time-of-chart" placeholder="Hora" type="text" className="timepicker" />
              </div>
            </div>
            <div className="col m12">
              <div id="content-created-at-date-to-chart" className="dates col s6 m6"></div>
              <div className="dates col s6 m6">
                <input id="content-created-at-time-to-chart" placeholder="Hora" type="text" className="timepicker" />
              </div>
            </div>
            <div className="row">
              <div className="col m12">
                <button type="submit" className="btn red">
                  <i className="material-icons prefix left">search</i>
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;