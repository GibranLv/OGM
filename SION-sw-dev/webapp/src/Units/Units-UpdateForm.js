import React from 'react';

class UnitsUpdateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.nameRef = React.createRef();
    this.expressionRef = React.createRef();
    this.displayRef = React.createRef();
  }

  componentDidMount() {
    let o = this.props.item;
    if (o) {
      let inputName       = this.nameRef.current;
      let inputExpression = this.expressionRef.current;
      let inputDisplay = this.displayRef.current;

      inputName.value = o.name;
      inputExpression.value = o.expression;
      inputDisplay.value = o.display;
    }

  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = self.nameRef.current;
      let inputExpression = self.expressionRef.current;
      let inputDisplay = self.displayRef.current;

      let name = inputName.value.trim();
      let expression = inputExpression.value.trim();
      let display = inputDisplay.value.trim();

      let json = {};

      json.name = name;
      json.expression = expression;
      json.display = display;

      let o = self.props.item;
      if (o) {
        self.props.onUpdate(json, o.id);
      }
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
          <div className="col-md-12">
            <h5>Editar Unidad</h5>

            <form onSubmit={this.handleUpdate()} >
              <div className="row">

                <div className="col s12 m4">
                  <input type="text" id="input-u-name" placeholder="Nombre" ref={this.nameRef} />
                </div>

                <div className="col s12 m4">
                  <textarea type="text" id="input-u-expression" placeholder={'Expresión Matematica:\n${value}: Valor de la Variable'} ref={this.expressionRef} />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-u-display" placeholder="Unidad a mostrar" ref={this.displayRef} />
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

export default UnitsUpdateForm;
