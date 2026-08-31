import { h, render, Component } from 'preact';

import ListViewVariableInlineMin from './list-view-variable-inline-min.jsx';

class ListItemGroupMin extends Component {

  constructor(props) {
    super(props);


    this.state = {
      variable: false,
    }
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

        self.props.onOpenCommentGroup(o);

        $('#comentarios_macro').modal('open');
      }
    };

    return fn;
  }

  handleOpenCommentAdditional() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();


      let variable = self.state.variable;
      if (variable) {
        let name = variable.name;
        if (variable.rename) {
          name = variable.rename;
        }

        let o = {
          variable_id: variable.id,
          is_custom: variable.is_custom,

          name: name,
          device: variable.device
        };

        self.props.onOpenCommentVariable(o);

        $('#comentarios_macro').modal('open');
      }
    };

    return fn;
  }

  handleOpenCommentGrop() {
    let self = this;

    let fn = (group) => {
      if (group) {
        self.props.onOpenCommentGroup(group);
      }
    };

    return fn;
  }

  handleOpenCommentVariable() {
    let self = this;

    let fn = (variable) => {
      if (variable) {
        self.props.onOpenCommentVariable(variable);
      }
    };

    return fn;
  }

  handleChangeSound(variable) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      if (variable) {
        let f = self.props.onChangeSoundVariable;
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

  handleShowOptions() {
    let self = this;

    let fn = (variableIn) => {
      let variable = self.state.variable;
      if (variable && variableIn) {
        let isEqual = variable.id == variableIn.id;
        if (isEqual) {
          self.setState({ variable: false }, () => {
            $('.tooltipped').tooltip({ delay: 20 });
          });

          return;
        }
      }

      self.setState({ variable: variableIn }, () => {
        $('.tooltipped').tooltip({ delay: 20 });
      });
    };

    return fn;
  }

  createSons() {
    let self = this;

    let fn = (son, index) => {
      return <ListItemGroupMin key={index} son={son}
                onOpenDynamicGraphicsGroup={this.handleOpenDynamicGraphicsGroup()}
                onOpenCommentGroup={this.handleOpenCommentGrop()}
                onOpenCommentVariable={this.handleOpenCommentVariable()}
                onChangeSoundVariable={self.handleChangeSoundVariable()} />;
    };

    return fn;
  }

  createvariables() {
    let self = this;

    let fn = (variable, index) => {
      return <ListViewVariableInlineMin key={index} variable={variable} onShowOptions={this.handleShowOptions()} />;
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

    let group_comment = 'N/A';
    if (son.comment) {
      group_comment = son.comment;
    }

    let variable_options = false;
    let variable_name = false;
    let variable_comment = 'N/A';
    let variable_sound_icon = 'volume_up';

    let on_timeout = false;
    let is_ringing = false;

    let vOptions = state.variable;
    if (vOptions) {
      let name = vOptions.name;
      if (vOptions.rename) {
        name = vOptions.rename;
      }

      variable_name = ' - ' + name;

      if (vOptions.on_timeout) {
        on_timeout = vOptions.on_timeout
      }

      if (vOptions.is_ringing) {
        is_ringing = vOptions.is_ringing
      }

      if (vOptions.comment) {
        variable_comment = vOptions.comment
      }

      if (vOptions.mute) {
        variable_sound_icon = 'volume_off';
      } else {
        variable_sound_icon = 'volume_up';
      }

      variable_options = (() => {
        return (
          <div className="actions_var">
            <a hidden={!on_timeout} href="#"><i className="material-icons right">access_time</i></a>
            <a hidden={!is_ringing} href="#" onClick={this.handleChangeSound(vOptions)}>
              <i className="material-icons right">{variable_sound_icon}</i>
            </a>
            <a hidden={true} className="tooltipped" href="#"
              data-position="left"
              data-delay="20"
              data-tooltip={variable_comment}
              onClick={this.handleOpenCommentAdditional()}>
              <i className="material-icons right">insert_comment</i>
            </a>
          </div>
        );
      })();
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
              <div className="col s9 txt">{son.name}{variable_name}</div>
              <div className="col s2 actions t_right">
                <a className="tooltipped" href="#"
                  data-position="left"
                  data-delay="20"
                  data-tooltip={group_comment}
                  onClick={this.handleOpenComment()}>
                  <i className="material-icons right">mode_comment</i>
                </a>
                <a href="#" onClick={this.handleOpenDynamicGraphics()}>
                  <i className="material-icons">filter_b_and_w</i>
                </a>
                {variable_options}
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

export default ListItemGroupMin;