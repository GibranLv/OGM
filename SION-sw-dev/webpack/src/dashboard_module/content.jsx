import { h, render, Component } from 'preact';
import { parallel } from 'async';
import { w3cwebsocket } from 'websocket';
import { isArray, isNumber, isString } from 'underscore';

import VariableCard from './variable-card.jsx';
import Notification from './notification.jsx';

import Header from './../header.jsx';
import constants from './../constants.js';

const wsURL = `ws://${URLWS}/ws`;

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],

      dashboard_variables: [],
      charts_variables: [],

      value_on: 0,
      value_off: 0,
      logAlarm: false,

      markers_: [],
      colors: {},

      connection_errors_ws: 0,
      connection_errors_wsa: 0
    }

    this.chartOne = false;
  }

  componentDidMount() {
    let self = this;

    $('.modal').modal({ dismissible: false });

    window.initMap = this.initMap();

    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ7lfWMFuJfAp7eXWVYJMZ69t4tX8-ZU8&callback=initMap')

    this.getDashboardVariables();

    if (window.RT === constants.RT_WS) {
      this.serviceWS();

    } else if (window.RT === constants.RT_HTTP) {
      setInterval(() => {
        self.getVariableLastRecords();
      }, 1000 * 15);
    }
  }

  orderByOS(os, field, asc) {
    os.sort(((a, b) => {
      let hasA = a.hasOwnProperty(field);
      let hasB = b.hasOwnProperty(field);
      if (hasA && hasB) {
        let vA = a[field];
        let vB = b[field];

        if (isString(vA)) vA = vA.toLowerCase();
        if (isString(vB)) vB = vB.toLowerCase();

        if (asc) {
          if (vA < vB) return -1;
          if (vA > vB) return 1;
        } else {
          if (vA < vB) return 1;
          if (vA > vB) return -1;
        }
      }

      return 0;
    }));

    return os;
  }

  initChart() {
    if (!window.IsViewMin) {
      let h = $(window).height() - $('body').height();
      let hMaps = $('.CardsMaps').height();
      let hPanel = $('#sion-panel').height();
      let valueIn = hMaps - hPanel + h - 24;
      let valueContent = hMaps + h - 24;

      let valueCSS = `${valueIn}px`;
      let valueMap = `${valueIn - 12}px`;
      $('#sion-container-charts').css('height', valueCSS);
      $('#map').css('height', valueMap);

      //if (hMaps > 300)
      valueContent = `${valueContent}px`;
      $('.CardsMaps').css('height', valueContent);
      $('.CardsAlarms').css('height', valueContent);

    } else {
      let h = $(window).height() - $('body').height();
      let hD = $('.CardsDouble').height();
      let valueMaps = `${hD + h - 40 }px`;
      let valueContent = `${hD + h - 50 }px`;

      $('.CardsMaps').css('height', valueMaps);
      $('#sion-container-charts').css('height', valueContent);
      $('#map').css('height', valueContent);
    }

    Highcharts.createElement('link', {
      href: 'https://fonts.googleapis.com/css?family=Unica+One',
      rel: 'stylesheet',
      type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);

    if (CHART_THEME === constants.DARK_THEME) {
      Highcharts.theme = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
          '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, '#2a2a2b'],
              [1, '#3e3e40']
            ]
          },
          style: {
            fontFamily: '\'Unica One\', sans-serif'
          },
          plotBorderColor: '#606063'
        },
        title: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
          }
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
          }
        },
        xAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#A0A0A3'

            }
          }
        },
        yAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          style: {
            color: '#F0F0F0'
          }
        },
        plotOptions: {
          series: {
            dataLabels: {
              color: '#B0B0B3'
            },
            marker: {
              lineColor: '#333'
            }
          },
          boxplot: {
            fillColor: '#505053'
          },
          candlestick: {
            lineColor: 'white'
          },
          errorbar: {
            color: 'white'
          }
        },
        legend: {
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
        },
        credits: {
          style: {
            color: '#666'
          }
        },
        labels: {
          style: {
            color: '#707073'
          }
        },

        drilldown: {
          activeAxisLabelStyle: {
            color: '#F0F0F3'
          },
          activeDataLabelStyle: {
            color: '#F0F0F3'
          }
        },

        navigation: {
          buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
              fill: '#505053'
            }
          }
        },

        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
              color: '#CCC'
            },
            states: {
              hover: {
                fill: '#707073',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              },
              select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              }
            }
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
          },
          labelStyle: {
            color: 'silver'
          }
        },

        navigator: {
          handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
          },
          xAxis: {
            gridLineColor: '#505053'
          }
        },

        scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
      };

      // Apply the theme
      Highcharts.setOptions(Highcharts.theme);
    }

    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    Highcharts.setOptions({
      time: {
        timezone: tz
      }
    });

    let variables = this.state.charts_variables;
    let size = variables.length;

    for(let i = 0; i < size; i++) {
      let vOne = variables[i];
      let value = vOne.value;
      if (value === undefined) variables[i].value = 0;
    }

    variables = this.orderByOS(variables, 'value', false)
    this.state.charts_variables = variables;

    let variableNames = [];
    let data = [];

    console.log('INIT: ',variableNames, data)

    for (let i = 0; i < size; i++) {
      let variableOne = variables[i];
      let name = variableOne.device;
      variableNames.push(name);

      let value = variableOne.value;
      console.log(name, value, (isNumber(value) && !isNaN(value)))
      if (isNumber(value) && !isNaN(value)) {
        data.push(value);
      } else {
        data.push(null);
      }
    }

    console.log('INIT.2: ',variableNames, data)

    if (data.length === 0) return;

    this.chartOne = Highcharts.chart('sion-container-charts', {
        chart: {
            type: 'column',
        },
        title: {
          text: 'ACUMULADOS'
        },
        xAxis: {
          categories: variableNames
        },
        yAxis: [{
          title: {
            text: 'MMPCD'
          }
        }],
        plotOptions: {
            series: {
                depth: 25,
                colorByPoint: true
            }
        },
        series: [{
            data: data,
            name: 'FLUJO GAS ACUMULADOS',
            showInLegend: false
        }]
    });

    //this.getVariableLastRecords();
  }

  initMap() {
    let self = this;

    let fn = () => {
      self.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 17.9964399, lng: -92.9977579 },
        zoom: 4
      });

      self.getMatrices();
    };

    return fn;
  }

  addMarkers(structure, matrix_id) {
    let self = this;

    if (!structure) structure = []

    if (!isArray(structure)) {
      return;
    }

    let size = structure.length;
    let bounds = new google.maps.LatLngBounds();

    let insertMarkers = 0;

    for (let i = 0; i < size; i++) {
      const s = structure[i];
      if (s) {
        let latitude = s.latitude;
        let longitude = s.longitude;

        let isNumbers = isNumber(latitude) && isNumber(longitude);
        let isZero = latitude == 0 && longitude == 0;

        if (isNumbers && !isZero) {
          let latLng = { lat: latitude, lng: longitude };

          let marker = new google.maps.Marker({
            map: self.map,
            label: s.name,
            position: latLng
          });

          if (s.marker_icon) {
            let image = `/static/images/groups/${s.marker_icon}`;
            marker.setIcon(image);
          }

          marker.addListener('click', function () {
            let variables = s.variables

            if (variables) {
              if (variables.length) {
                if (matrix_id) {
                  let group_id = s.id;

                  location.href = `/dynamic_graphics/${matrix_id}/${group_id}`
                }
              }
            }

            let sons = s.sons;
            if (sons) {
              if (sons.length > 0) {
                self.removeMarkers();

                self.addMarkers(s.sons, matrix_id);
              }
            }

          });

          bounds.extend(marker.getPosition());
          this.state.markers_.push(marker);

          insertMarkers = insertMarkers + 1;
        }
      }
    }

    if (insertMarkers > 0) this.setCenterInMap(bounds);
  }

  removeMarkers() {
    let markers = this.state.markers_;
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        marker.setMap(null);
      }

      this.state.markers_ = [];
    }
  }

  setCenterInMap(bounds) {
    if (this.map) {
      this.map.fitBounds(bounds);
      this.map.setZoom(10);
    }
  }

  /* WS */
  serviceWS() {
    let self = this;

    let v = window.sessionStorage.getItem(constants.ACCESS_TOKEN_WS);
    let url = `${wsURL}?${constants.ACCESS_TOKEN_WS}=${v}`;
    this.ws = new w3cwebsocket(url, constants.TTX_PROTOCOOL);

    this.ws.onerror = () => {
      console.log('WS: connection Error');
    };

    this.ws.onopen = (evt) => {
      console.log('WS connected');
    };

    this.ws.onclose = (evt) => {
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

    this.ws.onmessage = (evt) => {
      let s = evt.data;
      let o = {};

      try {
        o = JSON.parse(s);
        if (o.err) {
          return;
        }

      } catch (e) {
        console.log('WS.ERROR: JSON.parse: ', s);
        return;
      }

      if (!o.content) {
        console.log('WS.ERROR: Content Empty');
        return
      }

      if (o.evt == constants.EVENT_UDAPTE_VARIABLES_VALUE) {
        if (o.content) {
          if (isArray(o.content)) {
            let size = o.content.length;
            if (size <= 15) {
              self.updateVariablesValueInDashboard(o.content);
            }

            if (self.chartOne) self.updateVariablesInChart(o.content);
          }
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
      if (response.status == constants.STATUS_OK) {
        let doc = res.doc;

        let token_ws = doc.access_token_ws;
        if (token_ws) window.sessionStorage.setItem(constants.ACCESS_TOKEN_WS, token_ws);

        //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
        //if (token_ws) Cookies.set(constants.ACCESS_TOKEN_WS, token_ws, { expires: sixtySeconds });

        console.log('Reconnection WS Ok');

      } else if (response.status == constants.STATUS_ACCEPTED) {
        console.log(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      console.log(res, status);
      if (res.responseJSON) {
        let json = res.responseJSON;
        console.log(json.message);
      } else {
        console.log(constants.MESSAGE_ERROR);
      }
    });
  }

  updateVariablesInChart(valuesIn) {
    if (valuesIn) {
      let sizeIn = valuesIn.length;
      let size = this.state.charts_variables.length;

      for (let i = 0; i < size; i++) {
        let vOne = this.state.charts_variables[i]
        for (let j = 0; j < sizeIn; j++){
          let vOneIn = valuesIn[j];
          if (!vOneIn.is_custom) vOneIn.is_custom = false;

          if (vOneIn.variable_id === vOne.id) {
            if (vOneIn.is_custom === vOne.is_custom) {
             this.state.charts_variables[i].value = vOneIn.value;
            }
          }
        }
      }
    }

    let size = this.state.charts_variables.length;
    if (size === 0) return;

    if (!this.chartOne) {
      this.initChart();
      return;
    }

    for(let i = 0; i < size; i++){
      let variable = this.state.charts_variables[i];
      let value = variable.value;
      if (isNumber(value) && !isNaN(value)) {
        //this.chartOne.series[0].addPoint([variable.device, value], true, true);
        //this.chartOne.series[0].addPoint([value,variable.device], true, true);
        if (this.chartOne.series[0].data[i]) {
          this.chartOne.series[0].data[i].update(value);
        }// else {
         // this.chartOne.series[0].addPoint(value, true, true);
        //}
      }
    }

  }

  getMatrices() {
    let self = this;

    let url = `${constants.URL_SERVER_MATRICES}/list?with_structure=true&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let matricesIn = res.docs;
        if (matricesIn.length > 0) {


          for (let i = 0; i < matricesIn.length; i++) {
            let matrixOne = matricesIn[i];
            if (matrixOne.name == 'ACUMULADOS') {
              let structure = matrixOne.structure;
              let variablesIn = self.getVariablesInMatrix(structure);

              self.state.charts_variables = [...variablesIn];
              self.getVariableLastRecords();
            }
          }

          if (isNumber(window.MatrixID)) {
            let positions = [];

            if (window.MatrixID > 0) {

              for (let i = 0; i < matricesIn.length; i++) {
                const matrix = matricesIn[i];
                if (matrix.id == window.MatrixID) {
                  positions.push(i);
                  break;
                }
              }

              for (let i = 0; i < positions.length; i++) {
                let position = positions[i];
                let m = matricesIn[position];
                let s = m.structure;

                self.addMarkers(s, m.id);
              }

            } else {
              if (matricesIn.length > 0) {
                positions.push(0);
              }

              for (let i = 0; i < positions.length; i++) {
                let position = positions[i];
                let m = matricesIn[position];
                let s = m.structure;

                self.addMarkers(s, m.id);
              }
            }

          } else if (isString(window.MatrixID)) {
            let sJSON = window.MatrixID
            let positions = [];

            try {
              let aJSON = JSON.parse(sJSON);

              for (let i = 0; i < aJSON.length; i++) {
                let id = aJSON[i];
                for (let j = 0; j < matricesIn.length; j++) {
                  const matrix = matricesIn[j];
                  if (matrix.id == id) {
                    positions.push(j);
                    break;
                  }
                }
              }

            } catch (e) {
              console.log(`MatrixID isn't JSON`, e);
            }

            for (let i = 0; i < positions.length; i++) {
              let position = positions[i];
              let m = matricesIn[position];

              let s = m.structure;

              self.addMarkers(s, m.id);
            }
          }
        }

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  getNotifications(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_ALARMS}/list?checked=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs);
          return;
        }

        let colors = self.state.colors;
        let notifications = res.docs;
        if (!isArray(notifications)) notifications = [];

        for (let i = 0; i < notifications.length; i++) {
          const n = notifications[i];
          if (n.alarm_id) {
            if (n.alarm_id > 0) {
              let key = n.alarm_id;
              let color = colors[key];
              if (color) {
                notifications[i].color = color;
              }
            }
          }
          /*let description = n.description;
          if (isString(description)) {
            let s = description.split(':');
            if (s.length > 0) {
              let key = `${s[0]}:`;

              let color = colors[key];
              if (color) {
                notifications[i].color = color;
              }
            }
          }*/
        }

        self.setState({ notifications_: notifications });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

        if (fn) {
          fn(null, []);
          return;
        }
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;

        Materialize.toast(json.message, 2500);

        if (fn) {
          fn(null, []);
          return;
        }

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);

        if (fn) {
          fn(null, []);
          return;
        }
      }
    });
  }

  updateLogAlarm(id, json) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_LOG_ALARMS}/${id}/comment`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {

        let logAlarmIn = res.doc;
        if (logAlarmIn) {
          let log_alarms = self.state.notifications_;
          let size = log_alarms.length;

          for (let i = 0; i < size; i++) {
            const logAlarm = log_alarms[i];
            if (logAlarm.id === logAlarmIn.id) {
              log_alarms[i] = logAlarmIn;
              break;
            }
          }

          self.setState({ notifications_: log_alarms });
        }

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  getDashboardVariables(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_DASHBOARD_VARIABLES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          return;
          fn(null, res.docs);
        }

        self.setState({ dashboard_variables: res.docs }, () =>{
          self.getVariableLastRecords();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

        if (fn) {
          fn(null, []);
          return;
        }
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;

        Materialize.toast(json.message, 2500);

        if (fn) {
          fn(null, []);
          return;
        }

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);

        if (fn) {
          fn(null, []);
          return;
        }
      }
    });
  }

  getVariableLastRecords() {
    let self = this;

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
                name: doc.name,
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

      let variables = res.variables;
      let custom_variables = res.custom_variables;

      if (!variables) variables = [];
      if (!custom_variables) custom_variables = [];

      for (let i = 0; i < custom_variables.length; i++) {
        const variable = custom_variables[i];
        variable.is_custom = true;

        variables.push(variable);
      }

      self.updateVariablesValueInDashboard(variables);
      self.updateVariablesInChart(variables);
    });
  }

  getVariablesWithAlarms() {
    let self = this;

    parallel({
      /*variables: (fn) => {
        let url = `${constants.URL_SERVER_VARIABLES}/list/alarms`;

        let xhr = $.ajax({
          url: url,
          type: constants.METHOD_GET,
          dataType: constants.JSON,
        });

        xhr.done((res, status, response) => {
          if (response.status == constants.STATUS_OK) {
            fn(null, res.docs);

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
      },*/
      alarms: (fn) => {
        let url = `${constants.URL_SERVER_ALARMS}/list`;

        let xhr = $.ajax({
          url: url,
          type: constants.METHOD_GET,
          dataType: constants.JSON,
        });

        xhr.done((res, status, response) => {
          if (response.status == constants.STATUS_OK) {
            fn(null, res.docs);

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
        let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list/alarms`;

        let xhr = $.ajax({
          url: url,
          type: constants.METHOD_GET,
          dataType: constants.JSON,
        });

        xhr.done((res, status, response) => {
          if (response.status == constants.STATUS_OK) {
            fn(null, res.docs);

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

      let alarms = res.alarms;
      let custom_variables = res.custom_variables;

      let variables = [];
      if (!isArray(alarms)) alarms = [];

      for (let i = 0; i < custom_variables.length; i++) {
        const variable = custom_variables[i];
        variables.push(variable);
      }

      self.updateVariablesAlarmInDashboard(variables, alarms);
      if (!window.IsViewMin) self.getNotifications();
    });
  }

  updateEventAsSeen(id) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_LOG_EVENTS}/notifications/${id}`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        console.log('Notificación Ok');

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  updateVariablesValueInDashboard(content) {
    let self = this;

    if (isArray(content)) {
      let dashboard_variables = self.state.dashboard_variables;
      let size = dashboard_variables.length;
      for (let i = 0; i < size; i++) {
        const dashboard_variable = dashboard_variables[i];

        for (let j = 0; j < content.length; j++) {
          const variable = content[j];

          let id = variable.variable_id;
          let is_custom = variable.is_custom;
          let value = variable.value;
          let timestamp = variable.timestamp;
          let name = variable.name;

          if (!is_custom) is_custom = false;

          if (dashboard_variable.variable_id === id) {
            if (dashboard_variable.is_custom === is_custom) {
              dashboard_variables[i].value = value;
              dashboard_variables[i].timestamp = timestamp;

              if (name) dashboard_variables[i].name = name;
              break;
            }
          }
        }
      }

      self.setState({ dashboard_variables: dashboard_variables }, () => {
        self.getVariablesWithAlarms();
      });
    }
  }

  updateVariablesAlarmInDashboard(variables, alarms) {
    let value_on = 0;
    let value_off = 0;

    let size = variables.length;
    for(let i = 0; i < size; i++) {
      let v = variables[i];
      if (v.alarm_id) {
        let name = v.name;
        if (name) {
          if (name === 'ESTATUS COMPRESOR ON') {
            let isDeprecated = v.variable_id === 25 && v.is_custom === true;
            if (!isDeprecated) {
              value_on = value_on + 1;
            }

          } else if (name === 'ESTATUS COMPRESOR OFF') {
            let isDeprecated = v.variable_id === 25 && v.is_custom === true;
            if (!isDeprecated) {
             value_off = value_off + 1;
            }
          }
        }
      }
    }

    size = alarms.length;
    for (let i = 0; i < size; i++) {
      const alarm = alarms[i];
      let alias = alarm.id;
      if (alias) {
        if (alarm.color) {
          let key = `${alias}`;
          this.state.colors[key] = alarm.color;
        }
      }
    }

    let o = { value_on: value_on, value_off: value_off };
    this.setState(o);
  }

  getVariablesInMatrix(s) {
    let variables = [];

    for (let i = 0; i < s.length; i++) {
      const g = s[i];
      let variables_ = [];

      if (g.sons) variables_ = this.getVariablesInMatrix(g.sons);

      if (g.variables) {
        for (let j = 0; j < g.variables.length; j++) {
          const variable = g.variables[j];

          let v = { id: variable.id, is_custom: variable.is_custom, name: variable.name, device: variable.device };
          variables_.push(v);
        }
      }

      for (let j = 0; j < variables_.length; j++) {
        const variable = variables_[j];
        variables.push(variable);
      }
    }

    return variables;
  }

  handleChangeLogAlarm() {
    let self = this;

    let fn = (id) => {
      let log_alarms = self.state.notifications_;

      let size = log_alarms.length;
      let logAlarm = false;

      for (let i = 0; i < size; i++) {
        const logOne = log_alarms[i];
        if (logOne.id === id) {
          const checked = log_alarms[i].checked;
          if (!checked) {
            logAlarm = log_alarms[i];
            $('#comentarios_log_alarm').modal('open');
            $('#input-comment-log-alarm').val(logOne.comment);
          }

          break;
        }
      }

      self.setState({ logAlarm: logAlarm });
    };

    return fn;
  }

  handleCommentLogAlarm() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let comment = $('#input-comment-log-alarm').val();
      if (!comment || comment == '') return;

      let logAlarm = self.state.logAlarm;
      if (!logAlarm) return;

      let id = logAlarm.id;

      let json = {
        comment: comment,
        checked: true,
      };

      self.updateLogAlarm(id, json);
    };

    return fn;
  }

  handleLogAlarmClose() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      self.setState({ logAlarm: false });
    };

    return fn;
  }

  createVariableCard() {
    let fn = (item, index) => {
      return <VariableCard key={index} variable={item} />;
    };

    return fn;
  }

  createNotification() {
    let fn = (item, index) => {
      if (item.checked) return;

      return <Notification key={index} notification={item} onSeen={this.handleChangeLogAlarm()} />;
    };

    return fn;
  }

  getView(notifications) {
    return (
      <div className="CardsDouble">
        <div className="CardsAlarms">
          <h4>Alarmas</h4>
          <br />
          <br />
          <div className="col s12 m12">
            {notifications.map(this.createNotification())}
          </div>
        </div>

        <div className="CardsMaps">
          <div className="col m12">
            <ul className="tabs" id="sion-panel">
              <li className="tab col s2"><a className="active" href="#chart-variables">Gráfica</a></li>
              <li className="tab col s2"><a href="#map-variables">Mapa</a></li>
            </ul>
          </div>

          <div className="col m12 content-panel">

            <div id="chart-variables" className="col s12">
              <div id="sion-container-charts"></div>
            </div>

            <div id="map-variables" className="col s12">
              <h5>Instalaciones</h5>
              <div id="map"></div>
            </div>

          </div>

        </div>

      </div>
    )
  }

  getViewWithoutAlarms() {
    return (
      <div className="CardsDouble">
        <div className="CardsMaps">
          <h5>Gráfica</h5>
          <div className="col s12">
            <div id="sion-container-charts"></div>
          </div>
        </div>

        <div className="CardsMaps">
          <h5>Instalaciones</h5>
          <div className="col s12">
            <div id="map"></div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let notifications = this.state.notifications_;
    let dashboard_variables = this.state.dashboard_variables;

    let value_on = this.state.value_on;
    let value_off = this.state.value_off;

    let viewsBottom = false;

    if (window.IsViewMin) {
      viewsBottom = this.getViewWithoutAlarms();
    } else {
      viewsBottom = this.getView(notifications);
    }

    return (
      <div>
        <Header module={constants.DASHBOARD_MODULE}
          notifications={notifications} />

        <section className="contenedor_root animated fadeIn">
          <div className="matriz_clasica">

            <section className="DashboardWelcome">
              <div className="row">
                <div className="Alls">

                  <div className="CardsD">
                    <h4>INSTALACIONES EN OPERACIÓN</h4>
                    <br />
                    <div className="col s12 m12">
                      <div className="col s12 m2 t_right Verde">
                        <h3>
                          <strong>{value_on}</strong>
                        </h3>
                      </div>
                      <div className="col s12 m9 t_left">
                        <br />
                        <h3>COMPRESORES OPERANDO</h3>
                      </div>
                    </div>

                    <div className="col s12 m12 ">
                      <div className="col s12 m2 t_right Danger">
                        <h3><strong>{value_off}</strong></h3>
                      </div>
                      <div className="col s12 m9 t_left"> <br />
                        <h3>COMPRESORES APAGADOS</h3>
                      </div>
                    </div>
                  </div>

                  {dashboard_variables.map(this.createVariableCard())}

                  {viewsBottom}

                </div>
              </div>
            </section>

          </div>
        </section>

      </div>
    );
  }
}

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}


/*<h4>Alarmas</h4> <br />
  <div className="col s12 m12 t_left">
    <h5 className="Danger">- <i className="material-icons" style="display:vertical-align: middle;">alarm</i> Alarma de Leil1 40% Eurobeo 2019-11-12 11:02:12</h5>
    <h5 className="Danger">- <i className="material-icons" style="display:vertical-align: middle;">alarm</i> Paro de motor por RPM Coapechaca24 - 2019-11-12 11:02:12 </h5>
  </div>
*/

render(<Dashboard />, document.getElementById('content-main'));
