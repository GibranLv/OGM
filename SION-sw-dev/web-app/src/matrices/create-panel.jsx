import { h, render, Component } from 'preact';
import { parallel } from 'async';

import CardItemGroup from './card-item-group.jsx';

import constants from './../constants';

class CreatePanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groups_: [],
      variables_: [],
      custom_variables_: [],
      units_: [],
      devices_: [],
      device: false,
      matrix: [],
      line: []
    };
  }

  componentDidMount() {
    let self = this;

    /*
    this.getVariables();
    this.getCustomVariables();
    this.getGroups();
    this.getUnits();
    */

    parallel({
      variables: (fn) => {
        self.getVariables(fn);
      },
      custom_variables: (fn) => {
        self.getCustomVariables(fn);
      },
      groups: (fn) => {
        self.getGroups(fn);
      },
      units: (fn) => {
        self.getUnits(fn);
      },
    }, (err, res) => {
      if (err) {
        Materialize.toast(err, 2500);;
        return;
      }

      let variables_ = res.variables;
      let custom_variables_ = res.custom_variables;
      let units_ = res.units;
      let groups_ = res.groups;

      if (!variables_) variables_ = [];
      if (!custom_variables_) custom_variables_ = [];
      if (!units_) units_ = [];
      if (!groups_) groups_ = [];

      let devices_ = self.getDevices(variables_, custom_variables_);

      self.setState({
        devices_: devices_,
        variables_: variables_,
        custom_variables_: custom_variables_,
        units_: units_,
        groups_: groups_
      }, () => {
        $('select').material_select();
      });

    });
  }

  getGroups(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_GROUPS}/list`;

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

        self.setState({ groups_: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);

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

        Materialize.toast(json.message, 2500);
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
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

        self.setState({ variables_: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);

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

        Materialize.toast(json.message, 2500);
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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

        self.setState({ custom_variables_: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);

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

        Materialize.toast(json.message, 2500);
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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

        self.setState({ units_: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        if (fn) {
          fn(res.message);
          return;
        }

        Materialize.toast(res.message, 2500);

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

        Materialize.toast(json.message, 2500);
      } else {
        if (fn) {
          fn(constants.MESSAGE_ERROR);
          return;
        }

        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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

  handleCancel() {
    let self = this;

    let fn = () => {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    };

    return fn;
  }

  handleInsertGroup() {
    let self = this;

    let fn = () => {
      let inputGroup = document.querySelector('#input-group');
      let value = inputGroup.value;
      let vInt = parseInt(value);

      let line = self.state.line;
      let matrix = self.state.matrix;
      let groups = self.state.groups_;
      let groupInsert = false;

      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if (group.id == vInt) {
          groupInsert = { id: group.id, name: group.name, isSelected: false };
          break;
        }
      }

      if (line.length == 0) {
        if (groupInsert) {
          let isR = self.isRepeated(matrix, groupInsert)
          if (!isR) {
            matrix.push(groupInsert);
            self.setState({ matrix: matrix });
          }
        }

      } else {
        if (line.length > 0) {
          matrix = self.insertGroup(matrix, line, 0, groupInsert);

          self.setState({ matrix: matrix });
        }
      }
    };

    return fn;
  }

  handleInsertVariable() {
    let self = this;

    let fn = () => {
      let inputVariable = document.querySelector('#input-variable');
      let value = inputVariable.value;
      let vInt = parseInt(value);

      let line = self.state.line;
      let matrix = self.state.matrix;
      let variables = self.state.variables_;
      let variableInsert = false;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id == vInt) {
          let units = self.state.units_;

          variableInsert = {
            id: variable.id,
            name: variable.name,
            device: variable.device,
            units: units,
            is_custom: false
          };

          break;
        }
      }

      if (line) {
        if (line.length > 0) {
          matrix = self.insertVariable(matrix, line, 0, variableInsert);

          self.setState({ matrix: matrix });
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

      let line = self.state.line;
      let matrix = self.state.matrix;
      let variables = self.state.custom_variables_;
      let variableInsert = false;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id == vInt) {
          let units = self.state.units_;

          variableInsert = {
            id: variable.id,
            name: variable.name,
            device: variable.device,
            units: units,
            is_custom: true,
          };

          break;
        }
      }

      if (line) {
        if (line.length > 0) {
          matrix = self.insertVariable(matrix, line, 0, variableInsert);

          self.setState({ matrix: matrix });
        }
      }
    };

    return fn;
  }

  handleSelected() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.selectedGroup(matrix, value, 0, true);

        self.setState({ matrix: matrix, line: value });
      }
    };

    return fn;
  }

  handleDeselected() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.selectedGroup(matrix, value, 0, false);

        self.setState({ matrix: matrix, line: [] });
      }
    };

    return fn;
  }

  handleRemove() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.removeGroup(matrix, value, 0);

        let line = self.state.line;
        let isEqual = self.isEqualLines(value, line);
        if (isEqual) {
          self.setState({ matrix: matrix, line: [] });
          return;
        }

        self.setState({ matrix: matrix });
      }
    };

    return fn;
  }

  handleRemoveVariable() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.removeVariable(matrix, value, 0);

        self.setState({ matrix: matrix });
      }
    };

    return fn;
  }

  handleChangeUnit() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.updateVariable(matrix, value, 0);

        self.setState({ matrix: matrix });
      }
    };

    return fn;
  }

  handleCreate() {
    let self = this;

    let fn = () => {
      let matrix = self.state.matrix;

      let o = this.getMinJSON(matrix);

      let inputName = document.querySelector('#input-name');
      let name = inputName.value.trim();

      if (name == '') {
        let message = 'El nombre de la Matriz es requerido';
        Materialize.toast(message, 2500);
        return;
      }

      if (o.length == 0) {
        let message = 'La estructura de la matriz esta vacia';
        Materialize.toast(message, 2500);
        return;
      }

      let json = {
        name: name,
        structure_json: o
      };

      inputName.value = '';

      self.props.onCreate(json);
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = () => {
      self.props.onBack();
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

  insertGroup(groups, line, index, groupInsert) {
    let id = line[index];
    if (!id) {
      return;
    }

    let last = line.length - 1;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];
      if (g.id == id) {
        if (last == index) {
          if (!g.sons) {
            groups[i].sons = [groupInsert];
          } else {
            let isR = this.isRepeated(groups[i].sons, groupInsert)
            if (!isR) {
              groups[i].sons.push(groupInsert);
            }
          }

          return groups;

        } else {
          if (g.sons) {
            groups[i].sons = this.insertGroup(g.sons, line, index + 1, groupInsert);
          }
        }
      }
    }

    return groups;
  }

  removeGroup(groups, line, index) {
    let id = line[index];
    if (!id) {
      return groups;
    }

    let last = line.length - 1;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];
      if (g.id == id) {
        if (last == index) {
          groups.splice(i, 1);
          break;

        } else {
          if (g.sons) {
            groups[i].sons = this.removeGroup(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  removeVariable(groups, line, index) {
    let id = line[index];
    if (!id) {
      return;
    }

    let last = line.length - 2;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (last == index) {
        if (g.id == id) {
          let variables = g.variables;
          if (variables) {
            let o = line[index + 1];

            for (let j = 0; j < variables.length; j++) {
              let v = variables[j];
              if (v.id == o.variable_id) {
                if (v.is_custom == o.is_custom) {
                  variables.splice(j, 1);
                  groups[i].variables = variables;

                  break;
                }
              }
            }

            return groups;
          }
        }

      } else {
        if (g.id == id) {
          if (g.sons) {
            groups[i].sons = this.removeVariable(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  updateVariable(groups, line, index) {
    let id = line[index];
    if (!id) {
      return;
    }

    let last = line.length - 2;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (last == index) {
        if (g.id == id) {
          let variables = g.variables;
          if (variables) {
            let o = line[index + 1];
            for (let j = 0; j < variables.length; j++) {
              let v = variables[j];
              if (v.id == o.variable_id) {
                if (v.is_custom == o.is_custom) {
                  groups[i].variables[j].unit_id = o.unit_id;

                  break;
                }
              }
            }

            return groups;
          }
        }

      } else {
        if (g.id == id) {
          if (g.sons) {
            groups[i].sons = this.updateVariable(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  selectedGroup(groups, line, index, isSelected) {
    let id = line[index];
    let last = line.length - 1;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (g.id == id) {
        if (last == index) {
          groups[i].isSelected = isSelected;

        } else {
          groups[i].isSelected = false;
        }

        if (g.sons) {
          groups[i].sons = this.selectedGroup(g.sons, line, index + 1, isSelected);
        }

      } else {
        groups[i].isSelected = false;
      }
    }

    return groups;
  }

  insertVariable(groups, line, index, variableInsert) {
    let id = line[index];
    if (!id) {
      return groups;
    }

    let last = line.length - 1;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];
      if (g.id == id) {
        if (last == index) {
          if (!g.variables) {
            groups[i].variables = [variableInsert];
          } else {
            let isR = this.isRepeatedVariable(groups[i].variables, variableInsert)
            if (!isR) {
              groups[i].variables.push(variableInsert);
            }
          }

          return groups;

        } else {
          if (g.sons) {
            groups[i].sons = this.insertVariable(g.sons, line, index + 1, variableInsert);
          }
        }
      }
    }

    return groups;
  }

  isRepeated(elements, insert) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id == insert.id) {
        return true;
      }
    }

    return false;
  }

  isRepeatedVariable(elements, insert) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id == insert.id) {
        if (element.is_custom == insert.is_custom) {
          return true
        }
      }
    }

    return false;
  }

  isEqualLines(a, b) {
    let sizeA = a.length;
    let sizeB = b.length;

    if (sizeA != sizeB) {
      return false;
    }

    for (let i = 0; i < sizeA; i++) {
      let v = a[i];
      if (v !== b[i]) {
        return false;
      }
    }

    return true;
  }

  getMinJSON(groups) {
    let json = [];

    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      let o = {
        group_id: g.id
      };

      if (g.sons) {
        o.sons = this.getMinJSON(g.sons);
      }

      if (g.variables) {
        let variables = [];

        for (let j = 0; j < g.variables.length; j++) {
          const v = g.variables[j];
          let vInsert = { id: v.id, unit_id: v.unit_id, is_custom: v.is_custom };

          let prefix = 'v';
          if (v.is_custom) prefix = 'cv';

          let inputName = document.querySelector(`#name-${prefix}-${v.id}`);
          if (inputName) {
            let name = inputName.value.trim();
            if (name != '') {
              vInsert.name = name;
            }
          }

          variables.push(vInsert);
        }

        o.variables = variables;
      }

      json.push(o);
    }

    return json;
  }

  createOptGroup() {
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.name} - {item.type}</option>
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

  createItem() {
    let self = this;

    let fn = (item, index) => {
      return <CardItemGroup key={index} group={item}
                onSelected={self.handleSelected()}
                onDeselected={self.handleDeselected()}
                onRemove={self.handleRemove()}
                onRemoveVariable={self.handleRemoveVariable()}
                onChangeUnit={self.handleChangeUnit()} />;
    };

    return fn;
  }

  render(props, state) {
    return (
      <section>
        <h5>Crear Matriz</h5>

        <div className="row">

          <div className="col m1">
            <button type="button" className="btn blue" onClick={this.handleBack()}>
              <i className="material-icons">arrow_back</i>
            </button>
          </div>

          <div className="col m2">
            <div className="row">
              <div className="col m8">
                <select className="browser-default sion-select" id="input-group">
                  <option>Grupos</option>
                  {state.groups_.map(this.createOptGroup())}
                </select>
              </div>
              <div className="col m4">
                <button type="button" className="btn blue" onClick={this.handleInsertGroup()}>
                  <i className="material-icons">add</i>
                </button>
              </div>
            </div>
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

          <div className="col m3">
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

          <div className="col m3">
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

          <div className="col m12">
            <div>
              <div className="sion-cu-panel">
                <div className="row">
                  <div className="col m8">
                    <input type="text" id="input-name" placeholder="Matriz" />
                  </div>
                  <div className="col m4">
                    <button type="button" className="btn green" onClick={this.handleCreate()}>
                      <i className="material-icons">save</i>
                    </button>
                  </div>
                </div>
                <br />
                {state.matrix.map(this.createItem())}
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default CreatePanel;
