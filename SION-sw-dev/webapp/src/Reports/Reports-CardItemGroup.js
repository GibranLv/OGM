import React from 'react';
import { isArray } from 'underscore';

import ReportsCardItemVariable from './Reports-CardItemVariable.js';

class ReportsCardItemGroup extends React.Component {

  constructor(props) {
    super(props);

    this.cellRef = React.createRef();
  }

  componentDidMount() {
    let group = this.props.group;

    if (group) {
      let cell = group.cell;
      if (cell) {
        this.cellRef.current.value = cell;
      } else {
        this.cellRef.current.value = '';
      }
    }
  }

  handleSelected() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

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

  handleNextVariable() {
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

      self.props.onNextVariable(s);
    }

    return fn;
  }

  handleBackVariable() {
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

      self.props.onBackVariable(s);
    }

    return fn;
  }

  handleOnNextVariable() {
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

      self.props.onNextVariable(a);
    }

    return fn;
  }

  handleOnBackVariable() {
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

      self.props.onBackVariable(a);
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

  handleChangeRename() {
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

      self.props.onChangeRename(s);
    }

    return fn;
  }

  handleChangeVariableCell() {
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

      self.props.onChangeVariableCell(s);
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

  handleOnChangeRename() {
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

      self.props.onChangeRename(a);
    }

    return fn;
  }

  handleOnChangeVariableCell() {
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

      self.props.onChangeVariableCell(a);
    }

    return fn;
  }

  handleChangeCell() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      let group = self.props.group;
      let id = group.id;

      let s = [];

      let parent = self.props.parent;
      if (parent) {
        s.push(parent);
      }

      s.push(id);
      s.push(value);

      self.props.onChangeGroupCell(s);
    };

    return fn;
  }

  handleOnChangeGroupCell() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;
      let group = self.props.group;
      let id = group.id;

      let s = [];

      let parent = self.props.parent;
      if (parent) {
        s.push(parent);
      }

      s.push(id);
      s.push(value);

      self.props.onChangeGroupCell(s);
    };

    return fn;
  }

  handleOnNext() {
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

      self.props.onNextGroup(a);
    }

    return fn;
  }

  handleOnBack() {
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

      self.props.onBackGroup(a);
    }

    return fn;
  }

  handleNext() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

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

      self.props.onNextGroup(s);
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

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

      self.props.onBackGroup(s);
    };

    return fn;
  }

  createSons() {
    let self = this;

    let group = self.props.group;

    let fn = (son, index) => {
      return <ReportsCardItemGroup key={index} group={son} parent={group.id}
        onSelected={self.handleOnSelected()}
        onDeselected={self.handleOnDeselected()}
        onRemove={self.handleOnRemove()}
        onRemoveVariable={self.handleOnRemoveVariable()}
        onNextVariable={self.handleOnNextVariable()}
        onBackVariable={self.handleOnBackVariable()}
        onChangeUnit={self.handleOnChangeUnit()}
        onChangeRename={self.handleOnChangeRename()}

        onChangeVariableCell={self.handleOnChangeVariableCell()}
        onChangeGroupCell={self.handleOnChangeGroupCell()} />;
    };

    return fn;
  }

  createvariables() {
    let self = this;

    let fn = (variable, index) => {
      return <ReportsCardItemVariable key={index} variable={variable}
        onRemove={self.handleRemoveVariable()}
        onChangeUnit={self.handleChangeUnit()}
        onChangeRename={self.handleChangeRename()}
        onChangeVariableCell={self.handleChangeVariableCell()}
        onNext={self.handleNextVariable()}
        onBack={self.handleBackVariable()} />;
    };

    return fn;
  }

  render() {
    let group = this.props.group;

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

    return (
      <div className={classSelected}>
        <div style={styleContent}>
          <div className="row">
            <div className="col m7 col s7">
              <a href="#name" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleSelected()}>{group.name}</a>
            </div>
            <div className="col m2 col s2">
              <input type="text" placeholder="Celda" style={{margin: '0px'}} ref={this.cellRef} onChange={this.handleChangeCell()} />
            </div>
            <div className="col m1 col s1" style={{ textAlign: 'right !important' }}>
              <a href="#next" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleBack()}>
                <i className="material-icons">keyboard_arrow_left</i>
              </a>
            </div>
            <div className="col m1 col s1" style={{ textAlign: 'right !important' }}>
              <a href="#back" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleNext()}>
                <i className="material-icons">keyboard_arrow_right</i>
              </a>
            </div>
            <div className="col m1 col s1" style={{textAlign: 'right !important'}}>
              <a href="#remove" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleRemove()}>
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

export default ReportsCardItemGroup;