import { h, render, Component } from 'preact';
import { isArray, isString, clone } from 'underscore';

import Header from './../header.jsx';
import constants from './../constants.js';

//import Table from './table.jsx';
import Orbcomm from './orbcomm.jsx';
//import Pagination from './../pagination.jsx';
//import CreateForm from './create-form.jsx';
//import UpdateForm from './update-form.jsx';

const ENTER = 13;
const TABLE = 0;
const CREATE_FORM = 1;
const UPDATE_FORM = 2;

class OrbcommsModule extends Component {

  constructor() {
    super();

    this.state = {
      notifications_: [],

      all: [],
      item: false,
      updateForm: false,
      search: '',

      items: [],
      items_: [],
      filter: '',
      mobiles: [],

      page_: 1,
    };
  }

  componentDidMount() {
    let self = this;

    this.getOrbcomms();

    window.setInterval(() => {
      self.getOrbcomms();
    }, 1000 * 60)

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
        self.setState({ notifications_: res.docs }, () => {
          //$('select').material_select();
          //self.initializePickers();
        });

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

  handleRemoveNotification() {
    let self = this;

    let fn = (id) => {
      let notifications = self.state.notifications_;
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (id == notification.id) {
          self.updateEventAsSeen(id);

          notifications.splice(i, 1);

          self.setState({ notifications_: notifications }, () => {
            //$('select').material_select();
            //self.initializePickers();
          });

          return;
        }
      }
    };

    return fn;
  }

  /* Notificaciones */

	sortByMobileId() {
		let fn = (a, b) => {
			if (a.mobile_id < b.mobile_id){
				return -1;
			}
			if (a.mobile_id > b.mobile_id){
				return 1;
			}
			return 0;
		}

		return fn;
	}

	sortByTimeouts() {
		let fn = (a, b) => {
			if (!isArray(a.variables)) a.variables = []
			if (!isArray(b.variables)) b.variables = []

			let aSize = 0
			let bSize = 0

			for (let i = 0; i < a.variables.length; i++) {
				const variable = a.variables[i];
				if (variable.is_timeout) {
					aSize = aSize + 1
				}	
			}

			for (let i = 0; i < b.variables.length; i++) {
				const variable = b.variables[i];
				if (variable.is_timeout) {
					bSize = bSize + 1
				}	
			}

			if (aSize < bSize){
				return 1;
			}

			if (aSize > bSize){
				return -1;
			}

			return 0;
		}

		return fn;
	}

	getDevice(name) {
		let value = '';

		let values = name.split('.'); 
		let size = values.length;
		if (size >= 2) {
			value = values[0];
		}

		return value;
	}

	getGroups(items) {
		let groups = [];

		let size = items.length;
		for (let i = 0; i < size; i++) {
			let variableIn = items[i]
			let insert = true;
				
			for (let j = 0; j < groups.length; j++) {
				const group = groups[j];
				if (group.mobile_id === variableIn.mobile_id) {
					insert = false;

					let insertName = true;
					let size = group.names.length;
					let nameIn = this.getDevice(variableIn.name);
					if (nameIn !== '') {
						let names = group.names;

						for (let k = 0; k < size; k++) {
							const name = names[k];
							if (nameIn === name) {
								insertName = false
								break;
							}	
						}

						if (insertName) groups[j].names.push(nameIn);
					}


					if (!group.variables) groups[j].variables = []

					groups[j].variables.push({
						id: variableIn.id,
						name: variableIn.name,
						parameter: variableIn.parameter,
						timestamp: variableIn.timestamp,
						variable_id: variableIn.variable_id,
						is_timeout: variableIn.is_timeout
					})

					break;
				}
			}

			if (insert) {
				let name = this.getDevice(variableIn.name);

				groups.push({
					mobile_id: variableIn.mobile_id,
					names: [name],
					variables: [
						{
							id: variableIn.id,
							name: variableIn.name,
							parameter: variableIn.parameter,
							timestamp: variableIn.timestamp,
							variable_id: variableIn.variable_id,
							is_timeout: variableIn.is_timeout
						}
					],
				})
			}
		}

		return groups;
	}

