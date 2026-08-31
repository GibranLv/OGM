import { h, render, Component } from 'preact';
import { isString, isNaN } from 'underscore';

class SearchForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      created_at_date: '',
    };
  }

  componentDidMount() {
    this.initializePickers();
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
        let inputSearchAtDateOf = document.querySelector('#input-created-at-date-of');
        let inputSearchAtTimeOf = document.querySelector('#content-created-at-time-of');

        let inputSearchAtDateTo = document.querySelector('#input-created-at-date-to');
        let inputSearchAtTimeTo = document.querySelector('#content-created-at-time-to');

        let dateOf = inputSearchAtDateOf.value.trim();
        let timeOf = inputSearchAtTimeOf.value.trim();

        let dateTo = inputSearchAtDateTo.value.trim();
        let timeTo = inputSearchAtTimeTo.value.trim();

        dateOf = self.parseDate(dateOf);
        dateTo = self.parseDate(dateTo);

        let start_date = false;
        let final_date = false;

        if (dateOf != '' && dateTo != '') {

          start_date = `${dateOf} ${timeOf}:00`;
          final_date = `${dateTo} ${timeTo}:00`;

          let json = {
            start_date: start_date,
            final_date: final_date,
          };

          f(json);

        } else {
          let json = {};
          f(json);
        }
      }
    };

    return fn;
  }

  handleClear() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputSearchAtDateOf = document.querySelector('#input-created-at-date-of');
      let inputSearchAtTimeOf = document.querySelector('#content-created-at-time-of');

      let inputSearchAtDateTo = document.querySelector('#input-created-at-date-to');
      let inputSearchAtTimeTo = document.querySelector('#content-created-at-time-to');

      inputSearchAtDateOf.value = '';
      inputSearchAtTimeOf.value = '';

      inputSearchAtDateTo.value = '';
      inputSearchAtTimeTo.value = '';
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

  render(props, state) {
    return (
      <form className="formulario" onSubmit={this.handleSearch()}>
        <div className="all_notes">
          <div className="variable">
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
                <button type="button" className="btn blue" onCLick={this.handleClear()}>
                  <i className="material-icons prefix left">clear</i>
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