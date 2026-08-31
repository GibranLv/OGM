import { h, render, Component } from 'preact';

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
      geomap: [],
      line: []
    };
  }

  componentDidMount() {
    let self = this;

    this.getVariables();
    this.getCustomVariables();
    this.getGroups();
    this.getUnits();
  }

  getGroups() {
    let self = this;

    let url = `${constants.URL_SERVER_GROUPS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ groups_: res.docs });

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

  getCustomVariables() {
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

  getUnits() {
    let self = this;

    let url = `${constants.URL_SERVER_UNITS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ units_: res.docs });

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
      let geomap = self.state.geomap;
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
          let isR = self.isRepeated(geomap, groupInsert)
          if (!isR) {
            geomap.push(groupInsert);
            self.setState({ geomap: geomap });
          }
        }

      } else {
        if (line.length > 0) {
          geomap = self.insertGroup(geomap, line, 0, groupInsert);

          self.setState({ geomap: geomap });
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
      let geomap = self.state.geomap;
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
          geomap = self.insertVariable(geomap, line, 0, variableInsert);

          self.setState({ geomap: geomap });
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
      let geomap = self.state.geomap;
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
          geomap = self.insertVariable(geomap, line, 0, variableInsert);

          self.setState({ geomap: geomap });
        }
      }
    };

    return fn;
  }   

  handleSelected() {
    let self = this;

    let fn = (value) => {
      let geomap = self.state.geomap;

      if (value.length > 0) {
        geomap = self.selectedGroup(geomap, value, 0, true);

        self.setState({ geomap: geomap, line: value });
      }
    };

    return fn;
  }

  handleDeselected() {
    let self = this;

    let fn = (value) => {
      let geomap = self.state.geomap;

      if (value.length > 0) {
        geomap = self.selectedGroup(geomap, value, 0, false);

        self.setState({ geomap: geomap, line: [] });
      }
    };

    return fn;
  }

  handleRemove() {
    let self = this;

    let fn = (value) => {
      let geomap = self.state.geomap;

      if (value.length > 0) {
        geomap = self.removeGroup(geomap, value, 0);

        let line = self.state.line;
        let isEqual = self.isEqualLines(value, line);
        if (isEqual) {
          self.setState({ geomap: geomap, line: [] });
          return;
        }

        self.setState({ geomap: geomap });
      }
    };

    return fn;
  }

  handleRemoveVariable() {
    let self = this;

    let fn = (value) => {
      let geomap = self.state.geomap;

      if (value.length > 0) {
        geomap = self.removeVariable(geomap, value, 0);

        self.setState({ geomap: geomap });
      }
    };

    return fn;
  }

  handleChangeUnit() {
    let self = this;

    let fn = (value) => {
      let geomap = self.state.geomap;

      if (value.length > 0) {
        geomap = self.updateVariable(geomap, value, 0);

        self.setState({ geomap: geomap });
      }
    };

    return fn;
  }

  handleCreate() {
    let self = this;

    let fn = () => {
      let geomap = self.state.geomap;

      let o = this.getMinJSON(geomap);

      let inputName = document.querySelector('#input-name');

      let name = inputName.value.trim();

      if (name == '') {
        alert('El nombre del geomapa es requerido');
        return;
      }

      if (o.length == 0) {
        alert('La estructura de la matriz esta vacia');
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

          let inputName = document.querySelector(`#name-${v.id}`);
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
      return <option key={index} value={item.id}>{item.name}</option>
    };

    return fn;
  }

  createOptVariable() {
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.device}.{item.name}</option>
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
        <h5>Crear Geomapa</h5>

        <div className="row">

          <div className="col m1">
            <button type="button" className="btn blue" onClick={this.handleBack()}>
              <i className="material-icons">arrow_back</i>
            </button>
          </div>

          <div className="col m3">
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

          <div className="col m12">
            <div>
              <div className="sion-cu-panel">
                <div className="row">
                  <div className="col m8">
                    <input type="text" id="input-name" placeholder="GeoMapa" />
                  </div>
                  <div className="col m4">
                    <button type="button" className="btn green" onClick={this.handleCreate()}>
                      <i className="material-icons">save</i>
                    </button>
                  </div>
                </div>
                <br />
                {state.geomap.map(this.createItem())}
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default CreatePanel;
