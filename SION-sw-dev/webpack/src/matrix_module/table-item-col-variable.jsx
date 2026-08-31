import { h, render, Component } from 'preact';
import { isNumber, isString, isArray, isObject } from 'underscore';

class TableItemColVariable extends Component {

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

  createItemAlarm() {
    let self = this;

    let fn = (alarm, index) => {
      return <p key={index}>{alarm.alias}: <span style={`color: ${alarm.color} !important;`}>{alarm.setpoint}</span></p>;
    };

    return fn;
  }

  getTooltip(alarms, valueIn, display, timestamp) {
    if (timestamp && display == 'PSI') {
      if (isString(valueIn) || isObject(valueIn)) {
        return (
          <div className="popover__content">
            <p className="variable-timestamp">{timestamp}</p>
            <p className="variable-timestamp">{valueIn} Kg/cm²</p>
            {alarms.map(this.createItemAlarm())}
          </div>
        );
      }

      if (isNumber(valueIn)) {
        // PSI to Kg/cm²
        let value = valueIn * 0.070307;
        let s = value.toFixed(3);

        return (
          <div className="popover__content">
            <p className="variable-timestamp">{timestamp}</p>
            <p className="variable-timestamp">{s} Kg/cm²</p>
            {alarms.map(this.createItemAlarm())}
          </div>
        );
      }
    }

    if (timestamp && display == 'Kg/cm²') {
      if (isString(valueIn) || isObject(valueIn)) {

        let vIn = parseFloat(valueIn);
        if (isNumber(vIn)) {
          // Kg/cm² to PSI
          let value = vIn * 14.2233;
          valueIn = value.toFixed(3);
        }

        return (
          <div className="popover__content">
            <p className="variable-timestamp">{timestamp}</p>
            <p className="variable-timestamp">{valueIn} PSI</p>
            {alarms.map(this.createItemAlarm())}
          </div>
        );
      }

      if (isNumber(valueIn)) {
        // Kg/cm² to PSI
        let value = valueIn * 14.2233;
        let s = value.toFixed(3);

        return (
          <div className="popover__content">
            <p className="variable-timestamp">{timestamp}</p>
            <p className="variable-timestamp">{s} PSI</p>
            {alarms.map(this.createItemAlarm())}
          </div>
        );
      }
    }

    if (timestamp) {
      return (
        <div className="popover__content">
          <p className="variable-timestamp">{timestamp}</p>
          {alarms.map(this.createItemAlarm())}
        </div>
      );
    }

    return (
      <div className="popover__content">
        {alarms.map(this.createItemAlarm())}
      </div>
    );
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

    if (o.variables) {
      i.variables = o.variables;
    }

    if (i.is_variable) {
      i.is_na = o.is_na;
      i.is_custom = o.is_custom;
      i.rename = o.rename;
      i.device = o.device;

      i.value = o.value;
      i.timestamp = o.timestamp;

      i.color = o.color;
      i.on_timeout = o.on_timeout;
      i.is_ringing = o.is_ringing;

      i.expression = o.expression;

      if (!o.alarms) o.alarms = [];
      i.alarms = o.alarms;

      if (o.display) i.display = o.display;

      if (o.unit) i.display = o.unit;

      if (o.mute) i.mute = o.mute;
    }

    tds.push(i);

    return tds;
  }

