import React, { Component } from "react";
import { isNumber, isNaN } from 'underscore';

import constants from '../constants';

const MESSAGE = 'Alarma ${name} activa en la variable ${variable} con un valor de ${value} a las ${timestamp}';

class AlarmsCreateFormStatic extends Component {

  constructor(props) {
    super(props);

    this.state = {
      units_: [],

      variables_: [],
    };

    this.unitRef = React.createRef();

    this.nameHiHiRef = React.createRef();
    this.colorHiHiRef = React.createRef();
    this.valueHiHiRef = React.createRef();
    this.setpointHiHiRef = React.createRef();

    this.nameHiRef = React.createRef();
    this.colorHiRef = React.createRef();
    this.valueHiRef = React.createRef();
    this.setpointHiRef = React.createRef();

    this.nameLoRef = React.createRef();
    this.colorLoRef = React.createRef();
    this.valueLoRef = React.createRef();
    this.setpointLoRef = React.createRef();

    this.nameLoLoRef = React.createRef();
    this.colorLoLoRef = React.createRef();
    this.valueLoLoRef = React.createRef();
    this.setpointLoLoRef = React.createRef();
  }

  componentDidMount() {
    this.getUnits();
  }

  getUnits() {
    let self = this;

    let url = `${constants.URL_SERVER_UNITS}/list`;

    let xhr = window.$.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.setState({ units_: res.docs }, () => {
          window.$(self.unitRef.current).material_select();
        });

      } else if (response.status === constants.STATUS_ACCEPTED) {
        window.Materialize.toast(res.message, 2500);

      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        window.Materialize.toast(json.message, 2500);
      } else {
        window.Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let items = [
        { alias: 'HiHi', sound: constants.DANGER_VALUE, priority_level: 2 },
        { alias: 'Hi', sound: constants.WARNING_VALUE, priority_level: 1 },
        { alias: 'Lo', sound: constants.WARNING_VALUE, priority_level: 1 },
        { alias: 'LoLo', sound: constants.DANGER_VALUE, priority_level: 2 }
      ];

      let json = [];

      let inputUnit = self.unitRef.current;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        let alias = item.alias;

        let keyName = `name${alias}Ref`;
        let keyColor = `color${alias}Ref`;
        let keyValue = `value${alias}Ref`;
        let keySetpoint = `setpoint${alias}Ref`;

        let inputName = self[keyName].current;
        let inputColor = self[keyColor].current;
        let inputValue = self[keyValue].current;
        let inputSetpoint = self[keySetpoint].current;

        let name = inputName.value.trim();
        let color = inputColor.value.trim();
        let value = inputValue.value.trim();
        let setpoint = inputSetpoint.value.trim();

        if (name === '') {
          let message = `La alarma ${alias} no tiene nombre`;
          window.Materialize.toast(message, 2500);
          return;
        }

        if (value === '') {
          let message = `La alarma ${alias} no tiene valor`;
          window.Materialize.toast(message, 2500);
          return;
        }

        value = parseFloat(value);
        if (isNaN(value) || !isNumber(value)) {
          value = 0;
        }

        setpoint = parseFloat(setpoint);
        if (isNaN(setpoint) || !isNumber(setpoint)) {
          setpoint = 0;
        }

        items[i].name = name;
        items[i].color = color;
        items[i].value = value;
        items[i].setpoint = setpoint;
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        let expression = '';
        if (i === 0) {
          // HiHi
          expression = '${value} >= ' + item.value;
        }

        if (i === 1) {
          // HiHi
          let valueHiHi = items[0].value;
          // Hi
          expression = '(${value} < ' + valueHiHi +') and (${value} >= ' + item.value + ')';
        }

        if (i === 2) {
          // LoLo
          let valueLoLo = items[3].value;
          // Lo
          expression = '(${value} > ' + valueLoLo + ') and (${value} <= ' + item.value + ')';
        }

        if (i === 3) {
          // LoLo
          expression = '${value} <= ' + item.value;
        }

        let unit_id = -1;
        let unit = inputUnit.value.trim();
        if (unit !== '') {
          unit_id = parseInt(unit);
          if (isNaN(unit_id)) unit_id = -1;
          if (!isNumber(unit_id)) unit_id = -1;
        }

        let o = {
          name: item.name,
          alias: item.alias,
          color: item.color,
          expression: expression,
          unit_id: unit_id,
          is_timeout: false,
          timeout: 0,
          message: MESSAGE,
          setpoint: item.setpoint,
          sound: item.sound,
          status: true,
          priority_level: item.priority_level
        };

        json.push(o);
      }

