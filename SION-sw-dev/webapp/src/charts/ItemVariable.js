import React, { Component } from 'react';
import { isNumber, isNaN } from 'underscore';

class ItemVariable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      units: []
    };

    this.nameRef = React.createRef();
    this.unitRef = React.createRef();
    this.colorRef = React.createRef();
  }

  componentDidMount() {
    let variable = this.props.item;

    let units = variable.units_;
    if (units) {
      this.setState({ units: units }, () => {
        let name = variable.name;
        let color = variable.color;
        let unit_id = variable.unit_id;

        if (!name) name = '';
        if (!color) color = '';
        if (!unit_id) unit_id = '';

        this.nameRef.current.value = name;
        this.colorRef.current.value = color;
        this.unitRef.current.value = unit_id;

        window.$(this.unitRef.current).material_select();
      });
    }
  }

  handleChangeUnit() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let unit_id = -1;

      let value = evt.target.value;
      if (value !== '') {
        unit_id = parseInt(value);

        if (isNaN(unit_id)) unit_id = -1;
        if (!isNumber(unit_id)) unit_id = -1;
      }

      let variable = this.props.item;

      let o = {
        variable_id: variable.id,
        unit_id: unit_id
      };

      self.props.onChangeUnit(o);
    };

    return fn;
  }

  handleChangeName() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      let value = evt.target.value;
      let variable = this.props.item;

      let o = {
        variable_id: variable.id,
        name: value
      };

      self.props.onChangeName(o);
    };

    return fn;
  }

  handleChangeColor() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let value = evt.target.value;
      let variable = this.props.item;

      let o = {
        variable_id: variable.id,
        color: value
      };

      self.props.onChangeColor(o);
    };

    return fn;
  }

  handleDelete() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variable = this.props.item;
      if (variable) {
        if (variable.id) {
          self.props.onDelete(variable.id);
        } else {
          self.props.onRemove(variable.index);
        }
      }
    };

    return fn;
  }

  createOptUnit() {
    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.name}</option>;
    };

    return fn;
  }

  render() {
    let variable = this.props.item;

    return (
      <tr>
        <td style={{'padding': '5px 3px;'}}>
          {variable.device}.{variable.variable_name}
        </td>
        <td style={{'padding': '5px 3px;'}}>
          <select className="browser-default sion-select" ref={this.unitRef} onChange={this.handleChangeUnit()}>
            <option value="" selected>Sin unidad</option>
            {this.state.units.map(this.createOptUnit())}
          </select>
        </td>
        <td style={{'padding': '5px 3px;'}}>
          <input className="sion-input-name" type="text" placeholder="Nombre" ref={this.nameRef} onChange={this.handleChangeName()}/>
        </td>
        <td style={{'padding': '5px 3px;'}}>
          <input className="sion-input-color" type="color" placeholder="Color" ref={this.colorRef} onChange={this.handleChangeColor()} />
        </td>
        <td style={{'padding': '5px 3px;'}}>
          <button type="button" className="btn red" onClick={this.handleDelete()}>
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    )
  }
}

export default ItemVariable;