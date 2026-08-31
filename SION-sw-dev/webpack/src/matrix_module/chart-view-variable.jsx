import { h, render, Component } from 'preact';
import { isDate, isNumber, isString, clone } from 'underscore';

import constants from '../constants.js';

import Chart from './chart.jsx';
import ChartEmitter from '../charts_module/emitter.js';

class ChartViewVariableInline extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emitter: new ChartEmitter(),
      preTimestamp: false,
    };
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 20 });
  }

  componentDidUpdate() {
    $('.tooltipped').tooltip('remove');
    $('.tooltipped').tooltip({ delay: 20 });

    if (this.state.emitter) {
      let variable = this.props.variable;

      //EXPERIMENTAL alarm_id alarm_setpoint
      let variableIn = clone(variable);
      if (variableIn) {
        let variable_prefix_name = variableIn.id;
        let variable_unit = '';

        if (variable.is_custom) {
          variable_prefix_name = `cv_${variable_prefix_name}`;
        } else {
          variable_prefix_name = `v_${variable_prefix_name}`;
        }

        if (variableIn.display) {
          variable_unit = variableIn.display;
        } else {
          variable_unit = variableIn.unit;
        }

        variableIn.variable_prefix_name = variable_prefix_name;
        variableIn.variable_unit = variable_unit;

        this.state.emitter.emit(constants.EVENT_UDAPTE_ALARMS_ACTIVE, variableIn);
      }

      if (variable.timestamp !== this.state.preTimestamp) {
        this.state.preTimestamp = variable.timestamp;

        let o = {
          variable_id: variable.id,
          is_custom: variable.is_custom,
          value: variable.value,
          timestamp: variable.timestamp
        };

        if (o.value === ' ') {
          this.state.emitter.emit(constants.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE, o);
        } else {
          this.state.emitter.emit(constants.EVENT_UDAPTE_VARIABLES_VALUE, o);
        }
      }
    }
  }

  getRecords24hrsVariable() {
    let self = this;

    let fn = (f) => {
      let variable = self.props.variable;

      if (variable) {
        let now = new Date();
        let time = now.getTime() - (1000 * 60 * 60 * 6);
        let start = new Date(time);

        let json = {
          variables: [variable.id],
          start_date: this.getDateToString(start),
          final_date: this.getDateToString(now)
        };

        let url = `${constants.URL_SERVER_VARIABLES}/record`;
        if (variable.is_custom) {
          url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/record`;
        }

        let xhr = $.ajax({
          url: url,
          type: constants.METHOD_POST,
          contentType: constants.APPLICATION_JSON,
          data: JSON.stringify(json)
        });

        xhr.done((res, status, response) => {
          if (response.status === constants.STATUS_OK) {
            let docs = res.docs;

            docs = self.updateVariable(docs);

            let variable_name = variable.name;
            if (variable.rename) {
              variable_name = variable.rename;
            }

            let o = {
              variables: docs,
              start_date: json.start_date,
              final_date: json.final_date,
              title: `${variable_name}`,
            };

            f(null, o);

          } else if (response.status === constants.STATUS_ACCEPTED) {
            f(res.message);
          }
        });

        xhr.fail((res, status, respose) => {
          if (res.responseJSON) {
            let json = res.responseJSON;
            f(json.message);
          } else {
            f(constants.MESSAGE_ERROR);
          }
        });
      }
    };

    return fn;
  }

  updateVariable(docs) {
    let variable = this.props.variable;

    if (docs.length > 0) {
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

      docs[0].variable_display = variable_display;
      docs[0].variable_name = variable_name;
      docs[0].variable_is_custom = variable.is_custom;

      if (isString(variable.expression)) {
        docs[0].variable_expression = variable.expression;
      }
    }

    return docs;
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

  getDateToString(date) {
    let str = 'N/A';

    if (isDate(date) || isNumber(date)) {
      date = new Date(date);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      let hour = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      if (hour < 10) {
        hour = `0${hour}`;
      }

      if (min < 10) {
        min = `0${min}`;
      }

      if (sec < 10) {
        sec = `0${sec}`;
      }

      str = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    return str
  }

  render(props, state) {
    let variable = props.variable;

    let prefix = '-';
    if (variable.is_custom) prefix = '-cv-';

    let variable_comment = 'N/A';
    let variable_sound_icon = 'volume_up';

    if (variable.comment) {
      variable_comment = variable.comment
    }

    if (variable.mute) {
      variable_sound_icon = 'volume_off';
    } else {
      variable_sound_icon = 'volume_up';
    }

    let urlQuick = `/charts/${variable.id}`;
    if (variable.is_custom) {
      urlQuick = `/charts/${variable.id}/true`;
    }

    let variable_color = variable.color;

    return (
      <div className="variable sion-variable-chart" style={`background-color: ${variable_color};`}>
        <div className="row">
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
            <a href={urlQuick}><i className="material-icons right">show_chart</i></a>
          </div>
        </div>

        <Chart chart={`chart-24${prefix}${variable.id}`}
              init={this.getRecords24hrsVariable()}
              chartEmitter={this.state.emitter} />
      </div>
    );
  }
}

export default ChartViewVariableInline;