  createItem() {
    let self = this;

    let fn = (td, index) => {
      if (td.is_variable) {
        let variable_id = td.id;
        let variable_is_custom = td.is_custom;
        let variable_value = td.value;
        let variable_timestamp = td.timestamp;
        let isBool = false;

        // EXTRAS
        let alarms = td.alarms;
        if (!alarms) alarms = [];

        let rowSpan = 1;
        let colSpan = false;

        if (!variable_is_custom) variable_is_custom = false;

        if (window.FUSION_VARS) {
          if (isArray(window.FUSION_VARS)) {
            let size = window.FUSION_VARS.length;
            for (let i = 0; i < size; i++) {
              let o = window.FUSION_VARS[i];

              if (o.variable_id == variable_id) {
                if (o.is_custom == variable_is_custom) {
                  if (o.hide) return;

                  rowSpan = o.rowspan;
                  colSpan = o.colspan;
                  break;
                }
              }
            }
          }
        }

        if (td.is_na) variable_value = 'N/A';

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


        let variable_color = '';
        if (td.color) {
          variable_color = td.color;
        }

        let variable_comment = 'N/A';
        let variable_name = td.name;
        let variable_sound_icon = 'volume_up';
        let variable_display = '';

        if (td.rename) {
          variable_name = td.rename;
        }

        if (td.comment) {
          variable_comment = td.comment
        }

        if (td.display) {
          variable_display = td.display;
        } else {
          variable_display = td.unit;
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
          isBool = true;

          if (variable_value > 0) {
            variable_value = 'ACTIVO';
          } else {
            variable_value = 'INACTIVO';
          }

          variable_display = '';
        }

        if (variable_display === 'MAP CP') {
          if (CP_MAPS) {
            let description = CP_MAPS[variable_value];
            if (description) {
              variable_value = description;
            } else {
              variable_value = 'N/A';
            }

            variable_display = '';
          }
        }

        if (variable_display === 'MAP CP II') {
          if (CP_MAPS_II) {
            let description = CP_MAPS_II[variable_value];
            if (description) {
              variable_value = description;
            } else {
              variable_value = 'N/A';
            }

            variable_display = '';
          }
        }

        if (variable_display === 'MAP CP III') {
          if (CP_MAPS_III) {
            let description = CP_MAPS_III[variable_value];
            if (description) {
              variable_value = description;
            } else {
              variable_value = 'N/A';
            }

            variable_display = '';
          }
        }

        if (variable_display === 'MAP CP IV') {
          if (CP_MAPS_IV) {
            let description = CP_MAPS_IV[variable_value];
            if (description) {
              variable_value = description;
            } else {
              variable_value = 'N/A';
            }

            variable_display = '';
          }
        }

        if (variable_value === ' ') {
          variable_value = '0';
        }

        if (isBool) {
          let styleBool = 'background: #919296; box-shadow: 0 0 8px #919296; border: 2px solid #919296; color: transparent !important;';
          if (variable_color !== '') {
            styleBool = `background: ${variable_color}; box-shadow: 0 0 8px ${variable_color}; border: 2px solid ${variable_color}; color: transparent !important;`
          }

          /*
            <a href="#"
              hidden={true}
              onClick={this.handleOpenCommentOfVariable()}
              className="tooltipped"
              data-position="bottom"
              data-delay="20"
              data-tooltip={variable_comment}>
              <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
            </a>
          */

          return (
            <td rowSpan={rowSpan} colSpan={colSpan}>
              <div className="Flex">
                <div className="Indicator popover__wrapper">
                  <a href={urlQuick} className="popover__title">
                    <strong className="Inactive" style={styleBool}></strong>
                  </a>
                  <div className="popover__content">
                    <p className="variable-timestamp">{variable_timestamp}</p>
                  </div>
                </div>
                <div className="FlexBody" style="padding-top: 12px;">
                  <a href="#" hidden={!td.is_ringing} onClick={this.handleChangeSound(td)}>
                    <i className="material-icons" style="vertical-align: middle;">
                      {variable_sound_icon}
                    </i>
                  </a>
                  <a href="#" hidden={!td.on_timeout}>
                    <i className="material-icons" style="vertical-align: middle;">access_time</i>
                  </a>
                </div>
              </div>
            </td>
          );

          /*return (
            <td className="Indicator Notif">
              <a href="#" href={urlQuick} title={variable_timestamp}>
                <strong className="Inactive"style={styleBool}></strong>
              </a>
              <br />
              <br />
              <a href="#"
                hidden={true}
                onClick={this.handleOpenCommentOfVariable()}
                className="tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip={variable_comment}>
                <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
              </a>
              <a href="#" hidden={!td.is_ringing} onClick={this.handleChangeSound(td)}>
                <i className="material-icons" style="vertical-align: middle;">
                  {variable_sound_icon}
                </i>
              </a>
              <a href="#" hidden={!td.on_timeout}>
                <i className="material-icons" style="vertical-align: middle;">access_time</i>
              </a>
            </td>
          );*/
        }

        if (variable_color === '') variable_color = 'white';
        if (variable_value === '0' || variable_value === 0) {
          variable_value = <span style="color: #F2ED0A !important;">{variable_value}</span>
        }

        let contentTooltip = false;
        if (window.INSERT_CONVERSION) {
          contentTooltip = self.getTooltip(alarms, variable_value, variable_display, variable_timestamp);
        } else {
          contentTooltip = self.getTooltip(alarms, null, null, variable_timestamp);
        }

        /*
          <a href="#"
            hidden={true}
            onClick={this.handleOpenCommentOfVariable()}
            className="tooltipped"
            data-position="bottom"
            data-delay="20"
            data-tooltip={variable_comment}>
            <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
          </a>
        */

        return (
          <td rowSpan={rowSpan} colSpan={colSpan}>
            <div className="Flex">

              <strong className="popover__wrapper">
                <a className="popover__title" href={urlQuick} style={`font-weight bolder; color: ${variable_color} !important;`}>
                  {variable_value}
                </a>
                {contentTooltip}
              </strong>

              <div className="FlexBody">
                <a href="#" hidden={!td.is_ringing} onClick={this.handleChangeSound(td)}>
                  <i className="material-icons" style="vertical-align: middle;">
                    {variable_sound_icon}
                  </i>
                </a>
                <a href="#" hidden={!td.on_timeout}>
                  <i className="material-icons" style="vertical-align: middle;">access_time</i>
                </a>
              </div>

            </div>
          </td>
        );

        /*return (
          <td className={className}>
            <a href={urlQuick} title={variable_timestamp} style={`font-weight bolder; color: ${variable_color} !important;`}>{variable_value}</a>
            <br/>
            <a  href="#"
                hidden={true}
                onClick={this.handleOpenCommentOfVariable()}
                className="tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip={variable_comment}>
              <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
            </a>
            <a href="#" hidden={!td.is_ringing} onClick={this.handleChangeSound(td)}>
              <i className="material-icons" style="vertical-align: middle;">
                {variable_sound_icon}
              </i>
            </a>
            <a href="#" hidden={!td.on_timeout}>
              <i className="material-icons" style="vertical-align: middle;">access_time</i>
            </a>
					</td>
        );*/
      }

      let group_comment = 'N/A';
      if (td.comment) {
        group_comment = td.comment
      }

      return (
        <td className="TitleMotoc" key={index}>
          <strong>
            {td.name}
            &nbsp;&nbsp;
            <a href="#"
              className="tooltipped"
              data-position="left"
              data-delay="20"
              data-tooltip={group_comment}
              onClick={this.handleOpenCommentOfGroup(td)}>
              <i className="material-icons" style="vertical-align: middle;">chat_bubble</i>
            </a>
					</strong>
        </td>
      );

    };

    return fn;
  }

