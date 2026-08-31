import { h, render, Component } from 'preact';

import Pagination from './../pagination.jsx';

import constants from './../constants';

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

  handleOptions() {
    let self = this;

    let fn = () => {
      let json = self.props.row;
      self.props.onOptions(json);
    };

    return fn;
  }

  handleDelete() {
    let self = this;

    let fn = () => {
      let json = self.props.row;
      let name = json.name;

      let message = `¿Desea eliminar la alarma: ${name}?`;
      let result = window.confirm(message);
      if (result) {
        self.props.onDelete(json);
      }
    };

    return fn;
  }

  render() {
    let row = this.props.row;

    let unitName = 'N/A';
    if (row.unit_name) {
      unitName = row.unit_name
    }

    let setpoint = 'N/A';
    let timeout = 'N/A';

    let expression = 'N/A';
    if (row.is_timeout) {
      timeout = `${row.timeout} Min.`;
    } else {
      expression = row.expression;
      setpoint = row.setpoint;
    }

    let sound = 'Sin sonido';
    if (row.sound == constants.WARNING_VALUE) {
      sound = 'Advertencia';
    } else if (row.sound == constants.DANGER_VALUE) {
      sound = 'Peligro';
    } else if (row.sound == constants.TIMEOUT_VALUE) {
      sound = 'Timeout';
    }

    let status = 'Inactiva';
    if (row.status) status = 'Activa';

    let sName = `color: ${row.color} !important; font-weight: bold !important;`;

    return (
      <tr>
        <td>{row.index}</td>
        <td style={sName}>{row.name}</td>
        <td>{row.alias}</td>
        <td className="center">{timeout}</td>
        <td>{expression}</td>
        <td>{row.message}</td>
        <td>{unitName}</td>
        <td>{sound}</td>
        <td>{setpoint}</td>
        <td>{status}</td>
        <td>
          <a title="Editar" className="btn-floating blue" href="#" onClick={this.handleOptions()}>
            <i className="material-icons">developer_board</i>
          </a>

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

  handleOptions() {
    let self = this;

    let fn = (json) => {
      self.props.onOptions(json);
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

  createRow() {
    let self = this;

    let fn = (item, index) => {
      return <RowTable key={index} row={item} onGet={self.handleGet()} onDelete={self.handleDelete()} onOptions={self.handleOptions()} />;
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
      rows = <tr><td className="center" colSpan="11">Sin alarmas registradas</td></tr>;
    }

    return (
      <section>
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th>Alias</th>
                <th>Tiempo de Espera</th>
                <th>Expresión</th>
                <th>Mensaje</th>
                <th>Unidad</th>
                <th>Sonido</th>
                <th>Setpoint</th>
                <th>Estado</th>
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