  getOrbcomms() {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_ORBCOMMS}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {

        let items = self.getGroups(clone(res.docs));

        let mobiles = this.state.mobiles;
        if (mobiles) {
          let size = mobiles.length;
          if (size === 0) mobiles = self.getOptions(items);
        }

				items.sort(this.sortByTimeouts())
				//items.reverse()

        self.setState({ items_: items, items: items, mobiles: mobiles });
        /*self.state.all = clone(res.docs);

        let page = 1;
        self.updateItemsPerPage(res.docs, page);*/

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

  getOrbcommsForSearch(value) {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_ORBCOMMS}/list?search=${value}`;

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

  getOrbcomm() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_LOG_ORBCOMMS}/${json.id}`,
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

  addOrbcomm() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: constants.URL_SERVER_LOG_ORBCOMMS,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_CREATED) {
          let message = 'El orbcomm se creó correctamente';
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
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  updateOrbcomm() {
    let self = this;

    let fn = (json, id) => {

      let xhr = $.ajax({
        url: `${constants.URL_SERVER_LOG_ORBCOMMS}/${id}`,
        type: constants.METHOD_PUT,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'El orbcomm se actualizo correctamente';
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
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(constants.MESSAGE_ERROR, 2500);
        }
      });
    }

    return fn;
  }

  deleteOrbcomm() {
    let self = this;

    let fn = (json) => {
      let xhr = $.ajax({
        url: `${constants.URL_SERVER_LOG_ORBCOMMS}/${json.id}`,
        type: constants.METHOD_DELETE
      });

      xhr.done((res, status, response) => {
        if (response.status == constants.STATUS_OK) {
          let message = 'El orbcomm se elimino correctamente';
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
      Materialize.toast(err, 2500)(err);
      return;
    }

    self.setState({ item: item, form: UPDATE_FORM });
  }

  addItem(err, item) {
    let self = this;

    if (err) {
      Materialize.toast(err, 2500)(err);
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
      Materialize.toast(err, 2500)(err);
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
      Materialize.toast(err, 2500)(err);
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

  handleCreate() {
    let self = this;

    let fn = () => {
      self.setState({ form: CREATE_FORM });
    };

    return fn;
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
        self.getOrbcomms();
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
            self.findOrbcommsForSearch(search);
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

  findOrbcommsForSearch(search) {
    let items = this.state.items;

    if (isArray(items)) {
      if (items.length == 0) {
        let all = this.state.all;
        if (isArray(all)) {
          if (all.length > 0) items = clone(all);
        }
      }

      let res = items.filter((item) => {
        let keys = ['name', 'expression', 'display'];
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

  handleChangeID() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;

      self.setState({ filter: value });
    }

    return fn;
  }

  createOption() {
    let fn = (id, index) => {
      return (
        <option key={index} value={id}>{id}</option>
      );
    }

    return fn;
  }

  getItems() {
    let items = [];

    let filter = this.state.filter;

    let items_ = clone(this.state.items);
    if (filter === '') {
      return items_;
    }

    let sizeIn = items_.length;
    for(let i = 0; i < sizeIn; i++) {
      let o = items_[i];
      if (o.mobile_id === filter) {
        items.push(o);
      }
    }

    return items;
  }

  getOptions(items_) {
    let options = [];

    let sizeIn = items_.length;
    for(let i = 0; i < sizeIn; i++) {
      let o = items_[i];

      let exists = false;
      let size = options.length;
      for (let j = 0; j < size; j++) {
        let s = options[j];

        if (o.mobile_id === s) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        options.push(o.mobile_id);
      }
    }
//console.log(options)
    return options;
  }

	// <Table items={items} />

  render(props, state) {
    let notifications = state.notifications_;
    let items = this.getItems();

    return (
      <div>
        <Header module={constants.REPORTS_MODULE}
                notifications={notifications}
                onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">
          <div className="reports">
            <div className="container">

              <div className="col s12">
                <h4>Orbcomms</h4>

                <div className="col s12">
                  <select className="browser-default sion-select" onChange={this.handleChangeID()}>
                    <option value="" selected>Todos</option>
                    {this.state.mobiles.map(this.createOption())}
                  </select>
                </div>

								{
									items.map(item => <Orbcomm item={item} />)
								}
               </div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default OrbcommsModule