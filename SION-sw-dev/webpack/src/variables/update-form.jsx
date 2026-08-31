import { h, render, Component } from 'preact';

import constants from './../constants';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let o = this.props.item;
    if (!o) {
      let message = 'No se encontró la información de la variable';
      Materialize.toast(message, 2500);
      return;
    }

    let inputName = document.querySelector('#input-u-name');
    let inputAlias = document.querySelector('#input-u-alias');
    let inputDevice = document.querySelector('#input-u-device');
    let inputReadingUnit = document.querySelector('#input-u-reading-unit');
    let inputExpressionInsert = document.querySelector('#input-u-expression-insert');
    let inputStatus = document.querySelector('#input-u-status');

    if (!o.expression_insert) {
      o.expression_insert = '';
    }

    inputName.value = o.name;
    inputAlias.value = o.alias;
    inputDevice.value = o.device;
    inputReadingUnit.value = o.reading_unit;
    inputExpressionInsert.value = o.expression_insert;
    inputStatus.checked = o.status;
  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = this.props.item;
      if (!o) {
        let message = 'No se encontró la información de la variable';
        Materialize.toast(message, 2500);
        return; 
      }

      let inputName = document.querySelector('#input-u-name');
      let inputAlias = document.querySelector('#input-u-alias');
      let inputDevice = document.querySelector('#input-u-device');
      let inputReadingUnit = document.querySelector('#input-u-reading-unit');
      let inputExpressionInsert = document.querySelector('#input-u-expression-insert');
      let inputStatus = document.querySelector('#input-u-status');

      let name = inputName.value.trim();
      let alias = inputAlias.value.trim();
      let device = inputDevice.value.trim();
      let reading_unit = inputReadingUnit.value.trim();
      let expression_insert = inputExpressionInsert.value.trim();
      let status = inputStatus.checked;

      if (!expression_insert) {
        expression_insert = '';
      }

      let json = {};

      json.name = name;
      json.alias = alias;
      json.device = device;
      json.reading_unit = reading_unit;
      json.expression_insert = expression_insert;
      json.status = status;

      self.props.onUpdate(json, o.id);
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

  render(props, state) {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <h5>Editar Variable</h5>

            <form onSubmit={this.handleUpdate()} >

              <div className="row">

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-name" placeholder="Nombre" />
                  <label htmlFor="input-u-name" className="active">Nombre</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-alias" placeholder="Alias" />
                  <label htmlFor="input-u-alias" className="active">Alias</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-device" placeholder="Dispositivo" />
                  <label htmlFor="input-u-device" className="active">Dispositivo</label>
                </div>

                <div className="input-field col s12 m4">
                  <input type="text" id="input-u-reading-unit" placeholder="Unidad de lectura" />
                  <label htmlFor="input-u-reading-unit" className="active">Unidad de lectura</label>
                </div>

                <div className="input-field col s12 m4">
                  <textarea type="text" id="input-u-expression-insert" placeholder="Expresión de Inserción" />
                  <label htmlFor="input-u-expression-insert" className="active">Expresión de Inserción</label>
                </div>

                <div className="col s12 m4">
                  <p>
                    <input type="checkbox" id="input-u-status" />
                    <label htmlFor="input-u-status">Activo</label>
                  </p>
                </div>

                <div className="col s12 m12">
                  <br />
                  <button type="button" className="btn grey darken-3" onClick={this.handleBack()}>Cancelar</button>
                  <button type="submit" className="btn red">Guardar</button>
                </div>                                          

              </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default UpdateForm;
