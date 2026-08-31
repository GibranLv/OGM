import { h, render, Component } from 'preact';
import { isNumber, isString } from 'underscore';

class TableItemVariable extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 20 });
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

  handleOpenCommentOfGroup(group) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      if (group) {
        let o = {
          group_id: group.id,
          name: group.name,
        };

        let f = self.props.onOpenCommentGroup;
        if (f) f(o);

        $('#comentarios_macro').modal('open');
      }
    };

    return fn;
  }

  handleOpenCommentOfVariable(variable) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

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

  replaceAll(s, old, n) {
    s = s.replace(old, n);

    let i = s.indexOf(old);
    if (i >= 0) {
      this.replaceAll(s, old, n);
    }

    return s
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
      name: o.name,
      is_variable: o.is_variable,
      comment: o.comment
    };

    if (i.is_variable) {
      i.is_custom = o.is_custom;
      i.rename = o.rename;
      i.device = o.device;

      i.value = o.value;
      i.timestamp = o.timestamp;

      i.color  = o.color;
      i.on_timeout = o.on_timeout;
      i.is_ringing = o.is_ringing;

      i.expression = o.expression;

      if (o.display) i.display = o.display;

      if (o.unit) i.display = o.unit;

      if (o.mute) i.mute = o.mute;
    }

    tds.push(i);

    return tds;
  }

  createItem() {
    let self = this;

    let fn = (td, index, a) => {
      if (td.is_variable) {

        let variable_id = td.id;
        let variable_is_custom = td.is_custom;
        let variable_value = td.value;
        let variable_tiemstamp = td.timestamp;

        let hasConversion = isString(td.expression) && isString(td.display) && isNumber(variable_value);
        if (hasConversion) {
          let expression = this.replaceAll(td.expression, '${value}', variable_value);
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

        let variable_color = false;
        if (td.color) {
          variable_color = td.color;
        }

        let variable_comment = 'N/A';
        let variable_name = td.name;
        let variable_display = '';
        let variable_sound_icon = 'volume_up';

        if (td.display) {
          variable_display = td.display;
        } else {
          variable_display = td.unit;
        }

        if (td.rename) {
          variable_name = td.rename;
        }

        if (td.comment) {
          variable_comment = td.comment
        }

        if (td.mute) {
          variable_sound_icon = 'volume_off';
        } else {
          variable_sound_icon = 'volume_up';
        }

        let urlQuick = `/charts/${variable_id}`;
        if (variable_is_custom) {
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
          variable_value = () => {
            return <span>{variable_value}</span>
          }
        }

        return (
          <td style="padding: 0px; border: 1px solid rgba(255, 255, 255, 0.4);">
            <table style="width: 100%; font-size: 0.90rem; font-weight: 600;">
              <tbody>
                <tr>
                  <td style={`padding:0px 0px 0px 3px; width: 30%; background-color: ${variable_color}`}>
                    <a href={urlQuick} style="color: #EDEDED">{variable_name}</a>
                  </td>
                  <td style={`padding:0px 0px 0px 3px; width: 10%; border-right: 1px solid rgba(255, 255, 255, 0.4); background-color: ${variable_color}`}>
                    <div className="actions_var">
                      <a hidden={!td.on_timeout} href="#"><i className="material-icons right">access_time</i></a>
                      <a hidden={!td.is_ringing} href="#" onClick={this.handleChangeSound(td)}>
                        <i className="material-icons right">{variable_sound_icon}</i>
                      </a>
                      <a hidden={true} href="#"
                        className="tooltipped"
                        data-position="left"
                        data-delay="20"
                        data-tooltip={variable_comment}
                        onClick={this.handleOpenCommentOfVariable(td)}>
                        <i className="material-icons right">mode_comment</i>
                      </a>
                    </div>
                  </td>
                  <td style="padding:0px 3px 0px 0px; text-align: right; width: 15%;">
                    <a href={urlQuick} style="color: #EDEDED">{variable_value}</a>
                  </td>
                  <td style="padding:0px 0px 0px 4px; text-align: left; width: 10%;">{variable_display}</td>
                  <td style="padding: 0px 3px 0px 0px; text-align: right; width: 15%;">{variable_tiemstamp}</td>
                </tr>
              </tbody>
            </table>
          </td>
        );
      }

      let style = {};
      style.borderTop = '1px solid rgba(255, 255, 255, 0.4)';
      style.borderRight = '1px solid rgba(255, 255, 255, 0.4)';
      style.borderLeft = '1px solid rgba(255, 255, 255, 0.4)';
      style.borderBottom = '0x';
      style.padding = '0px';

      if (td.id == 0) {
        style.borderTop = '0px';

        return <td style={style} key={index}></td>
      }

      let group_comment = 'N/A';
      if (td.comment) {
        group_comment = td.comment
      }

      style.padding = '0px 0px 0px 3px';
      return (
        <td style={style} key={index}>
          <table style="width: 100%; font-size: 0.90rem; font-weight: 600;">
            <tbody>
              <tr>
                <td style="padding:0px 0px 0px 3px; width: 80%;">
                  {td.name}
                </td>
                <td style="padding:0px 0px 0px 3px; width: 10%;">
                  <div className="actions_var">
                    <a href="#"
                      className="tooltipped"
                      data-position="left"
                      data-delay="20"
                      data-tooltip={group_comment}
                      onClick={this.handleOpenCommentOfGroup(td)}>
                      <i className="material-icons right">mode_comment</i>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      );

    };

    return fn;
  }

  render(props, state) {
    let variable = props.variable;

    let tds = this.getItems(variable);
    let numInsert = variable.max - tds.length;

    let tdsInsert = [];
    for (let i = 0; i < numInsert; i++) {
      tdsInsert.push({ id: 0, name: '' });
    }

    for (let i = 0; i < tds.length; i++) {
      let td = tds[i]
      tdsInsert.push(td);
    }

    return (
      <tr>
        {tdsInsert.map(this.createItem())}
      </tr>
    );
  }
}

export default TableItemVariable;
