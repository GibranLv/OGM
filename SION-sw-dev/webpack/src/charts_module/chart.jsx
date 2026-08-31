import { h, render, Component } from 'preact';
import { w3cwebsocket } from 'websocket';
import { parallel } from 'async';
import { isDate, isNumber, isString, isArray, isNaN, clone } from 'underscore';

import constants from '../constants.js';
import PanelVariableItem from './panel_variable_item.jsx';

const wsURL = `ws://${URLWS}/ws`;

const CHART_Y_AXIS_UNIT = 'chart-y-axis-unit';

const ENTER = 13;
const INPUT_SPAN_MIN = 'input-span-min';
const INPUT_SPAN_MAX = 'input-span-max';

const TRIGGER_ZOOM = 'zoom';

const LAST_24 = 1;
const LAST_48 = 2;
const LAST_07 = 3;
const LAST_30 = 4;
const LAST_06 = 5;
const LAST_12 = 6;

class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      charting: false,
      status_tools: false,

      devices_: [],
      deviceOne: false,

      variables_: [],
      variables: [],

      date_of: false,
      date_to: false,
      date_time_of: '00:00',
      date_time_to: '00:00',

      series: [],
      RT: false,
      isOk: false,

      connection_errors_ws: 0,

      variablesSetpoint: [],
      setpoints: [],

      panelVariables: [],

      lastRecords: [],
    };

    this.extremes = {
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 }
    }

    if (this.props.RT) this.state.RT = true;
  }

  componentDidMount() {
    let self = this;

    let chartKey = this.props.chart;

    let keyContentTool = `content-tool-${chartKey}`;
    let keyInputDevice = `#input-device-${chartKey}`;
    let keyInputVariable = `#input-variable-${chartKey}`;
    let keyLoadingChart = `#loading-chart-${chartKey}`;
    let keyInputRT = `#input-rt-${chartKey}`;
    let keyInputAxesY = `#input-axes-y-${chartKey}`;

    $(keyLoadingChart).hide();

    // Inicializar selectores y eventos
    $('select').material_select();

    $(keyInputDevice).off('change', self.handleChangeDevice());
    $(keyInputVariable).off('change', self.handleChangeVariable());

    $(keyInputDevice).on('change', self.handleChangeDevice());
    $(keyInputVariable).on('change', self.handleChangeVariable());
    this.initializePickers();

    parallel({
      variables: (fn) => {
        self.getVariables(fn);
      },
      custom_variables: (fn) => {
        self.getCustomVariables(fn);
      }
    }, (err, res) => {
      if (err) {
        Materialize.toast(err, 2500);;
        return;
      }

      let variables = [];
      let custom_variables = [];
      let variables_ = [];
      let devices_ = [];

      if (res.variables) variables = res.variables;
      if (res.custom_variables) custom_variables = res.custom_variables;

      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];

        let o = {
          id: variable.id,
          name: variable.name,
          device: variable.device,
          is_custom: false,
          in_variables: false,
        };

        devices_.push(variable.device);

        variables_.push(o);
      }

      for (let i = 0; i < custom_variables.length; i++) {
        const variable = custom_variables[i];

        let o = {
          id: variable.id,
          name: variable.name,
          device: variable.device,
          is_custom: true,
          in_variables: false,
        };

        devices_.push(variable.device);

        variables_.push(o);
      }

      devices_ = devices_.filter(this.getOnlyUnique())

      let status_tools = self.props.status_tools;

      self.setState({ variables_: variables_, devices_: devices_, status_tools: status_tools }, () => {
        $(keyInputDevice).val('');
        $(keyInputVariable).val('');

        $('select').material_select();

        $(keyInputDevice).off('change', self.handleChangeDevice());
        $(keyInputVariable).off('change', self.handleChangeVariable());

        $(keyInputDevice).on('change', self.handleChangeDevice());
        $(keyInputVariable).on('change', self.handleChangeVariable());
        self.initializePickers();

        if (!self.state.status_tools) {
          $('#' + keyContentTool).hide();
        }

        if (this.props.RT) {
          let inputRT = document.querySelector(keyInputRT);
          if (inputRT) {
            inputRT.checked = true;
          }
        }

        if (this.props.AG) {
          let inputAxesY = document.querySelector(keyInputAxesY);
          if (inputAxesY) {
            inputAxesY.checked = true;
          }
        }

        let keyChartContent = `#container-chart-${chartKey}`;
        let keyBtnResetZoom = `#content-reset-zoom-${chartKey}`;
        let position = $(keyChartContent).position();
        let left = position.left + 40;
        let top = position.top + 40;
        $(keyBtnResetZoom).css({ left: left, top: top });
        $(keyBtnResetZoom).hide();

        let f = self.props.init;
        if (f) {
          $(keyLoadingChart).show();

          f((err, o) => {
            if (err) {
              $(keyLoadingChart).hide();
              Materialize.toast(err, 2500);;
              return;
            }

            let chart = self.getConfigChart(o);
						console.log("RT IsOK: ", self.state.isOk)

    				self.setState({ isOk: false }, () => {
							self.initializePickers()

							self.updateChart(chart);
							console.log("RT Update IsOK: ", self.state.isOk)

							$(keyLoadingChart).hide();

							if (chartKey === '24') {
								const { dataMin, dataMax } = self.chartOne.xAxis[0].getExtremes()
								self.chartOne.xAxis[0].setExtremes(dataMin, dataMax)
							}

						})

          })

        }
      });
    });

    this.props.chartEmitter.on(constants.EVENT_SETPOINTS, (inputs) => {

      if (self.chartOne) {
        let setpoints = clone(self.state.setpoints);
        let setpointsIn = clone(inputs);

        for (let i = 0; i < setpoints.length; i++) {
          const setpoint = setpoints[i];
          for (let j = 0; j < self.chartOne.yAxis.length; j++) {
            if (self.chartOne.yAxis[j]) {
              let className = self.chartOne.yAxis[j].userOptions.className;
              if (className === CHART_Y_AXIS_UNIT) {
                let text = self.chartOne.yAxis[j].userOptions.title.text;
                if (text === setpoint.variable_unit) {
                  let id = `${setpoint.variable_name}-${setpoint.name}`;
                  self.chartOne.yAxis[j].removePlotLine(id);
                  break;
                }
              }
            }
          }
        }


        for (let i = 0; i < setpointsIn.length; i++) {
          const setpoint = setpointsIn[i];
          let addPlot = {
            value: setpoint.value,
            color: setpoint.color,
            dashStyle: 'shortdash',
            width: 2,
            label: {
              style: { fontWeight: 'bold', color: '#fff' },
              text: `${setpoint.variable_name}.${setpoint.name}`,
            },
            id: `${setpoint.variable_name}-${setpoint.name}`
          };

          for (let j = 0; j < self.chartOne.yAxis.length; j++) {
            if (self.chartOne.yAxis[j]) {
              let className = self.chartOne.yAxis[j].userOptions.className;
              if (className === CHART_Y_AXIS_UNIT) {
                let text = self.chartOne.yAxis[j].userOptions.title.text;
                if (text === setpoint.variable_unit) {
                  self.chartOne.yAxis[j].addPlotLine(addPlot);
                  break;
                }
              }
            }
          }
        }

        self.setState({ setpoints: setpointsIn });
      }
    });

    this.props.chartEmitter.on(constants.EVENT_INSERT_EVENT_CHART, (eventOne) => {
      let keyInputNewEvent = `input-new-event-${chartKey}`;
      let nEvent = document.querySelector(`#${keyInputNewEvent}`).checked;
      if (!nEvent) return;

      if (self.chartOne) {
        let series = self.chartOne.series;
        for (let i = 0; i < series.length; i++) {
          const serie = series[i];

          if (serie.name === constants.LABEL_EVENTS) {
            let nTimestamp = new Date(eventOne.created_at);
            let o = {
              y: eventOne.value,
              x: nTimestamp,
              title: `${eventOne.name}`,
              text: `${eventOne.variable_name}: ${eventOne.description}`,
              // Información Extra
              chart_event_id: eventOne.id,
            }

            self.chartOne.series[i].addPoint(o);
            return;
          }
        }

        let nTimestamp = new Date(eventOne.created_at);
        let o = {
          y: eventOne.value,
          x: nTimestamp,
          title: `${eventOne.name}`,
          text: `${eventOne.variable_name}: ${eventOne.description}`,
          // Información Extra
          chart_event_id: eventOne.id,
        }

        let serieEvents = {
          name: constants.LABEL_EVENTS,
          color: '#FFFFFF',
          type: 'flags',
          onSeries: 'dataseries',
          shape: 'circlepin',
          width: 16,
          data: [o]
        };

        self.chartOne.addSeries(serieEvents);
        self.chartOne.redraw();
      }
    });

    if (window.RT === constants.RT_WS) {
      this.serviceWS();

    } else if (window.RT === constants.RT_HTTP) {
      setInterval(() => {
        self.getVariableLastRecords();
      }, 1000 * 15);
    }
  }

  serviceWS() {
    let self = this;

    let v = window.sessionStorage.getItem(constants.ACCESS_TOKEN_WS);
    let url = `${wsURL}?${constants.ACCESS_TOKEN_WS}=${v}`;
    self.ws = new w3cwebsocket(url, constants.TTX_PROTOCOOL);

    self.ws.onerror = () => {
      console.log('WS: connection Error');
    };

    self.ws.onopen = (evt) => {
      console.log('WS connected');
    };

    self.ws.onclose = (evt) => {
      console.log('WS closed');

      setTimeout(() => {
        let connection_errors = self.state.connection_errors_ws;
        if (connection_errors >= constants.LIMIT_FOR_RECONNECTION) {
          connection_errors = 0;
          self.getTokenWS();
        }

        connection_errors = connection_errors + 1;
        self.state.connection_errors_ws = connection_errors;

        self.serviceWS();
      }, 1000);
    }

    self.ws.onmessage = (evt) => {
      if (self.state.RT) {
        let s = evt.data;

        try {
          let o = JSON.parse(s);
          if (o.err) {
						console.log('WS.MESSAGE.PARSE.ERROR: ', o.err)

            return;
          }

          if (o.evt === constants.EVENT_UDAPTE_VARIABLES_VALUE) {
            let content = o.content;
            if (content) {

							console.log("UPDATE IsOk: ", self.state.isOk)

              if (isArray(content) && self.state.isOk) {

                if (!self.chartOne) return;

                let series = self.state.series;

                for (let i = 0; i < series.length; i++) {
                  const serie = series[i];

                  for (let j = 0; j < content.length; j++) {
                    let variable = content[j];

                    let id = variable.variable_id;
                    let isCustom = variable.is_custom;
                    if (!isCustom) isCustom = false;

                    if (!serie.is_custom) serie.is_custom = false;

                    if (serie.variable_id === id) {
                      if (serie.is_custom === isCustom) {

                        let timestamp = new Date(variable.timestamp);

                        let value = variable.value;

                        let expression = serie.expression;
                        let display = serie.display;

                        let hasConversion = isString(expression) && isString(display);

                        if (hasConversion && isNumber(value) && !isNaN(value)) {
                          let nExpression = self.replaceAll(expression, '${value}', value);
                          try {
                            let v = math.eval(nExpression);

                            let str = `${v}`;
                            let iPoint = str.indexOf('.');
                            if (iPoint === -1) {
                              iPoint = str.length - 4;
                            }

                            let nString = math.format(v, { precision: iPoint + 4 });
                            let nValue = parseFloat(nString);
                            if (isNumber(nValue)) {
                              value = nValue
                            }

                          } catch (e) {
                            console.log('Exception: ', timestamp, value);
                          }
                        }

                        // Panel de Variable //
                        let panelVariables = self.state.panelVariables;
                        for (let k = 0; k < panelVariables.length; k++) {
                          const panelVariable = panelVariables[k];
                          if (id === panelVariable.id) {
                            if (isCustom === panelVariable.is_custom) {
                              panelVariables[k].value = value;
                              self.setState({ panelVariables: panelVariables });
                              break;
                            }
                          }
                        }

                        // Panel de Variable //
                        let time = timestamp.getTime();
                        let point = [time, value];
                        if (self.chartOne.series[serie.position]) {
                          let shifted = serie.shifted;
                          self.chartOne.series[serie.position].addPoint(point, true, shifted);

                          if (!shifted) {
                            let rLength = serie.rLength + 1;
                            self.state.series[i].rLength = rLength;
                            if (rLength > 16000) {
                              self.state.series[i].shifted = true;
                            }
                          }
                        }

                        break;
                      }
                    }
                  }
                }
              }
            }
          }

          if (o.evt === constants.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE) {
            let content = o.content;
            if (content) {
              if (isArray(content) && self.state.isOk) {

                if (!self.chartOne) return;

                let series = self.state.series;

                for (let i = 0; i < series.length; i++) {
                  const serie = series[i];

                  for (let j = 0; j < content.length; j++) {
                    let variable = content[j];

                    let id = variable.variable_id;
                    let isCustom = variable.is_custom;
                    if (!isCustom) isCustom = false;

                    if (!serie.is_custom) serie.is_custom = false;

                    if (serie.variable_id === id) {
                      if (serie.is_custom === isCustom) {

                        let timestamp = new Date(variable.timestamp);

                        let value = variable.value;
                        if (value === ' ') {
                          value = 0;

                          // Panel de Variable //
                          let panelVariables = self.state.panelVariables;
                          for (let k = 0; k < panelVariables.length; k++) {
                            const panelVariable = panelVariables[k];
                            if (id === panelVariable.id) {
                              if (isCustom === panelVariable.is_custom) {
                                panelVariables[k].value = value;
                                self.setState({ panelVariables: panelVariables });
                                break;
                              }
                            }
                          }

                          // Panel de Variable //
                          let time = timestamp.getTime();
                          let point = [time, value];
                          if (self.chartOne.series[serie.position]) {
                            let shifted = serie.shifted;
                            self.chartOne.series[serie.position].addPoint(point, true, shifted);

                            if (!shifted) {
                              let rLength = serie.rLength + 1;
                              self.state.series[i].rLength = rLength;
                              if (rLength > 16000) {
                                self.state.series[i].shifted = true;
                              }
                            }
                          }
                        }

                        break;
                      }
                    }
                  }
                }
              }
            }
          }

        } catch (e) {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      }
    }
  }

  getTokenWS() {
    let self = this;

    let url = `${constants.URL_SERVER_USERS}/tokens?${constants.ACCESS_TOKEN_WS}=true`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        let doc = res.doc;

        let token_ws = doc.access_token_ws;
        if (token_ws) window.sessionStorage.setItem(constants.ACCESS_TOKEN_WS, token_ws);

        //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
        //if (token_ws) Cookies.set(constants.ACCESS_TOKEN_WS, token_ws, { expires: sixtySeconds });

        console.log('Reconnection WS Ok');

      } else if (response.status === constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);;
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  getVariableLastRecords() {
    let self = this;

    if (!self.state.RT) return;

    parallel({
      variables: (fn) => {

        let url = `${constants.URL_SERVER_VARIABLES}/list/last_record`;

        let xhr = $.ajax({
          url: url,
          type: constants.METHOD_GET,
          dataType: constants.JSON,
        });

        xhr.done((res, status, response) => {
          if (response.status == constants.STATUS_OK) {
            let content = [];

            let docs = res.docs;
            for (let i = 0; i < docs.length; i++) {
              let doc = docs[i];

              let o = {
                variable_id: doc.id,
                value: doc.value,
                timestamp: doc.timestamp,
                is_custom: false,
              };

              content.push(o);
            }

            fn(null, content);

          } else if (response.status == constants.STATUS_ACCEPTED) {
            fn(res.message);
          }
        });

        xhr.fail((res, status, respose) => {
          if (res.responseJSON) {
            let json = res.responseJSON;
            fn(json.message);
          } else {
            fn(constants.MESSAGE_ERROR);
          }
        });
      },
      custom_variables: (fn) => {
        let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list/last_record`;

        let xhr = $.ajax({
          url: url,
          type: constants.METHOD_GET,
          dataType: constants.JSON,
        });

        xhr.done((res, status, response) => {
          if (response.status == constants.STATUS_OK) {
            let content = [];

            let docs = res.docs;
            for (let i = 0; i < docs.length; i++) {
              let doc = docs[i];

              let o = {
                variable_id: doc.id,
                value: doc.value,
                timestamp: doc.timestamp,
                is_custom: true,
              };

              content.push(o);
            }

            fn(null, content);

          } else if (response.status == constants.STATUS_ACCEPTED) {
            fn(res.message);
          }
        });

        xhr.fail((res, status, respose) => {
          if (res.responseJSON) {
            let json = res.responseJSON;
            fn(json.message);
          } else {
            fn(constants.MESSAGE_ERROR);
          }
        });
      }
    }, (err, res) => {
      if (err) {
        Materialize.toast(err, 2500);
        return;
      }

      let lastRecords = self.state.lastRecords;
      if (!lastRecords) lastRecords = [];

      let lastRecordsIn = [];

      let variablesIn = res.variables;
      let customVariablesIn = res.custom_variables;

      let series = self.state.series;
      if (!series) series = [];

      for (let i = 0; i < variablesIn.length; i++) {
        let isSeries = false;
        for (let j = 0; j < series.length; j++) {
          let serie = series[j];
          let variableId = variablesIn[i].variable_id;
          let isCustom = variablesIn[i].is_custom;

          if (!serie.is_custom) serie.is_custom = false;

          if (serie.variable_id === variableId) {
            if (serie.is_custom === isCustom) {
              isSeries = true;
              break;
            }
          }
        }

        if (isSeries) {
          let v = clone(variablesIn[i]);
          lastRecordsIn.push(v);
        }
      }

        for (let i = 0; i < customVariablesIn.length; i++) {
          let isSeries = false;
          for (let j = 0; j < series.length; j++) {
            let serie = series[j];
            let variableId = customVariablesIn[i].variable_id;
            let isCustom = customVariablesIn[i].is_custom;

            if (!serie.is_custom) serie.is_custom = false;

            if (serie.variable_id === variableId) {
              if (serie.is_custom === isCustom) {
                isSeries = true;
                break;
              }
            }
          }

          if (isSeries) {
            let v = clone(customVariablesIn[i]);
            lastRecordsIn.push(v);
          }
        }

      let content = [];

      for (let i = 0; i < lastRecords.length; i++) {
        const lastRecord = lastRecords[i];
        for (let j = 0; j < lastRecordsIn.length; j++) {
          const lastRecordIn = lastRecordsIn[j];

          if (lastRecord.variable_id === lastRecordIn.variable_id) {
            if (lastRecord.is_custom === lastRecordIn.is_custom) {
              let ts = (new Date(lastRecord.timestamp)).getTime();
              let tsIn = (new Date(lastRecordIn.timestamp)).getTime();

              if (tsIn > ts) {
                lastRecords[i] = clone(lastRecordIn);
                content.push(lastRecordIn);
              }

              break;
            }
          }
        }
      }

      for (let i = 0; i < lastRecordsIn.length; i++) {
        let isNew = true;
        const lastRecordIn = lastRecordsIn[i];
        for (let j = 0; j < lastRecords.length; j++) {
          const lastRecord = lastRecords[j];

          if (lastRecord.variable_id === lastRecordIn.variable_id) {
            if (lastRecord.is_custom === lastRecordIn.is_custom) {
              isNew = false;
              break;
            }
          }
        }

        if (isNew) {
          let lr = clone(lastRecordIn);

          content.push(lr);
          lastRecords.push(lr);
        }
      }

      self.state.lastRecords = lastRecords;

      self.updateVariablesInChart(content);
    });
  }

  updateVariablesInChart(content) {
    let self = this;

    if (content) {
      if (isArray(content) && self.state.isOk) {

        if (!self.chartOne) return;

        if (content.length == 0) return;

        let series = self.state.series;

        for (let i = 0; i < series.length; i++) {
          const serie = series[i];

          for (let j = 0; j < content.length; j++) {
            let variable = content[j];

            let id = variable.variable_id;
            let isCustom = variable.is_custom;
            if (!isCustom) isCustom = false;

            if (!serie.is_custom) serie.is_custom = false;

            if (serie.variable_id === id) {
              if (serie.is_custom === isCustom) {

                let timestamp = new Date(variable.timestamp);

                let value = variable.value;

                let expression = serie.expression;
                let display = serie.display;

                let hasConversion = isString(expression) && isString(display);

                if (hasConversion && isNumber(value) && !isNaN(value)) {
                  let nExpression = self.replaceAll(expression, '${value}', value);
                  try {
                    let v = math.eval(nExpression);

                    let str = `${v}`;
                    let iPoint = str.indexOf('.');
                    if (iPoint === -1) {
                      iPoint = str.length - 4;
                    }

                    let nString = math.format(v, { precision: iPoint + 4 });
                    let nValue = parseFloat(nString);
                    if (isNumber(nValue)) {
                      value = nValue
                    }

                  } catch (e) {
                    console.log('Exception: ', timestamp, value);
                  }
                }

                // Panel de Variable //
                let panelVariables = self.state.panelVariables;
                for (let k = 0; k < panelVariables.length; k++) {
                  const panelVariable = panelVariables[k];
                  if (id === panelVariable.id) {
                    if (isCustom === panelVariable.is_custom) {
                      panelVariables[k].value = value;
                      self.setState({ panelVariables: panelVariables });
                      break;
                    }
                  }
                }
                // Panel de Variable //

                let time = timestamp.getTime();
                let point = [time, value];
                if (self.chartOne.series[serie.position]) {
                  let shifted = serie.shifted;
                  self.chartOne.series[serie.position].addPoint(point, true, shifted);

                  if (!shifted) {
                    let rLength = serie.rLength + 1;
                    self.state.series[i].rLength = rLength;
                    if (rLength > 16000) {
                      self.state.series[i].shifted = true;
                    }
                  }
                }

                break;
              }
            }
          }
        }
      }
    }
  }

  getConfigChart(o) {
    let self = this;

    self.state.series = [];

    let variables = o.variables;

    let start_date = new Date(o.start_date);
    let final_date = new Date(o.final_date);

    let diff = final_date.getTime() - start_date.getTime();
    let maxNumber = 8000;

    let serieEvents = {
      name: constants.LABEL_EVENTS,
      color: '#FFFFFF',
      type: 'flags',
      onSeries: 'dataseries',
      shape: 'circlepin',
      width: 16,
      data: []
    };

    let seriesOptions = [];

    let units = [];

    let yAxis = {
      opposite: false,
      className: CHART_Y_AXIS_UNIT,
      title: {
        text: 'UNIDAD (U)'
      }
    };

    let length = variables.length;

    if (length >= 1) {
      yAxis = [];
    }

    let isByUnit = o.isByUnit;

    self.state.setpoints = [];
    self.state.variablesSetpoint = [];

    for (let i = 0; i < length; i++) {
      const variable = variables[i];

      let shifted = false;

      if (!variable.variable_alarms) variable.variable_alarms = [];

      let panelVariable = {
        id: variable.variable_id,
        is_custom: variable.variable_is_custom,
        device: variable.variable_device,
        name: variable.variable_name,
        alias: variable.variable_alias,
        color: variable.variable_color,
        unit: variable.variable_display,
        expression: variable.variable_expression
      };

      let panelVariables = self.state.panelVariables;
      panelVariables.push(panelVariable);
      self.setState({ panelVariables: panelVariables });

      let variableSetpoint = {
        id: variable.variable_id,
        device: variable.variable_device,
        name: variable.variable_name,
        unit: variable.variable_display,
        alarms: variable.variable_alarms
      };

      self.state.variablesSetpoint.push(variableSetpoint);

      let events = variable.events;
      if (!events) events = [];

      let event_notes = variable.event_notes;
      if (!event_notes) event_notes = [];

      let records = variable.records;
      if (!records) records = [];

      let rLength = records.length;

      if (rLength > maxNumber) {
        shifted = true;
        maxNumber = rLength;
      }

      let variable_name = variable.variable_name;
      variable_name = `${variable.variable_device}.${variable_name}`;

      let variable_color = variable.variable_color;
      if (!variable_color) variable_color = '#F44336';

      let display = variable.variable_display;
      let expression = variable.variable_expression;

      let into = false;
      let yAxisIndex = -1;

      if (display) {
        if (isByUnit) {
          for (let j = 0; j < units.length; j++) {
            let unit = units[j];
            if (unit.display === display) {
              yAxisIndex = j;
              into = true;
              break;
            }
          }

          if (!into) {
            let o = {
              display: display,
              expression: expression,
            };

            units.push(o);
          }

        } else {
          let o = {
            display: display,
            expression: expression,
          };

          units.push(o);
        }
      }

      if (!into) {
        let axis = {
          lineColor: variable_color,
          lineWidth: 2,

          className: CHART_Y_AXIS_UNIT,
          labels: {
            format: `{value} ${display}`
          },
          title: {
            text: display
          },
          plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
          }]
        };

        let unitsSize = units.length;
        if (unitsSize % 2 != 0) {
          axis.opposite = false;
        }

        if (unitsSize > 0) {
          if (CHART_THEME === constants.DARK_THEME) {
            axis.gridLineWidth = 1;
          }
        }

        yAxis.push(axis);
        yAxisIndex = yAxis.length - 1;
      }

      let hasConversion = isString(expression) && isString(display);

      let serie = {
        id: 'dataseries',
        name: variable_name,
        color: variable_color,
        lineWidth: 2,
        tooltip: {
          valueSuffix: ` ${display}`
        },
        data: (() => {
          let values = [];

          let size = records.length;

          for (let j = 0; j < size; j++) {
            const record = records[j];

            let timestamp = new Date(record.t);
            let value = record.v;

            if (hasConversion && isNumber(value) && !isNaN(value)) {
              let nExpression = self.replaceAll(expression, '${value}', value);
              try {
                let v = math.eval(nExpression);

                let str = `${v}`;
                let iPoint = str.indexOf('.');
                if (iPoint === -1) {
                  iPoint = str.length - 4;
                }

                let nString = math.format(v, { precision: iPoint + 4 });
                let nValue = parseFloat(nString);
                if (isNumber(nValue)) {
                  value = nValue
                }

              } catch (e) {
                console.log('Exception: ', timestamp, value);
              }
            }

            let time = timestamp.getTime();

            let o = [time, value];
            values.push(o);

            if (events.length > 0) {
              for (let k = 0; k < events.length; k++) {
                const event = events[k];

                if (record.id === event.record_id) {
                  let vTimestamp = timestamp.getTime();
                  let nTimestamp = new Date(event.created_at);
                  let vTs = nTimestamp.getTime();

                  if (vTimestamp === vTs) {
                    let o = {
                      y: value,
                      x: nTimestamp,
                      title: `${event.name}`,
                      text: `${variable_name}: ${event.message}`,
                      // Información Extra
                      chart_event_id: event.id,
                    }

                    serieEvents.data.push(o);
                    break;
                  }
                }
              }
            }


            if (event_notes.length > 0) {
              for (let k = 0; k < event_notes.length; k++) {
                const event_note = event_notes[k];

                if (record.id === event_note.record_id) {
                  let vTimestamp = timestamp.getTime();
                  let nTimestamp = new Date(event_note.created_at);
                  let vTs = nTimestamp.getTime();

                  if (vTimestamp === vTs) {
                    let o = {
                      y: value,
                      x: nTimestamp,
                      title: `${event_note.name}`,
                      text: `${variable_name}: ${event_note.description}`,
                      // Información Extra
                      chart_event_id: event_note.id,
                    }

                    serieEvents.data.push(o);
                    break;
                  }
                }
              }
            }
          }

          return values;
        })()
      };

      if (yAxisIndex > -1) {
        serie.yAxis = yAxisIndex;
      }

      seriesOptions.push(serie);

      let size = seriesOptions.length;
      if (size > 0) {
        let position = size - 1;

        self.state.series.push({
          rLength: rLength,
          shifted: shifted,
          position: position,
          variable_id: variable.variable_id,
          is_custom: variable.variable_is_custom,
          expression: variable.variable_expression,
          display: variable.variable_display
        });
      }
    }

    if (serieEvents.data.length > 0) {
      seriesOptions.push(serieEvents);
    }

    let startDateUTC = Chart.getUTCDate(start_date);
    let title = o.title;
    let subtitle = o.subtitle;

    let chart = {
      key: this.props.chart,
      pointStart: startDateUTC,
      yAxis: yAxis,
      title: title,
      subtitle: subtitle,
      seriesOptions: seriesOptions,

      variables: variables,
      diff: diff,
      maxNumber: maxNumber,
    };

    if (chart.key === '24') {
      chart.pointInterval = 1000 * 20;
    } else if (chart.key === 'annual') {
      chart.pointInterval = 1000 * 60 * 60 * 24;
    } else {
      chart.pointInterval = 1000 * 20;
    }

    return chart;
  }

  updateChart(chart) {
    let self = this;

    let chartKey = chart.key;
    let keyChartContent = `container-chart-${chartKey}`;

    let gridLineWidthX = 0;
    if (CHART_THEME === constants.DARK_THEME) {
      gridLineWidthX = 1;
    }

    let buttons = [];
    let diff = chart.diff;

    let dataGroupingStatus = false;

    if (chart.maxNumber > 18000) {
      dataGroupingStatus = true;
    }

    let day = 1000 * 60 * 60 * 24;
    if (diff < (day * 3)) {
      buttons = [
        {
          count: 15,
          type: 'minute',
          text: '15M'
        }, {
          count: 30,
          type: 'minute',
          text: '30M'
        }, {
          count: 1,
          type: 'hour',
          text: '1H'
        }
      ];

    } else if (diff >= (day * 3) && diff < (day * 15)) {
      buttons = [
        {
          count: 30,
          type: 'minute',
          text: '30M'
        }, {
          count: 60,
          type: 'minute',
          text: '1H'
        }, {
          count: 12,
          type: 'hour',
          text: '12H'
        }
      ];

    } else if (diff >= (day * 15) && diff < (day * 31)) {
      buttons = [
        {
          count: 1,
          type: 'hour',
          text: '1H'
        }, {
          count: 12,
          type: 'hour',
          text: '12H'
        }, {
          count: 1,
          type: 'day',
          text: '1D'
        }
      ];

    } else if (diff >= (day * 31) && diff < (day * 61)) {
      buttons = [
        {
          count: 12,
          type: 'hour',
          text: '12H'
        }, {
          count: 1,
          type: 'day',
          text: '1D'
        }, {
          count: 1,
          type: 'week',
          text: '1S'
        }
      ];

    } else if (diff >= (day * 61) && diff < (day * 181)) {
      buttons = [
        {
          count: 1,
          type: 'day',
          text: '1D'
        }, {
          count: 1,
          type: 'week',
          text: '1S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }
      ];

    } else if (diff >= (day * 181) && diff < (day * 366)) {
      buttons = [
        {
          count: 1,
          type: 'week',
          text: '1S'
        }, {
          count: 2,
          type: 'week',
          text: '2S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }
      ];

    } else if (diff >= (day * 366) && diff < (day * 730)) {
      buttons = [
        {
          count: 1,
          type: 'week',
          text: '1S'
        }, {
          count: 2,
          type: 'week',
          text: '2S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }
      ];

    } else {
      buttons = [
        {
          count: 2,
          type: 'week',
          text: '2S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }, {
          count: 3,
          type: 'month',
          text: '3M'
        }
      ];
    }

    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(tz);

    let config = {
      time: {
        timezone: tz
      },

      chart: {
        zoomType: 'xy',
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        },
        events: {
          click: function (e) {
            let min = document.querySelector(`#${INPUT_SPAN_MIN}-${chartKey}`).value.trim();
            min = parseFloat(min);

            let max = document.querySelector(`#${INPUT_SPAN_MAX}-${chartKey}`).value.trim();
            max = parseFloat(max);

            if (!isNaN(max) && !isNaN(min)) {
              let sizeY = self.chartOne.yAxis.length;
              for (let i = 0; i < sizeY; i++) {
                let className = self.chartOne.yAxis[i].userOptions.className;
                if (className === CHART_Y_AXIS_UNIT) {
                  self.chartOne.yAxis[i].setExtremes(min, max);
                }
              }
            }
          }
        }
      },

      boost: {
        useGPUTranslations: true
      },

      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function (e) {
                if (e.point) {
                  // Eventos de Graficas
                  if (e.point.options) {
                    let o = e.point.options;

                    if (o.chart_event_id) {
                      let id = o.chart_event_id;
                      if (id) {
                        self.props.chartEmitter.emit(constants.EVENT_OPEN_EVENT_CHART, id);
                      }

                      return;
                    }
                  }
                }

                let keyInputNewEvent = `input-new-event-${chartKey}`;
                let nEvent = document.querySelector(`#${keyInputNewEvent}`).checked;
                if (!nEvent) return;

                let name = this.series.name;
                let index = this.index;

                let variables = chart.variables;

                for (let i = 0; i < variables.length; i++) {
                  const variable = variables[i];
                  let variable_name = variable.variable_name;

                  variable_name = `${variable.variable_device}.${variable_name}`;

                  if (name === variable_name) {
                    let point = variable.records[index];
                    if (point.id === 0) {
                      let message = 'Solo es posible agregar eventos en periodos menores a 15 días';
                      Materialize.toast(message, 2500);
                      return;
                    }

                    let created_at = new Date(point.t);

                    let json = {};
                    json.variable_id = variable.variable_id;
                    json.is_custom = variable.is_custom;
                    json.record_id = point.id;
                    json.created_at_in = self.getDateToString(created_at);

                    if (self.props.chartEmitter) {
                      json.variable_name = variable_name;
                      json.value = point.v;

                      self.props.chartEmitter.emit(constants.EVENT_OPEN_CREATE_EVENT_CHART, json);
                      return;
                    }
                  }
                }
              }
            }
          },
          dataGrouping: {
            enabled: dataGroupingStatus
          },
          turboThreshold: chart.maxNumber * 2,
          pointStart: chart.pointStart,
          pointInterval: chart.pointInterval
        },
      },

      legend: {
        enabled: true,
        itemStyle: {
          fontSize: '24px'
        }
      },

      xAxis: {
        events: {
          afterSetExtremes: self.getRecordsForExtremes()
        },
        gridLineWidth: gridLineWidthX,
      },

      yAxis: chart.yAxis,

      tooltip: {
        style: {
          fontSize: '16px',
        },
        split: true,
        formatter: function () {
          let tooltip = [false];

          if (this.point) {
            let title = this.point.title;
            let text = this.point.text;
            let date = this.point.x;
            let s = self.chartOne.time.dateFormat('%Y-%m-%d %H:%M:%S', date);

            let content = title + '<br>' + text + '<br>' + s;
            tooltip[0] = content;
          }

          let points = [];
          if (this.points) {
            this.points.map((point) => {
              let name = false;
              let unit = '';

              if (point) {
                name = point.series.name;
                unit = point.series.userOptions.tooltip.valueSuffix;
              }

              let date = point.x;
              let s = self.chartOne.time.dateFormat('%Y-%m-%d %H:%M:%S', date);

              let content = name + '<br>' + point.y + ' ' + unit + '<br>' + s;
              points.push({ y: point.point.plotY, content: content });
            });
          }

          for (let i = 0; i < points.length; i++) {
            const point = points[i];
            tooltip.push(point.content);
          }

          return tooltip;
        },
        useHTML: true
      },

      rangeSelector: {
        buttons: buttons,
        inputEnabled: false,
        selected: 0,
      },

      title: {
        text: chart.title
      },

      subtitle: {
        text: chart.subtitle
      },

      exporting: {
        enabled: true,
        sourceWidth: 1600,
        sourceHeight: 600,
      },

      series: chart.seriesOptions
    };

    //console.log(JSON.stringify(config));

    console.time('line');
    // Create the chart
    this.chartOne = Highcharts.stockChart(keyChartContent, config);

    console.timeEnd('line');

    let sizeX = this.chartOne.xAxis.length;
    let sizeY = this.chartOne.yAxis.length;

    for (let i = 0; i < sizeX; i++) {
      self.extremes.x.min = this.chartOne.xAxis[i].min;
      self.extremes.x.max = this.chartOne.xAxis[i].max;
    }

    for (let i = 0; i < sizeY; i++) {
      let className = self.chartOne.yAxis[i].userOptions.className;
      if (className === CHART_Y_AXIS_UNIT) {
        self.extremes.y.min = this.chartOne.yAxis[i].min;
        self.extremes.y.max = this.chartOne.yAxis[i].max;
      }
    }

    //self.state.isOk = true;
		self.setState({ isOk: true }, () => {
			self.initializePickers()
		})
  }

  getRecordsForExtremes() {
    let self = this;

    let fn = (evt) => {
      if (evt.trigger === TRIGGER_ZOOM) {
        let chartKey = self.props.chart;

        let keyBtnResetZoom = `#content-reset-zoom-${chartKey}`;
        $(keyBtnResetZoom).show();

        $('.highcharts-range-selector-group').hide();

        let sizeY = self.chartOne.yAxis.length;
        for (let i = 0; i < sizeY; i++) {
          let className = self.chartOne.yAxis[i].userOptions.className;
          if (className === CHART_Y_AXIS_UNIT) {
            self.chartOne.yAxis[i].setExtremes(undefined, undefined);
          }
        }
      }
    };

    return fn;
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
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
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
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
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

  getRecords(json, fn) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_VARIABLES}/record`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);
      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
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

  getCustomRecords(json, fn) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_CUSTOM_VARIABLES}/record`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);
      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
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

  getEventsOfAlarm(json, fn) {
    let self = this;

    let xhr = $.ajax({
      url: `/server/alarm/events/list`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
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

  getEventsOfNote(json, fn) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_CHART_EVENTS}/list`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message);
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

  initializePickers() {
    let self = this;

    let chartKey = this.props.chart;

    let keyContentDateOf = `content-input-date-of-${chartKey}`;
    let keyDateOf = `input-date-of-${chartKey}`;
    let keyContentDateTo = `content-input-date-to-${chartKey}`;
    let keyDateTo = `input-date-to-${chartKey}`;

		let keyDateTimeOf = `input-time-of-${chartKey}`;
		let keyDateTimeTo = `input-time-to-${chartKey}`;

    let date_of = this.state.date_of;
    let date_to = this.state.date_to;

    if (!date_of) date_of = '';
    if (!date_to) date_to = '';

    let date_time_of = this.state.date_time_of;
    let date_time_to = this.state.date_time_to;

    if (!date_time_of) date_time_of = '';
    if (!date_time_to) date_time_to = '';

    $('#' + keyContentDateOf).html('');
    $('#' + keyContentDateOf).append('<input type="text" id="'+keyDateOf+'" class="datepicker" placeholder="De:"  value="'+ date_of +'" />');

    $('#' + keyContentDateTo).html('');
    $('#' + keyContentDateTo).append('<input type="text" id="' + keyDateTo+'" class="datepicker" placeholder="A:"  value="'+ date_to +'" />');

		document.querySelector(`#${keyDateTimeOf}`).value = date_time_of;
		document.querySelector(`#${keyDateTimeTo}`).value = date_time_to;

    $(`#${keyDateOf}`).on('change', (evt) => {
      self.state.date_of = evt.target.value;
    });

    $(`#${keyDateTo}`).on('change', (evt) => {
      self.state.date_to = evt.target.value;
    });

	  $(`#${keyDateTimeOf}`).on('change', (evt) => {
      self.state.date_time_of = evt.target.value;
    });

    $(`#${keyDateTimeTo}`).on('change', (evt) => {
      self.state.date_time_to = evt.target.value;
    })

		if (window.SYSTEM_HOST !== 'scada.technotex.com') {
			$('.timepicker').pickatime({
				default: 'now',
				fromnow: 0,
				twelvehour: false,
				donetext: 'OK',
				cleartext: 'Limpiar',
				canceltext: 'Cancelar',
				autoclose: false,
				ampmclickable: true
			});
		}

    $('.datepicker').pickadate({
      selectMonths: false,
      selectYears: 15,
      format: 'dd-mm-yyyy',
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: true,
      monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
      weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    });

    $('.datepicker').on('mousedown', function (event) {
      event.preventDefault();
    });
  }

  handleChart() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      if (self.state.charting) return;

			self.setState({ charting: true }, () => { 
    		self.initializePickers();

				let chartKey = self.props.chart;

				let variablesOut = [];

				let variables = self.state.variables;
				for (let i = 0; i < variables.length; i++) {
					const variable = variables[i];
						let o = {
							id: variable.id,
							is_custom: variable.is_custom
						};

						variablesOut.push(o);
				}

				if (variablesOut.length === 0) {
					self.setState({ charting: false }, () => {
						self.initializePickers();
					})

					return;
				}

				self.setState({ panelVariables: [] });

				let keyInputDateOf = `#input-date-of-${chartKey}`;
				let keyInputDateTo = `#input-date-to-${chartKey}`;
				let keyInputTimeOf = `#input-time-of-${chartKey}`;
				let keyInputTimeTo = `#input-time-to-${chartKey}`;

				let inputDateOf = document.querySelector(keyInputDateOf);
				let inputTimeOf = document.querySelector(keyInputTimeOf);
				let inputDateTo = document.querySelector(keyInputDateTo);
				let inputTimeTo = document.querySelector(keyInputTimeTo);

				let date_of = inputDateOf.value.trim();
				let time_of = inputTimeOf.value.trim();
				let date_to = inputDateTo.value.trim();
				let time_to = inputTimeTo.value.trim();

				let dateOf = self.parseDate(date_of);
				dateOf = `${dateOf} ${time_of}:00`;

				let dateTo = self.parseDate(date_to);
				dateTo = `${dateTo} ${time_to}:00`;

				if (variablesOut.length > 0) {
					let variables = [];
					let customVariables = [];
					let variablesOfEvent = [];

					for (let i = 0; i < variablesOut.length; i++) {
						const variableOut = variablesOut[i];
						let id = variableOut.id;
						let is_custom = variableOut.is_custom;

						if (is_custom) {
							customVariables.push(id);
						} else {
							variables.push(id);
						}

						let o = { id: id, is_custom: is_custom };
						variablesOfEvent.push(o);
					}

					let keyInputEvents = `#input-events-${chartKey}`;
					let inputEvents = document.querySelector(keyInputEvents);
					let withEvents = inputEvents.checked;

					let keyInputAxesY = `#input-axes-y-${chartKey}`;
					let inputAxesY = document.querySelector(keyInputAxesY);
					let isByUnit = inputAxesY.checked;

					let reqs = {};

					if (variables.length > 0) {
						reqs.variables = (fn) => {
							let json = {
								variables: variables,
								start_date: dateOf,
								final_date: dateTo
							};

							console.log('Inicio records ...');
							self.getRecords(json, fn);
						};
					}

					if (customVariables.length > 0) {
						reqs.custom_variables = (fn) => {
							let json = {
								variables: customVariables,
								start_date: dateOf,
								final_date: dateTo
							};

							console.log('Inicio custom records ...');
							self.getCustomRecords(json, fn);
						};
					}

					if (withEvents) {
						reqs.events = (fn) => {
							let json = {
								variables: variablesOfEvent,
								start_date: dateOf,
								final_date: dateTo
							};

							console.log('Inicio events of alarms...');
							self.getEventsOfAlarm(json, fn);
						};

						reqs.event_notes = (fn) => {
							let json = {
								variables: variablesOfEvent,
								start_date: dateOf,
								final_date: dateTo
							};

							console.log('Inicio events notes ...');
							self.getEventsOfNote(json, fn);
						};
					}

					let keyLoadingChart = `#loading-chart-${chartKey}`;
					$(keyLoadingChart).show();

					parallel(reqs, (err, results) => {
						if (err) {
							self.setState({ charting: false }, () => {
    						self.initializePickers();

								Materialize.toast(err, 2500);;
							})

							return
						}

						let variables = results.variables;
						let custom_variables = results.custom_variables;
						let events = results.events;
						let event_notes = results.event_notes;

						if (!variables) variables = [];
						if (!custom_variables) custom_variables = [];

						variables = variables.concat(custom_variables)

						if (!events) events = [];
						if (!event_notes) event_notes = [];

						for (let i = 0; i < variables.length; i++) {
							const variable = variables[i];

							let vAlias = variable.variable_alias;
							if (!vAlias) vAlias = '';
							let indexCV = vAlias.indexOf('cv_');
							if (indexCV === 0) {
								variables[i].variable_is_custom = true;
							} else {
								variables[i].variable_is_custom = false;
							}

							for (let j = 0; j < events.length; j++) {
								const o = events[j];
								if (variable.variable_id === o.variable_id) {
									if (variable.variable_is_custom === o.is_custom) {
										variables[i].events = o.events;
										break;
									}
								}
							}

							for (let j = 0; j < event_notes.length; j++) {
								const o = event_notes[j];
								if (variable.variable_id === o.variable_id) {
									if (variable.variable_is_custom === o.is_custom) {
										variables[i].event_notes = o.events;
										break;
									}
								}
							}
						}

						let o = {
							variables: variables,
							start_date: dateOf,
							final_date: dateTo,
							title: 'Grafica Avanzada',
							subtitle: `${dateOf} al ${dateTo}`,
							isByUnit: isByUnit,
						};

						console.log('Inicio de Config Chart');
						let chart = self.getConfigChart(o);

						self.setState({ isOk: false }, () => {
							self.initializePickers()

							console.log('Config Chart Ok');

							self.updateChart(chart);

							console.log('Chart Finish', self.state.isOk);

							$(keyLoadingChart).hide();

							self.setState({ charting: false }, () => {
								self.initializePickers()
							})
						})

					});
				}
			})
    };

    return fn;
  }

  handleSetpoint() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variablesSetpoint = clone(self.state.variablesSetpoint);
      let setpoints = clone(self.state.setpoints);
      if (!isArray(setpoints)) setpoints = [];

      self.props.chartEmitter.emit(constants.EVENT_VARIABLES, variablesSetpoint, setpoints);

    };

    return fn;
  }

  handleReport() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
    };

    return fn;
  }

  handleResetZoom() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      if (self.chartOne) {
        let chartKey = self.props.chart;
        let keyBtnResetZoom = `#content-reset-zoom-${chartKey}`;
        $(keyBtnResetZoom).hide();

        $('.highcharts-range-selector-group').show();


        let sizeX = this.chartOne.xAxis.length;
        let sizeY = this.chartOne.yAxis.length;

        for (let i = 0; i < sizeX; i++) {
          self.chartOne.xAxis[i].setExtremes(self.extremes.x.min, self.extremes.x.max);
        }

        for (let i = 0; i < sizeY; i++) {
          let className = self.chartOne.yAxis[i].userOptions.className;
          if (className === CHART_Y_AXIS_UNIT) {
            self.chartOne.yAxis[i].setExtremes(undefined, undefined);
          }
        }
      }
    };

    return fn;
  }

  handleChangeRT() {
    let self = this;

    let fn = (evt) =>{
      evt.preventDefault();

      let value = evt.target.checked;
      self.setState({ RT: value }, () => {
				self.initializePickers();
			});
    };

    return fn;
  }

  handleChangeDevice() {
    let self = this;

    let fn = (evt) => {
      let chartKey = this.props.chart;

      let keyInputDevice = `#input-device-${chartKey}`;
      let keyInputVariable = `#input-variable-${chartKey}`;

      let value = evt.target.value;

      self.setState({ deviceOne: value }, () => {
        $('select').material_select();

        $(keyInputDevice).off('change', self.handleChangeDevice());
        $(keyInputVariable).off('change', self.handleChangeVariable());

        $(keyInputDevice).on('change', self.handleChangeDevice());
        $(keyInputVariable).on('change', self.handleChangeVariable());
        self.initializePickers();
      });
    };

    return fn;
  }

  handleChangeVariable() {
    let self = this;

    let fn = (evt) => {
      let chartKey = this.props.chart;

      let keyInputDevice = `#input-device-${chartKey}`;
      let keyInputVariable = `#input-variable-${chartKey}`;

      let variablesIn = self.state.variables;
      let size = variablesIn.length;
      if (size >= 6) {
        return;
      }

      let value = evt.target.value;
      if (value === '') {
        return;
      }

      let values = value.split('_');

      let is_custom = values[0] === 'cv';
      let id = parseInt(values[1]);

      let deviceOne = self.state.deviceOne;

      let variables = self.state.variables_;
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];

        if (variable.device === deviceOne) {
          if (variable.is_custom === is_custom) {
            if (variable.id === id) {
              if (!variable.in_variables) {
                variables[i].in_variables = true;

                variablesIn.push(variable);

                self.setState({ variables: variablesIn, variables_: variables }, () => {
                  $(keyInputVariable).val('');

                  $('select').material_select();

                  $(keyInputDevice).off('change', self.handleChangeDevice());
                  $(keyInputVariable).off('change', self.handleChangeVariable());

                  $(keyInputDevice).on('change', self.handleChangeDevice());
                  $(keyInputVariable).on('change', self.handleChangeVariable());
                  self.initializePickers();
                });
              }

              break;
            }
          }
        }
      }
    };

    return fn;
  }

  handleRemoveItem(index) {
    let self = this;

    let fn = (evt) => {
      let chartKey = this.props.chart;

      let keyInputDevice = `#input-device-${chartKey}`;
      let keyInputVariable = `#input-variable-${chartKey}`;

      let variables = self.state.variables;

      let v = variables[index];
      if (v) {
        let variables_ = self.state.variables_;
        for (let i = 0; i < variables_.length; i++) {
          let variable = variables_[i];
          if (variable.id === v.id) {
            variables_[i].in_variables = false;
            variables.splice(index, 1);
            break;
          }
        }

        self.setState({ variables: variables, variables_: variables_ }, () => {
          $(keyInputVariable).val('');

          $('select').material_select();

          $(keyInputDevice).off('change', self.handleChangeDevice());
          $(keyInputVariable).off('change', self.handleChangeVariable());

          $(keyInputDevice).on('change', self.handleChangeDevice());
          $(keyInputVariable).on('change', self.handleChangeVariable());
          self.initializePickers();
        });
      }

    };

    return fn;
  }

  handleEnter() {
    let self = this;

    let fn = (evt) => {
      let chartKey = this.props.chart;

      if (evt.which === ENTER) {
        evt.preventDefault();
        let input = evt.target;
        let id = input.id;

        let isInputMin = id === `${INPUT_SPAN_MIN}-${chartKey}`;
        let isInputMax = id === `${INPUT_SPAN_MAX}-${chartKey}`;

        if (isInputMin || isInputMax) {
          if (isInputMin) {
            let min = input.value.trim();
            min = parseFloat(min);

            let max = document.querySelector(`#${INPUT_SPAN_MAX}-${chartKey}`).value.trim();
            max = parseFloat(max);

            if (isNaN(min) || isNaN(max)) return;

            if (isNumber(min) && isNumber(max)) {
              let sizeY = self.chartOne.yAxis.length;
              for (let i = 0; i < sizeY; i++) {
                let className = self.chartOne.yAxis[i].userOptions.className;
                if (className === CHART_Y_AXIS_UNIT) {
                  self.chartOne.yAxis[i].setExtremes(min, max);
                }
              }
            }

          } else {
            let max = input.value.trim();
            max = parseFloat(max);

            let min = document.querySelector(`#${INPUT_SPAN_MIN}-${chartKey}`).value.trim();
            min = parseFloat(min);

            if (isNaN(min) || isNaN(max)) return;

            if (isNumber(min) && isNumber(max)) {
              let sizeY = self.chartOne.yAxis.length;
              for (let i = 0; i < sizeY; i++) {
                let className = self.chartOne.yAxis[i].userOptions.className;
                if (className === CHART_Y_AXIS_UNIT) {
                  self.chartOne.yAxis[i].setExtremes(min, max);
                }
              }
            }
          }
        }
      }
    };

    return fn;
  }

  handleToggleTool() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let chartKey = this.props.chart;
      let keyContentTool = `content-tool-${chartKey}`;

      $('#' + keyContentTool).toggle();

      let display = $('#' + keyContentTool).css('display');
      let status = display != 'none';

      self.setState({ status_tools: status }, () => {
        let keyChartContent = `#container-chart-${chartKey}`;
        let keyBtnResetZoom = `#content-reset-zoom-${chartKey}`;
        let position = $(keyChartContent).position();
        let left = position.left + 40;
        let top = position.top + 40;
        $(keyBtnResetZoom).css({ left: left, top: top });
      })
    };

    return fn;
  }

  handleLastBtn(btn) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let now = Date.now();
      let start_date = false;
      let final_date = false;

      if (btn === LAST_24) {
        let time = 1000 * 60 * 60 * 24;
        let start = now - time;

        start_date = new Date(start);
        final_date = new Date(now);

      } else if (btn === LAST_48) {
        let time = 1000 * 60 * 60 * 48;
        let start = now - time;

        start_date = new Date(start);
        final_date = new Date(now);

      } else if (btn === LAST_07) {
        let time = 1000 * 60 * 60 * 24 * 7;
        let start = now - time;

        start_date = new Date(start);
        final_date = new Date(now);

      } else if (btn === LAST_30) {
        let time = 1000 * 60 * 60 * 24 * 30;
        let start = now - time;

        start_date = new Date(start);
        final_date = new Date(now);

      } else if (btn === LAST_06) {
        let time = 1000 * 60 * 60 * 24 * 30 * 6;
        let start = now - time;

        start_date = new Date(start);
        final_date = new Date(now);

      } else if (btn === LAST_12) {
        let time = 1000 * 60 * 60 * 24 * 30 * 24;
        let start = now - time;

        start_date = new Date(start);
        final_date = new Date(now);
      }

      if (start_date && final_date) {
        let chartKey = self.props.chart;

        let startDate = self.getDateToString(start_date);
        let finalDate = self.getDateToString(final_date);

        let keyInputDateOf = `#input-date-of-${chartKey}`;
        let keyInputDateTo = `#input-date-to-${chartKey}`;
        let keyInputTimeOf = `#input-time-of-${chartKey}`;
        let keyInputTimeTo = `#input-time-to-${chartKey}`;

        let inputDateOf = document.querySelector(keyInputDateOf);
        let inputTimeOf = document.querySelector(keyInputTimeOf);
        let inputDateTo = document.querySelector(keyInputDateTo);
        let inputTimeTo = document.querySelector(keyInputTimeTo);

        let valuesStart = startDate.split(' ');
        let valuesFinal = finalDate.split(' ');

        if (valuesStart.length > 0) {
          let dateOf = valuesStart[0];
          dateOf = self.parseDate(dateOf);

          inputDateOf.value = dateOf;
          inputTimeOf.value = '00:00';

          self.state.date_of = dateOf;
          self.state.date_time_of = '00:00';
        }

        if (valuesFinal.length > 0) {
          let dateTo = valuesFinal[0];
          dateTo = self.parseDate(dateTo);

          inputDateTo.value = dateTo;
          inputTimeTo.value = '00:00';

          self.state.date_to = dateTo;
          self.state.date_time_to = '00:00';
        };
      }
    };

    return fn;
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

  parseDate(s) {
    if (s) {
      if (isString(s)) {
        let elements = s.split('-');
        elements = elements.reverse();

        let value = '';
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (i === 0) {
            value = `${element}`;
          } else {
            value = `${value}-${element}`;
          }
        }

        return value;
      }
    }

    return s;
  }

  parseTime(s) {
    if (s) {
      if (isString(s)) {
        let elements = s.split(':');
        if (elements.length === 3) {
          let hours = elements[0];
          let minutes = elements[1];
          let value = `${hours}:${minutes}`;

          return value;
        }
      }
    }

    return s;
  }

  replaceAll(s, old, n) {
    s = s.replace(old, n);
    let i = s.indexOf(old);
    if (i >= 0) {
      this.replaceAll(s, old, n);
    }

    return s
  }

  createItemFileToShow(chart_event_id) {
    let self = this;

    let fn = (file, index) => {
      let url = `/server/chart_events/file/${chart_event_id}/${file}`

      return (
        <a href={url} target="_blank">
          {file}
          <br />
        </a>
      );
    };

    return fn;
  }

  createItemFile() {
    let self = this;

    let fn = (item, index) => {
      return (
        <div className="sion-chip" key={index}>
          {item.name}
          <i className="close material-icons" onClick={self.handleRemoveFile(index)}>close</i>
        </div>
      );
    };

    return fn;
  }

  createItemVariable() {
    let self = this;

    let fn = (item, index) => {
      return (
        <div className="sion-chip" key={index}>
          {item.device}.{item.name}
          <i className="close material-icons" onClick={self.handleRemoveItem(index)}>close</i>
        </div>
      );
    };

    return fn;
  }

  createOptDevices() {
    //let self = this;

    let fn = (name, index) => {
      return (
        <option key={index} value={name}>
          {name}
        </option>
      );
    };

    return fn;
  }

  createOptVariable() {
    let self = this;

    let fn = (item, index) => {
      let pre = 'v';
      if (item.is_custom) pre = 'cv';

      let value = `${pre}_${item.id}`;

      let deviceOne = self.state.deviceOne;
      if (deviceOne !== item.device) return;

      return (
        <option key={index} value={value} disabled={item.in_variables}>
          {item.device}.{item.name}
        </option>
      );
    };

    return fn;
  }

  createPanelVariableItem() {
    //let self = this;

    let fn = (variable, index) => {
      return <PanelVariableItem key={index} variable={variable} />;
    };

    return fn;
  }

  sortByValue() {
    let fn = (a, b) => {
      if (a.y < b.y) return -1;
      if (a.y > b.y) return 1;
      return 0;
    };

    return fn;
  }

  getOnlyUnique() {
    let fn = (value, index, self) => {
      return self.indexOf(value) === index;
    }

    return fn;
  }

  render(props, state) {
    let chartKey = this.props.chart;

    let keyChartContent = `container-chart-${chartKey}`;
    let keyInputDevice = `input-device-${chartKey}`;
    let keyInputVariable = `input-variable-${chartKey}`;
    let keyInputContentDateOf = `content-input-date-of-${chartKey}`;
    let keyInputContentDateTo = `content-input-date-to-${chartKey}`;
    let keyInputTimeOf = `input-time-of-${chartKey}`;
    let keyInputTimeTo = `input-time-to-${chartKey}`;
    let keyInputMax = `${INPUT_SPAN_MAX}-${chartKey}`;
    let keyInputMin = `${INPUT_SPAN_MIN}-${chartKey}`;
    let keyInputRT = `input-rt-${chartKey}`;
    let keyInputEvents = `input-events-${chartKey}`;
    let keyInputNewEvent = `input-new-event-${chartKey}`;
    let keyInputAxesY = `input-axes-y-${chartKey}`;
    let keyContentTool = `content-tool-${chartKey}`;
    let keyBtnResetZoom = `content-reset-zoom-${chartKey}`;

    let keyLoadingChart = `loading-chart-${chartKey}`;

    if (state.chartEvent) {
      if (!state.chartEvent.files) state.chartEvent.files = [];
    } else {
      state.chartEvent = { files: [] }
    }

    let iconArrow = <i className="material-icons">keyboard_arrow_down</i>;
    if (state.status_tools) {
      iconArrow = <i className="material-icons">keyboard_arrow_up</i>;
    }

    return(
      <div>

        <div id="menugrafica" className="menu_grafica">

          <div id="btn_rt" className="btn_realgraf">
            <a href="#" onClick={this.handleToggleTool()}>
              <i className="material-icons">{iconArrow}</i>
            </a>
          </div>

          <div id={keyContentTool} className="row tools_graph" style="padding: 0px;">

            <div className="col s12 m2">
              <div className="tools_vars">

                <div className="variable">
                  <label style="line-height: 5px;">Dispositivos</label>
                  <select className="browser-default sion-select" id={keyInputDevice}>
                    <option value="" disabled selected>Dispositivos</option>
                    {state.devices_.map(this.createOptDevices())}
                  </select>
                </div>

                <div className="variable">
                  <label style="line-height: 5px;">Variables</label>
                  <select className="browser-default sion-select" id={keyInputVariable}>
                    <option value="" disabled selected>Variables</option>
                    {state.variables_.map(this.createOptVariable())}
                  </select>
                </div>
                <div className="chips_var">
                  {state.variables.map(this.createItemVariable())}
                </div>
              </div>
            </div>

            <div className="col s12 m3">
              <label>Periodo</label>
              <div className="row">
                <div id={keyInputContentDateOf} className="dates col s6 m6"></div>
                <div className="dates col s6 m6">
                  <input id={keyInputTimeOf} placeholder="Hora de:" type="text" value="00:00" className={ window.SYSTEM_HOST !== 'scada.technotex.com' ? "timepicker" : "" }
									       type={ window.SYSTEM_HOST !== 'scada.technotex.com' ? "text" : "time" } />
                </div>
              </div>
              <div className="row">
                <div id={keyInputContentDateTo} className="dates col s6 m6"></div>
                <div className="dates col s6 m6">
                  <input id={keyInputTimeTo} placeholder="Hora de:" value="00:00" className={ window.SYSTEM_HOST !== 'scada.technotex.com' ? "timepicker" : "" }
												 type={ window.SYSTEM_HOST !== 'scada.technotex.com' ? "text" : "time" } />
                </div>
              </div>
            </div>

            <div className="col s12 m2">
              <label>Últimos</label>
              <br />
              <div className="btn_actions">
                <div className="btn_last hoverable">
                  <a href="#" onClick={this.handleLastBtn(LAST_24)}>24 <span>Horas</span></a>
                </div>
                <div className="btn_last hoverable">
                  <a href="#" onClick={this.handleLastBtn(LAST_48)}>48 <span>Horas</span></a>
                </div>
                <div className="btn_last hoverable">
                  <a href="#" onClick={this.handleLastBtn(LAST_07)}>07 <span>Días</span></a>
                </div>
                <div className="btn_last hoverable">
                  <a href="#" onClick={this.handleLastBtn(LAST_30)}>30 <span>Días</span></a>
                </div>
                <div className="btn_last hoverable">
                  <a href="#" onClick={this.handleLastBtn(LAST_06)}>06 <span>Meses</span></a>
                </div>
                <div className="btn_last hoverable">
                  <a href="#" onClick={this.handleLastBtn(LAST_12)}>12 <span>Meses</span></a>
                </div>
              </div>
              <br />
            </div>

            <div className="col s12 m2">
              <div className="row" style="padding: 10px 0px;">

                <div className="col s12 m12" style="text-align: center;">
                  <p style="margin-block-start: 0.5em; margin-block-end: 0.5em; font-size: 12px;">
                    <input id={keyInputRT} type="checkbox" className="filled-in" onChange={this.handleChangeRT()} />
                    <label htmlFor={keyInputRT}>&nbsp;&nbsp;&nbsp;&nbsp;Real-time&nbsp;&nbsp;&nbsp;</label>
                  </p>
                </div>

                <div className="col s12 m12" style="text-align: center;">
                  <p style="margin-block-start: 0.5em; margin-block-end: 0.5em; font-size: 12px;">
                    <input id={keyInputEvents} type="checkbox" className="filled-in" />
                    <label htmlFor={keyInputEvents}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eventos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  </p>
                </div>

                <div className="col s12 m12" style="text-align: center;">
                  <p style="margin-block-start: 0.5em; margin-block-end: 0.5em; font-size: 12px;">
                    <input id={keyInputNewEvent} type="checkbox" className="filled-in" />
                    <label htmlFor={keyInputNewEvent}> Nuevo Evento</label>
                  </p>
                </div>

                <div className="col s12 m12" style="text-align: center;">
                  <p style="margin-block-start: 0.5em; margin-block-end: 0.5em; font-size: 12px;">
                    <input id={keyInputAxesY} type="checkbox" className="filled-in" />
                    <label htmlFor={keyInputAxesY}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agrupar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  </p>
                </div>

              </div>
            </div>

            <div className="col s12 m3">
              <label for="">Acciones</label>
              <div className="realtime_maxmin">
                <div className="col s6 m6">
                  <input id={keyInputMax} placeholder="Máximo" type="text" onKeyPress={this.handleEnter()} />
                </div>
                <div className="col s6 m6">
                  <input id={keyInputMin} placeholder="Mínimo" type="text" onKeyPress={this.handleEnter()} />
                </div>
                <div className="col s6 m4">
                  <div className="margin_top">
                    <button className="btn btn_ttx_flat btn-ttx-graph" id="btn-graph" onClick={this.handleChart()}>
                      <i className="material-icons prefix left">timeline</i>
                    </button>
                  </div>
                </div>
                <div className="col s6 m4">
                  <div className="margin_top">
                    <button className="btn btn_ttx_flat btn-ttx-graph" id="btn-setpoint" onClick={this.handleSetpoint()}>
                      <i className="material-icons prefix left">error_outline</i>
                    </button>
                  </div>
                </div>
                <div className="col s6 m4">
                  <div className="margin_top" style="display: none;">
                    <button className="btn btn_ttx_flat btn-ttx-graph" id="btn-report" onClick={this.handleReport()}>
                      <i className="material-icons prefix left">archive</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="menu_monitor" hidden={!this.state.RT}>
              <div className="row tools_monitor">
                {this.state.panelVariables.map(this.createPanelVariableItem())}
              </div>
            </div>
          </div>

          <div id={keyLoadingChart} className="preloader">
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m12" style="background: #313131; height: 570px;">
              <div id={keyChartContent} style="height: 550px; width: 100%; margin: 10px auto"></div>
            </div>
          </div>

          <div id={keyBtnResetZoom} style="displa: none; position: absolute; width: 100px;">
            <button className="btn btn_ttx_flat" onClick={this.handleResetZoom()}>
              <i className="material-icons prefix left">replay</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Chart.getUTCDate = (date) => {
  if (isDate(date)) {
    let day = date.getUTCDate();
    let month = date.getUTCMonth()
    let year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    let mins = date.getUTCMinutes();
    let secs = date.getUTCSeconds();

    return Date.UTC(year, month, day, hours, mins, secs);
  }

  return date;
}

export default Chart;
