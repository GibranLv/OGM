import { h, render, Component } from 'preact';
import { isString, isDate, isNumber, isObject } from 'underscore';

import Pagination from '../../pagination.jsx';

class RowTable extends Component {

  constructor(props) {
    super(props);
  }

  handleGet() {
    let self = this;

    let fn = () => {
      let json = self.props.row;
      self.props.onGet(json);
    };

    return fn;
  }

  handleDelete() {
    let self = this;

    let fn = () => {
      let json = self.props.row;
      let description = json.description;

      let message = `¿Desea eliminar la evento: ${description}?`;
      let result = window.confirm(message);
      if (result) {
        self.props.onDelete(json);
      }
    };

    return fn;
  }

  createItemFile(id) {
    let self = this;

    let fn = (file, index) => {
      if (isString(file)) return;

      if (!isObject(file)) return;

      let url = `/server/chart_events/file/${id}/${file.name}`

      return <a key={index} href={url} target="_blank">{file.alias}<br /></a>;
    };

    return fn;
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

      str = `${day}-${month}-${year} ${hour}:${min}:${sec}`;
    }

    return str
  }  

  render() {
    let row = this.props.row;
    
    let event_id = row.id;

    let created_at = row.created_at;
    created_at = new Date(created_at);
    created_at = this.getDateToString(created_at);

    let files = row.files;
    if (!files) files = [];
    
    let list = 'N/A';
    if (files.length > 0 ) {
      list = files.map(this.createItemFile(event_id));
    }

    return (
      <tr>
        <td>{row.index}</td>
        <td>
          {row.variable_device}.{row.variable_name}
        </td>
        <td>
          {row.user_name}
        </td>
        <td>
          {row.name}
        </td>
        <td>
          {list}
        </td>
        <td>{created_at}</td>
        <td>
          <a title="Editar" className="btn-floating green" href="#" onClick={this.handleGet()}>
            <i className="material-icons">edit</i>
          </a>        
          <a title="Borrar" className="btn-floating red" href="#" onClick={this.handleDelete()}>
            <i className="material-icons">delete</i>
          </a>
        </td>
      </tr>
    );
  }
}

class Table extends Component {

  constructor(props) {
    super(props);

    this.state = { rows: false };
  }

  handleGet() {
    let self = this;

    let fn = (json) => {
      self.props.onGet(json);
    };

    return fn;
  }

  handleDelete() {
    let self = this;

    let fn = (json) => {
      self.props.onDelete(json);
    };

    return fn;
  }

  handleUpdateItems() {
    let self = this;

    let fn = (page) => {
      let f = self.props.onUpdateItems;
      if (f) f(page, Pagination.ROWS_PER_PAGE);
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = () => {
      let total = this.props.total_rows;
      let rowsPerPage = this.props.rows_per_page;
      let page = this.props.page;

      if (!total) total = 0;
      if (!rowsPerPage) rowsPerPage = Pagination.ROWS_PER_PAGE;

      let num_pages = 0;

      if (total <= rowsPerPage) {
        num_pages = 1;
      } else {
        num_pages = total / rowsPerPage;
        num_pages = parseInt(num_pages);

        let r = total % rowsPerPage;
        if (r > 0) {
          num_pages = num_pages + 1;
        }
      }

      if (page > 1) {
        page = page - 1;
        let f = self.props.onUpdateItems;
        if (f) f(page);
      }
    };

    return fn;
  }

  handleNext() {
    let self = this;

    let fn = () => {
      let total = this.props.total_rows;
      let rowsPerPage = this.props.rows_per_page;
      let page = this.props.page;

      if (!total) total = 0;
      if (!rowsPerPage) rowsPerPage = Pagination.ROWS_PER_PAGE;

      let num_pages = 0;

      if (total <= rowsPerPage) {
        num_pages = 1;
      } else {
        num_pages = total / rowsPerPage;
        num_pages = parseInt(num_pages);

        let r = total % rowsPerPage;
        if (r > 0) {
          num_pages = num_pages + 1;
        }
      }

      if (page < num_pages) {
        page = page + 1;
        let f = self.props.onUpdateItems;
        if (f) f(page);
      }
    };

    return fn;
  }

  handleItem() {
    let self = this;

    let fn = (page) => {
      let total = this.props.total_rows;
      let rowsPerPage = this.props.rows_per_page;

      if (!total) total = 0;
      if (!rowsPerPage) rowsPerPage = Pagination.ROWS_PER_PAGE;

      let num_pages = 0;

      if (total <= rowsPerPage) {
        num_pages = 1;
      } else {
        num_pages = total / rowsPerPage;
        num_pages = parseInt(num_pages);

        let r = total % rowsPerPage;
        if (r > 0) {
          num_pages = num_pages + 1;
        }
      }

      if (page <= num_pages) {
        let f = self.props.onUpdateItems;
        if (f) f(page);
      }
    };

    return fn;
  }

  createRow() {
    let self = this;

    let fn = (item) => {
      return <RowTable key={item.id} row={item} onGet={self.handleGet()} onDelete={self.handleDelete()} />;
    };

    return fn;
  }

  getPagination() {
    let pagination = false;

    let total = this.props.total_rows;
    let rowsPerPage = this.props.rows_per_page;
    let page = this.props.page;

    if (!total) total = 0;
    if (!rowsPerPage) rowsPerPage = Pagination.ROWS_PER_PAGE;

    let num_pages = 0;

    if (total <= rowsPerPage) {
      num_pages = 1;
    } else {
      num_pages = total / rowsPerPage;
      num_pages = parseInt(num_pages);

      let r = total % rowsPerPage;
      if (r > 0) {
        num_pages = num_pages + 1;
      }
    }

    let max = (page + Pagination.LIMIT_PAGES) - 1;
    let min = (max - Pagination.LIMIT_PAGES) + 1;

    if (max > num_pages) {
      let diff = max - num_pages;
      min = min - diff;
      max = num_pages;
    }

    if (min < 1) min = 1;

    let items = [];

    for (let i = min; i <= max; i++) {
      let o = {
        label: i,
        active: false
      }

      if (o.label == page) {
        o.active = true;
      }

      items.push(o);
    }

    pagination = <Pagination items={items} num_pages={num_pages} page={page} onBack={this.handleBack()} onNext={this.handleNext()} onItem={this.handleItem()} />;

    return pagination;
  }

  render() {
    let items = this.props.items;

    let rows = false;
    let pagination = false;

    if (items.length > 0) {
      rows = items.map(this.createRow());

      pagination = this.getPagination();
    }

    if (!rows) {
      rows = <tr><td className="center" colSpan="6">Sin eventos registradas</td></tr>;
    }

    return (
      <section>
        <div className="row">
          <table className="responsive-table centered">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Variable</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Archivos</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>

        {pagination}
      </section>
    );
  }
}

export default Table;
