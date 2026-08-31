import { h, render, Component } from 'preact';
import { isString } from 'underscore';

import constants from './../constants.js';
import { isArray } from 'util';

class SearchForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matrices_: [],
      groups_: [],

      created_at_date: '',
    };
  }

  componentDidMount() {
    this.getMatrices();
  }

  getMatrices() {
    let self = this;

    let url = `${constants.URL_SERVER_MATRICES}/list?with_structure=true&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.parseMatrices(res.docs);

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

  getGroups(s) {
    let groups = [];

    if (!isArray(s)) return groups;

    for (let i = 0; i < s.length; i++) {
      const g = s[i];
      let groups_ = [];

      if (g.sons) groups_ = this.getGroups(g.sons);

      let g_ = { id: g.id, name: g.name };
      if (g.variables) g_.variables = g.variables;

      groups.push(g_);

      if (groups_.length > 0) {
        for (let j = 0; j < groups_.length; j++) {
          const g_ = groups_[j];
          groups.push(g_);
        }
      }
    }

    return groups;
  }

  parseMatrices(matrices) {
    let self = this;

    let matricesOut = [];

    for (let i = 0; i < matrices.length; i++) {
      const matrix = matrices[i];
      if (matrix) {
        let o = {
          id: matrix.id,
          name: matrix.name
        };

        let structure = matrix.structure;
        let groups = this.getGroups(structure);

        o.groups = groups;

        matricesOut.push(o);
      }
    }

    this.setState({ matrices_: matricesOut }, () => {
      self.initializePickers();
    });
  }

  initializePickers() {
    let self = this;

    let created_at_date_of = this.state.created_at_date_of;
    if (!created_at_date_of) created_at_date_of = '';

    let created_at_date_to = this.state.created_at_date_to;
    if (!created_at_date_to) created_at_date_to = '';    

    $('#content-created-at-date-of').html('');
    $('#content-created-at-date-of').append(`<input type="text" id="input-created-at-date-of" class="datepicker" placeholder="De: "  value="${created_at_date_of}" />`);

    $('#content-created-at-date-to').html('');
    $('#content-created-at-date-to').append(`<input type="text" id="input-created-at-date-to" class="datepicker" placeholder="Hasta: "  value="${created_at_date_to}" />`);    

    $('#input-created-at-date-of').on('change', (evt) => {
      self.state.created_at_date_of = evt.target.value;
    });

    $('#input-created-at-date-to').on('change', (evt) => {
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

  handleSearch() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onSearch;
      if (f) {
        let inputMatrix = document.querySelector('#input-s-matrix');
        let inputGroup = document.querySelector('#input-s-group');

        let inputSearchdAtDateOf = document.querySelector('#input-created-at-date-of');
        let inputSearchdAtTimeOf = document.querySelector('#content-created-at-time-of');

        let inputSearchdAtDateTo = document.querySelector('#input-created-at-date-to');
        let inputSearchdAtTimeTo = document.querySelector('#content-created-at-time-to');        

        let dateOf = inputSearchdAtDateOf.value.trim();
        let timeOf = inputSearchdAtTimeOf.value.trim();

        let dateTo = inputSearchdAtDateTo.value.trim();
        let timeTo = inputSearchdAtTimeTo.value.trim();

        dateOf = self.parseDate(dateOf);
        dateTo = self.parseDate(dateTo);

        let start_date = false;
        let final_date = false;

        if (dateOf != '' && dateTo != '') {
          start_date = `${dateOf} ${timeOf}:00`;
          final_date = `${dateTo} ${timeTo}:00`;
        }

        let matrix_id = inputMatrix.value.trim();
        let group_id = inputGroup.value.trim();

        matrix_id = parseInt(matrix_id);
        group_id = parseInt(group_id);
      

        let json = {
          matrix_id: matrix_id,
          group_id: group_id,
          start_date: start_date,
          final_date: final_date,
        };

        f(json);
      }
    };

    return fn;
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let fn = self.props.openCreate;
      if (fn) fn();
    };

    return fn;
  }

  handleChangeMatrix() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      let id = parseInt(value);
      if (!id) {
        self.setState({ groups_: [] });
        return;
      }

      let matrices = self.state.matrices_;
      for (let i = 0; i < matrices.length; i++) {
        const matrix = matrices[i];
        if (matrix) {
          if (matrix.id == id) {
            let groups_ = matrix.groups;

            self.setState({ groups_: groups_ }, () => {
              self.initializePickers();
            });

            return;
          }
        }
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


  createOptMG() {
    let self = this;

    let fn = (item, index) => {
      let key = index + 1;

      return <option key={key} value={item.id}>{item.name}</option>
    };

    return fn;
  }

  render(props, state) {
    return (
      <form className="formulario" onSubmit={this.handleSearch()}>
        <div className="all_notes">
          <div className="variable">
            <div className="col m12">
              <select className="browser-default sion-select" id="input-s-matrix" onChange={this.handleChangeMatrix()}>
                <option>Matrices</option>
                {state.matrices_.map(this.createOptMG())}
              </select>
              <br />
            </div>
            <div className="col m12">
              <select className="browser-default sion-select" id="input-s-group">
                <option>Grupos</option>
                {state.groups_.map(this.createOptMG())}
              </select>
              <br />
            </div>
            <div className="col m12">
              <div id="content-created-at-date-of" className="dates col s6 m6"></div>
              <div className="dates col s6 m6">
                <input id="content-created-at-time-of" placeholder="Hora" type="text" className="timepicker" />
              </div>
            </div>
            <div className="col m12">
              <div id="content-created-at-date-to" className="dates col s6 m6"></div>
              <div className="dates col s6 m6">
                <input id="content-created-at-time-to" placeholder="Hora" type="text" className="timepicker" />
              </div>
            </div>            
            <div className="row">
              <div className="col m6">
                <button type="submit" className="btn red">
                  <i className="material-icons prefix left">search</i>
                  Buscar
                </button>
              </div>
              <div className="col m6">
                <button type="button" className="btn green" onClick={this.handleCreate()}>
                  <i className="material-icons prefix left">add</i>
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