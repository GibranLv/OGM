import { h, render, Component, options } from 'preact';

import constants from './../constants';

class CreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputIMEI = document.querySelector('#input-c-imei');
      let inputPhoneNumber = document.querySelector('#input-c-phone-number');
      let inputStatus = document.querySelector('#input-c-status');

      let imei = inputIMEI.value.trim();
      let phone_number = inputPhoneNumber.value.trim();
      let status = inputStatus.checked;

      let json = {};

      json.imei = imei;
      json.phone_number = phone_number;
      json.status = status;

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
            <h5>Crear Dispositivo GPS</h5>

            <form onSubmit={this.handleCreate()} >

              <div className="col s12 m4">
                <input type="text" id="input-c-imei" placeholder="IMEI" />
              </div>

              <div className="col s12 m4">
                <input type="text" id="input-c-phone-number" placeholder="Num. Telefonico" />
              </div>

              <div className="col s12 m4">
                <p>
                  <input type="checkbox" id="input-c-status" />
                  <label htmlFor="input-c-status">Activo</label>
                </p>
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

export default CreateForm;
