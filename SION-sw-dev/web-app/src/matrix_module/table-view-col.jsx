import { h, render, Component } from 'preact';
import { isObject, isString, isNumber } from 'underscore';
import TableItemColVariable from './table-item-col-variable.jsx';


class TableViewCol extends Component {

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
        if (f) f(variable);
      }
    };

    return fn;
  }

  handleListView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onListView;
      if (f) f();
    }

    return fn;
  }

  handleListViewMin() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onListViewMin;
      if (f) f();
    }

    return fn;
  }

  handleTableView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onTableView;
      if (f) f();
    }

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

  handleLogAlarmsView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onLogAlarmsView;
      if (f) f();
    };

    return fn;
  }


  createItemGroup(max, names, namesOnly, size) {
    let self = this;

    let fn = (group, index) => {
      group.max = max;

			/*let namesIn = clone(names);

			if (namesIn.length == 0) {
				if (namesOnly && size) {
					let name = namesOnly[index];
					for (let i = 1; i < size; i++) {
						namesIn.push(name);
					}
				}
			}*/
      
      return <TableItemColVariable key={index} group={group} names={names}
        onOpenCommentGroup={self.handleOpenCommentGroup()}
        onOpenCommentVariable={self.handleOpenCommentVariable()}
        onChangeSoundVariable={self.handleChangeSoundVariable()} />;
    }

    return fn;
  }

  createTitleGroup() {
    let fn = (title, index) => {
      if (isObject(title)) {
        return;
      }

      let value = title.indexOf('FLUJO GAS');
      if (value == 0) {
        title = title.replace('FLUJO GAS', '');
        title = title.replace('(MMPCD)', '');
        return <th rowSpan="1" key={index}>{title}</th>;
      }

			if (window.SYSTEM_HOST !== 'scada.technotex.com' && window.SYSTEM_HOST !== 'sepec.technotex.com') {
				value = title.indexOf('TEMP');
				if (value == 0) {
					title = title.replace('TEMP', '');
					title = title.replace('(°F)', '');
					return <th rowSpan="1" key={index}>{title}</th>;
				}
			}

      return;
    };

    return fn;
  }

  createTitle(hasFG, hasTEMP, flows, temps) {
    let fn = (title, index) => {
      if (isObject(title)) {

        if (title.name === 'COMENTARIO') {
          let styleComment = { width: '225px' };
          return <th colSpan={title.colSpan} rowSpan="2" className={title.className} key={index} style={styleComment}>{title.name}</th>;
        }

        return <th colSpan={title.colSpan} rowSpan="2" className={title.className} key={index}>{title.name}</th>;
      }

      let value = title.indexOf('FLUJO GAS');
      if (value === 0) {
        if (!hasFG) {
          hasFG = true;

          return <th rowSpan="1" colSpan={flows} key={index}>FLUJO DE GAS (MMPCD)</th>;
        }

        return;
      }

			if (window.SYSTEM_HOST !== 'scada.technotex.com' && window.SYSTEM_HOST !== 'sepec.technotex.com') {
				value = title.indexOf('TEMP');
				if (value === 0) {
					if (!hasTEMP) {
						hasTEMP = true;

						return <th rowSpan="1" colSpan={temps} key={index}>TEMPERATURA DE (°F)</th>;
					}

					return;
				}
			}

      return <th key={index} rowSpan="2">{title}</th>;
    };

    return fn;
  }

  createTitleSimple() {
    let fn = (title, index) => {
      if (isObject(title)) {
        return <th colSpan={title.colSpan} rowSpan="1" className={title.className} key={index}>{title.name}</th>;
      }

      return <th key={index} rowSpan="1">{title}</th>;
    }

    return fn;
  }

  hasVPE (names) {
    let count = 0;
    let size = names.length;
    for (let i = 0; i < size; i++) {
      const name = names[i];
      if (name.indexOf('VOLTAJE') >= 0 || name.indexOf('PRESION ESTATICA') >= 0) {
        count = count + 1;

      } else {
        count = count - 1;
      } 
    }

    return count === 2;   
  }

  getVariablesOrders() {
    let s = this.props.structure;
    if (!s) {
      s = [];
    }

    let titles = this.getVariables(s);
    return titles;
  }

  getVariables(sons) {
    let names = [];

    for (let i = 0; i < sons.length; i++) {
      let son = sons[i];

      if (son.variables) {
        for (let j = 0; j < son.variables.length; j++) {
          let variable = son.variables[j];
          let variable_name = variable.name;
          if (variable.rename) {
            variable_name = variable.rename;
          }

          let variable_display = '';
          if (variable.display) {
            variable_display = variable.display;
          } else {
            variable_display = variable.unit;
          }

          if (variable_display === 'BOOL') {
            variable_display = '';
          }

          if (variable_display === 'MAP CP' || variable_display === 'MAP CP II' || variable_display === 'MAP CP III' || variable_display === 'MAP CP IV') {
            variable_display = '';
          }

          if (variable_display) {
            variable_name = `${variable_name} (${variable_display})`;
          }

          names.push(variable_name);
        }
      }

      if (son.sons) {
        let namesOut = this.getVariables(son.sons);
        for (let j = 0; j < namesOut.length; j++) {
          let nameOut = namesOut[j];
          names.push(nameOut);
        }
      }
    }

    return names;
  }

  getDevices(sons) {
    let names = [];

    for (let i = 0; i < sons.length; i++) {
      let son = sons[i];

      if (son.variables) {
        for (let j = 0; j < son.variables.length; j++) {
          let variable = son.variables[j];
          let device = variable.device;

          names.push(device); 
        }
      }

      if (son.sons) {
        let namesOut = this.getDevices(son.sons);
        for (let j = 0; j < namesOut.length; j++) {
          let nameOut = namesOut[j];
          names.push(nameOut);
        }
      }
    }

    return names;
  }

  getGroups(sons) {
    let groups = [];

    for (let i = 0; i < sons.length; i++) {
      let son = sons[i];

      let group = {
        id: son.id,
        name: son.name,
        type: son.type,
        comment: son.comment,
      };

      if (son.variables) {
        group.variables = son.variables;
      }

      let insertInSon = false;

      if (son.sons) {
        if (son.sons.length > 0) {
          let groupsOut = this.getGroups(son.sons);
          if (groupsOut.length > 0) {
            groupsOut[0]._group = group;
            insertInSon = true;

            for (let j = 0; j < groupsOut.length; j++) {
              const groupOut = groupsOut[j];
              groups.push(groupOut);
            }
          }
        }
      }

      if (!insertInSon) {
        groups.push(group);
      }
    }

    return groups;
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

  getMaximun(groups) {
    let value = 0;
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      let tds = this.getItems(group);
      if (tds.length > value) {
        value = tds.length;
      }
    }

    return value;
  }

  getOnlyUnique() {
    let fn = (value, index, self) => {
      return self.indexOf(value) === index;
    }

    return fn;
  }

  getCols(names, prefix) {
    let cols = 0;

    let size = names.length;
    for (let i = 0; i < size; i++) {
      let name = names[i];
      if (isString(name)) {
        let value = name.indexOf(prefix);
        if (value === 0) {
          cols = cols + 1;
        }
      }
    }

    return cols;
  }

  render(props, state) {
    let hasFG = false;
    let hasTEMP = false;

    let s = props.structure;
    if (!s) {
      s = [];
    }

    let groups = this.getGroups(s);

    let max = this.getMaximun(groups);

    let allNames = this.getVariablesOrders();

    let namesOut = allNames.filter(this.getOnlyUnique())

    let colSpan = max
    if (colSpan == 0) {
      colSpan = 1
    }

    let hasVPE = this.hasVPE(namesOut);
    if (hasVPE) {
      let installations = [{ name: 'VARIABLES', colSpan: colSpan, className: 'TitleVar' }];

      let installationsOut = this.getDevices(s);
      installationsOut = installationsOut.filter(this.getOnlyUnique());

      installations = installations.concat(installationsOut);

      let first = "DashInter";
      if (isNumber(this.props.first)) {
        if (this.props.first != 0) {
          first = "DashInter DashInterNone"
        }
      }

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
              <li onClick={this.handleTableView()}>
                <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla" href="#">
                  <i className="material-icons">view_comfy</i>
                </a>
              </li>
              <li>
                <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla de Columnas" href="#">
                  <i className="material-icons">view_week</i>
                </a>
              </li>
              <li onClick={this.handleChartView()}>
                <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista de Grafica" href="#">
                  <i className="material-icons">show_chart</i>
                </a>
              </li>
              <li onClick={this.handleLogAlarmsView()}>
                <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista de Alarmas" href="#">
                  <i className="material-icons">announcement</i>
                </a>
              </li>
            </ul>
          </div>

          <div className={first}>
            <table className="responsive-table table-static" style="border-collapse: collapse;">
              <thead>
                <tr>
                  {installations.map(this.createTitleSimple())}
                </tr>
              </thead>
              <tbody>
                {groups.map(this.createItemGroup(max, [], namesOut, installations.length))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    let names = [{ name: 'INSTALACION', colSpan: colSpan, className: 'TitleVar' }];

    names = names.concat(namesOut);

    if (window.COMMENT_COLUMN) names.push({ name: 'COMENTARIO', colSpan: colSpan });

    let flows = this.getCols(names, 'FLUJO GAS');
    let temps = this.getCols(names, 'TEMP');

    let first = "DashInter";
    if (isNumber(this.props.first)) {
      if (this.props.first != 0) {
        first = "DashInter DashInterNone"
      }
    }

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
            <li onClick={this.handleTableView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla" href="#">
                <i className="material-icons">view_comfy</i>
              </a>
            </li>
            <li>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla de Columnas" href="#">
                <i className="material-icons">view_week</i>
              </a>
            </li>
            <li onClick={this.handleChartView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista de Grafica" href="#">
                <i className="material-icons">show_chart</i>
              </a>
            </li>
            <li onClick={this.handleLogAlarmsView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista de Alarmas" href="#">
                <i className="material-icons">announcement</i>
              </a>
            </li>
          </ul>
        </div>

        <div className={first}>
          <table className="responsive-table table-static" style="border-collapse: collapse;">
            <thead>
              <tr>
                {names.map(this.createTitle(hasFG, hasTEMP, flows, temps))}
              </tr>
              <tr>
                {names.map(this.createTitleGroup())}
              </tr>
            </thead>
            <tbody>
              {groups.map(this.createItemGroup(max, namesOut))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableViewCol;
