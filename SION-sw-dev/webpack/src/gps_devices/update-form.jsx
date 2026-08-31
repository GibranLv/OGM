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
      let msg = 'No se encontró la información del dispositivo GPS';
      alert(msg);
      return;
    }

    let inputIMEI = document.querySelector('#input-u-imei');
    let inputPhoneNumber = document.querySelector('#input-u-phone-number');
    let inputStatus = document.querySelector('#input-u-status');

    inputIMEI.value = o.imei;
    inputPhoneNumber.value = o.phone_number;
    inputStatus.checked = o.status;
  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = this.props.item;
      if (!o) {
        let msg = 'No se encontró la información del dispositivo GPS';
        alert(msg);
        return;
      }

      let inputIMEI = document.querySelector('#input-u-imei');
      let inputPhoneNumber = document.querySelector('#input-u-phone-number');
      let inputStatus = document.querySelector('#input-u-status');

      let imei = inputIMEI.value.trim();
      let phone_number = inputPhoneNumber.value.trim();
      let status = inputStatus.checked;

      let json = {};

      json.imei = imei;
      json.phone_number = phone_number;
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
          <div className="col-md-12">
            <h5>Editar Dispositivo GPS</h5>

            <form onSubmit={this.handleUpdate()} >

              <div className="col s12 m4">
                <input type="text" id="input-u-imei" placeholder="IMEI" />
              </div>

              <div className="col s12 m4">
                <input type="text" id="input-u-phone-number" placeholder="Num. Telefonico" />
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

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default UpdateForm;
