import { h, render, Component } from 'preact';
import { isNumber, isString } from 'underscore';

class ListViewVariableInline extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 20 });
  }

  componentDidUpdate() {
    $('.tooltipped').tooltip('remove');
    $('.tooltipped').tooltip({ delay: 20 });
  }

  handleOpenComment() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      let variable = self.props.variable;

      if (variable) {
        let name = variable.name;
        if (variable.rename) {
          name = variable.rename;
        }

        let o = {
          variable_id: variable.id,
          is_custom: variable.is_custom,

          name: name,
          device: variable.device
        };

        let f = self.props.onOpenCommentVariable;
        if (f) f(o);

        $('#comentarios_macro').modal('open');
      }
    };

    return fn;
  }

  handleChangeSound(variable) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      if (variable) {
        let f = self.props.onChangeSoundVariable;
        if (f) f(variable);
      }
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
    let variable_comment = 'N/A';
    let variable_name = variable.name;
    let variable_display = '';
    let variable_sound_icon = 'volume_up';

    if (variable.display) {
      variable_display = variable.display;
    } else {
      variable_display = variable.unit;
    }

    if (variable.rename) {
      variable_name = variable.rename;
    }

    if (variable.comment) {
      variable_comment = variable.comment
    }

    if (variable.mute) {
      variable_sound_icon = 'volume_off';
    } else {
      variable_sound_icon = 'volume_up';
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
      <div className="variable" style={`background-color: ${variable_color};`}>
        <table>
          <tbody>
            <tr>
              <td style="padding: 0px;">
                <a href={urlQuick} style="color: #EDEDED">&nbsp;&nbsp;&nbsp;{variable_name}</a>
              </td>
              <td style="padding: 0px; text-align: right;">
                <a href={urlQuick} style="color: #EDEDED">{variable_value} {variable_display}</a>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 0px; text-align: right; font-size: 0.75em;">{variable_timestamp}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 0px; text-align: right;">
                <div className="actions_var">
                  <a hidden={!variable.on_timeout} href="#"><i className="material-icons right">access_time</i></a>
                  <a hidden={!variable.is_ringing} href="#" onClick={this.handleChangeSound(variable)}>
                    <i className="material-icons right">{variable_sound_icon}</i>
                  </a>
                  <a hidden={true} href="#" onClick={this.handleOpenComment()}
                    className="tooltipped"
                    data-position="bottom"
                    data-delay="20"
                    data-tooltip={variable_comment}>
                    <i className="material-icons right">mode_comment</i>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListViewVariableInline;