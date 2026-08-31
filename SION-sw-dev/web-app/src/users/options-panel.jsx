import { h, render, Component } from 'preact';

import constants from './../constants.js';

const VARIABLE = 1;
const CUSTOM_VARIABLE = 2;
const MATRIX = 3;
const REPORT = 4;
const ALARM  = 5;
const VEHICLE = 6;

class OptionsPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      variables_: [],
      custom_variables_: [],
      matrices_: [],
      reports_: [],
      alarms_: [],
      vehicles_: [],

      variables: [],
      custom_variables: [],
      matrices: [],
      reports: [],
      alarms: [],
      vehicles: []
    };
  }

  componentDidMount() {
    this.getVariables();
    this.getCuastomVariables();
    this.getMatrices();
    this.getReports();
    this.getAlarms();
    this.getVehicles();

    this.getVariablesForUser();
    this.getCustomVariablesForUser();
    this.getMatricesForUser();
    this.getReportsForUser();
    this.getAlarmsForUser();
    this.getVehiclesForUser();

    $('ul.tabs').tabs_materialize();
  }

  getVariables() {
    let self = this;

    let url = `${constants.URL_SERVER_VARIABLES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ variables_: res.docs });

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

  getCuastomVariables() {
    let self = this;

    let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ custom_variables_: res.docs });

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

  getMatrices() {
    let self = this;

    let url = `${constants.URL_SERVER_MATRICES}/list?with_structure=false&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ matrices_: res.docs });

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

  getReports() {
    let self = this;

    let url = `${constants.URL_SERVER_REPORTS}/list?with_structure=false&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ reports_: res.docs });

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

  getAlarms() {
    let self = this;

    let url = `${constants.URL_SERVER_ALARMS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ alarms_: res.docs });

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

  getVehicles() {
    let self = this;

    let url = `${constants.URL_SERVER_VEHICLES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ vehicles_: res.docs });

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

  getVariablesForUser() {
    let self = this;

    let user = this.props.item;
    if (!user) return;

    let url = `${constants.URL_SERVER_VARIABLES}/list?user_id=${user.id}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ variables: res.docs });

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

  getCustomVariablesForUser() {
    let self = this;

    let user = this.props.item;
    if (!user) return;

    let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list?user_id=${user.id}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ custom_variables: res.docs });

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

  getMatricesForUser() {
    let self = this;

    let user = this.props.item;
    if (!user) {
      return;
    }

    let url = `${constants.URL_SERVER_MATRICES}/list?user_id=${user.id}&with_structure=false&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ matrices: res.docs });

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

  getReportsForUser() {
    let self = this;

    let user = this.props.item;
    if (!user) {
      return;
    }

    let url = `${constants.URL_SERVER_REPORTS}/list?user_id=${user.id}&with_structure=false&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ reports: res.docs });

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

  getAlarmsForUser() {
    let self = this;

    let user = this.props.item;
    if (!user) {
      return;
    }

    let url = `${constants.URL_SERVER_ALARMS}/list?user_id=${user.id}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ alarms: res.docs });

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

  getVehiclesForUser() {
    let self = this;

    let user = this.props.item;
    if (!user) {
      return;
    }

    let url = `${constants.URL_SERVER_VEHICLES}/list?user_id=${user.id}`;

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

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  handleBack() {
    let self = this;

    let fn = () => {
      this.props.onBack();
    };

    return fn;
  }

  handleInsert(value) {
    let self = this;

    let fn = () => {
      let selector = '';
      if (value == VARIABLE) {
        selector = '#input-variable';

      } else if (value == CUSTOM_VARIABLE) {
        selector = '#input-custom-variable';

      } else if (value == MATRIX) {
        selector = '#input-matrix';

      } else if (value == REPORT) {
        selector = '#input-report';

      } else if (value == ALARM) {
        selector = '#input-alarm';

      } else if (value == VEHICLE) {
        selector = '#input-vehicle';
      }

      let inputValue = document.querySelector(selector);
      if (!inputValue) return;

      let sId = inputValue.value.trim();
      if (sId == '') return;

      let id = parseInt(sId);

      let insertValue = false;
      let items_ = [];

      if (value == VARIABLE) {
        items_ = self.state.variables_;

      } else if (value == CUSTOM_VARIABLE) {
        items_ = self.state.custom_variables_;

      } else if (value == MATRIX) {
        items_ = self.state.matrices_;

      } else if (value == REPORT) {
        items_ = self.state.reports_;

      } else if (value == ALARM) {
        items_ = self.state.alarms_;

      } else if (value == VEHICLE) {
        items_ = self.state.vehicles_;
      }

      for (let i = 0; i < items_.length; i++) {
        const item_ = items_[i];
        if (item_.id == id) {
          insertValue = item_;
          break;
        }
      }


      if (insertValue) {
        let items = [];

        if (value == VARIABLE) {
          items = self.state.variables;

        } else if (value == CUSTOM_VARIABLE) {
          items = self.state.custom_variables;

        } else if (value == MATRIX) {
          items = self.state.matrices;

        } else if (value == REPORT) {
          items = self.state.reports;

        } else if (value == ALARM) {
          items = self.state.alarms;

        } else if (value == VEHICLE) {
          items = self.state.vehicles;
        }

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.id == insertValue.id) return;
        }

        items.push(insertValue);

        if (value == VARIABLE) {
          self.setState({ variables: items });

        } else if (value == CUSTOM_VARIABLE) {
          self.setState({ custom_variables: items });

        } else if (value == MATRIX) {
          self.setState({ matrices: items });

        } else if (value == REPORT) {
          self.setState({ reports: items });

        } else if (value == ALARM) {
          self.setState({ alarms: items });

        } else if (value == VEHICLE) {
          self.setState({ vehicles: items });
        }
      }
    };

    return fn;
  }

  handleUpdate(value) {
    let self = this;

    let fn = () => {
      let user = self.props.item;
      if (!user) {
        let message = 'No se cuenta con la información del usuario';
        Materialize.toast(message, 2500);
        return;
      }

      let items = [];
      let key = false;

      if (value == VARIABLE) {
        items = self.state.variables;
        key = 'variables';

      } else if (value == CUSTOM_VARIABLE) {
        items = self.state.custom_variables;
        key = 'custom_variables';

      } else if (value == MATRIX) {
        items = self.state.matrices;
        key = 'matrices';

      } else if (value == REPORT) {
        items = self.state.reports;
        key = 'reports';

      } else if (value == ALARM) {
        items = self.state.alarms;
        key = 'alarms';

      } else if (value == VEHICLE) {
        items = self.state.vehicles;
        key = 'vehicles';
      }

      let size = items.length;
      if (size == 0) {
        let message = 'La lista de elementos esta vacia, si desea eliminar los elementos, use el boton de limpiar';
        Materialize.toast(message, 2500);
        return;
      }

      if (!key) {
        let message = 'No se puede identificar la lista de elementos';
        Materialize.toast(message, 2500);
        return;
      }

      let s = [];
      for (let i = 0; i < size; i++) {
        const item = items[i];
        let id = item.id;
        s.push(id);
      }

      let id = user.id;

      let json = {};
      json[key] = s;

      self.props.onUpdateOptions(json, id);
    };

    return fn;
  }

  handleUpdateClear(value) {
    let self = this;

    let fn = () => {
      let user = self.props.item;
      if (!user) {
        let message = 'No se cuenta con la información del usuario';
        Materialize.toast(message, 2500);
        return;
      }

      let items = [];
      let key = false;

      if (value == VARIABLE) {
        key = 'variables';

      } else if (value == CUSTOM_VARIABLE) {
        key = 'custom_variables';

      } else if (value == MATRIX) {
        key = 'matrices';

      } else if (value == REPORT) {
        key = 'reports';

      } else if (value == ALARM) {
        key = 'alarms';

      } else if (value == VEHICLE) {
        key = 'vehicles';
      }

      if (!key) {
        let message = 'No se puede identificar la lista de elementos';
        Materialize.toast(message, 2500);
        return;
      }

      let id = user.id;

      let json = {};
      json[key] = [-1];

      self.props.onUpdateOptions(json, id);
    };

    return fn;
  }

  handleRemove(item, value) {
    let self = this;

    let fn = () => {
      let items = [];

      if (value == VARIABLE) items = self.state.variables;
      if (value == CUSTOM_VARIABLE) items = self.state.custom_variables;
      if (value == MATRIX) items = self.state.matrices;
      if (value == REPORT) items = self.state.reports;
      if (value == ALARM) items = self.state.alarms;
      if (value == VEHICLE) items = self.state.vehicles;

      let id = item.id;
      let update = false;
      for (let i = 0; i < items.length; i++) {
        const o = items[i];
        if (o.id == id) {
          items.splice(i, 1);
          update = true;
        }
      }

      if (update) {
        if (value == VARIABLE) {
          self.setState({ variables: items });
          return;

        } else if (value == CUSTOM_VARIABLE) {
          self.setState({ custom_variables: items });
          return;

        } else if (value == MATRIX) {
          self.setState({ matrices: items });
          return;
        }

        if (value == REPORT) {
          self.setState({ reports: items });
          return;
        }

        if (value == ALARM) {
          self.setState({ alarms: items });
          return;
        }

        if (value == VEHICLE) {
          self.setState({ vehicles: items });
          return;
        }
      }
    };

    return fn;
  }

  createOptName(value) {
    let self = this;

    let fn = (item, index) => {
      if (value) {
        if (value == VARIABLE || value == CUSTOM_VARIABLE) {
          return <option key={item.id} value={item.id}>{item.device}.{item.name}</option>;
        }

        if (value == VEHICLE) {
          return <option key={item.id} value={item.id}>{item.alias}</option>;
        }
      }

      return <option key={item.id} value={item.id}>{item.name}</option>;
    };

    return fn;
  }

  createItem(value) {
    let self = this;

    let fn = (item, index) => {
      if (value == VARIABLE || value == CUSTOM_VARIABLE) {
        return (
          <tr key={index}>
            <td>{item.device}.{item.name}</td>
            <td>
              <a href="#" className="waves-effect waves-teal btn-flat sion-link" onClick={self.handleRemove(item, value)}>
                <span aria-hidden="true">&times;</span>
              </a>
            </td>
          </tr>
        );
      }

      if (value == VEHICLE) {
        return (
          <tr key={index}>
            <td>{item.alias}</td>
            <td>
              <a href="#" className="waves-effect waves-teal btn-flat sion-link" onClick={self.handleRemove(item, value)}>
                <span aria-hidden="true">&times;</span>
              </a>
            </td>
          </tr>
        );
      }

      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>
            <a href="#" className="waves-effect waves-teal btn-flat sion-link" onClick={self.handleRemove(item, value)}>
              <span aria-hidden="true">&times;</span>
            </a>
          </td>
        </tr>
      );
    };

    return fn;
  }

  render(props, state) {
    let user = props.item;

    return (
      <section>

        <div className="row">
          <div className="col m2">
            <button type="button" className="btn blue" onClick={this.handleBack()}>
              <i className="material-icons">arrow_back</i>
            </button>
          </div>
          <div className="col m10">
            <h5>
              {user.name}
            </h5>
          </div>
        </div>

        <div className="row">

          <div className="col m12">
            <ul className="tabs" id="sion-alarms-panel">
              <li className="tab col s2"><a className="active" href="#variables">Variables</a></li>
              <li className="tab col s2"><a href="#custom-variables">Variables personalizadas</a></li>
              <li className="tab col s2"><a href="#matrices">Matrices</a></li>
              <li className="tab col s2"><a href="#reports">Reportes</a></li>
              <li className="tab col s2"><a href="#alarms">Alarmas</a></li>
              <li className="tab col s2"><a href="#vehicles">Vehiculos</a></li>
            </ul>
          </div>

          <div className="col m12 content-panel">

            <div id="variables" className="col s12">
              <h5>Variables</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-variable">
                    <option value="">Variables</option>
                    {state.variables_.map(this.createOptName(VARIABLE))}
                  </select>
                </div>

                <div className="col m4">
                  <button type="button" className="btn blue" onClick={this.handleInsert(VARIABLE)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn green" onClick={this.handleUpdate(VARIABLE)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(VARIABLE)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.variables.map(this.createItem(VARIABLE))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            <div id="custom-variables" className="col s12">
              <h5>Variables Personalizadas</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-custom-variable">
                    <option value="">Variables personalizadas</option>
                    {state.custom_variables_.map(this.createOptName(CUSTOM_VARIABLE))}
                  </select>
                </div>


                <div className="col m4">
                  <button type="button" className="btn blue" onClick={this.handleInsert(CUSTOM_VARIABLE)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn green" onClick={this.handleUpdate(CUSTOM_VARIABLE)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(CUSTOM_VARIABLE)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.custom_variables.map(this.createItem(CUSTOM_VARIABLE))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            <div id="matrices" className="col s12">
              <h5>Matrices</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-matrix">
                    <option value="">Matrices</option>
                    {state.matrices_.map(this.createOptName())}
                  </select>
                </div>

                <div className="col m4">
                  <button type="button" className="btn blue" onClick={this.handleInsert(MATRIX)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn green" onClick={this.handleUpdate(MATRIX)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(MATRIX)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.matrices.map(this.createItem(MATRIX))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            <div id="reports" className="col s12">
              <h5>Reportes</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-report">
                    <option value="">Reportes</option>
                    {state.reports_.map(this.createOptName())}
                  </select>
                </div>

                <div className="col m4">
                  <button type="button" className="btn blue" onClick={this.handleInsert(REPORT)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn green" onClick={this.handleUpdate(REPORT)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(REPORT)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.reports.map(this.createItem(REPORT))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            <div id="alarms" className="col s12">
              <h5>Alarmas</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-alarm">
                    <option value="">Alarmas</option>
                    {state.alarms_.map(this.createOptName())}
                  </select>
                </div>

                <div className="col m4">
                  <button type="button" className="btn blue" onClick={this.handleInsert(ALARM)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn green" onClick={this.handleUpdate(ALARM)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(ALARM)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.alarms.map(this.createItem(ALARM))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            <div id="vehicles" className="col s12">
              <h5>Vehiculos</h5>

              <div className="row">

                <div className="col m4">
                  <select className="browser-default sion-select" id="input-vehicle">
                    <option value="">Vehiculos</option>
                    {state.vehicles_.map(this.createOptName(VEHICLE))}
                  </select>
                </div>

                <div className="col m4">
                  <button type="button" className="btn blue" onClick={this.handleInsert(VEHICLE)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn green" onClick={this.handleUpdate(VEHICLE)}>
                    <i className="material-icons">save</i>
                  </button>
                </div>

                <div className="col m2">
                  <button type="button" className="btn red" onClick={this.handleUpdateClear(VEHICLE)}>
                    <i className="material-icons">delete_sweep</i>
                  </button>
                </div>

                <div className="col m12" style={{ marginTop: '10px' }}>
                  <table className="table table-hover">
                    <tbody>
                      {state.vehicles.map(this.createItem(VEHICLE))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    );
  }
}

export default OptionsPanel;