import { h, render, Component } from 'preact';
import { parallel } from 'async';

import CardItemGroup from './card-item-group.jsx';

import constants from './../constants';

class UpdatePanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groups_: [],
      variables_: [],
      custom_variables_: [],
      units_: [],
      report: [],
      devices_: [],
      device: false,
      line: [],
      file: false,
    };
  }

  componentDidMount() {
    let self = this;

    parallel({
      groups_: (fn) => {
        self.getGroups(fn);
      },
      variables_: (fn) => {
        self.getVariables(fn);
      },
      custom_variables_: (fn) => {
        self.getCustomVariables(fn);
      },
      units_: (fn) => {
        self.getUnits(fn);
      }
    }, (err, res) => {
      if (err) {
        console.log('Ocurrió un error al obtener la información de las variables y grupos');
        return;
      }

      let item = self.props.item;
      let groups = res.groups_;
      let variables = res.variables_;
      let custom_variables = res.custom_variables_;
      let units = res.units_;

      let devices = self.getDevices(variables, custom_variables);

      let structure = item.structure;
      if (!structure) {
        structure = [];
      } else {
        structure = self.insertUnits(structure, units);
      }

      let name = item.name;
      if (!name) {
        name = 'N/A';
      }

      let inputName = document.querySelector('#input-name');
      inputName.value = name;

      self.setState({
        report: structure,
        groups_: groups,
        variables_: variables,
        custom_variables_: custom_variables,
        units_: units,
        devices_: devices,
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
        fn(null, res.docs);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        fn(res.message);

      } else {
        fn(constants.MESSAGE_ERROR);
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
        fn(null, res.docs);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        fn(res.message);

      } else {
        fn(constants.MESSAGE_ERROR);
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
      if (response.status == constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        fn(res.message);

      } else {
        fn(constants.MESSAGE_ERROR);
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
        fn(null, res.docs);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        fn(res.message);

      } else {
        fn(constants.MESSAGE_ERROR);
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
      let report = self.state.report;
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
          let isR = self.isRepeated(report, groupInsert)
          if (!isR) {
            report.push(groupInsert);
            self.setState({ report: report });
          }
        }

      } else {
        if (line.length > 0) {
          report = self.insertGroup(report, line, 0, groupInsert);

          self.setState({ report: report });
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
      let report = self.state.report;
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
          report = self.insertVariable(report, line, 0, variableInsert);

          self.setState({ report: report });
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
      let report = self.state.report;
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
            is_custom: true
          };

          break;
        }
      }

      if (line) {
        if (line.length > 0) {
          report = self.insertVariable(report, line, 0, variableInsert);

          self.setState({ report: report });
        }
      }
    };

    return fn;
  }

  handleSelected() {
    let self = this;

    let fn = (value) => {
      let report = self.state.report;

      if (value.length > 0) {
        report = self.selectedGroup(report, value, 0, true);

        self.setState({ report: report, line: value });
      }
    };

    return fn;
  }

  handleDeselected() {
    let self = this;

    let fn = (value) => {
      let report = self.state.report;

      if (value.length > 0) {
        report = self.selectedGroup(report, value, 0, false);

        self.setState({ report: report, line: [] });
      }
    };

    return fn;
  }

  handleRemove() {
    let self = this;

    let fn = (value) => {
      let report = self.state.report;

      if (value.length > 0) {
        report = self.removeGroup(report, value, 0);

        let line = self.state.line;
        let isEqual = self.isEqualLines(value, line);
        if (isEqual) {
          self.setState({ report: report, line: [] });
          return;
        }

        self.setState({ report: report });
      }
    };

    return fn;
  }

  handleRemoveVariable() {
    let self = this;

    let fn = (value) => {
      let report = self.state.report;

      if (value.length > 0) {
        report = self.removeVariable(report, value, 0);

        self.setState({ report: report });
      }
    };

    return fn;
  }

  handleChangeUnit() {
    let self = this;

    let fn = (value) => {
      let report = self.state.report;

      if (value.length > 0) {
        report = self.updateVariable(report, value, 0);

        self.setState({ report: report });
      }
    };

    return fn;
  }

  handleUpdate() {
    let self = this;

    let fn = () => {
      let report = self.state.report;

      let o = this.getMinJSON(report);

      let inputName = document.querySelector('#input-name');

      let name = inputName.value.trim();

      if (name == '') {
        let message = 'El nombre del reporte es requerido';
        Materialize.toast(message, 2500);
        return;
      }

      if (o.length == 0) {
        let message = 'La estructura del reporte esta vacia';
        Materialize.toast(message, 2500);
        return;
      }

      let item = self.props.item;
      if (!item) {
        let message = 'Existe un error con la información del reporte';
        Materialize.toast(message, 2500);
        return;
      }

      let id = item.id;

      let json = {
        name: name,
        structure_json: o
      };

      let formData = new FormData();
      let file = self.state.file;
      if (file) {
        formData.append(constants.TEMPLATE, file);
      }

      formData.append('json', JSON.stringify(json));

      self.setState({ file: false }, () => {
        self.props.onUpdate(formData, id);
      });
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

  insertUnits(groups, units) {
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (g.variables) {
        for (let j = 0; j < g.variables.length; j++) {
          groups[i].variables[j].units = units;
        }
      }

      if (g.sons) {
        groups[i].sons = this.insertUnits(g.sons, units);
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

      let inputCell = document.querySelector(`#cell-group-${g.id}`);
      if (inputCell) {
        let cell = inputCell.value.trim();
        if (cell != '') {
          o.cell = cell;
        }
      }

      let inputPage = document.querySelector(`#page-group-${g.id}`);
      if (inputPage) {
        let page = inputPage.value.trim();
        if (page != '') {
          o.page = parseInt(page);
        }
      }

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

          let inputCell = document.querySelector(`#cell-${prefix}-${v.id}`);
          if (inputCell) {
            let cell = inputCell.value.trim();
            if (cell != '') {
              vInsert.cell = cell.toUpperCase();
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

  handleChangeFile() {
    let self = this;

    let fn = (evt) => {
      let file = evt.target.files[0];
      if (file) {
        let name = file.name;
        let size = name.length;
        let start = size - 4;
        let extension = name.substring(start, size)
        if (extension !== 'xlsx') {
          let message = 'Formato invalido';
          Materialize.toast(message, 2500);
          return;
        }

        self.state.file = file;
      }
    };

    return fn;
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
        <h5>Editar Reporte</h5>

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
                    <input type="text" id="input-name" placeholder="Reporte" />
                  </div>
                  <div className="col m4">
                    <button type="button" className="btn green" onClick={this.handleUpdate()}>
                      <i className="material-icons">save</i>
                    </button>
                  </div>
                  <div className="col s12 m12">
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>Template (.xlsx)</span>
                        <input type="file" id="input-u-template" lang="es" onChange={this.handleChangeFile()} />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                {state.report.map(this.createItem())}
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default UpdatePanel;
