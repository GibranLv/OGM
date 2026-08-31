import { h, render, Component } from 'preact';
import { isArray } from 'underscore';

import CardItemVariable from './card-item-variable.jsx';

class CardItemGroup extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let group = this.props.group;

    if (group) {
      let elementCell = `#cell-group-${group.id}`;
      let cell = group.cell;
      if (cell) {
        $(elementCell).val(cell);
      } else {
        $(elementCell).val('');
      }

      let elementPage = `#page-group-${group.id}`;
      let page = group.page;
      if (page) {
        $(elementPage).val(page);
      } else {
        $(elementPage).val('');
      }
    }
  }

  handleSelected() {
    let self = this;

    let fn = (evt) => {
      let group = self.props.group;
      let value = group.id;

      let s = [];

      let parent = self.props.parent;
      if (parent) {
        s.push(parent);
      }

      if (value) {
        s.push(value);
      }

      if (group.isSelected) {
        self.props.onDeselected(s);
        return;
      }

      self.props.onSelected(s);
    }

    return fn;
  }

  handleOnSelected() {
    let self = this;

    let fn = (s) => {
      let a = [];

      let parent = self.props.parent;
      if (parent) {
        if (isArray(s)) {
          a.push(parent);
        }
      }

      for (let i = 0; i < s.length; i++) {
        a.push(s[i]);
      }

      self.props.onSelected(a);
    }

    return fn;
  }

  handleOnDeselected() {
    let self = this;

    let fn = (s) => {
      let a = [];

      let parent = self.props.parent;
      if (parent) {
        if (isArray(s)) {
          a.push(parent);
        }
      }

      for (let i = 0; i < s.length; i++) {
        a.push(s[i]);
      }

      self.props.onDeselected(a);
    }

    return fn;
  }

  handleRemove() {
    let self = this;

    let fn = (evt) => {
      let group = self.props.group;
      let value = group.id;

      let s = [];

      let parent = self.props.parent;
      if (parent) {
        s.push(parent);
      }

      if (value) {
        s.push(value);
      }

      self.props.onRemove(s);
    }

    return fn;
  }

  handleOnRemove() {
    let self = this;

    let fn = (s) => {
      let a = [];

      let parent = self.props.parent;
      if (parent) {
        if (isArray(s)) {
          a.push(parent);
        }
      }

      for (let i = 0; i < s.length; i++) {
        a.push(s[i]);
      }

      self.props.onRemove(a);
    }

    return fn;
  }

  handleRemoveVariable() {
    let self = this;

    let fn = (value) => {
      let group = self.props.group;
      let id = group.id;

      let s = [];

      let parent = self.props.parent;
      if (parent) {
        s.push(parent);
      }

      s.push(id);
      s.push(value);

      self.props.onRemoveVariable(s);
    }

    return fn;
  }

  handleOnRemoveVariable() {
    let self = this;

    let fn = (s) => {
      let a = [];

      let parent = self.props.parent;
      if (parent) {
        if (isArray(s)) {
          a.push(parent);
        }
      }

      for (let i = 0; i < s.length; i++) {
        a.push(s[i]);
      }

      self.props.onRemoveVariable(a);
    }

    return fn;
  }

  handleChangeUnit() {
    let self = this;

    let fn = (value) => {
      let group = self.props.group;
      let id = group.id;

      let s = [];

      let parent = self.props.parent;
      if (parent) {
        s.push(parent);
      }

      s.push(id);
      s.push(value);

      self.props.onChangeUnit(s);
    }

    return fn;
  }

  handleOnChangeUnit() {
    let self = this;

    let fn = (s) => {
      let a = [];

      let parent = self.props.parent;
      if (parent) {
        if (isArray(s)) {
          a.push(parent);
        }
      }

      for (let i = 0; i < s.length; i++) {
        a.push(s[i]);
      }

      self.props.onChangeUnit(a);
    }

    return fn;
  }

  createSons() {
    self = this;

    let group = self.props.group;

    let fn = (son, index) => {
      return <CardItemGroup key={index} group={son} parent={group.id}
        onSelected={self.handleOnSelected()}
        onDeselected={self.handleOnDeselected()}
        onRemove={self.handleOnRemove()}
        onRemoveVariable={self.handleOnRemoveVariable()}
        onChangeUnit={self.handleOnChangeUnit()} />;
    };

    return fn;
  }

  createvariables() {
    self = this;

    let group = self.props.group;

    let fn = (variable, index) => {
      return <CardItemVariable key={index} variable={variable}
        onRemove={self.handleRemoveVariable()}
        onChangeUnit={self.handleChangeUnit()} />;
    };

    return fn;
  }

  render(props, state) {
    let group = props.group;

    let sons = group.sons
    if (!sons) {
      sons = [];
    }

    let variables = group.variables;
    if (!variables) {
      variables = [];
    }

    let classSelected = 'sion-border-unselect';
    let styleContent = { padding: '0.5rem' };

    if (group.isSelected) {
      classSelected = 'sion-border-select';
    }

    let nCell = `cell-group-${group.id}`;
    let nPage = `page-group-${group.id}`;

    return (
      <div className={classSelected}>
        <div style={styleContent}>
          <div className="row">
            <div className="col m6 col s6">
              <a href="#" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleSelected()}>{group.name}</a>
            </div>
            <div className="col m2 col s2">
              <input id={nCell} type="text" placeholder="Celda" style="margin: 0px:" />
            </div>
            <div className="col m2 col s2">
              <input id={nPage} type="text" placeholder="Pagina" style="margin: 0px:" />
            </div>
            <div className="col m2 col s2" style="text-align: right !important;">
              <a href="#" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleRemove()}>
                <span aria-hidden="true">&times;</span>
              </a>
            </div>
          </div>
        </div>
        <div className="content-sons" style={{ padding: '0.5rem' }}>
          {sons.map(this.createSons())}
        </div>
        <div className="row">
          {variables.map(this.createvariables())}
        </div>
      </div>
    );
  }
}

export default CardItemGroup;