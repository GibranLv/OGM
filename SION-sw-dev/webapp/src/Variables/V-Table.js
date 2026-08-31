import React from 'react';

import Pagination from '../Pagination.js';

class VariablesRowTable extends React.Component {

  handleGet() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let json = self.props.row;
      self.props.onGet(json);
    };

    return fn;
  }

  handleDelete() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let json = self.props.row;
      let name = json.name;
      let device = json.device;

      let message = `¿Desea eliminar la variable: ${device}.${name}?`;
      let result = window.confirm(message);
      if (result) {
        self.props.onDelete(json);
      }
    };

    return fn;
  }

  render() {
    let row = this.props.row;

    let status = 'Inactiva';
    if (row.status) {
      status = 'Activa';
    }

    return (
      <tr>
        <td>{row.index}</td>
        <td>{row.name}</td>
        <td>{row.alias}</td>
        <td>{row.device}</td>
        <td>{row.reading_unit}</td>
        <td>{row.expression_insert}</td>
        <td>{status}</td>
        <td>
          <a title="Editar" className="btn-floating green" href="#update" onClick={this.handleGet()}>
            <i className="material-icons">edit</i>
          </a>

          <a title="Borrar" className="btn-floating red" href="#delete" onClick={this.handleDelete()}>
            <i className="material-icons">delete</i>
          </a>
        </td>
      </tr>
    );
  }
}

class VariablesTable extends React.Component {

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
      /*let total = this.props.total_rows;
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
      }*/

      let page = this.props.page;
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
      return <VariablesRowTable key={item.id} row={item} onGet={self.handleGet()} onDelete={self.handleDelete()} />;
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

      if (o.label === page) {
        o.active = true;
      }

      items.push(o);
    }

    pagination = <Pagination items={items}
                            num_pages={num_pages}
                            page={page}
                            onBack={this.handleBack()}
                            onNext={this.handleNext()}
                            onItem={this.handleItem()} />;

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
      rows = <tr><td className="center" colSpan="8">Sin variables registradas</td></tr>;
    }

    return (
      <section>
        <div className="row">
          <table className="responsive-table centered">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th>Alias</th>
                <th>Dispositivo</th>
                <th>Unidad de lectura</th>
                <th>Expresión de Inserción</th>
                <th>Estatus</th>
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

export default VariablesTable;
