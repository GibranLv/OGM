import { h, render, Component } from 'preact';
import { isNumber, isString } from 'underscore';

class ListViewVariableInlineMin extends Component {

  constructor(props) {
    super(props);

  }

  handleShowOptions() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variable = self.props.variable;

      let f = self.props.onShowOptions;
      if (f) f(variable);
    };

    return fn;
  }

  replaceAll(s, old, n) {
    s = s.replace(old, n);

    let i = s.indexOf(old);
    if (i >= 0) {
      this.replaceAll(s, old, n);
    }

    return s
  }

  render(props, state) {
    let variable = props.variable;

    let variable_id = variable.id;
    let variable_value = variable.value;
    let variable_timestamp = variable.timestamp;

    let hasConversion = isString(variable.expression) && isString(variable.display) && isNumber(variable_value);
    if (hasConversion) {
      let expression = this.replaceAll(variable.expression, '${value}', variable_value);
      try {
        let v = math.eval(expression);

        let str = `${v}`;
        let iPoint = str.indexOf('.');
        if (iPoint == -1) {
          iPoint = str.length - 4;
        }

        let nValue = math.format(v, { precision: iPoint + 4 });
        variable_value = nValue;

      } catch (e) {
        variable_value = '¿¿??';
      }
    }

    let variable_color = variable.color;
    let variable_name = variable.name;

    let variable_display = '';

    if (variable.display) {
      variable_display = variable.display;
    } else {
      variable_display = variable.unit;
    }

    if (variable.rename) {
      variable_name = variable.rename;
    }

    let urlQuick = `/charts/${variable_id}`;
    if (variable.is_custom) {
      urlQuick = `/charts/${variable_id}/true`;
    }

    if (variable_display === 'BOOL') {
      if (variable_value > 0) {
        variable_value = 'ACTIVO';
      } else {
        variable_value = 'INACTIVO';
      }

      variable_display = '';
    }

    if (variable_display === 'MAP CP') {
      let description = CP_MAPS[variable_value];
      if (description) {
        variable_value = description;
      } else {
        variable_value = 'N/A';
      }

      variable_display = '';
    }

    if (variable_display === 'MAP CP II') {
      let description = CP_MAPS_II[variable_value];
      if (description) {
        variable_value = description;
      } else {
        variable_value = 'N/A';
      }

      variable_display = '';
    }

    if (variable_value === ' ') {
      variable_value = '0';
    }

    if (variable_value === '0' || variable_value === 0) {
      variable_value = <span style="color: #F2ED0A !important;">{variable_value}</span>
    }

    return (
      <div className="variable" style={`background-color: ${variable_color};`} onClick={this.handleShowOptions()}>
        <table>
          <tbody>
            <tr>
              <td style="padding: 0px;">
                <a href={urlQuick} style="color: #EDEDED">&nbsp;&nbsp;&nbsp;{variable_name}</a>
              </td>
              <td style="padding: 0px; text-align: right;">
                <a href={urlQuick} style="color: #EDEDED" title={variable_timestamp}>{variable_value}  {variable_display}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

/*

      <div className="variable" style={{backgroundColor: color}}>
        <div className="icon_var">
          <div className="icon">
            NOMBRE_VARIABLE
          </div>
        </div>
        <div className="txt_var">
          <p className="val">000000.0000</p>
        </div>
        <p className="date">25-01-2018 15:42:01</p>
        <div className="actions_var">
          <a href="#"><i className="material-icons right">portable_wifi_off</i></a>
          <a href="#"><i className="material-icons right">volume_up</i></a>
          <a href="#"><i className="material-icons right">mode_comment</i></a>
        </div>
      </div>

  <tr>
    <td style="color:#333;">{variable.name}</td>
    <td style="color:#333;">000000.0000</td>
    <td style="color:#333;">{variable.display}</td>
    <td style="color:#333;">25-01-2018 17:42:00</td>
    <td style="color:#333;">Comentario</td>
  </tr>

*/

export default ListViewVariableInlineMin;