  render(props, state) {
    let group = props.group;
    let names = props.names;

    let tds = this.getItems(group);
    let numInsert = group.max - tds.length;

    let tdsInsert = [];
    for (let i = 0; i < numInsert; i++) {
      tdsInsert.push({ id: 0, name: '' });
    }

    for (let i = 0; i < tds.length; i++) {
      let td = tds[i]
      tdsInsert.push(td);

      if (td.variables) {
        let sizeName = names.length;
        if (sizeName > 0) { 
          for (let k = 0; k < names.length; k++) {
            const name = names[k];
            let isEmpty = true;

            for (let j = 0; j < td.variables.length; j++) {
              const v = td.variables[j];

              let i = {
                id: v.id,
                name: v.name,
                is_variable: true,
                comment: v.comment
              };

              if (i.is_variable) {
                i.is_na = v.is_na;
                i.is_custom = v.is_custom;
                i.rename = v.rename;
                i.device = v.device;

                i.value = v.value;
                i.timestamp = v.timestamp;

                i.color = v.color;
                i.on_timeout = v.on_timeout;
                i.is_ringing = v.is_ringing;

                i.expression = v.expression;

                if (!v.alarms) v.alarms = [];
                i.alarms = v.alarms;

                if (v.display) i.display = v.display;

                if (v.unit) i.display = v.unit;

                if (v.mute) i.mute = v.mute;

                let variable_name = v.name;
                if (v.rename) {
                  variable_name = v.rename;
                }

                let variable_display = '';
                if (v.display) {
                  variable_display = v.display;
                } else {
                  variable_display = v.unit;
                }

                if (variable_display === 'BOOL') {
                  variable_display = '';
                }

                if (variable_display === 'MAP CP') {
                  variable_display = '';
                }

                if (variable_display === 'MAP CP II') {
                  variable_display = '';
                }

                if (variable_display === 'MAP CP III') {
                  variable_display = '';
                }

                if (variable_display === 'MAP CP IV') {
                  variable_display = '';
                }

                if (variable_display) {
                  variable_name = `${variable_name} (${variable_display})`;
                }

                if (name == variable_name) {
                  tdsInsert.push(i);
                  isEmpty = false;
                  break;
                }
              }
            }

            if (isEmpty) {
              let i = {
                id: 0,
                name: '',
                is_variable: true,
                comment: false
              };

              tdsInsert.push(i);
            }
          }

        } else {

          for (let j = 0; j < td.variables.length; j++) {
            const v = td.variables[j];

            let i = {
              id: v.id,
              name: v.name,
              is_variable: true,
              comment: v.comment
            };

            if (i.is_variable) {
              i.is_na = v.is_na;
              i.is_custom = v.is_custom;
              i.rename = v.rename;
              i.device = v.device;

              i.value = v.value;
              i.timestamp = v.timestamp;

              i.color = v.color;
              i.on_timeout = v.on_timeout;
              i.is_ringing = v.is_ringing;

              i.expression = v.expression;

              if (!v.alarms) v.alarms = [];
              i.alarms = v.alarms;

              if (v.display) i.display = v.display;

              if (v.unit) i.display = v.unit;

              if (v.mute) i.mute = v.mute;

              let variable_name = v.name;
              if (v.rename) {
                variable_name = v.rename;
              }

              let variable_display = '';
              if (v.display) {
                variable_display = v.display;
              } else {
                variable_display = v.unit;
              }

              if (variable_display === 'BOOL') {
                variable_display = '';
              }

              if (variable_display === 'MAP CP') {
                variable_display = '';
              }

              if (variable_display === 'MAP CP II') {
                variable_display = '';
              }

              if (variable_display === 'MAP CP III') {
                variable_display = '';
              }

              if (variable_display === 'MAP CP IV') {
                variable_display = '';
              }

              if (variable_display) {
                variable_name = `${variable_name} (${variable_display})`;
              }

              tdsInsert.push(i);
            }
          }

        }
      }

      if (window.COMMENT_COLUMN) {
        let insertComment = {
          id: 0,
          name: 'COMENTARIOS',
          is_variable: true,
          value: td.comment,
          timestamp: '',
        };

        tdsInsert.push(insertComment);
      }
    }

    return (
      <tr>
        {tdsInsert.map(this.createItem())}
      </tr>
    );
  }
}

export default TableItemColVariable;
