import { h, render, Component } from 'preact';
import { isDate, isNumber, isString, isNaN } from 'underscore';

import constants from './../constants.js';

const CHART_Y_AXIS_UNIT = 'chart-y-axis-unit';

const INPUT_SPAN_MIN = 'input-span-min';
const INPUT_SPAN_MAX = 'input-span-max';

const TRIGGER_ZOOM = 'zoom';

class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      charting: false,

      variables_: [],
      variables: [],

      date_of: false,
      date_to: false,

      series: [],
      isOk: false,

      variablesSetpoint: [],
      setpoints: [],
    };

    this.extremes = {
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 }
    }
  }

  componentDidMount() {
    let self = this;

    let f = self.props.init;
    if (f) {
      f((err, o) => {
        if (err) {
          Materialize.toast(err, 2500);;
          return;
        }

        let chart = self.getConfigChart(o);
        self.updateChart(chart);

        $('.tooltipped').tooltip('remove');
        $('.tooltipped').tooltip({ delay: 20 });
      });
    }

    if (this.props.chartEmitter) {
      this.props.chartEmitter.on(constants.EVENT_UDAPTE_VARIABLES_VALUE, (variable) => {
        if (variable) {
          if (self.state.isOk) {

            if (!self.chartOne) return;

            let series = self.state.series;

            for (let i = 0; i < series.length; i++) {
              const serie = series[i];

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

                  let time = timestamp.getTime();
                  let point = [time, value];
                  if (self.chartOne.series[serie.position]) {
                    let shifted = serie.shifted;
                    self.chartOne.series[serie.position].addPoint(point, true, shifted);

                    if (!shifted) {
                      let rLength = serie.rLength + 1;
                      self.state.series[i].rLength = rLength;
                      // console.log("Shifted: INACTIVE: ", rLength, id, isCustom);
                      if (rLength > 8000) {
                        self.state.series[i].shifted = true;
                        console.log("Shifted: ACTIVE");
                      }
                    }
                  }

                  break;
                }
              }
            }
          }
        }
      });

      this.props.chartEmitter.on(constants.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE, (variable) => {
        if (variable) {
          if (self.state.isOk) {

            if (!self.chartOne) return;

            let series = self.state.series;

            for (let i = 0; i < series.length; i++) {
              const serie = series[i];

              let id = variable.variable_id;
              let isCustom = variable.is_custom;
              if (!isCustom) isCustom = false;

              if (!serie.is_custom) serie.is_custom = false;

              if (serie.variable_id === id) {
                if (serie.is_custom === isCustom) {

                  let timestamp = new Date(variable.timestamp);

                  let value = variable.value;
                  if (value === ' ') value = 0;

                  if (!isNumber(value)) value = 0;

                  let time = timestamp.getTime();
                  let point = [time, value];
                  if (self.chartOne.series[serie.position]) {
                    let shifted = serie.shifted;
                    self.chartOne.series[serie.position].addPoint(point, true, shifted);

                    if (!shifted) {
                      let rLength = serie.rLength + 1;
                      self.state.series[i].rLength = rLength;
                      // console.log("Shifted: INACTIVE: ", rLength, id, isCustom);
                      if (rLength > 8000) {
                        self.state.series[i].shifted = true;
                        console.log("Shifted: ACTIVE");
                      }
                    }
                  }

                  break;
                }
              }
            }
          }
        }
      });

      this.props.chartEmitter.on(constants.EVENT_UDAPTE_ALARMS_ACTIVE, (variable) => {

        if (self.chartOne) {
          for (let j = 0; j < self.chartOne.yAxis.length; j++) {
            if (self.chartOne.yAxis[j]) {
              let className = self.chartOne.yAxis[j].userOptions.className;
              if (className === CHART_Y_AXIS_UNIT) {
                let text = self.chartOne.yAxis[j].userOptions.title.text;
                if (text === variable.variable_unit) {
                  let id = `${variable.variable_prefix_name}`;
                  self.chartOne.yAxis[j].removePlotLine(id);
                  break;
                }
              }
            }
          }


          if (variable.alarm_id) {
            if (variable.color) {
              let addPlot = {
                value: variable.alarm_setpoint,
                color: variable.color,
                dashStyle: 'shortdash',
                width: 2,
                label: {
                  style: { fontWeight: 'bold', color: '#fff' },
                  text: variable.alarm_alias,
                },
                id: `${variable.variable_prefix_name}`
              };

              for (let j = 0; j < self.chartOne.yAxis.length; j++) {
                if (self.chartOne.yAxis[j]) {
                  let className = self.chartOne.yAxis[j].userOptions.className;
                  if (className === CHART_Y_AXIS_UNIT) {
                    let text = self.chartOne.yAxis[j].userOptions.title.text;
                    if (text === variable.variable_unit) {
                      self.chartOne.yAxis[j].addPlotLine(addPlot);
                      break;
                    }
                  }
                }
              }
            }
          }


        }
      });
    }

  }

  getConfigChart(o) {
    let self = this;

    self.state.series = [];
    self.state.isOk = false;

    let variables = o.variables;

    let start_date = new Date(o.start_date);
    let final_date = new Date(o.final_date);

    let diff = final_date.getTime() - start_date.getTime();
    let maxNumber = 8000;

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

    if (length >= 1) yAxis = [];

    self.state.setpoints = [];
    self.state.variablesSetpoint = [];

    for (let i = 0; i < length; i++) {
      const variable = variables[i];

      let shifted = false;

      if (!variable.variable_alarms) variable.variable_alarms = [];

      let variableSetpoint = {
        id: variable.variable_id,
        device: variable.variable_device,
        name: variable.variable_name,
        unit: variable.variable_display,
        alarms: variable.variable_alarms
      };

      self.state.variablesSetpoint.push(variableSetpoint);

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
          axis.gridLineWidth = 1;
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
        //zoomType: 'xy',
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        },
        events: {
          click: function (e) {
            let inputMin = document.querySelector(`#${INPUT_SPAN_MIN}-${chartKey}`);
            let inputMax =  document.querySelector(`#${INPUT_SPAN_MAX}-${chartKey}`);
            if (inputMin && inputMax) {
              let min = inputMin.value.trim();
              min = parseFloat(min);

              let max = inputMax.value.trim();
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
        }
      },

      boost: {
        useGPUTranslations: true
      },

      plotOptions: {
        series: {
          cursor: 'pointer',
          dataGrouping: {
            enabled: dataGroupingStatus
          },
          turboThreshold: chart.maxNumber * 2,
          pointStart: chart.pointStart,
          pointInterval: chart.pointInterval
        },
      },

      legend: {
        enabled: false
      },

      xAxis: {
        events: {
          afterSetExtremes: self.getRecordsForExtremes()
        },
        gridLineWidth: 1
      },

      yAxis: chart.yAxis,

      tooltip: {
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
        }
      },

      rangeSelector: {
        buttons: buttons,
        inputEnabled: false,
        selected: 0,
      },

      title: {
        text: chart.title
      },

      /*subtitle: {
        text: chart.subtitle
      },*/

      exporting: {
        enabled: true
      },

      navigator: {
        enabled: true
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

    self.state.isOk = true;
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

  sortByValue() {
    let fn = (a, b) => {
      if (a.y < b.y) return -1;
      if (a.y > b.y) return 1;
      return 0;
    };

    return fn;
  }

  render(props, state) {
    let chartKey = this.props.chart;

    let keyChartContent = `container-chart-${chartKey}`;

    return(
      <div>
        <div id="menugrafica" className="menu_grafica">
          <div className="row">
            <div className="col s12 m12" style="background: #313131; height: 350px;">
              <div id={keyChartContent} style="height: 330px; width: 100%; margin: 10px auto"></div>
            </div>
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