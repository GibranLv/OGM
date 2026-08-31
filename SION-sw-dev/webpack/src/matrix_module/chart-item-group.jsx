import { h, render, Component } from 'preact';

import ChartViewVariable from './chart-view-variable.jsx';

class ChartItemGroup extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip({ delay: 20 });
  }

  handleOpenDynamicGraphics() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      let son = self.props.son;
      if (son) {
        if (son.type == 'Pozo') {
          if (son.id) {
            let f = self.props.onOpenDynamicGraphicsGroup;
            if (f) f(son.id);
          }
        }
      }
    };

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

  handleOpenComment() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      let group = self.props.son;

      if (group) {
        let o = {
          group_id: group.id,
          name: group.name
        };

        let f = self.props.onOpenCommentGroup;
        if (f) f(o);

        $('#comentarios_macro').modal('open');
      }
    };

    return fn;
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

  createSons() {
    let self = this;

    let fn = (son, index) => {
      return <ChartItemGroup key={index} son={son}
                onOpenDynamicGraphicsGroup={self.handleOpenDynamicGraphicsGroup()}
                onOpenCommentGroup={self.handleOpenCommentGroup()}
                onOpenCommentVariable={self.handleOpenCommentVariable()}
                onChangeSoundVariable={self.handleChangeSoundVariable()} />;
    };

    return fn;
  }

  createvariables() {
    let self = this;

    let fn = (variable, index) => {
      return <ChartViewVariable key={index} variable={variable}
                onOpenCommentVariable={self.handleOpenCommentVariable()}
                onChangeSoundVariable={self.handleChangeSoundVariable()} />;
    };

    return fn;
  }

  render(props, state) {
    let son = props.son;

    let variables = son.variables;
    let sons = son.sons;

    if (!sons) {
      sons = [];
    }

    if (!variables) {
      variables = [];
    }

    let son_comment = 'N/A';
    if (son.comment) {
      son_comment = son.comment;
    }

    let src = '/static/images/pozo.svg';
    if (son.type == 'Macropera') {
      src = '/static/images/macropera.png';
    } else if (son.type == 'Pozo') {
      src = '/static/images/pozo.svg';
    }

    let classActive = '';
    if (sons.length > 0 || variables.length > 0) {
      classActive = 'active';
    }

    return (
      <div className="thumb_matriz">
        <ul className="collapsible collapsible-accordion abuelo" data-collapsible="accordion">
          <li className={classActive}>
            <div className={`collapsible-header flexi ${classActive}`}>
              <div className="col s1 icon">
                <img src={src} width="25" alt={son.type} style="vertical-align: middle;" />
              </div>
              <div className="col s9 txt">{son.name}</div>
              <div className="col s2 actions t_right">
                <a className="tooltipped" href="#"
                    data-position="left"
                    data-delay="20"
                    data-tooltip={son_comment}
                    onClick={this.handleOpenComment()}>
                  <i className="material-icons right">mode_comment</i>
                </a>
                <a href="#" onClick={this.handleOpenDynamicGraphics()}>
                  <i className="material-icons">filter_b_and_w</i>
                </a>
              </div>
            </div>
            <div className="collapsible-body abuelo" style="display: none;">
              {sons.map(this.createSons())}
            </div>
            <div className="collapsible-body padre" style="display: none;">
              <div className="row">
                {variables.map(this.createvariables())}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ChartItemGroup;