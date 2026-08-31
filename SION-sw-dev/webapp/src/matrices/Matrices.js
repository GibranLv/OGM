import React, { Component } from 'react';
import { isArray, isString, clone } from 'underscore';

import constants from '../constants.js';

import Pagination from '../Pagination.js';

import Table from './Matrices-Table.js';
import CreatePanel from './Matrices-CreatePanel.js';
import UpdatePanel from './Matrices-UpdatePanel.js';

const ENTER = 13;
const TABLE = 0;
const CREATE_FORM = 1;
const UPDATE_FORM = 2;

class Matrices extends Component {

  constructor() {
    super();

    this.state = {
      all: [],
      items:  [],
      item:   false,
      search: '',
      form:    TABLE,

      items_: [],
      page_: 1,
    };
  }

  componentDidMount() {
    this.getMatrices();
  }

  getMatrices() {
    let self = this;

    let url = `${constants.URL_SERVER_MATRICES}/list?with_structure=true&with_structure_json=false`;

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

  getMatricesForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_MATRICES}/list?search=${value}`;

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

  getMatrix() {
    let self = this;

    let fn = (json) => {
      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_MATRICES}/${json.id}?with_structure=true&with_structure_json=false`,
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

  addMatrix() {
    let self = this;

    let fn = (json) => {
      let xhr = window.$.ajax({
        url: constants.URL_SERVER_MATRICES,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_CREATED) {
          let message = 'La matriz se creó correctamente';
          window.Materialize.toast(message, 2500);

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

  updateMatrix() {
    let self = this;

    let fn = (json, id) => {

      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_MATRICES}/${id}`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          let message = 'La matriz se actualizo correctamente';
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

  deleteMatrix() {
    let self = this;

    let fn = (json) => {
      let xhr = window.$.ajax({
        url: `${constants.URL_SERVER_MATRICES}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          let message = 'La matriz se elimino correctamente';
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

    let all = self.state.all;
    all.push(item);

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
        self.getMatrices();
      }
    };

    return fn;
  }

  handleSearch() {
    let self = this;

    let fn = (evt) => {
      if (evt.which === ENTER) {
        evt.preventDefault();

        let search = evt.target.value;
        if (search) {
          if (search !== '') {
            search = search.toLowerCase();
            self.findMatricesForSearch(search);
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

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      self.setState({ form: CREATE_FORM });
    };

    return fn;
  }

  findMatricesForSearch(search) {
    let items = this.state.items;

    if (isArray(items)) {
      if (items.length === 0) {
        let all = this.state.all;
        if (isArray(all)) {
          if (all.length > 0) items = clone(all);
        }
      }

      let res = items.filter((item) => {
        let keys = ['name'];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          let value = item[key];
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
    let content = [];
    let start = Pagination.ROWS_PER_PAGE * (page - 1);;
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

    let createPanel = <CreatePanel onCreate={self.addMatrix()} onBack={self.handleBack()} />
    let updatePanel = <UpdatePanel item={self.state.item} onUpdate={self.updateMatrix()} onBack={self.handleBack()} />

    let table = (() => {
      return (
        <div>
          <div className="col s12">
            <div className="col s12 m4">
              <h5> &nbsp;&nbsp;
                <a href="#add" className="waves-effect waves-light btn green darken-1" onClick={self.handleCreate()}>
                  <i className="material-icons left">add</i>Nuevo
                </a>
              </h5>
            </div>

            <div className="col s12 m8 busqueda">
              <input placeholder="Buscar..." type="text" onInput={self.handleChange()} onKeyPress={self.handleSearch()} />
            </div>
          </div>

          <Table items={self.state.items_}
                  total_rows={self.state.items.length}
                  page={self.state.page_}
                  onGet={self.getMatrix()}
                  onDelete={self.deleteMatrix()}
                  onUpdateItems={self.handleUpdateItems()} />
        </div>
      );
    })();

    if (form === CREATE_FORM) {
      view = createPanel;
    } else if (form === UPDATE_FORM) {
      view = updatePanel;
    } else {
      view = table;
    }

    return (
      <div className="col s12">
        <h4>Matrices</h4>
        {view}
      </div>
    );
  }
}

export default Matrices;