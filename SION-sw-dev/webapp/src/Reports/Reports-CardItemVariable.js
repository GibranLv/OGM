import React from 'react';

class ReportsCardItemVariable extends React.Component {

  constructor(props) {
    super(props);

    this.renameRef = React.createRef();
    this.cellRef = React.createRef();
    this.unitRef = React.createRef();
  }

  componentDidMount() {
    let variable = this.props.variable;

    let units = variable.units;

    let unit_id = variable.unit_id;
    if (unit_id) {
      let exist = false;

      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (unit.id === unit_id) {
          exist = true;
          break;
        }
      }

      if (exist) {
        this.unitRef.current.value = unit_id;
      } else{
        this.unitRef.current.value = '';
      }
    }

    let rename = variable.rename;
    if (rename) {
      this.renameRef.current.value = rename;
    } else {
      this.renameRef.current.value = '';
    }

    let cell = variable.cell;
    if (cell) {
      this.cellRef.current.value = cell;
    } else {
      this.cellRef.current.value = '';
    }
  }

  componentDidUpdate(prevProps) {
    let self = this;

    let variable = prevProps.variable;
    let variableIn = this.props.variable;

    if (variable && variableIn) {
      if (variable.id !== variableIn.id) {

        self.unitRef.current.value = '';
        self.renameRef.current.value = '';
        self.cellRef.current.value = '';

        let unit_id = variableIn.unit_id;
        if (unit_id) {
          self.unitRef.current.value = unit_id;
        }

        let rename = variableIn.rename;
        if (rename) {
          self.renameRef.current.value = rename;
        }

        let cell = variableIn.cell;
        if (cell) {
          self.cellRef.current.value = cell;
        }
      }
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

  handleNext() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variable = self.props.variable;
      let value = variable.id;

      let o = {
        variable_id: value,
        is_custom: variable.is_custom
      };

      self.props.onNext(o);
    }

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variable = self.props.variable;
      let value = variable.id;

      let o = {
        variable_id: value,
        is_custom: variable.is_custom
      };

      self.props.onBack(o);
    }

    return fn;
  }

  handleChangeUnit() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;

      let variable = self.props.variable;

      if (value === '') {
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

  handleChangeRename() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;

      let variable = self.props.variable;

      if (value === '') value = undefined;

      let o = {
        variable_id: variable.id,
        rename: value,
        is_custom: variable.is_custom
      };

      self.props.onChangeRename(o);
    };

    return fn;
  }

  handleChangeCell() {
    let self = this;

    let fn = (evt) => {
      let value = evt.target.value;

      let variable = self.props.variable;
      if (value === '') value = undefined;

      let o = {
        variable_id: variable.id,
        cell: value,
        is_custom: variable.is_custom
      };

      self.props.onChangeVariableCell(o);
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
    let variable = this.props.variable;
    let units = variable.units;
    if (!units) {
      units = [];
    }

    return (
      <div className="col m3">
        <div className="sion-content-variable">
          <div style={{ padding: '0.3rem' }}>
            <table className="responsive-table centered" style={{ width: '100%', fontSize: '0.75rem' }}>
              <tbody>
                <tr>
                  <td colSpan="2">{variable.device}.{variable.name}</td>
                  <td colSpan="1" style={{ textAlign: 'right !important' }}>
                    <a href="#next" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleBack()}>
                      <i className="material-icons">keyboard_arrow_left</i>
                    </a>
                  </td>
                  <td colSpan="1" style={{ textAlign: 'right !important' }}>
                    <a href="#next" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleNext()}>
                      <i className="material-icons">keyboard_arrow_right</i>
                    </a>
                  </td>
                  <td colSpan="1" style={{ textAlign: 'right !important' }}>
                    <a href="#remove" className="waves-effect waves-teal btn-flat sion-link" onClick={this.handleRemove()}>
                      <span aria-hidden="true">&times;</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <input type="text" placeholder="Nombre" ref={this.renameRef} onChange={this.handleChangeRename()} />
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <select className="browser-default sion-select" ref={this.unitRef} onChange={this.handleChangeUnit()}>
                      <option selected>Unidad</option>
                      {units.map(this.createOptUnit())}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <input type="text" placeholder="Celda" ref={this.cellRef} onChange={this.handleChangeCell()} />
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

export default ReportsCardItemVariable;