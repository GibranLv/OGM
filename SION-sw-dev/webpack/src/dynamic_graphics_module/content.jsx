import { h, render, Component } from 'preact';
import { w3cwebsocket } from 'websocket';
import { parallel } from 'async';
import { isString, isNumber, isArray, sortBy } from 'underscore';
import Konva from 'konva';

import Header from './../header.jsx';
import constants from './../constants.js';

const RW = 1.811;
const RH = 0.552;

const CONTENT_HEIGHT_NORMAL = 50;
const CONTENT_HEIGHT_ALARM = 65;

const TIMEOUT_ICON = 'timeout_black_18.png';

const wsURL = `ws://${URLWS}/ws`;
const wsaURL = `ws://${URLWSA}/ws`;

class Content extends Component {

  constructor(props) {
    super(props);

    let status_tools = true;
    if (MatrixID > 0 && GroupID > 0) status_tools = false;

    this.state = {
      matrices_: [],
      variables_: [],
      groups_: [],
      notifications_: [],

      graphic_sounds: [],
      active_vars: [],

      status_tools: status_tools,

      matrix: false,
      group: false,

      graphic: false,
      imageNames: ['well_truck.png', 'hydraulic bomb_1.png', 'hydraulic bomb_2.png', 'hydraulic_1.png', 'well_1.png', 'separador_1.png', 'bimba_1.png', 'bimba_2.png', 'bimba_3.png', 'bimba_4.png', 'motor_compressor_1.png', 'self_contained_1.png', 'self_contained_2.png', 'self_contained_3.png', 'flow_1.png'],

      connection_errors_ws: 0,
      connection_errors_wsa: 0,
    };
  }

  componentDidMount() {
    let self = this;

    self.Audio = document.createElement("audio");
    self.Audio.src = constants.DANGER_SOUND;
    self.Audio.loop = true;
    self.Audio.pause();

    self.position = 0;

    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: false,
      loopFillGroupWithBlank: true,
      on: {
        click: function(evt) {
          let path = evt.path;
          if (path) {
            if (path.length > 0) {
              let a = path[1];
              if (a) {
                let hash = a.hash;
                if (hash) {
                  let s = hash.replace('#', '');
                  let value = parseInt(s);
                  if (isNumber(value)) {
                    self.updateBackgroundGraphic(value);
                  }
                }
              }
            }
          }
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    if (!self.state.status_tools) $('#dg-content-tools').hide();

    self.getConfiguration();
    self.getNotifications();
    self.getMatrices();

    if (window.RT === constants.RT_WS) {
      this.serviceWS();
      this.serviceWSA();

    } else if (window.RT === constants.RT_HTTP) {
      setInterval(() => {
        self.getVariableLastRecords();
        self.getNotifications();
      }, 1000 * 15);
    }
  }

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
      try {
        let o = JSON.parse(s);
        if (o.err) {
          return;
        }

        //console.log(o);

        if (o.evt == constants.EVENT_UDAPTE_VARIABLES_VALUE) {
          self.updateVariablesValue(o.content);

        } else if (o.evt == constants.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE) {
          self.emptyUpdateVariablesValue(o.content);
        }

      } catch (e) {
        console.log('WS.ERROR: JSON.parse', s);
      }
    }
  }

  serviceWSA() {
    let self = this;

    let v = window.sessionStorage.getItem(constants.ACCESS_TOKEN_WSA);
    let url = `${wsaURL}?${constants.ACCESS_TOKEN_WSA}=${v}`;
    this.wsa = new w3cwebsocket(url, constants.TTX_PROTOCOOL);

    this.wsa.onerror = () => {
      console.log('WSA: connection Error');
    };

    this.wsa.onopen = (evt) => {
      console.log('WSA connected');
    };

    this.wsa.onclose = (evt) => {
      console.log('WSA closed');

      setTimeout(() => {
        let connection_errors = self.state.connection_errors_wsa;
        if (connection_errors == constants.LIMIT_FOR_RECONNECTION) {
          connection_errors = 0;
          self.getTokenWSA();
        }

        connection_errors = connection_errors + 1;
        self.state.connection_errors_wsa = connection_errors;

        self.serviceWSA();
      }, 1000);
    }

    this.wsa.onmessage = (evt) => {
      let s = evt.data;
      try {
        let o = JSON.parse(s);
        if (o.err) {
          return;
        }

        //console.log(o);

        if (o.evt == constants.EVENT_UDAPTE_VARIABLES_ALARM) {
          // Insertar in Notifications console.log(o.content);
          self.getNotifications();

        } else if (o.evt == constants.EVENT_UDAPTE_ALARMS_ACTIVE) {
          self.getVariablesWithAlarms();

        } else if (o.evt == constants.EVENT_UDAPTE_VARIABLES_TIMEOUT) {
          // Insertar in Notifications console.log(o.content);
          self.getNotifications();
          self.getVariablesWithAlarms();
        }

      } catch (e) {
        console.log('WSA.ERROR: JSON.parse', s);
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
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      console.log(res, status);
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  getTokenWSA() {
    let self = this;

    let url = `${constants.URL_SERVER_USERS}/tokens?${constants.ACCESS_TOKEN_WSA}=true`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let doc = res.doc;

        let token_wsa = doc.access_token_wsa;
        if (token_wsa) window.sessionStorage.setItem(constants.ACCESS_TOKEN_WSA, token_wsa);

        //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
        //if (token_wsa) Cookies.set(constants.ACCESS_TOKEN_WSA, token_wsa, { expires: sixtySeconds });

        console.log('Reconnection WSA Ok');

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      console.log(res, status);
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  /* Notificaciones */

  getNotifications() {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_EVENTS}/notifications?is_seen=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ notifications_: res.docs });

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

  handleRemoveNotification() {
    let self = this;

    let fn = (id) => {
      let notifications = self.state.notifications_;
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (id == notification.id) {
          self.updateEventAsSeen(id);

          notifications.splice(i, 1);

          self.setState({ notifications_: notifications });
          return;
        }
      }
    };

    return fn;
  }

  /* Notificaciones */

  getConfiguration() {
    let self = this;

    let url = `${constants.URL_SERVER_USERS}/sounds/graphic`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (!res.docs) res.docs = [];
        self.state.graphic_sounds = res.docs;

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
        self.parseMatrices(res.docs);

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

      for (let i = 0; i < custom_variables.length; i++) {
        const variable = custom_variables[i];
        variables.push(variable);
      }

      self.updateVariablesValue(variables);

      self.getVariablesWithAlarms()
    });
  }

  getVariablesWithAlarms() {
    let self = this;

    parallel({
      variables: (fn) => {
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

      let variables = res.variables;
      let custom_variables = res.custom_variables;

      for (let i = 0; i < custom_variables.length; i++) {
        const variable = custom_variables[i];
        variables.push(variable);
      }

      self.updateVariablesAlarm(variables);
    });
  }

  getGroups(s) {
    let groups = [];

    if (!isArray(s)) return groups

    for (let i = 0; i < s.length; i++) {
      const g = s[i];
      let groups_ = [];

      if (g.sons) groups_ = this.getGroups(g.sons);

      let g_ = { id: g.id, name: g.name, type: g.type };
      if (g.variables) g_.variables = g.variables;

      groups.push(g_);

      if (groups_.length > 0) {
        for (let j = 0; j < groups_.length; j++) {
          const g_ = groups_[j];
          groups.push(g_);
        }
      }
    }

    return groups;
  }

  getGraphic(json) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_GRAPHICS}/one`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let doc = res.doc;

        self.loadCanvas(doc, () => {
          self.updateActiveVarsInGraphic();
          self.getVariableLastRecords();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        self.addItem(res.message);
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

  addGraphic(json) {
    let self = this;

    let xhr = $.ajax({
      url: constants.URL_SERVER_GRAPHICS,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_CREATED) {
        let message = 'El gráfico dinámico se creó correctamente';
        Materialize.toast(message, 2500);

        let doc = res.doc;

        self.loadCanvas(doc, () => {
          self.updateActiveVarsInGraphic();
          self.getVariableLastRecords();
        });

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

  updateGraphic(json, id) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_GRAPHICS}/${id}`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let message = 'El gráfico dinámico se actualizo correctamente';
        Materialize.toast(message, 2500);

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

  deleteGraphic(id) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_GRAPHICS}/${id}`,
      type: constants.METHOD_DELETE
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let message = 'El gráfico dinámico se elimino correctamente';
        Materialize.toast(message, 2500);

        self.setState({ graphic: false });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        self.addItem(res.message);
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

  updateVariableSoundsConfig(json) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_USERS}/sounds`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let message = 'Configuración de sonidos de variables, Ok';
        console.log(message);
        console.log(res.doc);

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

  updateVariablesValue(content) {
    let self = this;

    if (!self.layer) return;

    if (isArray(content)) {

      let variablesIn = [];
      if (self.state.group) {
        variablesIn = self.state.group.variables;
      }

      let nodes = self.layer.find('.content_variable');
      for (let i = 0; i < nodes.length; i++) {
        const group = nodes[i];

        let variable_id = 0;
        let isCustom = false;

        let sId = group.id();

        let values = sId.split('_');
        if (values.length == 2) {
          let value = values[0];
          if (value == 'cv') {
            isCustom = true;
          }

          variable_id = values[1];
          variable_id = parseInt(variable_id);
        }

        for (let j = 0; j < content.length; j++) {
          let variable = content[j];

          let id = variable.variable_id;
          let is_custom = variable.is_custom;
          let value = variable.value;
          let timestamp = variable.timestamp;

          if (!is_custom) is_custom = false;

          if (variable_id == id) {
            if (is_custom == isCustom) {
              let valueId = false;
              let timestampId = false;

              if (!variable.is_custom) {
                valueId = `#v_${id}_value`;
                timestampId = `#v_${id}_timestamp`;
              } else {
                valueId = `#cv_${id}_value`;
                timestampId = `#cv_${id}_timestamp`;
              }

              let variableIn = variablesIn[i];
              if (variableIn.id == id) {
                if (variableIn.is_custom == isCustom) {
                  let hasConversion = isString(variableIn.expression) && isString(variableIn.display) && isNumber(value);
                  if (hasConversion) {
                    let expression = this.replaceAll(variableIn.expression, '${value}', value);
                    try {
                      let v = math.eval(expression);

                      let str = `${v}`;
                      let iPoint = str.indexOf('.');
                      if (iPoint == -1) {
                        iPoint = str.length - 4;
                      }

                      let nValue = math.format(v, { precision: iPoint + 4 });
                      value = nValue;

                    } catch (e) {
                      value = '¿¿??';
                    }
                  }
                }
              }

              let unit = variableIn.unit;
              if (variableIn.display) {
                unit = variableIn.display;
              }

              if (unit === 'BOOL') {
                if (value > 0) {
                  value = 'ACTIVO';
                } else {
                  value = 'INACTIVO';
                }

                unit = '';

              } else {
                if (!isNumber(value)) {
                  if (!value) value = ' ';
                }
              }

              value = `${value} ${unit}`;

              let valueNode = group.findOne(valueId);
              let timestampNode = group.findOne(timestampId);

              if (valueNode) valueNode.setAttr('text', value);
              if (timestampNode) timestampNode.setAttr('text', timestamp);
              break;
            }
          }
        }
      }

      self.layer.draw();
    }
  }

  emptyUpdateVariablesValue(content) {
    let self = this;

    if (!self.layer) return;

    if (isArray(content)) {

      let variablesIn = [];
      if (self.state.group) {
        variablesIn = self.state.group.variables;
      }

      let nodes = self.layer.find('.content_variable');
      for (let i = 0; i < nodes.length; i++) {
        const group = nodes[i];

        let variable_id = 0;
        let isCustom = false;

        let sId = group.id();

        let values = sId.split('_');
        if (values.length == 2) {
          let value = values[0];
          if (value == 'cv') {
            isCustom = true;
          }

          variable_id = values[1];
          variable_id = parseInt(variable_id);
        }

        for (let j = 0; j < content.length; j++) {
          let variable = content[j];

          let id = variable.variable_id;
          let is_custom = variable.is_custom;
          let value = variable.value;
          let timestamp = variable.timestamp;

          if (!is_custom) is_custom = false;

          if (variable_id == id) {
            if (is_custom == isCustom) {
              let valueId = false;
              let timestampId = false;

              if (!variable.is_custom) {
                valueId = `#v_${id}_value`;
                timestampId = `#v_${id}_timestamp`;
              } else {
                valueId = `#cv_${id}_value`;
                timestampId = `#cv_${id}_timestamp`;
              }

              let variableIn = variablesIn[i];
              /*if (variableIn.id == id) {
                if (variableIn.is_custom == isCustom) {
                  let hasConversion = isString(variableIn.expression) && isString(variableIn.display) && isNumber(value);
                  if (hasConversion) {
                    let expression = this.replaceAll(variableIn.expression, '${value}', value);
                    try {
                      let v = math.eval(expression);

                      let str = `${v}`;
                      let iPoint = str.indexOf('.');
                      if (iPoint == -1) {
                        iPoint = str.length - 4;
                      }

                      let nValue = math.format(v, { precision: iPoint + 4 });
                      value = nValue;

                    } catch (e) {
                      value = '¿¿??';
                    }
                  }
                }
              }*/

              let unit = variableIn.unit;
              if (variableIn.display) {
                unit = variableIn.display;
              }

              if (unit === 'BOOL') {
                if (value > 0) {
                  value = 'ACTIVO';
                } else {
                  value = 'INACTIVO';
                }

                unit = '';

              } else {
                if (!isNumber(value)) {
                  if (!value) value = '0';
                  if (value === ' ') value = '0';
                }
              }

              value = `${value} ${unit}`;

              let valueNode = group.findOne(valueId);
              let timestampNode = group.findOne(timestampId);

              if (valueNode) valueNode.setAttr('text', value);
              if (timestampNode) timestampNode.setAttr('text', timestamp);
              break;
            }
          }
        }
      }

      self.layer.draw();
    }
  }

  updateVariablesAlarm(content) {
    let self = this;

    if (!self.layer) return;

    if (isArray(content)) {

      let nodes = self.layer.find('.content_variable');
      for (let i = 0; i < nodes.length; i++) {
        const group = nodes[i];

        let variable_id = 0;
        let isCustom = false;

        let sId = group.id();

        let values = sId.split('_');
        if (values.length == 2) {
          let value = values[0];
          if (value == 'cv') isCustom = true;

          variable_id = values[1];
          variable_id = parseInt(variable_id);
        }

        for (let j = 0; j < content.length; j++) {
          let o = content[j];

          let id = o.variable_id;
          let is_custom = o.is_custom;
          let color = o.color;
          let is_timeout = o.is_timeout;

          if (!is_custom) is_custom = false;
          if (!color) color = false;
          if (!is_timeout) is_timeout = false;

          if (variable_id == id) {
            if (is_custom == isCustom) {
              let contentId = false;
              let soundId = false;
              let timeoutId = false;

              if (!isCustom) {
                contentId = `#v_${variable_id}_content`;
                soundId = `#v_${variable_id}_sound`;
                timeoutId = `#v_${variable_id}_timeout`;
              } else {
                contentId = `#cv_${variable_id}_content`;
                soundId = `#cv_${variable_id}_sound`;
                timeoutId = `#cv_${variable_id}_timeout`;
              }

              let contentNode = group.findOne(contentId);
              if (contentNode) {
                if (color) {
                  // Actualizar el contenedor de la variable
                  contentNode.setAttr('fill', color);
                } else {
                  contentNode.setAttr('fill', 'white');
                }

                let sound = self.updateActiveVariables(o);

                if (sound.is_ringing || is_timeout) {
                  contentNode.setAttr('height', CONTENT_HEIGHT_ALARM);
                } else {
                  contentNode.setAttr('height', CONTENT_HEIGHT_NORMAL);
                }

                let timeoutNode = group.findOne(timeoutId);
                if (timeoutNode) timeoutNode.setAttr('visible', is_timeout);

                let soundNode = group.findOne(soundId);
                if (soundNode) {
                  let soundImage = soundNode.getImage();
                  if (soundImage) {
                    soundImage.onload = () => {
                      if (sound) {
                        if (sound.is_ringing) {
                          soundNode.setAttr('visible', true);
                        } else {
                          soundNode.setAttr('visible', false);
                        }

                      } else {
                        soundNode.setAttr('visible', false);
                      }

                      self.layer.draw();
                    };

                    if (sound.mute) {
                      soundImage.src = `/static/images/dynamic_graphics/icons/volume_off_black_18.png`;
                    } else {
                      soundImage.src = `/static/images/dynamic_graphics/icons/volume_up_black_18.png`;
                    }
                  }
                }

                self.updateSoundStatus();
              }

              break;
            }
          }
        }
      }

      self.layer.draw();
    }
  }

  updateActiveVarsInGraphic() {
    let group = this.state.group;
    let graphic = this.state.graphic;
    if (group && graphic) {
      let variables = group.variables;
      if (!variables) variables = [];

      let graphic_sounds = this.state.graphic_sounds;
      let active_vars = [];

      for (let i = 0; i < graphic_sounds.length; i++) {
      const graphic_sound = graphic_sounds[i];
        if (graphic_sound) {
          let graphic_id = graphic_sound.graphic_id;
          if (graphic_id == graphic.id) {
            let active_variables = graphic_sound.active_vars;
            for (let j = 0; j < active_variables.length; j++) {
              const active_variable = active_variables[j];
              for (let k = 0; k < variables.length; k++) {
                const variable = variables[k];
                if (active_variable.id == variable.id) {
                  if (active_variable.is_custom == variable.is_custom) {
                    active_vars.push(active_variable);
                    break;
                  }
                }
              }
            }
          }
        }
      }

      this.state.active_vars = active_vars;
    }
  }

  updateActiveVariables(o) {
    let self = this;

    let sound = {
      is_ringing: false,
      mute: false
    };

    let active_vars = self.state.active_vars;
    for (let i = 0; i < active_vars.length; i++) {
      const variable = active_vars[i];
      if (variable.id == o.variable_id) {
        if (variable.is_custom == o.is_custom) {

          if (!o.alarm_id) {
            active_vars.splice(i, 1);
            self.state.active_vars = active_vars;
            return sound;
          }

          active_vars[i].sound = o.sound;
          active_vars[i].priority_level = o.priority_level;

          let mute = active_vars[i].mute;

          sound.is_ringing = true;
          sound.mute = mute;

          return sound;
        }
      }
    }

    if (!o.alarm_id) return sound

    let insert = false;
    let variables = self.state.variables_;
    for (let i = 0; i < variables.length; i++) {
      const variable = variables[i];
      if (variable.id == o.variable_id) {
        if (variable.is_custom == o.is_custom) {
          insert = true;
        }
      }
    }

    if (!insert) return sound;

    let active = {
      id: o.variable_id,
      is_custom: o.is_custom,
      sound: o.sound,
      priority_level: o.priority_level,
      mute: false
    };

    active_vars.push(active);
    self.state.active_vars = active_vars;

    sound.is_ringing = true;
    sound.mute = false;

    return sound;
  }

  updateSoundStatus() {
    let self = this;

    let active_vars = self.state.active_vars;
    let size = active_vars.length;
    if (size == 0) {
      self.Audio.pause();
      return;
    }

    let key = 'priority_level';
    active_vars = sortBy(active_vars, key);

    let active = false;
    for (let i = size - 1; i >= 0; i--) {
      const active_variable = active_vars[i];
      if (active_variable.sound) {
        if (!active_variable.mute) {
          active = active_variable;
          break;
        }
      }
    }

    if (active) {
      if (!self.Audio.paused) self.Audio.pause();

      let src = self.Audio.src;
      let isLoad = false;

      if (active.sound == constants.DANGER_VALUE) {
        if (src.indexOf(constants.DANGER_SOUND) < 0) {
          self.Audio.src = constants.DANGER_SOUND;
          isLoad = true;
        }

      } else if (active.sound == constants.WARNING_VALUE) {
        if (src.indexOf(constants.WARNING_SOUND) < 0) {
          self.Audio.src = constants.WARNING_SOUND;
          isLoad = true;
        }

      } else if (active.sound == constants.TIMEOUT_VALUE) {
        if (src.indexOf(constants.TIMEOUT_SOUND) < 0) {
          self.Audio.src = constants.TIMEOUT_SOUND;
          isLoad = true;
        }
      }

      if (self.Audio.src) {
        if (isLoad) {
          self.Audio.addEventListener('canplaythrough', function () {
            if (self.Audio.paused) self.Audio.play();
          }, false);

        } else {
          try {
            if (self.Audio.paused) self.Audio.play();
          } catch (e) {
            console.log("Audio.play(): ", e);
          }
        }
      }

      return;
    }

    if (!self.Audio.paused) self.Audio.pause();
  }

  parseMatrices(matrices) {
    let self = this;

    let matricesOut = [];

    for (let i = 0; i < matrices.length; i++) {
      const matrix = matrices[i];
      if (matrix) {
        let o = {
          id: matrix.id,
          name: matrix.name
        };

        let structure = matrix.structure;
        let groups = this.getGroups(structure);

        o.groups = groups;

        matricesOut.push(o);
      }
    }

    if (MatrixID > 0 && GroupID > 0) {
      let groups = [];
      let group = false;

      for (let i = 0; i < matricesOut.length; i++) {
        const matrix = matricesOut[i];
        if (matrix) {
          if (matrix.id == MatrixID) {
            groups = matrix.groups;
            for (let j = 0; j < groups.length; j++) {
              let g = groups[j];
              if (g.id == GroupID) {
                group = g;
              }
            }
          }
        }
      }

      let o = { matrices_: matricesOut, groups_: groups, group: group };

      self.setState(o, () => {
        self.loadGraphic();
      });

    } else {
      self.setState({ matrices_: matricesOut });
    }
  }

  loadGraphic() {
    let matrix_id = MatrixID;
    let group_id = GroupID;

    if (matrix_id > 0 && group_id > 0) {
      let inputMatrix = document.querySelector('#input-matrix');
      let inputGroup = document.querySelector('#input-group');

      inputMatrix.value = matrix_id;
      inputGroup.value = group_id;

      let json = {
        matrix_id: matrix_id,
        group_id: group_id
      }

      this.getGraphic(json);
    }
  }

  loadCanvas(graphic, fn) {
    let self = this;

    self.position = 0;

    let group = self.state.group;
    if (!group) return;

    let variables = group.variables;
    if (!variables) variables = [];

    let variablesIn = []

    if (graphic) {
      self.setState({ graphic: graphic, variables_: variables });

      variablesIn = graphic.variables

      for (let i = 0; i < self.state.imageNames.length; i++) {
        const imageName = self.state.imageNames[i];
        if (imageName == graphic.background) {
          self.position = i;
          break;
        }
      }

    } else {
      self.setState({ graphic: false });
    }

    let hW = window.innerHeight - (89 + 53 + 60);
    let content = document.querySelector('#content-canvas');

    let width = $(content).width();

    let stage = new Konva.Stage({
      container: 'container-canvas',
      width: width,
      height: hW
    });

    self.layer = new Konva.Layer();
    self.imageObj = new Image();
    self.imageObj.onload = () => {

      let sWidth = stage.width();
      let sHeight = stage.height();

      let w = 0;
      let h = 0;

      let x = 0;
      let y = 0

      let r = sWidth / sHeight;

      if (r < RW) {
        sHeight = sWidth * RH;
      }

      if (sWidth > sHeight) {
        h = sHeight;
        w = sHeight * RW;
      } else {
        w = sWidth;
        h = sWidth * RH;
      }

      w = w - 60;
      h = h - 60;

      x = (stage.width() - w) / 2;
      y = (stage.height() - h) / 2;

      self.installation = new Konva.Image({
        x: x,
        y: y,
        image: self.imageObj,
        width: w,
        height: h
      });

      /*
      let rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: oWidth,
        height: oHeight,
        fill: 'gray',
        stroke: 'black',
        strokeWidth: 4
      });

      self.layer.add(rect);
      */

      self.layer.add(self.installation);

      for (let i = 0; i < variables.length; i++) {
        let variable = variables[i];

        let x = 0;
        let y = 0;

        for (let j = 0; j < variablesIn.length; j++) {
          const variableIn = variablesIn[j];
          if (variableIn.variable_id == variable.id) {
            if (variableIn.is_custom == variable.is_custom) {
              x = (variableIn.x * self.installation.width()) + self.installation.x();
              y = (variableIn.y * self.installation.height()) + self.installation.y();
              break;
            }
          }
        }

        let groupVariable = new Konva.Group({
          x: x,
          y: y,
          draggable: true
        });

        groupVariable.addName('content_variable');
        if (!variable.is_custom) {
          groupVariable.setId(`v_${variable.id}`);
        } else {
          groupVariable.setId(`cv_${variable.id}`);
        }

        let variable_name = variable.name;
        if (variable.rename) variable_name = variable.rename;

        /*** Titulo ***/
        let title = new Konva.Label({
          x: 0,
          y: 0,
          width: 130,
          height: 25,
        });

        title.add(new Konva.Tag({
          fill: 'black',
          stroke: 'black',
          strokeWidth: 1,
        }));

        title.add(new Konva.Text({
          x: 0,
          y: 0,
          width: 130,
          height: 25,
          padding: 3,
          text: `${variable_name}`,
          fontFamily: 'Calibri',
          fontSize: 16,
          fill: 'white',
          align: 'center',
        }));

        /*** Valor y Unidad ***/
        let value = new Konva.Label({
          x: 0,
          y: 30,
          width: 130,
          height: 25,
        });

        let valueId = false;
        if (!variable.is_custom) {
          valueId = `v_${variable.id}_value`;
        } else {
          valueId = `cv_${variable.id}_value`;
        }

        value.add(new Konva.Text({
          id: valueId,
          x: 0,
          y: 0,
          width: 130,
          height: 25,
          padding: 3,
          text: '0000.0000 UNIDAD',
          fontFamily: 'Calibri',
          fontSize: 15,
          fill: 'black',
          align: 'center',
        }));

        /*** Estampa de tiempo ***/
        let timestamp = new Konva.Label({
          x: 0,
          y: 50,
          width: 130,
          height: 25,
        });

        let timestampId = false;
        if (!variable.is_custom) {
          timestampId = `v_${variable.id}_timestamp`;
        } else {
          timestampId = `cv_${variable.id}_timestamp`;
        }

        timestamp.add(new Konva.Text({
          id: timestampId,
          x: 0,
          y: 0,
          width: 130,
          height: 25,
          padding: 3,
          text: 'YYYY-MM-DD HH:MM:SS',
          fontFamily: 'Calibri',
          fontSize: 12,
          fill: 'black',
          align: 'center',
        }));

        let contentId = false;
        if (!variable.is_custom) {
          contentId = `v_${variable.id}_content`;
        } else {
          contentId = `cv_${variable.id}_content`;
        }

        let content = new Konva.Rect({
          id: contentId,
          x: 0,
          y: 25,
          width: 130,
          height: CONTENT_HEIGHT_NORMAL,
          fill: 'white',
          stroke: 'black',
          strokeWidth: 1,
          opacity: 0.5,
        });

        groupVariable.add(title);
        groupVariable.add(content);
        groupVariable.add(value);
        groupVariable.add(timestamp);


        let timeoutId = false;
        let soundId = false;

        if (!variable.is_custom) {
          timeoutId = `v_${variable.id}_timeout`;
          soundId = `v_${variable.id}_sound`;
        } else {
          timeoutId = `cv_${variable.id}_timeout`;
          soundId = `cv_${variable.id}_sound`;
        }

        // Icono de timeout
        let timeoutImage = new Image();
        timeoutImage.onload = () => {
          let timeout = new Konva.Image({
            id: timeoutId,
            x: 45,
            y: 70,
            image: timeoutImage,
            width: 16,
            height: 16,
            visible: false,
          });

          groupVariable.add(timeout);
          self.layer.draw();
        };

        timeoutImage.src = `/static/images/dynamic_graphics/icons/timeout_black_18.png`;

        // Icono de sonido
        let soundImage = new Image();
        soundImage.onload = () => {
          let sound = new Konva.Image({
            id: soundId,
            x: 65,
            y: 70,
            image: soundImage,
            width: 16,
            height: 16,
            visible: false,
          });

          sound.on('click', (evt) => {
            let node = evt.target;

            let id = node.id();
            let values = id.split('_');
            if (values.length == 3) {
              let is_custom = values[0] == 'cv';
              let variable_id = values[1];
              variable_id = parseInt(variable_id);

              let variables = self.state.variables_;
              for (let i = 0; i < variables.length; i++) {
                const variable = variables[i];
                if (variable.id == variable_id) {
                  if (variable.is_custom == is_custom) {
                    self.handleChangeSoundVariable(variable);

                    return;
                  }
                }
              }
            }
          });

          groupVariable.add(sound);
          self.layer.draw();
        };

        soundImage.src = `/static/images/dynamic_graphics/icons/volume_off_black_18.png`;

        // add the shape to the self.layer
        self.layer.add(groupVariable);
        self.layer.draw();
      }

      stage.add(self.layer);

      if (fn) fn();
    };

    let name = self.state.imageNames[self.position];
    self.imageObj.src = `/static/images/dynamic_graphics/${name}`;
  }

  handleChangeMatrix() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      let id = parseInt(value);
      if (id) {
        let matrices = self.state.matrices_;
        for (let i = 0; i < matrices.length; i++) {
          const matrix = matrices[i];
          if (matrix) {
            if (matrix.id == id) {
              let groups_ = matrix.groups;
              self.setState({ groups_: groups_, matrix: matrix }, () => {
                let inputGroup = document.querySelector('#input-group');
                inputGroup.value = '';
              });
              return;
            }
          }
        }
      }
    };

    return fn;
  }

  handleChangeGroup() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      if (value == '') {
        self.state.group = false;
        return;
      }

      let id = parseInt(value);
      if (id) {
        let matrix = self.state.matrix;
        if (matrix) {
          let groups = matrix.groups;
          if (groups) {
            for (let i = 0; i < groups.length; i++) {
              const group = groups[i];
              if (group) {
                if (group.id == id) {
                  self.setState({ group: group }, () => {
                    let json = {
                      matrix_id: matrix.id,
                      group_id: group.id
                    };

                    if (self.Audio) {
                      if (!self.Audio.paused) self.Audio.pause();
                    }

                    self.getGraphic(json);
                  });

                  return;
                }
              }
            }
          }
        }
      }
    };

    return fn;
  }

  handleDeleteGraphic() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      if (self.state.graphic) {
        let id = self.state.graphic.id;

        self.deleteGraphic(id);
        return;
      }
    };

    return fn;
  }

  handleUpdateGraphic() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();


      if (!self.installation) return;

      let json = [];

      let nodes = self.layer.find('.content_variable');
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        let variable_id = 0;
        let is_custom = false;

        let id = node.id();

        let values = id.split('_');
        if (values.length == 2) {
          let value = values[0];
          if (value == 'cv') {
            is_custom = true;
          }

          variable_id = values[1];
          variable_id = parseInt(variable_id);
        }

        let p = node.position();

        let x = (p.x - self.installation.x()) / self.installation.width();
        let y = (p.y - self.installation.y()) / self.installation.height();

        let vPosition = {
          variable_id: variable_id,
          is_custom: is_custom,
          x: x,
          y: y
        };

        json.push(vPosition);
      }

      let background = self.state.imageNames[self.position];

      if (self.state.graphic) {
        let id = self.state.graphic.id;

        let o = {
          background: background,
          variables: json
        };

        self.updateGraphic(o, id);
        return;
      }

      let inputMatrix = document.querySelector('#input-matrix');
      let inputGroup = document.querySelector('#input-group');

      let matrix_id = inputMatrix.value.trim();
      let group_id = inputGroup.value.trim();

      matrix_id = parseInt(matrix_id);
      group_id = parseInt(group_id);

      let o = {
        matrix_id: matrix_id,
        group_id: group_id,
        background: background,
        variables: json
      };

      self.addGraphic(o);
    };

    return fn;
  }

  handleChangeSoundVariable(variable) {
    let self = this;

    let active_vars = self.state.active_vars;

    let size = active_vars.length;
    if (size == 0) return;

    let variable_id = variable.id;
    let is_custom = variable.is_custom;

    for (let i = 0; i < active_vars.length; i++) {
      let active_variable = active_vars[i];
      if (active_variable.id == variable_id) {
        if (active_variable.is_custom == is_custom) {

          let mute = active_variable.mute;
          self.state.active_vars[i].mute = !mute;

          let sound = {
            is_ringing: variable.is_ringing,
            mute: !mute,
          };

          // Actualizar contenedor de la variable
          let soundId = false;

          if (!is_custom) {
            soundId = `#v_${variable_id}_sound`;
          } else {
            soundId = `#cv_${variable_id}_sound`;
          }


          let soundNode = self.layer.findOne(soundId);
          if (soundNode) {
            let soundImage = soundNode.getImage();
            if (soundImage) {
              soundImage.onload = () => {
                self.layer.draw();
              };

              if (sound.mute) {
                soundImage.src = `/static/images/dynamic_graphics/icons/volume_off_black_18.png`;
              } else {
                soundImage.src = `/static/images/dynamic_graphics/icons/volume_up_black_18.png`;
              }
            }
          }

          self.updateSoundStatus();

          // Actualización en la configuración del usuario
          let graphic = self.state.graphic;
          if (graphic) {
            let active_vars = self.state.active_vars;

            let o = {
              graphic_id: graphic.id,
              active_vars: active_vars
            };

            let s = JSON.stringify(o);
            let json = { json_graphic_sounds_in: s };
            self.updateVariableSoundsConfig(json);
          }

          return;
        }
      }
    }
  }

  handleSubmit() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
    }

    return fn;
  }

  updateBackgroundGraphic(position) {
    let self = this;

    if (self.imageObj && self.state.group) {
      self.position = position - 1;

      self.imageObj.onload = () => {
        self.layer.draw();
      };

      let name = self.state.imageNames[self.position];
      self.imageObj.src = `/static/images/dynamic_graphics/${name}`;
    }
  }

  getDateToString(date) {
    let str = 'N/A';

    if (isDate(date)) {
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

  createSwiper() {
    let self = this;

    let fn = (image, index) => {
      let value = index + 1;

      let src = `/static/images/dynamic_graphics/${image}`;
      let href = `#${value}`;

      return (
        <div className="swiper-slide">
          <a href={href}>
            <img src={src} alt="Pozo" />
          </a>
        </div>
      );
    };

    return fn;
  }

  createOptMG() {
    let self = this;

    let fn = (item, index) => {
      let key = index + 1;

      if (item.type) {
        if (item.type == 'Pozo') {
          return <option key={key} value={item.id}>{item.name} - {item.type}</option>
        }

        return;
      }

      return <option key={key} value={item.id}>{item.name}</option>
    };

    return fn;
  }

  handleToggleTool() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      console.log('Evento!!!');

      let display = $('#dg-content-tools').toggle().css('display');
      let status = display != 'none';

      console.log('Status: ', status);

      self.setState({ status_tools: status });
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
    let self = this;
    let notifications = state.notifications_;

    let group_name = 'Gráfico';
    let statusColor = false;
    let btnDelete = false;

    if (state.group) group_name = state.group.name;
    if (!state.graphic) statusColor = '#FE2E2E';

    if (state.graphic) {
      btnDelete = (() => {
        return (
          <a className="btn btn_ttx_error" href="#" onClick={self.handleDeleteGraphic()}>
            <i class="material-icons">delete_sweep</i>
          </a>
        );
      })()
    }

    let iconArrow = <i className="material-icons">keyboard_arrow_down</i>;
    if (state.status_tools) {
      iconArrow = <i className="material-icons">keyboard_arrow_up</i>;
    }

    return (
      <div>
        <Header module={constants.GRAPHIC_MODULE}
                notifications={notifications}
                onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">

          <div className="dynamic_graph">

            <div id="btn_rt" className="btn_realgraf" style="padding: 0px; position: relative;">
              <a href="#" onClick={this.handleToggleTool()}>
                <i className="material-icons">{iconArrow}</i>
              </a>
            </div>

            <div id="dg-content-tools" className="container">

              <div className="row tools">
                <div className="col s12 m12">
                  <form onSubmit={this.handleSubmit()}>
                    <div className="col s4">
                      <label>Matrices</label>
                      <select className="browser-default sion-select" id="input-matrix" onChange={this.handleChangeMatrix()}>
                        <option value="">Matrices</option>
                        {state.matrices_.map(this.createOptMG())}
                      </select>
                    </div>
                    <div className="col s4">
                      <label>Grupos</label>
                      <select className="browser-default sion-select" id="input-group" onChange={this.handleChangeGroup()}>
                        <option value="">Grupos</option>
                        {state.groups_.map(this.createOptMG())}
                      </select>
                    </div>

                    <div className="input-field col s4">
                      {btnDelete}

                      <a className="btn btn_ttx_success" href="#" onClick={this.handleUpdateGraphic()}>
                        <i class="material-icons">save</i>
                      </a>
                    </div>

                  </form>
                </div>
              </div>

              <div className="row">
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    {state.imageNames.map(this.createSwiper())}
                  </div>
                  <div className="swiper-pagination"></div>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </div>
              </div>
            </div>

            <div className="root_oil animated fadeIn">
              <div className="container">

                <div className="row all_oil">
                  <div className="col s12 m12">
                    <div className="grafic">
                      <h4 style={`color: ${statusColor};`}>{group_name}</h4>

                      <div id="content-canvas" className="col s12 m12">
                        <div id="container-canvas"></div>
                      </div>

                    </div>
                  </div>
                </div>


              </div>
            </div>

          </div>

        </section>

      </div>
    );
  }
}

render(<Content />, document.getElementById('content-main'));