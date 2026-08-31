import { h, render, Component } from 'preact';
import { isArray, isString, clone } from 'underscore';

import constants from './../constants.js';

import Table from './table.jsx';
import Pagination from './../pagination.jsx';
import CreateForm from './create-form.jsx';
import UpdateForm from './update-form.jsx';

const ENTER = 13;
const TABLE = 0;
const CREATE_FORM = 1;
const UPDATE_FORM = 2;

class Content extends Component {

  constructor() {
    super();

    this.state = {
      all: [],
      items: [],
      item: false,
      updateForm: false,
      search: '',

      items_: [],
      page_: 1,
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups() {
    let self = this;

    let url = `${constants.URL_SERVER_GROUPS}/list`;

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
        Materialize.toast(res.message, 2500);;

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);;
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  getGroupsForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_GROUPS}/list?search=${value}`;

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
        Materialize.toast(res.message, 2500);;

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);;
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);;
      }
    });
  }

  getGroup() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_GROUPS}/${json.id}`,
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
          Materialize.toast(json.message, 2500);;
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);;
        }
      });
    };

    return fn;
  }

  addGroup() {
    let self = this;

    let fn = (formData) => {
      let xhr = $.ajax({
        url: constants.URL_SERVER_GROUPS,
        type: constants.METHOD_POST,
        processData: false,
        contentType: false,
        data: formData,
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_CREATED) {
          let message = 'El grupo se creó correctamente';
          Materialize.toast(message, 2500);

          self.addItem(null, res.doc);

        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.addItem(res.message);

        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          Materialize.toast(json.message, 2500);;
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);;
        }
      });
    }

    return fn;
  }

  updateGroup() {
    let self = this;

    let fn = (formData, id) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_GROUPS}/${id}`,
        type: constants.METHOD_PUT,
        processData: false,
        contentType: false,
        data: formData,
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'El grupo se actualizo correctamente';
          Materialize.toast(message, 2500);

          self.updateItem(null, res.doc);

        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);

        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });

      xhr.fail((res, status, response) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          Materialize.toast(json.message, 2500);;
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);;
        }
      });
    }

    return fn;
  }

  deleteGroup() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_GROUPS}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'El grupo se elimino correctamente';
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
          Materialize.toast(json.message, 2500);;
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);;
        }
      });
    }

    return fn;
  }

  getItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);;
      return;
    }

    self.setState({ item: item, form: UPDATE_FORM });
  }

  addItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);;
      return;
    }

    let all = this.state.all;
    let items = this.state.items;

    all.push(item);
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
      Materialize.toast(err, 2500);;
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

  handleCreate() {
    let self = this;

    let fn = () => {
      self.setState({ form: CREATE_FORM });
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
      if (value == '') {
        self.getGroups();
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
            self.findGroupsForSearch(search);
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

  findGroupsForSearch(search) {
    let items = this.state.items;

    if (isArray(items)) {
      if (items.length == 0) {
        let all = this.state.all;
        if (isArray(all)) {
          if (all.length > 0) items = clone(all);
        }
      }

      let res = items.filter((item) => {
        let keys = ['name', 'type', 'latitude', 'longitude'];
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

  render(props, state) {
    let self = this;

    let view = false;
    let form = state.form;

    let createForm = <CreateForm onCreate={self.addGroup()} onBack={self.handleBack()} />
    let updateForm = <UpdateForm item={state.item} onUpdate={self.updateGroup()} onBack={self.handleBack()} />

    let table = (() => {
      return (
        <div>
          <div className="col s12">
            <div className="col s12 m4">
              <h5> &nbsp;&nbsp;
                <a href="#" className="waves-effect waves-light btn green darken-1" onClick={self.handleCreate()}>
                  <i className="material-icons left">add</i>Nuevo
                </a>
              </h5>
            </div>

            <div className="col s12 m8 busqueda">
              <input placeholder="Buscar..." type="text" onInput={self.handleChange()} onKeyPress={self.handleSearch()} />
            </div>
          </div>

          <Table items={state.items_} 
                 total_rows={state.items.length}
                 page={state.page_}
                 onGet={self.getGroup()}
                 onDelete={self.deleteGroup()}
                 onUpdateItems={self.handleUpdateItems()} />
        </div>
      );
    })();

    if (form == CREATE_FORM) {
      view = createForm;
    } else if (form == UPDATE_FORM) {
      view = updateForm;
    } else {
      view = table;
    }

    return (
      <div className="col s12 m12">
        <h4>Grupos</h4>
        {view}
      </div>
    );
  }
}

export default Content