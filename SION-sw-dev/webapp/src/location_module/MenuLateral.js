import React from 'react';

class LocationMenuLateral extends React.Component {

  componentDidMount() {
    window.$(".button-collapse").sideNav();
  }

  handleCloseMenuLateral() {
    let fn = (evt) => {
      evt.preventDefault();

      window.$('.button-collapse').sideNav('hide');
    };

    return fn;
  }

  handleChangeMatrix(value) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = self.props.o;
      if (o) {
        let matrices = o.matrices_;
        if (!matrices) matrices = [];

        for (let i = 0; i < matrices.length; i++) {
          let m = matrices[i];
          if (m.id === value) {
            let s = m.structure;

            let f = self.props.onChangeMatrix;
            if (f) f(m, s);
            return;
          }
        }
      }
    };

    return fn;
  }

  handleItemGroup(group) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      let structure = [group];
      let f = self.props.onItemGroup;
      if (f) f(structure);
    };

    return fn;
  }

  handleRestoreMatrix() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = self.props.o;
      if (o) {
        let m = o.matrix;
        if (m) {
          if (!m.structure) m.structure = [];
          let structure = m.structure;

          let f = self.props.onRestoreMatrix;
          if (f) f(structure);
        }
      }
    };

    return fn;
  }

  createItemMatrix() {
    let self = this;

    let fn = (item, index) => {
      let key = index = index + 1;

      return (
        <li key={key}>
          <span style={{color: '#888', marginLeft: '20px'}}>
            <a href="#item-matrix" onClick={self.handleChangeMatrix(item.id)}>{item.name}</a>
          </span>
        </li>
      );
    };

    return fn;
  }

  createItemGroup() {
    let fn = (item, index) => {
      if (!item.sons) item.sons = [];

      let key = index = index + 1;
      let image = 'macropera.png';
      let type = item.type;

      if (type === 'Pozo') image = 'pozo.svg';

      return (
        <li key={key}>
          <div className="collapsible-header">
            <div className="col s2">
              <img src={`/static/images/${image}`}
                width="24" height="24" alt="Icono de Grupo"
                style={{verticalAlign: 'middle'}} />
            </div>
            <div className="col s10" onClick={this.handleItemGroup(item)}>
              <span>{item.name}</span>
            </div>
          </div>
          <div className="collapsible-body">
            <ul className="collapsible" data-collapsible="expandable">
              {item.sons.map(this.createItemGroup())}
            </ul>
          </div>
        </li>
      );
    }

    return fn;
  }

  getViewMatrix(o) {
    if (!o) return;

    if (!o.matrix) return;

    if (!o.matrix.structure) o.matrix.structure = [];

    return (
      <li>
        <div className="collapsible-header">
          <i className="material-icons" onClick={this.handleRestoreMatrix()}>developer_board</i>
          {o.matrix.name}
        </div>
        <div className="collapsible-body">
          <ul className="collapsible" data-collapsible="expandable">
            {o.matrix.structure.map(this.createItemGroup())}
          </ul>
        </div>
      </li>
    );
  }

  render() {
    let o = this.props.o;

    if (!o) o = { matrices_: [] };
    if (!o.matrices_) o.matrices_ = [];

    return (
      <ul id="slide-out" className="side-nav collapsible" data-collapsible="expandable">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="/static/images/sidebar.jpg" alt="Imagen" />
            </div>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons">developer_board</i> Matrices
          </div>
          <div className="collapsible-body">
            <ul className="collapsible" data-collapsible="expandable">
              {o.matrices_.map(this.createItemMatrix())}
            </ul>
          </div>
        </li>
        <li>
          <br />
        </li>
        {this.getViewMatrix()}
        <li>
          <a href="#close" className="btn bottm_right" id="close_side" onClick={this.handleCloseMenuLateral()}>
            <i className="material-icons left">keyboard_arrow_left</i>
          </a>
        </li>
      </ul>
    );
  }
}

export default LocationMenuLateral;