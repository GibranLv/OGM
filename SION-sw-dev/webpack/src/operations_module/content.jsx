import { h, render, Component } from 'preact';

import Header from './../header.jsx';
import Pagination from './../pagination.jsx';
import constants from './../constants.js';

import Table from './table.jsx';
import SearchForm from './search-form.jsx';
import CreateForm from './create-form.jsx';
import UpdateForm from './update-form.jsx';

const SEARCH = 1;
const CREATE_FORM = 2;
const UPDATE_FORM = 3;

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],
      matrices_: [],
      groups_: [],

      items: [],
      item: false,

      items_: [],
      page_: 1,
    };
  }

  componentDidMount() {
    this.getOperations();

    this.getNotifications();
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

  getOperations() {
    let self = this;

    let url = `${constants.URL_SERVER_OPERATIONS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let page = self.state.page_;

        self.updateItemsPerPage(res.docs, page);

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

  getOperationsForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_OPERATIONS}/list?search=${value}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let page = self.state.page_;
        
        self.updateItemsPerPage(res.docs, page);

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

  getOperation() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_OPERATIONS}/${json.id}`,
        type: constants.METHOD_GET,
        dataType: constants.JSON
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          self.getItem(null, res.doc);

        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.getItem(res.message);
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
    };

    return fn;
  }

  addOperation() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: constants.URL_SERVER_OPERATIONS,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });
      /*let xhr = $.ajax({
        url: constants.URL_SERVER_OPERATIONS,
        type: constants.METHOD_POST,
        processData: false,
        contentType: false,
        data: formData,
      });*/

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_CREATED) {
          let message = 'La operación se creó correctamente';
          Materialize.toast(message, 2500);

          self.addItem(null, res.doc);
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

    return fn;
  }

  updateOperation() {
    let self = this;

    let fn = (json, id) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_OPERATIONS}/${id}`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      /*let xhr = $.ajax({
        url: `${constants.URL_SERVER_OPERATIONS}/${id}`,
        type: constants.METHOD_PUT,
        processData: false,
        contentType: false,
        data: formData,
      });*/

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'La operación se actualizo correctamente';
          Materialize.toast(message, 2500);

          self.updateItem(null, res.doc);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);
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

    return fn;
  }

  deleteOperation() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_OPERATIONS}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'La operación se elimino correctamente';
          Materialize.toast(message, 2500);

          self.removeItem(null, json);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.removeItem(res.message);
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

    return fn;
  }

  handleOpenCreate() {
    let self = this;

    let fn = () => {
      self.setState({ form: CREATE_FORM });
    };

    return fn;
  }

  handleSearch() {
    let self = this;

    let fn = (json) => {
      let self = this;

      let withQuery = false;
      let url = `${constants.URL_SERVER_OPERATIONS}/list`;

      if (json.matrix_id) {
        if (!withQuery) { 
          withQuery = true;
          url = `${url}?matrix_id=${json.matrix_id}`;
        } else {
          url = `${url}&matrix_id=${json.matrix_id}`;
        }
      }

      if (json.group_id) {
        if (!withQuery) {
          withQuery = true;
          url = `${url}?group_id=${json.group_id}`;
        } else {
          url = `${url}&group_id=${json.group_id}`;
        }
      }      

      if (json.start_date) {
        if (!withQuery) {
          withQuery = true;
          url = `${url}?start_date=${json.start_date}`;
        } else {
          url = `${url}&start_date=${json.start_date}`;
        }
      }

      if (json.final_date) {
        if (!withQuery) {
          withQuery = true;
          url = `${url}?final_date=${json.final_date}`;
        } else {
          url = `${url}&final_date=${json.final_date}`;
        }
      }

      let xhr = $.ajax({
        url: url,
        type: constants.METHOD_GET,
        dataType: constants.JSON,
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let page = self.state.page_;

          self.updateItemsPerPage(res.docs, page);

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
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = () => {
      self.setState({ form: SEARCH });
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

  getItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);
      return;
    }

    self.setState({ item: item, form: UPDATE_FORM });
  }

  addItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);
      return;
    }

    let items = this.state.items;
    items.push(item);
    this.setState({ form: SEARCH }, () => {
      let page = self.state.page_;
      self.updateItemsPerPage(items, page);
    });
  }

  updateItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);
      return;
    }

    let items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id == id) {
        items[i] = item;
        break;
      }
    }

    this.setState({ form: SEARCH }, () => {
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

    let items = self.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id == id) {
        items.splice(i, 1);
        break;
      }
    }

    let page = self.state.page_;
    self.updateItemsPerPage(items, page);
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
    let notifications = state.notifications_;

    let form = state.form;

    if (form == CREATE_FORM) {
      form = <CreateForm onCreate={this.addOperation()} onBack={this.handleBack()} />;
    } else if (form == UPDATE_FORM) {
      form = <UpdateForm item={state.item} onUpdate={this.updateOperation()} onBack={this.handleBack()} />;
    } else {
      form = <SearchForm openCreate={this.handleOpenCreate()} onSearch={this.handleSearch()} />;
    }
    
    return (
      <div>
        <Header module={constants.OPERATIONS_MODULE}
                notifications={notifications}
                onRemoveNotification={this.handleRemoveNotification()} />
        
        <section className="contenedor_root animated fadeIn">
          <div className="notes">
            <div className="container">
              <div className="row">
                <div className="col s12 m4 anotaciones">
                  {form}
                </div>
                <div className="col s12 m8 anotaciones">
                  <div className="all_notes">
                    <Table items={state.items}
                           total_rows={state.items.length}
                           onGet={this.getOperation()} 
                           onDelete={this.deleteOperation()} 
                           onUpdateItems={this.handleUpdateItems()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="background"></div>
      </div>
    );
  }
}

render(<Content />, document.getElementById('content-main'));
