import { h, render, Component } from 'preact';
import { isArray, isString } from 'underscore';

import constants from './../constants.js';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matrices_: [],
      groups_: [],

      created_at_date: '',
    };
  }

  componentDidMount() {
    let o = this.props.item;
    if (o) {
      let inputTitle = document.querySelector('#input-u-title');
      let inputDescription = document.querySelector('#input-u-description');

      inputTitle.value = o.title;
      inputDescription.value = o.description;
    }

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

    if (!isArray(s)) s = [];

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

    if (!isArray(matrices)) matrices = [];

    for (let i = 0; i < matrices.length; i++) {
      const matrix = matrices[i];
      if (matrix) {
        let o = {
          id: matrix.id,
          name: matrix.name
        };

        let structure = matrix.structure;
        if (!structure) structure = [];

        let groups = this.getGroups(structure);

        o.groups = groups;

        matricesOut.push(o);
      }
    }

    let o = self.props.item;
    if (o) {
      let matrix_id = o.matrix_id;
      let group_id = o.group_id;

      for (let i = 0; i < matricesOut.length; i++) {
        const matrix = matricesOut[i];
        if (matrix.id == matrix_id) {
          let groups = matrix.groups;
          for (let j = 0; j < groups.length; j++) {
            const group = groups[j];
            if (group.id == group_id) {
              self.setState({ matrices_: matricesOut, groups_: groups }, () => {
                let inputMatrix = document.querySelector('#input-u-matrix');
                let inputGroup = document.querySelector('#input-u-group');

                inputMatrix.value = matrix_id;
                inputGroup.value = group_id;

                self.initializePickers();

                let inputCreatedAtDate = document.querySelector('#input-created-at-u-date');
                let inputCreatedAtTime = document.querySelector('#input-created-at-u-time');

                let created_at_out = o.created_at_out;
                let values = created_at_out.split(' ');
                if (values.length == 2) {
                  let date = values[0];
                  let time = values[1];

                  let times = time.split(':');
                  if (times.length == 3) {
                    let hours = times[0];
                    let mins = times[1];
                    time = `${hours}:${mins}`;
                  }

                  date = self.parseDate(date);

                  self.state.created_at_date = date;

                  inputCreatedAtDate.value = date;
                  inputCreatedAtTime.value = time;
                }
              });

              break;
            }
          }

          break;
        }
      }
    }

    /*this.setState({ matrices_: matricesOut }, () => {
      let o = self.props.item;
      if (o) {
        let matrix_id = o.matrix_id;
        let group_id = o.group_id;

        let matrices = self.state.matrices_;
        for (let i = 0; i < matrices.length; i++) {
          const matrix = matrices[i];
          if (matrix.id == matrix_id) {
            let groups = matrix.groups;
            for (let j = 0; j < groups.length; j++) {
              const group = groups[j];
              if (group.id == group_id) {
                self.setState({ groups_: groups }, () => {
                  let inputMatrix = document.querySelector('#input-u-matrix');
                  let inputGroup = document.querySelector('#input-u-group');

                  inputMatrix.value = matrix_id;
                  inputGroup.value = group_id;
                  
                  self.initializePickers();

                  let inputCreatedAtDate = document.querySelector('#input-created-at-u-date');
                  let inputCreatedAtTime = document.querySelector('#input-created-at-u-time');

                  let created_at_out = o.created_at_out;
                  let values = created_at_out.split(' ');
                  if (values.length == 2) {
                    let date = values[0];
                    let time = values[1];

                    date = self.parseDate(date);
                    
                    self.state.created_at_date = date;

                    inputCreatedAtDate.value = date;
                    inputCreatedAtTime.value = time;
                  }
                });

                break;
              }
            }

            break;
          }
        }
      }
    });*/
  }

  initializePickers() {
    let self = this;

    let created_at_date = this.state.created_at_date;
    if (!created_at_date) created_at_date = '';

    $('#content-created-at-u-date').html('');
    $('#content-created-at-u-date').append(`<input type="text" id="input-created-at-u-date" class="datepicker" placeholder="Fecha"  value="${created_at_date}" />`);

    $('#input-created-at-u-date').on('change', (evt) => {
      self.state.created_at_date = evt.target.value;
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

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = this.props.item;
      if (o) {
        let f = self.props.onUpdate;
        if (f) {
          let inputMatrix = document.querySelector('#input-u-matrix');
          let inputGroup = document.querySelector('#input-u-group');
          let inputTitle = document.querySelector('#input-u-title');
          let inputDescription = document.querySelector('#input-u-description');

          let inputUpdatedAtDate = document.querySelector('#input-created-at-u-date');
          let inputUpdatedAtTime = document.querySelector('#input-created-at-u-time');

          let date = inputUpdatedAtDate.value.trim();
          let time = inputUpdatedAtTime.value.trim();

          date = self.parseDate(date);

          let created_at = `${date} ${time}:00`;

          let matrix_id = inputMatrix.value.trim();
          let group_id = inputGroup.value.trim();
          let title = inputTitle.value.trim();
          let description = inputDescription.value.trim();

          matrix_id = parseInt(matrix_id);
          group_id = parseInt(group_id);

          let json = {
            matrix_id: matrix_id,
            group_id: group_id,
            title: title,
            description: description,
            created_at_in: created_at
          };

          f(json, o.id);
        }
      }
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

  handleBack() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onBack;
      if (f) f(); 
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
      <form className="formulario" onSubmit={this.handleUpdate()}>
        <div className="all_notes">
          <div className="variable">
            <div className="col m12">
              <select className="browser-default sion-select" id="input-u-matrix" onChange={this.handleChangeMatrix()}>
                <option>Matrices</option>
                {state.matrices_.map(this.createOptMG())}
              </select>
              <br />
            </div>
            <div className="col m12">
              <select className="browser-default sion-select" id="input-u-group">
                <option>Grupos</option>
                {state.groups_.map(this.createOptMG())}
              </select>
              <br />
            </div>
            <div className="col m12">
              <input type="text" id="input-u-title" placeholder="Titulo" />
            </div>
            <div className="col m12">
              <input type="text" id="input-u-description" placeholder="Descripción" />
            </div>
            <div className="col m12">
              <div id="content-created-at-u-date" className="dates col s6 m6"></div>
              <div className="dates col s6 m6">
                <input id="input-created-at-u-time" placeholder="Hora" type="text" className="timepicker" />
              </div>
            </div>
            <div className="row">
              <div className="col m6">
                <button type="button" className="btn gray" onClick={this.handleBack()}>
                  <i className="material-icons prefix left">keyboard_backspace</i>
                </button>
              </div>
              <div className="col m6">
                <button type="submit" className="btn blue">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateForm;