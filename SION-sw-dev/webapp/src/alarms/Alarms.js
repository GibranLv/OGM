import React, { Component } from "react";
import { isString, isArray, clone } from 'underscore';

import constants from './../constants.js';

import Pagination from '../Pagination.js';
import Table from './Alarms-Table.js';
import CreateForm from './Alarms-CreateForm.js';
import UpdateForm from './Alarms-UpdateForm.js';
import OptionsPanel from './Alarms-OptionsPanel.js';
import CreateFormStatic from './Alarms-CreateFormStatic.js';

const ENTER = 13;
const TABLE = 0;
const CREATE_FORM = 1;
const UPDATE_FORM = 2;
const OPTIONS_PANEL = 3;
const CREATE_FORM_STATIC = 4;

class Alarms extends Component {

  constructor() {
    super();

    this.state = {
      all: [],
      items: [],
      item: false,
      search: '',
      form: TABLE,

      items_: [],
      page_: 1,
    };
  }

  componentDidMount() {
    this.getAlarms();
  }

  getAlarms() {
    let self = this;

    let url = `${constants.URL_SERVER_ALARMS}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.state.all = clone(res.docs);

        let page = 1;
        self.updateItemsPerPage(res.docs, page);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        window.Materialize.toast(res.message, 2500);

      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        window.Materialize.toast(json.message, 2500);
      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  getAlarmsForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_ALARMS}/list?search=${value}`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        let page = 1;
        self.updateItemsPerPage(res.docs, page);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        window.Materialize.toast(res.message, 2500);

      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        window.Materialize.toast(json.message, 2500);
      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  getAlarm() {
    let self = this;

    let fn = (json) => {
      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_ALARMS}/${json.id}`,
        type: constants.METHOD_GET,
        dataType: constants.JSON
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          self.getItem(null, res.doc);
        } else if (response.status === constants.STATUS_ACCEPTED) {
          self.getItem(res.message);

        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          window.Materialize.toast(json.message, 2500);
        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    };

    return fn;
  }

  addAlarmStatic() {
    let self = this;

    let fn = (json, fun) => {
      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_ALARMS}/static`,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_CREATED) {
          let message = 'Las alarmas se crearon correctamente';
          window.Materialize.toast(message, 2500);

          if (fun) fun();

          self.addItems(null, res.docs);
        } else if (response.status === constants.STATUS_ACCEPTED) {
          self.addItems(res.message);

        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          window.Materialize.toast(json.message, 2500);
        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  addAlarm() {
    let self = this;

    let fn = (json, fun) => {
      let xhr = window.$.ajax({
        url: constants.URL_SERVER_ALARMS,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_CREATED) {
          let message = 'La alarma se creó correctamente';
          window.Materialize.toast(message, 2500);

          if (fun) fun();

          self.addItem(null, res.doc);
        } else if (response.status === constants.STATUS_ACCEPTED) {
          self.addItem(res.message);

        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          window.Materialize.toast(json.message, 2500);
        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  updateAlarm() {
    let self = this;

    let fn = (json, id) => {

      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_ALARMS}/${id}`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          let message = 'La alarma se actualizo correctamente';
          window.Materialize.toast(message, 2500);

          self.updateItem(null, res.doc);
        } else if (response.status === constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);

        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          window.Materialize.toast(json.message, 2500);
        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  deleteAlarm() {
    let self = this;

    let fn = (json) => {
      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_ALARMS}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          let message = 'La alarma se elimino correctamente';
          window.Materialize.toast(message, 2500);

          self.removeItem(null, json);
        } else if (response.status === constants.STATUS_ACCEPTED) {
          self.removeItem(res.message);

        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          window.Materialize.toast(json.message, 2500);
        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  updateOptionsAlarm() {
    let self = this;

    let fn = (json, id) => {

      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_ALARMS}/${id}?update_relations=true`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          self.updateItem(null, res.doc);
        } else if (response.status === constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);

        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          window.Materialize.toast(json.message, 2500);
        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  updateNotificationAlarm() {
    let self = this;

    let fn = (json, id) => {

      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_ALARMS}/${id}/notification`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          let message = 'La alarma se actualizo correctamente';
          window.Materialize.toast(message, 2500);

          self.updateItem(null, res.doc);
        } else if (response.status === constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);

        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          window.Materialize.toast(json.message, 2500);
        } else {
          window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  addItems(err, itemsIn) {
    let self = this;

    if (err) {
      window.Materialize.toast(err, 2500);
      return;
    }

    let all = this.state.all;
    for (let i = 0; i < itemsIn.length; i++) {
      const itemIn = itemsIn[i];
      all.push(itemIn);
    }

    let items = this.state.items;
    for (let i = 0; i < itemsIn.length; i++) {
      const itemIn = itemsIn[i];
      items.push(itemIn);
    }

    this.setState({ form: TABLE }, () => {
      let page = self.state.page_;

      let total = items.length;
      page = total / Pagination.ROWS_PER_PAGE;
      let r = total % Pagination.ROWS_PER_PAGE;
      page = parseInt(page);

      if (r > 0) page = page + 1;

      self.updateItemsPerPage(items, page);
    });
  }

  getItem(err, item) {
    let self = this;

    if (err) {
      window.Materialize.toast(err, 2500);
      return;
    }

    self.setState({ item: item, form: UPDATE_FORM });
  }

  addItem(err, item) {
    let self = this;

    if (err) {
      window.Materialize.toast(err, 2500);
      return;
    }

    let items = this.state.items;
    items.push(item);

    this.setState({ form: TABLE }, () => {
      let page = self.state.page_;

      let total = items.length;
      page = total / Pagination.ROWS_PER_PAGE;
      let r = total % Pagination.ROWS_PER_PAGE;
      page = parseInt(page);

      if (r > 0) page = page + 1;

      self.updateItemsPerPage(items, page);
    });
  }

  updateItem(err, item) {
    let self = this;

    if (err) {
      window.Materialize.toast(err, 2500);
      return;
    }

    let all = self.state.all;
    for (let i = 0; i < all.length; i++) {
      let id = all[i].id;
      if (item.id === id) {
        all[i] = item;
        break;
      }
    }

    let items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id === id) {
        items[i] = item;
        break;
      }
    }

    this.setState({ form: TABLE }, () => {
      let page = self.state.page_;
      self.updateItemsPerPage(items, page);
    });
  }

  removeItem(err, item) {
    let self = this;

    if (err) {
      window.Materialize.toast(err, 2500);
      return;
    }

    let all = self.state.all;
    for (let i = 0; i < all.length; i++) {
      let id = all[i].id;
      if (item.id === id) {
        all.splice(i, 1);
        break;
      }
    }

    let items = self.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id === id) {
        items.splice(i, 1);
        break;
      }
    }

    let page = self.state.page_;

    let total = items.length;
    let n = total / Pagination.ROWS_PER_PAGE;
    let r = total % Pagination.ROWS_PER_PAGE;
    n = parseInt(n);

    if (r > 0) n = n + 1;

    if (page > n) page = page - 1;

    self.updateItemsPerPage(items, page);
  }

  handleCreate() {
    let self = this;

    let fn = () => {
      self.setState({ form: CREATE_FORM });
    };

    return fn;
  }

  handleCreateStatic() {
    let self = this;

    let fn = () => {
      self.setState({ form: CREATE_FORM_STATIC });
    };

    return fn;
  }

  handleOptions() {
    let self = this;

    let fn = (json) => {
      self.setState({ form: OPTIONS_PANEL, item: json });
    };

    return fn;
  }

  handleUpdateItems() {
    let self = this;

    let fn = (page) => {
      let items = self.state.items;
      self.updateItemsPerPage(items, page);
    };

    return fn
  }

  handleChange() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      let space = ' ';
      let re = new RegExp(space, 'g');
      let nil = '';

      value = value.replace(re, nil);
      if (value === '') {
        self.getAlarms();
      }
    };

    return fn;
  }

  handleSearch() {
    let self = this;

    let fn = (evt) => {
      if (evt.which === ENTER) {
        evt.preventDefault();
        let search = evt.target.value.trim();
        if (search) {
          if (search !== '') {
            search = search.toLowerCase();
            self.findAlarmsForSearch(search);
          }
        }
      }
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = () => {
      self.setState({ form: TABLE });
    }

    return fn;
  }

  getItemView(item) {
    let o = {
      name: item.name,
      message: item.message
    };

    let unitName = 'N/A';
    if (item.unit_name) {
      unitName = item.unit_name
    }

    let timeout = 'N/A';
    let expression = 'N/A';
    if (item.is_timeout) {
      timeout = `${item.timeout} Min.`;
    } else {
      expression = item.expression;
    }

    let sound = 'Sin sonido';
    if (item.sound === constants.WARNING_VALUE) {
      sound = 'Advertencia';
    } else if (item.sound === constants.DANGER_VALUE) {
      sound = 'Peligro';
    } else if (item.sound === constants.TIMEOUT_VALUE) {
      sound = 'Timeout';
    }

    let status = 'Inactiva';
    if (item.status) status = 'Activa';

    o.unit = unitName;
    o.timeout = timeout;
    o.expression = expression;
    o.sound = sound;
    o.status = status;

    return o;
  }

  findAlarmsForSearch(search) {
    let items = this.state.items;

    if (isArray(items)) {
      if (items.length === 0) {
        let all = this.state.all;
        if (isArray(all)) {
          if (all.length > 0) items = clone(all);
        }
      }

      let res = items.filter((item) => {

        let o = this.getItemView(item);

        let keys = ['name', 'message', 'unit', 'timeout', 'expression', 'sound', 'status'];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          let value = o[key];
          if (value) {
            if (!isString(value)) value = `${value}`;
            value = value.toLowerCase();
            let index = value.indexOf(search)
            let isMatched = index > -1;
            if (isMatched) return isMatched
          }
        }

        return false
      });

      let page = 1;
      this.updateItemsPerPage(res, page);
    }
  }

  updateItemsPerPage(items, page) {
    if (!isArray(items)) return;

    let content = [];
    let start = Pagination.ROWS_PER_PAGE * (page - 1);
    let final = Pagination.ROWS_PER_PAGE * page;

    for (let i = start; i < final; i++) {
      const item = items[i];
      if (!item) break;

      item.index = i + 1;

      content.push(item);
    }

    this.setState({ items: items, items_: content, page_: page });
  }

  render() {
    let self = this;

    let view = false;
    let form = this.state.form;

    let createForm   = <CreateForm onCreate={self.addAlarm()} onBack={self.handleBack()} />
    let updateForm   = <UpdateForm item={self.state.item} onUpdate={self.updateAlarm()} onBack={self.handleBack()} />
    let optionsPanel = <OptionsPanel item={self.state.item}
                                    onUpdateOptions={self.updateOptionsAlarm()}
                                    onUpdateNotification={self.updateNotificationAlarm()}
                                    onBack={self.handleBack()} />

    let createFormStatic = <CreateFormStatic onCreate={self.addAlarmStatic()} onBack={self.handleBack()} />

    let table = (() => {
      return (
        <div>
          <div className="col s12">
            <div className="col s12 m3">
              <h5> &nbsp;&nbsp;
                <a href="#create" className="waves-effect waves-light btn green darken-1" onClick={self.handleCreate()}>
                  <i className="material-icons left">add</i> Nueva
                </a>
              </h5>
            </div>

            <div className="col s12 m3">
              <h5> &nbsp;&nbsp;
                <a href="#create-static" className="waves-effect waves-light btn green darken-1" onClick={self.handleCreateStatic()}>
                  <i className="material-icons left">add</i> Nueva Estatica
                </a>
              </h5>
            </div>

            <div className="col s12 m6 busqueda">
              <input placeholder="Buscar..." type="text" onInput={self.handleChange()} onKeyPress={self.handleSearch()} />
            </div>
          </div>

          <Table items={self.state.items_}
                total_rows={self.state.items.length}
                page={self.state.page_}
                onGet={self.getAlarm()}
                onDelete={self.deleteAlarm()}
                onOptions={self.handleOptions()}
                onUpdateItems={self.handleUpdateItems()} />
        </div>
      );
    })();

    if (form === CREATE_FORM) {
      view = createForm;
    } else if (form === UPDATE_FORM) {
      view = updateForm;
    } else if (form === OPTIONS_PANEL) {
      view = optionsPanel;
    } else if (form === CREATE_FORM_STATIC) {
      view = createFormStatic;
    } else {
      view = table;
    }

    return (
      <div className="col s12">
        <h4>Alarmas</h4>
        {view}
      </div>
    );
  }
}

export default Alarms;