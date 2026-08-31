import { h, render, Component } from 'preact';

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

  handleDelete() {
    let self = this;

    let fn = () => {
      let json = self.props.row;
      let name = json.name;

      let message = `¿Desea eliminar el geomapa: ${name}?`;
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
        <td>{row.name}</td>
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

  createRow() {
    let self = this;

    let fn = (item, index) => {
      item.index = index + 1;
      return <RowTable key={item.id} row={item} onGet={self.handleGet()} onDelete={self.handleDelete()} />;
    };

    return fn;
  }

  render() {
    let items = this.props.items;
    let rows = this.state.rows;

    if (items.length > 0) {
      rows = items.map(this.createRow());
    }

    if (!rows) {
      rows = <tr><td className="center" colSpan="3">Sin geomapas registradas</td></tr>;
    }

    return (
      <section>
        <div className="row">
          <table className="responsive-table centered">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default Table;
