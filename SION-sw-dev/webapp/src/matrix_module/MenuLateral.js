import React from 'react';

class MatrixMenuLateral extends React.Component {

  componentDidMount() {
    window.$(".button-collapse").sideNav();
  }


  handleCloseMenuLateral() {
    let fn = (evt) => {
      window.$('.button-collapse').sideNav('hide');
    };

    return fn;
  }

  handleMatrices() {
    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
    };

    return fn;
  }

  handleChangeMatrix(value) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

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

    let styleSpan = {
      color: '#888',
      marginLeft: '20px'
    };

    let fn = (item, index) => {
      let key = index = index + 1;

      return (
        <li key={key}>
          <span style={styleSpan}>
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
    };

    return fn;
  }

  render() {
    let o = this.props.o;

    if (!o) {
      o = {
        matrices_: [],
        matrix: {
          name: 'N/A',
          structure: [],
        }
      };
    }

    if (!o.matrix) {
      o.matrix = {
        name: 'N/A',
        structure: [],
      };
    }

    if (!o.matrix.structure) o.matrix.structure = [];

    return (
      <div id="slide-out" className="side-nav bar_matrices">
        <ul className="collapsible" data-collapsible="expandable">
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
          <li>
            <a href="#close" className="btn bottm_right" onClick={this.handleCloseMenuLateral()}>
              <i className="material-icons left">keyboard_arrow_left</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default MatrixMenuLateral;
