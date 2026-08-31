import { h, render, Component } from 'preact';
import { isNumber, isNaN } from 'underscore';

class ItemVariable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      units: []
    };
  }

  componentDidMount() {
    let variable = this.props.item;

    let units = variable.units_;
    if (units) {
      this.setState({ units: units }, () => {
        let index = variable.index;
        let name = variable.name;
        let color = variable.color;
        let unit_id = variable.unit_id;

        let prefix = '';
        if (variable.is_custom) prefix = 'cv-';

        let keyUnit = `#input-unit-${prefix}${index}`;
        $(keyUnit).val(unit_id);

        let keyName = `#input-name-${prefix}${index}`;
        $(keyName).val(name);

        let keyColor = `#input-color-${prefix}${index}`;
        $(keyColor).val(color);

        $(keyUnit).material_select();
      });
    }
  }

  handleChangeUnit() {
    let self = this;

    let fn = (evt) => {
      let unit_id = -1;

      let value = evt.target.value;
      if (value != '') {
        unit_id = parseInt(value);

        if (isNaN(unit_id)) unit_id = -1;
        if (!isNumber(unit_id)) unit_id = -1;
      }

      let variable = this.props.item;

      let o = {
        index: variable.index,
        unit_id: unit_id
      };

      self.props.onChangeUnit(o);
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
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.name}</option>;
    };

    return fn;
  }

  render(props, state) {
    let variable = props.item;

    let prefix = '';
    if (variable.is_custom) prefix = 'cv-';

    let keyName = `input-name-${prefix}${variable.index}`;
    let keyColor = `input-color-${prefix}${variable.index}`;
    let keyUnit = `input-unit-${prefix}${variable.index}`;

    return (
      <tr>
        <td style="padding: 5px 3px;">
          {variable.device}.{variable.variable_name}
        </td>
        <td style="padding: 5px 3px;">
          <select className="browser-default sion-select" id={keyUnit} onChange={this.handleChangeUnit()}>
            <option value="" selected>Sin unidad</option>
            {state.units.map(this.createOptUnit())}
          </select>
        </td>
        <td style="padding: 5px 3px;">
          <input id={keyName} className="sion-input-name" type="text" placeholder="Nombre" />
        </td>
        <td style="padding: 5px 3px;">
          <input id={keyColor} className="sion-input-color" type="color" placeholder="Color" />
        </td>
        <td style="padding: 5px 3px;">
          <button type="button" className="btn red" onClick={this.handleDelete()}>
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    )
  }
}

export default ItemVariable;