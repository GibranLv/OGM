import { h, render, Component } from 'preact';

class CardItemVariable extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let variable = this.props.variable;
    let prefix = 'v';
    if (variable.is_custom) prefix = 'cv';

    let units = variable.units;

    let unit_id = variable.unit_id;
    if (unit_id) {
      let exist = false;

      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (unit.id == unit_id) {
          exist = true;
          break;
        }
      }

      let element = `#unit-${prefix}-${variable.id}`;
      if (exist) {
        $(element).val(unit_id);
      } else {
        $(element).val('');
      }
    }

    let element = `#name-${prefix}-${variable.id}`;
    let rename = variable.rename;
    if (rename) {
      $(element).val(rename);
    } else {
      $(element).val('');
    }
  }

  handleRemove() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variable = self.props.variable;
      let value = variable.id;

      let o = {
        variable_id: value,
        is_custom: variable.is_custom
      };

      self.props.onRemove(o);
    }

    return fn;
  }

  handleChangeUnit() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;

      let variable = self.props.variable;

      if (value == '') {
        value = undefined;
      } else {
        value = parseInt(value);
      }

      let o = {
        variable_id: variable.id,
        unit_id: value,
        is_custom: variable.is_custom
      };

      self.props.onChangeUnit(o);
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
    let variable = props.variable;
    let prefix = 'v';
    if (variable.is_custom) prefix = 'cv';

    let units = variable.units;
    if (!units) {
      units = [];
    }

    let unit = `unit-${prefix}-${variable.id}`;
    let nName = `name-${prefix}-${variable.id}`;

    return (
      <div className="col m3">
        <div className="sion-content-variable">
          <div style={{ padding: '0.3rem' }}>
            <table className="responsive-table centered" style={{ width: '100%', fontSize: '0.75rem' }}>
              <tbody>
                <tr>
                  <td colSpan="2">{variable.device}.{variable.name}</td>
                  <td colSpan="1" style="text-align: right !important;">
                    <a href="#" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleRemove()}>
                      <span aria-hidden="true">&times;</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <input id={nName} type="text" placeholder="Nombre" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <select className="browser-default sion-select" id={unit} onChange={this.handleChangeUnit()}>
                      <option selected>Unidad</option>
                      {units.map(this.createOptUnit())}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CardItemVariable;