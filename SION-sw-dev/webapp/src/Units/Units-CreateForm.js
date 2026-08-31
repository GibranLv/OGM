import React from 'react';

class UnitsCreateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.nameRef = React.createRef();
    this.expressionRef = React.createRef();
    this.displayRef = React.createRef();
  }

  componentDidMount() {
    let inputName = this.nameRef.current;
    let inputExpression = this.expressionRef.current;
    let inputDisplay = this.displayRef.current;

    inputName.value = '';
    inputExpression.value = '';
    inputDisplay.value = '';
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = this.nameRef.current;
      let inputExpression = this.expressionRef.current;
      let inputDisplay = this.displayRef.current;

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

    let fn = (evt) => {
      evt.preventDefault();

      self.props.onBack();
    };

    return fn;
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <h5>Crear Unidad</h5>

            <form onSubmit={this.handleCreate()} >
              <div className="row">

                <div className="col s12 m4">
                  <input type="text" id="input-c-name" placeholder="Nombre" ref={this.nameRef} />
                </div>

                <div className="col s12 m4">
                  <textarea type="text" id="input-c-expression" placeholder={"Expresión Matematica:\n${value}: Valor de la Variable"} ref={this.expressionRef} />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-c-display" placeholder="Unidad a mostrar" ref={this.displayRef} />
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

export default UnitsCreateForm;
