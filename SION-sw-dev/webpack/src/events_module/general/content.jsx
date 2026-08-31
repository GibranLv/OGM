import { h, render, Component } from 'preact';
import { isArray } from 'underscore';

import Pagination from './../../pagination.jsx';
import constants from './../../constants.js';

import Table from './table.jsx';
import SearchForm from './search-form.jsx';

const SEARCH = 1;

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      item: false,

      form: SEARCH,

      items_: [],
      page_: 1,
    };
  }

  componentDidMount() {
    this.getEvents();

    $('ul.tabs').tabs_materialize();
  }

  getEvents() {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_EVENTS}/list`;

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

  getEventsForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_EVENTS}/list?search=${value}`;

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

  getEvent() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_LOG_EVENTS}/${json.id}`,
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
        url: `${constants.URL_SERVER_LOG_EVENTS}/${json.id}`,
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

      let withQuery = false;
      let url = `${constants.URL_SERVER_LOG_EVENTS}/list`;

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

      if (json.type) {
        if (!withQuery) {
          withQuery = true;
          url = `${url}?type=${json.type}`;
        } else {
          url = `${url}&type=${json.type}`;
        }
      }

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

  handleUpdateItems() {
    let self = this;

    let fn = (page) => {
      let items = self.state.items;
      self.updateItemsPerPage(items, page);
    };

    return fn
  }

  removeItem(err, item) {
    if (err) {
      Materialize.toast(err, 2500);
      return;
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

    if (form == SEARCH) {
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
              onGet={this.getEvent()}
              onDelete={this.deleteEvent()}
              onUpdateItems={this.handleUpdateItems()} />
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
