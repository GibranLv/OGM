import { h, render, Component } from 'preact';

class MenuLateral extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(".button-collapse").sideNav();
  }


  handleCloseMenuLateral() {
    let self = this;

    let fn = (evt) => {
      $('.button-collapse').sideNav('hide');
    };

    return fn;
  }

  handleMatrices() {
    let self = this;

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
          if (m.id == value) {
            let s = m.structure;

            let f = self.props.onChangeMatrix;
            if (f) f(m, s, 0, 0);

            return;
          }
        }
      }
    };

    return fn;
  }

  handleItemGroup(mi, group) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      let structure = [group];
      let f = self.props.onItemGroup;

      if (f) f(structure, mi);
    };

    return fn;
  }

  handleRestoreMatrix(mi) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = self.props.o;
      if (o) {
        let matrices = o.matrices;
        if (matrices) {
          if (matrices[mi]) {
            let m = matrices[mi];

            if (!m.structure) m.structure = [];

            let structure = m.structure;

            let f = self.props.onRestoreMatrix;
            if (f) f(structure, mi);
          }
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
          <span style="color: #888; margin-left: 20px;">
            <a href="#" onClick={self.handleChangeMatrix(item.id)}>{item.name}</a>
          </span>
        </li>
      );
    };

    return fn;
  }

  createItemGroup(mi) {
    let self = this;

    let fn = (item, index) => {
      if (!item.sons) item.sons = [];

      let key = index = index + 1;
      let image = 'macropera.png';
      let type = item.type;

      if (type == 'Pozo') image = 'pozo.svg';

      return (
        <li key={key}>
          <div className="collapsible-header">
            <div className="col s2">
              <img src={`/static/images/${image}`}
                  width="24" height="24" alt="Icono de Grupo"
                  style="vertical-align: middle;" />
            </div>
            <div className="col s10" onClick={this.handleItemGroup(mi, item)}>
              <span>{item.name}</span>
            </div>
          </div>
          <div className="collapsible-body">
            <ul className="collapsible" data-collapsible="expandable">
              {item.sons.map(this.createItemGroup(mi))}
            </ul>
          </div>
        </li>
      );
    };

    return fn;
  }

  createViewMatrix() {
    let self = this;

    let fn = (matrix, index) => {
      if (!matrix.name) matrix.name = 'N/A';
      if (!matrix.structure) matrix.structure = [];

      return (
        <li>
          <div className="collapsible-header">
            <i className="material-icons" onClick={this.handleRestoreMatrix(index)}>developer_board</i>
            {matrix.name}
          </div>
          <div className="collapsible-body">
            <ul className="collapsible" data-collapsible="expandable">
              {matrix.structure.map(this.createItemGroup(index))}
            </ul>
          </div>
        </li>
      );
    };

    return fn;
  }

  render(props, state) {
    let o = props.o;

    if (!o) {
      o = {
        matrices_: [],
        matrices: []
      };
    }

    if (!o.matrices) o.matrices = [];
    if (!o.matrices_) o.matrices_ = [];

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
          {o.matrices.map(this.createViewMatrix())}
          <li>
            <a href="#" className="btn bottm_right" onClick={this.handleCloseMenuLateral()}>
              <i className="material-icons left">keyboard_arrow_left</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default MenuLateral;
