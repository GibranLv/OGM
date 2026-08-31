import { h, render, Component } from 'preact';

import TableItemVariable from './table-item-variable.jsx';

class TableView extends Component {

  constructor(props) {
    super(props);

  }

  handleOpenCommentGroup() {
    let self = this;

    let fn = (group) => {
      if (group) {
        let f = self.props.onOpenCommentGroup
        if (f) f(group);
      }
    };

    return fn;
  }

  handleOpenCommentVariable() {
    let self = this;

    let fn = (variable) => {
      if (variable) {
        let f = self.props.onOpenCommentVariable;
        if (f) f(variable);
      }
    };

    return fn;
  }

  handleChangeSoundVariable() {
    let self = this;

    let fn = (variable) => {
      if (variable) {
        let f = self.props.onChangeSoundVariable;
        console.log(f);
        if (f) f(variable);
      }
    };

    return fn;
  }

  handleChartView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onChartView;
      if (f) f();
    }

    return fn;
  }

  handleListView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onListView;
      if (f) f();
    }

    return fn;
  }

  handleListViewMin() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onListViewMin;
      if (f) f();
    }

    return fn;
  }

  handleTableViewCol() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onTableViewCol;
      if (f) f();
    }

    return fn;
  }

  createItemVariable(max) {
    let self = this;

    let fn = (variable, index) => {
      variable.max = max;

      return <TableItemVariable key={index} variable={variable}
                onOpenCommentGroup={self.handleOpenCommentGroup()}
                onOpenCommentVariable={self.handleOpenCommentVariable()}
                onChangeSoundVariable={self.handleChangeSoundVariable()} />;
    }

    return fn;
  }

  getVariables(sons) {
    let variables = [];

    for (let i = 0; i < sons.length; i++) {
      let son = sons[i];

      if (son.sons) {
        if (son.sons[0]) {
          son.sons[0]._group = {
            id: son.id,
            name: son.name,
            type: son.type,
            comment: son.comment,
          };
        }

        let variablesOut = this.getVariables(son.sons)
        for (let j = 0; j < variablesOut.length; j++) {
          const variableOut = variablesOut[j];
          variables.push(variableOut);
        }
      }

      if (son.variables) {
        for (let j = 0; j < son.variables.length; j++) {
          let variable = son.variables[j];

          if (j == 0) {
            variable._group = {
              id: son.id,
              name: son.name,
              type: son.type,
              comment: son.comment,
            };

            if (son._group) {
              let group = son._group;
              variable._group._group = {
                id: group.id,
                name: group.name,
                type: group.type,
                comment: group.comment,
              };
            }
          }

          variable.is_variable = true;
          variables.push(variable);
        }
      }
    }

    return variables;
  }

  getItems(o) {
    let tds = [];

    let hasGroup = false;
    for (const key in o) {
      if (o.hasOwnProperty(key)) {
        if (key == '_group') {
          hasGroup = true;
          break;
        }
      }
    }

    if (hasGroup) {
      tds = this.getItems(o._group);
    }

    let i = {
      id: o.id,
      name: o.name
    };

    tds.push(i);

    return tds;
  }

  getMaximun(variables) {
    let value = 0;
    for (let i = 0; i < variables.length; i++) {
      const variable = variables[i];
      let tds = this.getItems(variable);
      if (tds.length > value) {
        value = tds.length;
      }
    }

    return value;
  }

  render(props, state) {
    let s = props.structure;
    if (!s) {
      s = [];
    }

    let variables = this.getVariables(s);

    let max = this.getMaximun(variables);

    return (
      <div className="col s12 m12 body_int">
        <div className="fixed-action-btn horizontal click-to-toggle">
          <a className="btn-floating btn-large btn_ttx_rojo pulse">
            <i className="material-icons">visibility</i>
          </a>
          <ul>
            <li onClick={this.handleListView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista Avanzada" href="#">
                <i className="material-icons">view_list</i>
              </a>
            </li>
            <li onClick={this.handleListViewMin()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista Clasica" href="#">
                <i className="material-icons">list</i>
              </a>
            </li>
            <li>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla" href="#">
                <i className="material-icons">view_comfy</i>
              </a>
            </li>
            <li onClick={this.handleTableViewCol()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla de Columnas" href="#">
                <i className="material-icons">view_week</i>
              </a>
            </li>
            <li onClick={this.handleChartView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista de Grafica" href="#">
                <i className="material-icons">show_chart</i>
              </a>
            </li>
          </ul>
        </div>

        <table class="table table-bordered" style="border-collapse: collapse;">
          <tbody style="border: 1px solid rgba(255, 255, 255, 0.4);">
            {variables.map(this.createItemVariable(max))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default TableView;