import { h, render, Component } from 'preact';
import { parallel } from 'async';

import ItemVariable from './item-variable.jsx';

import constants from './../constants.js';

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      custom_variables_: [],
      units_: [],
      variables_: [],
      devices_: [],
      device: false,
      variables: [],
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
      },
      units: (fn) => {
        self.getUnits(fn);
      },
      charts: (fn) => {
        self.getCharts(fn);
      }
    }, (err, res) => {
      if (err) {
        Materialize.toast(err, 2500);;
        return;
      }

      let variables_ = res.variables;
      let custom_variables_ = res.custom_variables;
      let units_ = res.units;
      let charts = res.charts;

      if (!variables_) variables_ = [];
      if (!custom_variables_) custom_variables_ = [];
      if (!units_) units_ = [];
      if (!charts) charts = [];

      let devices_ = self.getDevices(variables_, custom_variables_);

      for (let i = 0; i < charts.length; i++) {
        const chart = charts[i];
        let variablesIn = [];
        if (chart.is_custom) {
          variablesIn = custom_variables_;
        } else {
          variablesIn = variables_;
        }

        for (let j = 0; j < variablesIn.length; j++) {
          const variable = variablesIn[j];
          if (chart.variable_id == variable.id) {
            if (!chart.is_custom) chart.is_custom = false;
            if (!variable.is_custom) variable.is_custom = false;

            if (chart.is_custom === variable.is_custom) {
              charts[i].variable_name = variable.name;
              charts[i].device = variable.device;
              break;
            }
          }
        }

        charts[i].units_ = units_;
      }

      self.setState({
        variables: charts,
        devices_: devices_,
        variables_: variables_,
        custom_variables_: custom_variables_,
        units_: units_
      }, () => {
        $('select').material_select();
      });

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
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs);
          return;
        }

        self.setState({ variables_: res.docs }, () => {
          $('select').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);;

      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;

        if (fn) {
          fn(json.message);
          return;
        }

        Materialize.toast(json.message, 2500);;
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
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
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs);
          return;
        }

        self.setState({ custom_variables_: res.docs }, () => {
          $('select').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);;

      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;

        if (fn) {
          fn(json.message);
          return;
        }

        Materialize.toast(json.message, 2500);;
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  getUnits(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_UNITS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs);
          return;
        }

        self.setState({ units_: res.docs }, () => {
          $('select').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(null, res.message);
          return;
        }

        Materialize.toast(res.message, 2500);;

      } else {
        if (fn) {
          fn(null, constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;

        if (fn) {
          fn(json.message);
          return;
        }

        Materialize.toast(json.message, 2500);;
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  getCharts(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_CHARTS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs);
          return;
        }

        self.setState({ variables: res.docs }, () => {
          $('select').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);;

      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;

        if (fn) {
          fn(json.message);
          return;
        }

        Materialize.toast(json.message, 2500);;
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  updateChart(json) {
    let self = this;

    let xhr = $.ajax({
      url: constants.URL_SERVER_CHARTS,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let message = 'La cambios se guardaron correctamente';
        Materialize.toast(message, 2500);

        self.updateVariableList(res.docs);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);;
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  deleteVariable(id) {
    let self = this;

    let url = `${constants.URL_SERVER_CHARTS}/${id}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_DELETE,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let message = 'La configuración de la variable se elimino correctamente';
        Materialize.toast(message, 2500);

        self.removeVariable(id);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);;
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  getDevices(variables, custom_variables) {
    let devices = [];

    for (let i = 0; i < variables.length; i++) {
      const variable = variables[i];
      let isNew = true;
      for (let j = 0; j < devices.length; j++) {
        const device = devices[j];
        if (variable.device == device) {
          isNew = false;
          break;
        }
      }

      if (isNew) devices.push(variable.device);
    }

    for (let i = 0; i < custom_variables.length; i++) {
      const variable = custom_variables[i];
      let isNew = true;
      for (let j = 0; j < devices.length; j++) {
        const device = devices[j];
        if (variable.device == device) {
          isNew = false;
          break;
        }
      }

      if (isNew) devices.push(variable.device);
    }

    return devices;
  }

  updateVariableList(charts) {
    let variables_ = this.state.variables_;
    let custom_variables_ = this.state.custom_variables_;
    let units_ = this.state.units_;

    if (!variables_) variables_ = [];
    if (!custom_variables_) custom_variables_ = [];
    if (!units_) units_ = [];
    if (!charts) charts = [];

    for (let i = 0; i < charts.length; i++) {
      const chart = charts[i];
      let variablesIn = [];
      if (chart.is_custom) {
        variablesIn = custom_variables_;
      } else {
        variablesIn = variables_;
      }

      for (let j = 0; j < variablesIn.length; j++) {
        const variable = variablesIn[j];
        if (chart.variable_id == variable.id) {
          charts[i].variable_name = variable.name;
          charts[i].device = variable.device;
          break;
        }
      }

      charts[i].units_ = units_;
    }

    this.setState({ variables: charts }, () => {
      $('select').material_select();
    });
  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variablesOut = [];
      let device = self.state.device;

      let variables = self.state.variables;
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];

        if (variable.device == device) {
          let o = {
            variable_id: variable.variable_id,
            is_custom: variable.is_custom,
            unit_id: variable.unit_id
          };

          let prefix = '';
          if (variable.is_custom) prefix = 'cv-';

          let key = `#input-name-${prefix}${i}`;
          let inputName = document.querySelector(key)
          if (inputName) {
            let name = inputName.value.trim();
            o.name = name;
          }

          key = `#input-color-${prefix}${i}`;
          let inputColor = document.querySelector(key)
          if (inputColor) {
            let color = inputColor.value.trim();
            o.color = color;
          }

          variablesOut.push(o);
        }
      }

      if (variablesOut.length == 0) {
        let message = 'La lista no contiene ningún elemento';
        Materialize.toast(message, 2500);
        return;
      }

      self.updateChart(variablesOut);
    };

    return fn;
  }

  handleDelete() {
    let self = this;

    let fn = (id) => {
      self.deleteVariable(id);
    };

    return fn;
  }

  handleRemove() {
    let self = this;

    let fn = (index) => {
      let variables = self.state.variables;
      variables.splice(index, 1);

      self.setState({ variables: variables }, () => {
        $('select').material_select();
      });
    };

    return fn;
  }

  handleInsertVariable() {
    let self = this;

    let fn = () => {
      let inputVariable = document.querySelector('#input-variable');
      let value = inputVariable.value;
      let vInt = parseInt(value);

      let variables = self.state.variables_;
      let variableInsert = false;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id == vInt) {
          let units = self.state.units_;

          variableInsert = {
            variable_id: variable.id,
            variable_name: variable.name,
            device: variable.device,
            units_: units,
            is_custom: false
          };

          break;
        }
      }

      if (variableInsert) {
        let isNew = true;
        let variables = self.state.variables;
        for (let i = 0; i < variables.length; i++) {
          const variable = variables[i];
          if (variable.variable_id == variableInsert.variable_id) {
            if (!variable.is_custom) variable.is_custom = false;
            if (!variableInsert.is_custom) variableInsert.is_custom = false;

            if (variable.is_custom === variableInsert.is_custom) {
              isNew = false;
              break;
            }
          }
        }

        if (isNew) {
          variables.push(variableInsert);
          self.setState({ variables: variables }, () => {
            $('select').material_select();
          });
        }
      }
    };

    return fn;
  }

  handleInsertCustomVariable() {
    let self = this;

    let fn = () => {
      let inputVariable = document.querySelector('#input-custom-variable');
      let value = inputVariable.value;
      let vInt = parseInt(value);

      let variables = self.state.custom_variables_;
      let variableInsert = false;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id == vInt) {
          let units = self.state.units_;

          variableInsert = {
            variable_id: variable.id,
            variable_name: variable.name,
            device: variable.device,
            units_: units,
            is_custom: true,
          };

          break;
        }
      }

      if (variableInsert) {
        let isNew = true;
        let variables = self.state.variables;
        for (let i = 0; i < variables.length; i++) {
          const variable = variables[i];
          if (variable.variable_id == variableInsert.variable_id) {
            if (!variable.is_custom) variable.is_custom = false;
            if (!variableInsert.is_custom) variableInsert.is_custom = false;

            if (variable.is_custom === variableInsert.is_custom) {
              isNew = false;
              break;
            }
          }
        }

        if (isNew) {
          variables.push(variableInsert);
          self.setState({ variables: variables }, () =>{
            $('select').material_select();
          });
        }
      }
    };

    return fn;
  }

  handleChangeUnit() {
    let self = this;

    let fn = (o) => {
      let variables = self.state.variables;
      for (let i = 0; i < variables.length; i++) {
        if (i == o.index) {
          variables[i].unit_id = o.unit_id;

          self.setState({ variables: variables }, () => {
            $('select').material_select();
          });

          return;
        }
      }
    };

    return fn;
  }

  handleChangeDevice() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      self.setState({ device: value });
    };

    return fn;
  }

  removeVariable(id) {
    let variables = this.state.variables;
    for (let i = 0; i < variables.length; i++) {
      let variable = variables[i];
      if (id === variable.id) {
        variables.splice(i, 1);
        break;
      }
    }

    this.setState({ variables: variables }, () => {
      $('select').material_select();
    });
  }

  createItemVariable() {
    let self = this;

    let fn = (item, index) => {
      item.index = index;

      let device = self.state.device;
      if (device == item.device) {
        return <ItemVariable
          key={index} item={item}
          onChangeUnit={self.handleChangeUnit()}
          onDelete={self.handleDelete()}
          onRemove={self.handleRemove()} />;
      }

      return;
    };

    return fn;
  }

  createOptDevice() {
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item}>{item}</option>
    };

    return fn;
  }

  createOptVariable() {
    let self = this;

    let fn = (item, index) => {
      let device = self.state.device;
      if (device == item.device) {
        return <option key={index} value={item.id}>{item.name}</option>
      }

      return;
    };

    return fn;
  }

  render(props, state) {
    return(
      <div>
        <h4>Graficas</h4>

        <div className="row">

          <div className="col m1">
            <button type="button" className="btn green" onClick={this.handleUpdate()}>
              <i className="material-icons">save</i>
            </button>
          </div>

          <div className="col m3">
            <div className="row">
              <div className="col m12">
                <select className="browser-default sion-select" id="input-device" onChange={this.handleChangeDevice()}>
                  <option>Dispositivos</option>
                  {state.devices_.map(this.createOptDevice())}
                </select>
              </div>
            </div>
          </div>

          <div className="col m4">
            <div className="row">
              <div className="col m8">
                <select className="browser-default sion-select" id="input-variable">
                  <option>Variables</option>
                  {state.variables_.map(this.createOptVariable())}
                </select>
              </div>
              <div className="col m4">
                <button type="button" className="btn blue" onClick={this.handleInsertVariable()}>
                  <i className="material-icons">add</i>
                </button>
              </div>
            </div>
          </div>

          <div className="col m4">
            <div className="row">
              <div className="col m8">
                <select className="browser-default sion-select" id="input-custom-variable">
                  <option>Variables personalizadas</option>
                  {state.custom_variables_.map(this.createOptVariable())}
                </select>
              </div>
              <div className="col m4">
                <button type="button" className="btn blue" onClick={this.handleInsertCustomVariable()}>
                  <i className="material-icons">add</i>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="col m12">
          <table className="responsive-table centered">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Unidad</th>
                <th>Nombre</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {state.variables.map(this.createItemVariable())}
            </tbody>
          </table>
        </div>
        <div className="col m6"></div>
      </div>
    );
  }
}

export default Content;