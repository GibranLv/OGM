import { h, render, Component } from 'preact';

import ListItemGroupMin from './list-item-group-min.jsx';

class ListView extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 20 });
  }

  handleOpenCommentGroup() {
    let self = this;

    let fn = (group) => {
      if (group) {
        let f = self.props.onOpenCommentGroup;
        if (f) f(group);
      }
    };

    return fn;
  }

  handleOpenCommentVariable() {
    let self = this;

    let fn = (variable) => {
      if (variable) {
        let f = self.props.onOpenCommentVariable;
        if (f) f(variable);
      }
    };

    return fn;
  }

  handleChangeSoundVariable() {
    let self = this;

    let fn = (variable) => {
      if (variable) {
        let f = self.props.onChangeSoundVariable;
        if (f) f(variable);
      }
    };

    return fn;
  }

  handleChartView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onChartView;
      if (f) f();
    }

    return fn;
  }

  handleListView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onListView;
      if (f) f();
    }

    return fn;
  }

  handleTableView() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onTableView
      if (f) f();
    }

    return fn;
  }

  handleTableViewCol() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('.tooltipped').tooltip('remove');

      let f = self.props.onTableViewCol;
      if (f) f();
    }

    return fn;
  }

  handleOpenDynamicGraphicsGroup() {
    let self = this;

    let fn = (group_id) => {
      if (group_id) {
        let f = self.props.onOpenDynamicGraphicsGroup;
        if (f) f(group_id);
      }
    };

    return fn;
  }

  createStructure() {
    let self = this;

    let fn = (son, index) => {
      return <ListItemGroupMin key={index} son={son}
                onOpenDynamicGraphicsGroup={self.handleOpenDynamicGraphicsGroup()}
                onOpenCommentGroup={this.handleOpenCommentGroup()}
                onOpenCommentVariable={this.handleOpenCommentVariable()}
                onChangeSoundVariable={self.handleChangeSoundVariable()} />;
    }

    return fn;
  }

  render(props, state) {
    let s = props.structure;
    if (!s) s = [];

    return (
      <div className="col s12 m12 body_int">
        <div className="fixed-action-btn horizontal click-to-toggle">
          <a className="btn-floating btn-large btn_ttx_rojo pulse">
            <i className="material-icons">visibility</i>
          </a>
          <ul>
            <li onClick={this.handleListView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista Avanzada" href="#">
                <i className="material-icons">view_list</i>
              </a>
            </li>
            <li>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista Clasica" href="#">
                <i className="material-icons">list</i>
              </a>
            </li>
            <li onClick={this.handleTableView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla" href="#">
                <i className="material-icons">view_comfy</i>
              </a>
            </li>
            <li onClick={this.handleTableViewCol()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista en Tabla de Columnas" href="#">
                <i className="material-icons">view_week</i>
              </a>
            </li>
            <li onClick={this.handleChartView()}>
              <a className="btn-floating btn_ttx tooltipped" data-position="top" data-delay="20" data-tooltip="Vista de Grafica" href="#">
                <i className="material-icons">show_chart</i>
              </a>
            </li>
          </ul>
        </div>

        {s.map(this.createStructure())}
      </div>
    );
  }
}


export default ListView;