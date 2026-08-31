import { h, render, Component } from 'preact';

import Pagination from './../pagination.jsx';

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
      let title = json.title;

      let message = `¿Desea eliminar la operación: ${title}?`;
      let result = window.confirm(message);
      if (result) {
        self.props.onDelete(json);
      }
    };

    return fn;
  }

  render() {
    let row = this.props.row;

    return (
      <tr>
        <td>{row.index}</td>
        <td>{row.group}</td>
        <td>{row.title}</td>
        <td>{row.description}</td>
        <td>{row.created_at_out}</td>
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
      if (f) f(page);
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

  render() {
    let items = this.props.items;
    let total_rows = this.props.total_rows;

    let rows = false;
    let pagination = false;

    if (items.length > 0) {
      rows = items.map(this.createRow());
      pagination = <Pagination total_rows={total_rows} onUpdateItems={this.handleUpdateItems()} />;
    }

    if (!rows) {
      rows = <tr><td className="center" colSpan="6">Sin operaciones registradas</td></tr>;
    }

    return (
      <section>
        <div className="row">
          <table className="responsive-table centered">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Pozo</th>
                <th>Título</th>
                <th>Descripción</th>
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
