import { h, render, Component } from 'preact';
import { isArray, isString, clone } from 'underscore';

import constants from './../constants.js';

import Table from './table.jsx';
import Pagination from './../pagination.jsx';
import UpdateForm from './update-form.jsx';

const ENTER = 13;
const TABLE = 0;
const UPDATE_FORM = 2;

class Content extends Component {

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
    this.getVariables();
  }

  getVariables() {
    let self = this;

    let url = `${constants.URL_SERVER_VARIABLES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.state.all = clone(res.docs);

        let page = 1;
        self.updateItemsPerPage(res.docs, page);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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

  getVariablesForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_VARIABLES}/list?search=${value}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let page = 1;
        self.updateItemsPerPage(res.docs, page);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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

  getVariable() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_VARIABLES}/${json.id}`,
        type: constants.METHOD_GET,
        dataType: constants.JSON
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          self.getItem(null, res.doc);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.getItem(res.message);

        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
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
    };

    return fn;
  }

  updateVariable() {
    let self = this;

    let fn = (json, id) => {

      let xhr = $.ajax({
        url: `${constants.URL_SERVER_VARIABLES}/${id}`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'La variable se creó correctamente';
          Materialize.toast(message, 2500);

          self.updateItem(null, res.doc);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);

        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        $('#update-form').modal('hide');

        if (res.responseJSON) {
          let json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  deleteVariable() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_VARIABLES}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'La variable se elimino correctamente';
          Materialize.toast(message, 2500);
          
          self.removeItem(null, json);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.removeItem(res.message);

        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
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

    return fn;
  }

  getItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);
      return;
    }

    self.setState({ item: item, form: UPDATE_FORM });
  }

  updateItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);
      return;
    }

    let all = self.state.all;
    for (let i = 0; i < all.length; i++) {
      let id = all[i].id;
      if (item.id == id) {
        all[i] = item;
        break;
      }
    }

    let items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id == id) {
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
      Materialize.toast(err, 2500);
      return;
    }

    let all = self.state.all;
    for (let i = 0; i < all.length; i++) {
      let id = all[i].id;
      if (item.id == id) {
        all.splice(i, 1);
        break;
      }
    }

    let items = self.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id == id) {
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
      if (value == '') {
        self.getVariables();
      }
    };

    return fn;
  }

  handleSearch() {
    let self = this;

    let fn = (evt) => {
      if (evt.which == ENTER) {
        evt.preventDefault();
        let search = evt.target.value;
        if (search) {
          if (search !== '') {
            search = search.toLowerCase();
            self.findVariablesForSearch(search);
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

  getViewItem(item) {
    let status = 'Inactiva';
    if (item.status) {
      status = 'Activa';
    }

    let o = {
      name: item.name,
      alias: item.alias,
      device: item.device,
      reading_unit: item.reading_unit,
      expression_insert: item.expression_insert,
      status: status
    };

    return o;
  }

  findVariablesForSearch(search) {
    let items = this.state.items;

    if (isArray(items)) {
      if (items.length == 0) {
        let all = this.state.all;
        if (isArray(all)) {
          if (all.length > 0) items = clone(all);
        }
      }

      let res = items.filter((item) => {
        let o = this.getViewItem(item);

        let keys = ['name', 'alias', 'device', 'reading_unit', 'expression_insert', 'status'];
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

  render(props, state) {
    let self = this;

    let view = false;
    let form = state.form;

    let updateForm = <UpdateForm item={state.item} onUpdate={self.updateVariable()} onBack={self.handleBack()} />

    let table = (() => {
      return (
        <div>
          <div className="col s12">
            <div className="col s12 m4">
            </div>

            <div className="col s12 m8 busqueda">
              <input placeholder="Buscar..." type="text" onInput={self.handleChange()} onKeyPress={self.handleSearch()} />
            </div>
          </div>

          <Table items={state.items_}
                 total_rows={state.items.length}
                 page={state.page_}
                 onGet={self.getVariable()}
                 onDelete={self.deleteVariable()}
                 onUpdateItems={this.handleUpdateItems()} />
        </div>
      );
    })();

    if (form == UPDATE_FORM) {
      view = updateForm;
    } else {
      view = table;
    }

    return (
      <div className="col s12">
        <h4>Variables</h4>
        {view}
      </div>
    );
  }
}

export default Content;