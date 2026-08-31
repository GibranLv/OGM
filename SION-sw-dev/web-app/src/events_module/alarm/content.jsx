import { h, render, Component } from 'preact';
import { isArray, isDate, isNumber } from 'underscore';

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
    this.getLogAlarms();

    $('ul.tabs').tabs_materialize();
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

  getLogAlarms() {
    let self = this;

    let now = Date.now()
    let iniNow = now - (1000 * 60 * 60 * 24 * 30);

    let sd = self.getDateToString(iniNow);
    let fd = self.getDateToString(now);

    let url = `${constants.URL_SERVER_LOG_ALARMS}/list?sd=${sd}&fd=${fd}`;

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

  getLogAlarmsForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_ALARMS}/list?search=${value}`;

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

  getLogAlarm() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_LOG_ALARMS}/${json.id}`,
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

  deleteLogAlarm() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_LOG_ALARMS}/${json.id}`,
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
      let url = `${constants.URL_SERVER_LOG_ALARMS}/list`;

      if (json.start_date) {
        if (!withQuery) {
          withQuery = true;
          url = `${url}?sd=${json.start_date}`;
        } else {
          url = `${url}&sd=${json.start_date}`;
        }
      }

      if (json.final_date) {
        if (!withQuery) {
          withQuery = true;
          url = `${url}?fd=${json.final_date}`;
        } else {
          url = `${url}&fd=${json.final_date}`;
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
              onGet={this.getLogAlarm()}
              onDelete={this.deleteLogAlarm()}
              onUpdateItems={this.handleUpdateItems()} />
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
