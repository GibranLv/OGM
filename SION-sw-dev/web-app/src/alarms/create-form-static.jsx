import { h, render, Component } from 'preact';
import { isNumber, isNaN } from 'underscore';

import constants from './../constants';

const MESSAGE = 'Alarma ${name} activa en la variable ${variable} con un valor de ${value} a las ${timestamp}';

class CreateFormStatic extends Component {

  constructor(props) {
    super(props);

    this.state = {
      units_: [],

      variables_: [],
    };
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
          window.$('#input-c-unit').material_select();
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
        { alias: 'HiHi', sound: constants.DANGER_VALUE, priority_level: 4 },
        { alias: 'Hi', sound: constants.WARNING_VALUE, priority_level: 3 },
        { alias: 'Lo', sound: constants.WARNING_VALUE, priority_level: 3 },
        { alias: 'LoLo', sound: constants.DANGER_VALUE, priority_level: 4 }
      ];

      let json = [];

      let inputUnit = document.querySelector('#input-c-unit');

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        let alias = item.alias;

        let keyName = `#input-c-name-${alias}`;
        let keyColor = `#input-c-color-${alias}`;
        let keyValue = `#input-c-value-${alias}`;
        let keySetpoint = `#input-c-setpoint-${alias}`;

        let inputName = document.querySelector(keyName);
        let inputColor = document.querySelector(keyColor);
        let inputValue = document.querySelector(keyValue);
        let inputSetpoint = document.querySelector(keySetpoint);

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
          expression = `\${value} >= ${item.value}`;
          items[0].alias = 'ALTA-ALTA';
        }

        if (i === 1) {
          // HiHi
          let valueHiHi = items[0].value;
          // Hi
          expression = `(\${value} >= ${item.value}) and (\${value} < ${valueHiHi})`
          items[1].alias = 'ALTA';
        }

        if (i === 2) {
          // LoLo
          let valueLoLo = items[3].value;
          // Lo
          expression = `(\${value} <= ${item.value}) and (\${value} >  ${valueLoLo})`;
          items[2].alias = 'BAJA';
        }

        if (i === 3) {
          // LoLo
          expression = `\${value} <= ${item.value}`;
          items[3].alias = 'BAJA-BAJA';
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

    let fn = () => {
      self.props.onBack();
    };

    return fn;
  }

  resetForm() {
    let inputUnit = document.querySelector('#input-c-unit');
    inputUnit.value = '';

    let alias = ['HiHi', 'Hi', 'Lo', 'LoLo'];
    for (let i = 0; i < alias.length; i++) {
      const a = alias[i];

      let keyName = `#input-c-name-${a}`;
      let inputName = document.querySelector(keyName);

      let keyValue = `#input-c-value-${a}`;
      let inputValue = document.querySelector(keyValue);

      let keySetpoint = `#input-c-setpoint-${a}`;
      let inputSetpoint = document.querySelector(keySetpoint);

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

  render(props, state) {
    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <h5>Crear Alarma Estatica</h5>

            <form onSubmit={this.handleCreate()} >

              <div className="row">

                <div className="col s12 m3">
                  <select className="browser-default sion-select sion-margin-select" id="input-c-unit">
                    <option selectev>Unidad</option>
                    {state.units_.map(this.createOpt())}
                    <option value="-1">Ninguno</option>
                  </select>
                </div>

              </div>

              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-HiHi" placeholder="Nombre" value="ALTA-ALTA" />
                  <label htmlFor="input-c-name-HiHi" className="active">Nombre (Unico)</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-HiHi" placeholder="Alias" value="ALTA-ALTA" />
                  <label htmlFor="input-c-alias-HiHi" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-HiHi" placeholder="Valor" />
                  <label htmlFor="input-c-value-HiHi" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-HiHi" placeholder="Setpoint" />
                  <label htmlFor="input-c-setpoint-HiHi" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-HiHi" value="#FA0404" placeholder="Color" />
                  <label htmlFor="input-c-color-HiHi" className="active">Color</label>
                </div>

              </div>


              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-Hi" placeholder="Nombre" value="ALTA" />
                  <label htmlFor="input-c-name-Hi" className="active">Nombre (Unico)</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-Hi" placeholder="Alias" value="ALTA" />
                  <label htmlFor="input-c-alias-Hi" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-Hi" placeholder="Valor" />
                  <label htmlFor="input-c-value-Hi" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-Hi" placeholder="Setpoint" />
                  <label htmlFor="input-c-setpoint-Hi" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-Hi" value="#FF9900" placeholder="Color" />
                  <label htmlFor="input-c-color-Hi" className="active">Color</label>
                </div>

              </div>

              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-Lo" placeholder="Nombre" value="BAJA" />
                  <label htmlFor="input-c-name-Lo" className="active">Nombre (Unico)</label>
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-Lo" placeholder="Alias" value="BAJA" />
                  <label htmlFor="input-c-alias-Lo" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-Lo" placeholder="Valor" />
                  <label htmlFor="input-c-value-Lo" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-Lo" placeholder="Setpoint" />
                  <label htmlFor="input-c-setpoint-Lo" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-Lo" value="#FF9900" placeholder="Color" />
                  <label htmlFor="input-c-color-Lo" className="active">Color</label>
                </div>

              </div>

              <div className="row">

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-name-LoLo" placeholder="Nombre" value="BAJA-BAJA" />
                  <label htmlFor="input-c-name-LoLo" className="active">Nombre (Unico)</label> 
                </div>

                <div className="input-field col s12 m3">
                  <input type="text" id="input-c-alias-LoLo" placeholder="Alias" value="BAJA-BAJA"/>
                  <label htmlFor="input-c-alias-LoLo" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-value-LoLo" placeholder="Valor" />
                  <label htmlFor="input-c-value-LoLo" className="active">Valor</label>
                </div>

                <div className="input-field col s12 m2">
                  <input type="text" id="input-c-setpoint-LoLo" placeholder="Setpoint" />
                  <label htmlFor="input-c-setpoint-LoLo" className="active">Setpoint</label>
                </div>

                <div className="input-field col s12 m2">
                  <input className="sion-input-color" type="color" id="input-c-color-LoLo" value="#FA0404" placeholder="Color" />
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

export default CreateFormStatic;
