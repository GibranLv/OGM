import React from 'react';
import { parallel } from 'async';
import { clone } from 'underscore';

import MatricesCardItemGroup from './Matrices-CardItemGroup.js';

import constants from '../constants';

class MatricesUpdatePanel extends React.Component {

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

    this.nameRef = React.createRef();
    this.deviceRef = React.createRef();
    this.groupRef = React.createRef();
    this.customVariableRef = React.createRef();
    this.variableRef = React.createRef();
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
    },
    (err, res) => {
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

      let inputName = self.nameRef.current;
      inputName.value = name;

      self.setState({
        matrix: structure,
        groups_: groups,
        variables_: variables,
        custom_variables_: custom_variables,
        units_: units,
        devices_: devices,
      });
    });
  }

  getGroups(fn) {
    let url = `${constants.URL_SERVER_GROUPS}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
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
    let url = `${constants.URL_SERVER_VARIABLES}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
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
    let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
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
    let url = `${constants.URL_SERVER_UNITS}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
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
        if (variable.device === device) {
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
        if (variable.device === device) {
          isNew = false;
          break;
        }
      }

      if (isNew) devices.push(variable.device);
    }

    return devices;
  }

  handleInsertGroup() {
    let self = this;

    let fn = () => {
      let inputGroup = self.groupRef.current;
      let value = inputGroup.value;
      let vInt = parseInt(value);

      let line = self.state.line;
      let matrix = self.state.matrix;
      let groups = self.state.groups_;
      let groupInsert = false;

      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if (group.id === vInt) {
          groupInsert = { id: group.id, name: group.name, isSelected: false };
          break;
        }
      }

      if (line.length === 0) {
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
      let inputVariable = self.variableRef.current;
      let value = inputVariable.value;
      let vInt = parseInt(value);

      let line = self.state.line;
      let matrix = self.state.matrix;
      let variables = self.state.variables_;
      let variableInsert = false;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id === vInt) {
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
      let inputVariable = self.customVariableRef.current;
      let value = inputVariable.value;
      let vInt = parseInt(value);

      let line = self.state.line;
      let matrix = self.state.matrix;
      let variables = self.state.custom_variables_;
      let variableInsert = false;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (variable.id === vInt) {
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

  handleRemoveGroup() {
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

  handleNextGroup() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.nextGroup(matrix, value, 0);

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

  handleBackGroup() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.backGroup(matrix, value, 0);

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


  handleNextVariable() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.nextVariable(matrix, value, 0);

        self.setState({ matrix: matrix });
      }
    };

    return fn;
  }

  handleBackVariable() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.backVariable(matrix, value, 0);

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
        matrix = self.updateVariableUnit(matrix, value, 0);

        self.setState({ matrix: matrix });
      }
    };

    return fn;
  }

  handleChangeRename() {
    let self = this;

    let fn = (value) => {
      let matrix = self.state.matrix;

      if (value.length > 0) {
        matrix = self.updateVariableRename(matrix, value, 0);

        self.setState({ matrix: matrix });
      }
    };

    return fn;
  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let matrix = self.state.matrix;

      let o = this.getMinJSON(matrix);

      let inputName = self.nameRef.current;

      let name = inputName.value.trim();

      if (name === '') {
        let message = 'El nombre de la Matriz es requerido';
        window.Materialize.toast(message, 2500);
        return;
      }

      if (o.length === 0) {
        let message = 'La estructura de la matriz esta vacia';
        window.Materialize.toast(message, 2500);
        return;
      }

      let item = self.props.item;
      if (!item) {
        let message = 'Existe un error con la información de la Matriz';
        window.Materialize.toast(message, 2500);
        return;
      }

      let id = item.id;

      let json = {
        name: name,
        structure_json: o
      };

      self.props.onUpdate(json, id);
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

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
      if (g.id === id) {
        if (last === index) {
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
      if (g.id === id) {
        if (last === index) {
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

  nextGroup(groups, line, index) {
    let id = line[index];
    if (!id) {
      return groups;
    }

    let size = groups.length;
    let last = line.length - 1;
    for (let i = 0; i < size; i++) {
      let g = groups[i];
      if (g.id === id) {
        if (last === index) {
          let lastPosition = size - 1;
          console.log(i, lastPosition)
          if (i < lastPosition) {
            let gClone = clone(g);

            let gNext = groups[i + 1];
            let gNextClone = clone(gNext);

            groups[i] = gNextClone;
            groups[i + 1] = gClone;
          }

          break;

        } else {
          if (g.sons) {
            groups[i].sons = this.nextGroup(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  backGroup(groups, line, index) {
    let id = line[index];
    if (!id) {
      return groups;
    }

    let size = groups.length;
    let last = line.length - 1;
    for (let i = 0; i < size; i++) {
      let g = groups[i];
      if (g.id === id) {
        if (last === index) {
          console.log(i)
          if (i > 0) {
            let gClone = clone(g);

            let gBack = groups[i - 1];
            let gBackClone = clone(gBack);

            groups[i] = gBackClone;
            groups[i - 1] = gClone;
          }

        } else {
          if (g.sons) {
            groups[i].sons = this.backGroup(g.sons, line, index + 1);
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

      if (last === index) {
        if (g.id === id) {
          let variables = g.variables;
          if (variables) {
            let o = line[index + 1];

            for (let j = 0; j < variables.length; j++) {
              let v = variables[j];
              if (v.id === o.variable_id) {
                if (v.is_custom === o.is_custom) {
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
        if (g.id === id) {
          if (g.sons) {
            groups[i].sons = this.removeVariable(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  nextVariable(groups, line, index) {
    let id = line[index];
    if (!id) {
      return;
    }

    let last = line.length - 2;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (last === index) {
        if (g.id === id) {
          let variables = g.variables;
          if (variables) {
            let o = line[index + 1];

            let size = variables.length;
            for (let j = 0; j < size; j++) {
              let v = variables[j];
              if (v.id === o.variable_id) {
                if (v.is_custom === o.is_custom) {
                  let lastPosition = size - 1;
                  if (j < lastPosition) {
                    let vClone = clone(v);
                    let vNext = variables[j + 1];
                    let vNextClone = clone(vNext)

                    groups[i].variables[j] = vNextClone;
                    groups[i].variables[j + 1] = vClone;
                  }

                  break;
                }
              }
            }

            return groups;
          }
        }

      } else {
        if (g.id === id) {
          if (g.sons) {
            groups[i].sons = this.nextVariable(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  backVariable(groups, line, index) {
    let id = line[index];
    if (!id) {
      return;
    }

    let last = line.length - 2;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (last === index) {
        if (g.id === id) {
          let variables = g.variables;
          if (variables) {
            let o = line[index + 1];

            for (let j = 0; j < variables.length; j++) {
              let v = variables[j];
              if (v.id === o.variable_id) {
                if (v.is_custom === o.is_custom) {
                  if (j > 0) {
                    let vClone = clone(v);

                    let vBack = variables[j - 1];
                    let vBackClone = clone(vBack);

                    groups[i].variables[j] = vBackClone;
                    groups[i].variables[j - 1] = vClone;
                  }

                  break;
                }
              }
            }

            return groups;
          }
        }

      } else {
        if (g.id === id) {
          if (g.sons) {
            groups[i].sons = this.backVariable(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  updateVariableUnit(groups, line, index) {
    let id = line[index];
    if (!id) {
      return;
    }

    let last = line.length - 2;

    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (last === index) {
        if (g.id === id) {
          let variables = g.variables;
          if (variables) {
            let o = line[index + 1];
            for (let j = 0; j < variables.length; j++) {
              let v = variables[j];
              if (v.id === o.variable_id) {
                if (v.is_custom === o.is_custom) {
                  groups[i].variables[j].unit_id = o.unit_id;
                  break;
                }
              }
            }

            return groups;
          }
        }

      } else {
        if (g.id === id) {
          if (g.sons) {
            groups[i].sons = this.updateVariableUnit(g.sons, line, index + 1);
          }
        }
      }
    }

    return groups;
  }

  updateVariableRename(groups, line, index) {
    let id = line[index];
    if (!id) {
      return;
    }

    let last = line.length - 2;
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i];

      if (last === index) {
        if (g.id === id) {
          let variables = g.variables;
          if (variables) {
            let o = line[index + 1];
            for (let j = 0; j < variables.length; j++) {
              let v = variables[j];
              if (v.id === o.variable_id) {
                if (v.is_custom === o.is_custom) {
                  groups[i].variables[j].rename = o.rename;

                  break;
                }
              }
            }

            return groups;
          }
        }

      } else {
        if (g.id === id) {
          if (g.sons) {
            groups[i].sons = this.updateVariableRename(g.sons, line, index + 1);
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

      if (g.id === id) {
        if (last === index) {
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
      if (g.id === id) {
        if (last === index) {
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
      if (element.id === insert.id) {
        return true;
      }
    }

    return false;
  }

  isRepeatedVariable(elements, insert) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id === insert.id) {
        if (element.is_custom === insert.is_custom) {
          return true
        }
      }
    }

    return false;
  }

  isEqualLines(a, b) {
    let sizeA = a.length;
    let sizeB = b.length;

    if (sizeA !== sizeB) {
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
        group_id: g.id,
      };

      if (g.sons) {
        o.sons = this.getMinJSON(g.sons);
      }

      if (g.variables) {
        let variables = [];

        for (let j = 0; j < g.variables.length; j++) {
          const v = g.variables[j];
          let vInsert = { id: v.id, unit_id: v.unit_id, is_custom: v.is_custom };

          if (v.rename !== '') {
            if (v.rename) {
              vInsert.name = v.rename;
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
    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.name} - {item.type}</option>
    };

    return fn;
  }

  createOptDevice() {
    let fn = (item, index) => {
      return <option key={index} value={item}>{item}</option>
    };

    return fn;
  }

  createOptVariable() {
    let self = this;

    let fn = (item, index) => {
      let device = self.state.device;
      if (device === item.device) {
        return <option key={index} value={item.id}>{item.name}</option>
      }

      return;
    };

    return fn;
  }

  createItem() {
    let self = this;

    let fn = (item, index) => {
      return <MatricesCardItemGroup key={index} group={item}
        onSelected={self.handleSelected()}
        onDeselected={self.handleDeselected()}
        onRemove={self.handleRemoveGroup()}
        onNextGroup={self.handleNextGroup()}
        onBackGroup={self.handleBackGroup()}
        onRemoveVariable={self.handleRemoveVariable()}
        onNextVariable={self.handleNextVariable()}
        onBackVariable={self.handleBackVariable()}
        onChangeUnit={self.handleChangeUnit()}
        onChangeRename={self.handleChangeRename()} />;
    };

    return fn;
  }

  render() {
    return (
      <section>
        <h5>Editar Matriz</h5>

        <div className="row">

          <div className="col m1">
            <button type="button" className="btn blue" onClick={this.handleBack()}>
              <i className="material-icons">arrow_back</i>
            </button>
          </div>

          <div className="col m2">
            <div className="row">
              <div className="col m8">
                <select className="browser-default sion-select" id="input-group" ref={this.groupRef}>
                  <option>Grupos</option>
                  {this.state.groups_.map(this.createOptGroup())}
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
                <select className="browser-default sion-select" id="input-device" ref={this.deviceRef} onChange={this.handleChangeDevice()}>
                  <option>Dispositivos</option>
                  {this.state.devices_.map(this.createOptDevice())}
                </select>
              </div>
            </div>
          </div>

          <div className="col m3">
            <div className="row">
              <div className="col m8">
                <select className="browser-default sion-select" id="input-variable" ref={this.variableRef}>
                  <option>Variables</option>
                  {this.state.variables_.map(this.createOptVariable())}
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
                <select className="browser-default sion-select" id="input-custom-variable" ref={this.customVariableRef}>
                  <option>Variables personalizadas</option>
                  {this.state.custom_variables_.map(this.createOptVariable())}
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
                    <input type="text" id="input-name" placeholder="Matriz" ref={this.nameRef} />
                  </div>
                  <div className="col m4">
                    <button type="button" className="btn green" onClick={this.handleUpdate()}>
                      <i className="material-icons">save</i>
                    </button>
                  </div>
                </div>
                <br />
                {this.state.matrix.map(this.createItem())}
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default MatricesUpdatePanel;
