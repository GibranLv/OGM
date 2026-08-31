import { h, render, Component } from 'preact';

import constants from './../constants.js';

import Table from './table.jsx';
import CreatePanel from './create-panel.jsx';
import UpdatePanel from './update-panel.jsx';

const ENTER = 13;
const TABLE = 0;
const CREATE_FORM = 1;
const UPDATE_FORM = 2;

class Content extends Component {

  constructor() {
    super();

    this.state = {
      items: [],
      item: false,
      search: '',
      form: TABLE
    };
  }

  componentDidMount() {
    this.getGeoMaps();
  }

  getGeoMaps() {
    let self = this;

    let url = `${constants.URL_SERVER_GEOMAPS}/list?with_structure=true&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ items: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        alert(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        alert(json.message);
      } else {
        alert(constants.MESSAGE_ERROR);
      }
    });
  }

  getGeoMapsForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_GEOMAPS}/list?search=${value}`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ items: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        alert(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        alert(json.message);
      } else {
        alert(constants.MESSAGE_ERROR);
      }
    });
  }

  getGeoMap() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_GEOMAPS}/${json.id}?with_structure=true&with_structure_json=false`,
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
          alert(json.message);
        } else {
          alert(constants.MESSAGE_ERROR);
        }
      });
    };

    return fn;
  }

  addGeoMap() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: constants.URL_SERVER_GEOMAPS,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_CREATED) {
          self.addItem(null, res.doc);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.addItem(res.message);
        }
      });

      xhr.fail((res, status, respose) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          alert(json.message);
        } else {
          alert(constants.MESSAGE_ERROR);
        }
      });
    }

    return fn;
  }

  updateGeoMap() {
    let self = this;

    let fn = (json, id) => {

      let xhr = $.ajax({
        url: `${constants.URL_SERVER_GEOMAPS}/${id}`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          self.updateItem(null, res.doc);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.updateItem(res.message);
        }
      });

      xhr.fail((res, status, respose) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          alert(json.message);
        } else {
          alert(constants.MESSAGE_ERROR);
        }
      });
    }

    return fn;
  }

  deleteGeoMap() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_GEOMAPS}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          self.removeItem(null, json);
        } else if (response.status == constants.STATUS_ACCEPTED) {
          self.removeItem(res.message);
        }
      });

      xhr.fail((res, status, respose) => {
        if (res.responseJSON) {
          let json = res.responseJSON;
          alert(json.message);
        } else {
          alert(constants.MESSAGE_ERROR);
        }
      });
    }

    return fn;
  }

  getItem(err, item) {
    let self = this;

    if (err) {
      alert(err);
      return;
    }

    self.setState({ item: item, form: UPDATE_FORM });
  }

  addItem(err, item) {
    if (err) {
      alert(err);
      return;
    }

    let items = this.state.items;
    items.push(item);
    this.setState({ items: items, form: TABLE });
  }

  updateItem(err, item) {
    if (err) {
      alert(err);
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

    this.setState({ items: items, form: TABLE });
  }

  removeItem(err, item) {
    let self = this;

    if (err) {
      alert(err);
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

    self.setState({ items: items });
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
        self.getGeoMaps();
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
            self.getGeoMapsForSearch(search);
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

    let fn = () => {
      self.setState({ form: CREATE_FORM });
    };

    return fn;
  }

  render(props, state) {
    let self = this;

    let view = false;
    let form = state.form;

    let createPanel = <CreatePanel onCreate={self.addGeoMap()} onBack={self.handleBack()} />
    let updatePanel = <UpdatePanel item={state.item} onUpdate={self.updateGeoMap()} onBack={self.handleBack()} />

    let table = (() => {
      return (
        <div>
          <div className="col s12">
            <div className="col s12 m4">
              <h5>GeoMapas &nbsp;&nbsp;
                <a href="#" className="waves-effect waves-light btn green darken-1" onClick={self.handleCreate()}>
                  <i className="material-icons left">add</i>Nuevo
                </a>
              </h5>
            </div>

            <div className="col s12 m8 busqueda">
              <input placeholder="Buscar..." type="text" onInput={self.handleChange()} onKeyPress={self.handleSearch()} />
            </div>
          </div>

          <Table items={state.items} onGet={self.getGeoMap()} onDelete={self.deleteGeoMap()} />
        </div>
      );
    })();

    if (form == CREATE_FORM) {
      view = createPanel;
    } else if (form == UPDATE_FORM) {
      view = updatePanel;
    } else {
      view = table;
    }

    return (
      <div className="col s12">
        {view}
      </div>
    );
  }
}

export default Content;