      self.props.onCreate(json, () => {
        self.resetForm();
      });
    };

    return fn;
  }

  handleBack() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      self.props.onBack();
    };

    return fn;
  }

  resetForm() {
    let self = this;

    let inputUnit = self.unitRef.current;
    inputUnit.value = '';

    let alias = ['HiHi', 'Hi', 'Lo', 'LoLo'];
    for (let i = 0; i < alias.length; i++) {
      const a = alias[i];

      let keyName = `name${a}Ref`;
      let inputName = self[keyName].current;

      let keyValue = `value${a}Ref`;
      let inputValue = self[keyValue].current;

      let keySetpoint = `setpoint${a}Ref`;
      let inputSetpoint = self[keySetpoint].current;

      inputName.value = '';
      inputValue.value = '';
      inputSetpoint.value = '';
    }
  }

  createOpt() {
    let fn = (item, index) => {
      return <option key={index} value={item.value}>{item.name}</option>;
    };

    return fn;
  }

  createOptVariable() {
    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.device}.{item.name}</option>;
    };

    return fn;
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <h5>Crear Alarma Estatica</h5>

            <form onSubmit={this.handleCreate()} >

              <div className="row">

                <div className="col s12 m3">
                  <select className="browser-default sion-select sion-margin-select" id="input-c-unit" ref={this.unitRef}>
                    <option selected>Unidad</option>
                    {this.state.units_.map(this.createOpt())}
                    <option value="-1">Ninguno</option>
                  </select>
                </div>

              </div>

              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-HiHi" placeholder="Nombre" value="HiHi" ref={this.nameHiHiRef} />
                  <label htmlFor="input-c-name-HiHi" className="active">Nombre (Unico)</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-HiHi" placeholder="Alias" value={"HiHi"} disabled="disabled" />
                  <label htmlFor="input-c-alias-HiHi" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-HiHi" placeholder="Valor" ref={this.valueHiHiRef} />
                  <label htmlFor="input-c-value-HiHi" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-HiHi" placeholder="Setpoint" ref={this.setpointHiHiRef} />
                  <label htmlFor="input-c-setpoint-HiHi" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-HiHi" value="#FA0404" placeholder="Color" ref={this.colorHiHiRef} />
                  <label htmlFor="input-c-color-HiHi" className="active">Color</label>
                </div>

              </div>


              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-Hi" placeholder="Nombre" value="Hi" ref={this.nameHiRef} />
                  <label htmlFor="input-c-name-Hi" className="active">Nombre (Unico)</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-Hi" placeholder="Alias" value="Hi" disabled="disabled" />
                  <label htmlFor="input-c-alias-Hi" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-Hi" placeholder="Valor" ref={this.valueHiRef} />
                  <label htmlFor="input-c-value-Hi" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-Hi" placeholder="Setpoint" ref={this.setpointHiRef} />
                  <label htmlFor="input-c-setpoint-Hi" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-Hi" value="#FF9900" placeholder="Color" ref={this.colorHiRef} />
                  <label htmlFor="input-c-color-Hi" className="active">Color</label>
                </div>

              </div>

              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-Lo" placeholder="Nombre" value="Lo" ref={this.nameLoRef} />
                  <label htmlFor="input-c-name-Lo" className="active">Nombre (Unico)</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-Lo" placeholder="Alias" value="Lo" disabled="disabled" />
                  <label htmlFor="input-c-alias-Lo" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-Lo" placeholder="Valor" ref={this.valueLoRef} />
                  <label htmlFor="input-c-value-Lo" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-Lo" placeholder="Setpoint" ref={this.setpointLoRef} />
                  <label htmlFor="input-c-setpoint-Lo" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-Lo" value="#FF9900" placeholder="Color" ref={this.colorLoRef} />
                  <label htmlFor="input-c-color-Lo" className="active">Color</label>
                </div>

              </div>

              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-LoLo" placeholder="Nombre" value="LoLo" ref={this.nameLoLoRef} />
                  <label htmlFor="input-c-name-LoLo" className="active">Nombre (Unico)</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-LoLo" placeholder="Alias" value="LoLo" disabled="disabled" />
                  <label htmlFor="input-c-alias-LoLo" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-LoLo" placeholder="Valor" ref={this.valueLoLoRef} />
                  <label htmlFor="input-c-value-LoLo" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-LoLo" placeholder="Setpoint" ref={this.setpointLoLoRef} />
                  <label htmlFor="input-c-setpoint-LoLo" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-LoLo" value="#FA0404" placeholder="Color" ref={this.colorLoLoRef} />
                  <label htmlFor="input-c-color-LoLo" className="active">Color</label>
                </div>

              </div>

              <div className="col s12 m12">
                <br />
                <button type="button" className="btn grey darken-3" onClick={this.handleBack()}>Cancelar</button>
                <button type="submit" className="btn red">Guardar</button>
              </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default AlarmsCreateFormStatic;
