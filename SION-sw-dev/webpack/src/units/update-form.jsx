import { h, render, Component } from 'preact';

import constants from './../constants';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let o = this.props.item;
    if (o) {
      let inputName       = document.querySelector('#input-u-name');
      let inputExpression = document.querySelector('#input-u-expression');
      let inputDisplay = document.querySelector('#input-u-display');

      inputName.value = o.name;
      inputExpression.value = o.expression;
      inputDisplay.value = o.display;
    }

  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = document.querySelector('#input-u-name');
      let inputExpression = document.querySelector('#input-u-expression');
      let inputDisplay = document.querySelector('#input-u-display');

      let name = inputName.value.trim();
      let expression = inputExpression.value.trim();
      let display = inputDisplay.value.trim();

      let json = {};

      json.name = name;
      json.expression = expression;
      json.display = display;

      let o = this.props.item;
      if (o) {
        self.props.onUpdate(json, o.id);
      }
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
          <div className="col-md-12">
            <h5>Editar Unidad</h5>

            <form onSubmit={this.handleUpdate()} >
              <div className="row">

                <div className="col s12 m4">
                  <input type="text" id="input-u-name" placeholder="Nombre" />
                </div>

                <div className="col s12 m4">
                  <textarea type="text" id="input-u-expression" placeholder={'Expresión Matematica:\n${value}: Valor de la Variable'} />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-u-display" placeholder="Unidad a mostrar" />
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
