import { h, render, Component } from 'preact';

import constants from './../constants';

class CreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    let inputName = document.querySelector('#input-c-name');
    let inputExpression = document.querySelector('#input-c-expression');
    let inputDisplay = document.querySelector('#input-c-display');

    inputName.value = '';
    inputExpression.value = '';
    inputDisplay.value = '';    
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = document.querySelector('#input-c-name');
      let inputExpression = document.querySelector('#input-c-expression');
      let inputDisplay = document.querySelector('#input-c-display');

      let name = inputName.value.trim();
      let expression = inputExpression.value.trim();
      let display = inputDisplay.value.trim();

      let json = {};

      json.name = name;
      json.expression = expression;
      json.display = display;

      self.props.onCreate(json);
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
            <h5>Crear Unidad</h5>

            <form onSubmit={this.handleCreate()} >
              <div className="row">

                <div className="col s12 m4">
                  <input type="text" id="input-c-name" placeholder="Nombre" />
                </div>

                <div className="col s12 m4">
                  <textarea type="text" id="input-c-expression" placeholder={'Expresión Matematica:\n${value}: Valor de la Variable'} />
                </div> 

                <div className="col s12 m4">
                  <input type="text" id="input-c-display" placeholder="Unidad a mostrar" />
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

export default CreateForm;
