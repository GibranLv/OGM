import { h, render, Component } from 'preact';
import { isArray, clone } from 'underscore';

import Pagination from './../../pagination.jsx';
import constants from './../../constants.js';

import Table from './table.jsx';
import SearchForm from './search-form.jsx';
import UpdateForm from './update-form.jsx';

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      all: [],
      items: [],
      item: false,

      form: false,

      items_: [],
      page_: 1,
    };
  }

  componentDidMount() {
    this.getChartEvents();

    $('ul.tabs').tabs_materialize();

    if (!this.state.form) {
      this.state.form = <SearchForm onSearch={this.handleSearch()} />;
    }
  }

  getChartEvents() {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_CHART_EVENTS}/list`,
      type: constants.METHOD_GET,
      dataType: constants.JSON
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.state.all = clone(res.docs);

        let page = 1;
        self.updateItemsPerPage(res.docs, page);

      } else if (response.status === constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
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

  getChartEventsForSearch(json) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_CHART_EVENTS}/list`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {        
        let docs = [];

        for (let i = 0; i < res.docs.length; i++) {
          const doc = res.docs[i];
          let events = doc.events;

          for (let j = 0; j < events.length; j++) {
            const event = events[j];
            docs.push(event);
          }
        }

        docs.sort(self.orderBy('created_at'));

        self.state.all = clone(docs);

        let page = 1;
        self.updateItemsPerPage(docs, page);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
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

  getChartEvent() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_CHART_EVENTS}/${json.id}`,
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

  deleteEvent() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_CHART_EVENTS}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'El evento se elimino correctamente';
          Materialize.toast(message, 2500);

          self.removeItem(null, json);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.removeItem(res.message);
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

  handleSearch() {
    let self = this;

    let fn = (json) => {
      let self = this;

      self.getChartEventsForSearch(json);
    };

    return fn;
  }

  handleUpdate() {
    let self = this;

    let fn = (formData, id) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_CHART_EVENTS}/${id}`,
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

  handleCancel() {
    let self = this;

    let fn = () => {
      self.setState({ form: false, item: false });
    }

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

  orderBy(field) {
    
    let fn = (a, b) => {
      let hasA = (a.hasOwnProperty(field))
      let hasB = (b.hasOwnProperty(field))

      if (hasA && hasB) {
        let vA = a[field];
        let vB = b[field];

        let dA = new Date(vA);
        let dB = new Date(vB);

        vA = dA.getTime();
        vB = dB.getTime();

        if (vA < vB) return 1;
        if (vA > vB) return -1;
      }

      return 0;
    };

    return fn;
  }

  getItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500);
      return;
    }

    let form = <UpdateForm item={item} onUpdate={this.handleUpdate()} onCancel={this.handleCancel()} />;

    this.setState({ form: false, item: false }, () => {
      self.setState({ form: form, item: item });
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
        if (item.variable_id == all[i].variable_id) {
          if (item.is_custom == all[i].is_custom) {
            all[i] = item;
            break;
          }
        }

        all.splice(i, 1);
        break;
      }
    }

    let wasRemove = false;
    let items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id == id) {
        if (item.variable_id == items[i].variable_id) {
          if (item.is_custom == items[i].is_custom) {
            items[i] = item;
            break;
          }
        }

        items.splice(i, 1);
        wasRemove = true;
        break;
      }
    }


    this.setState({ form: false, item: false }, () => {
      let page = self.state.page_;

      if (wasRemove) {
        let total = items.length;
        let n = total / Pagination.ROWS_PER_PAGE;
        let r = total % Pagination.ROWS_PER_PAGE;
        n = parseInt(n);

        if (r > 0) n = n + 1;

        if (page > n) page = page - 1;
      }

      self.updateItemsPerPage(items, page);
    });
  }

  removeItem(err, item) {
    if (err) {
      Materialize.toast(err, 2500);
      return
    }

    let all = this.state.all;
    for (let i = 0; i < all.length; i++) {
      let id = all[i].id;
      if (item.id == id) {
        all.splice(i, 1);
        break;
      }
    }

    let items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      let id = items[i].id;
      if (item.id == id) {
        items.splice(i, 1);
        break;
      }
    }
    let page = this.state.page_;


    let total = items.length;
    let n = total / Pagination.ROWS_PER_PAGE;
    let r = total % Pagination.ROWS_PER_PAGE;
    n = parseInt(n);

    if (r > 0) n = n + 1;

    if (page > n) page = page - 1;

    this.updateItemsPerPage(items, page);
  }

  updateItemsPerPage(items, page) {
    let content = [];
    let start = Pagination.ROWS_PER_PAGE * (page - 1);;
    let final = Pagination.ROWS_PER_PAGE * page;

    if (!isArray(items)) items = [];

    for (let i = start; i < final; i++) {
      const item = items[i];
      if (!item) break;

      item.index = i + 1;

      content.push(item);
    }

    this.setState({ items: items, items_: content, page_: page });
  }

  render(props, state) {
    let form = state.form;

    if (!form) {
      form = <SearchForm onSearch={this.handleSearch()} />;
    }

    return (
      <div className="row">
        <div className="col s12 m4 anotaciones">
          {form}
        </div>
        <div className="col s12 m8 anotaciones">
          <div className="all_notes">
            <Table items={state.items_}
              total_rows={state.items.length}
              page={state.page_}
              onGet={this.getChartEvent()}
              onDelete={this.deleteEvent()}
              onUpdateItems={this.handleUpdateItems()} />
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
