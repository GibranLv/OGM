import { h, render, Component, options } from 'preact';

import constants from './../constants';

class CreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gps_devices_: []
    };
  }

  componentDidMount() {
    this.getGPSDevices();
  }

  getGPSDevices() {
    let self = this;

    let url = `${constants.URL_SERVER_GPS_DEVICES}/list`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ gps_devices_: res.docs }, () => {
          $('#input-c-gps-device').material_select();
        });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });

    xhr.fail((res, status, response) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputGPSDevice = document.querySelector('#input-c-gps-device');
      let inputAlias = document.querySelector('#input-c-alias');
      let inputLicensePlates = document.querySelector('#input-c-license-plates');
      let inputDescription = document.querySelector('#input-c-description');
      let inputResponsible = document.querySelector('#input-c-responsible');
      let inputNote = document.querySelector('#input-c-note');
      let inputStatus = document.querySelector('#input-c-status');

      let gps_device = inputGPSDevice.value.trim();
      let alias = inputAlias.value.trim();
      let license_plates = inputLicensePlates.value.trim();
      let description = inputDescription.value.trim();
      let responsible = inputResponsible.value.trim();
      let note = inputNote.value.trim();
      let status = inputStatus.checked;

      let json = {};

      if (gps_device != '') {
        let vInt = parseInt(gps_device);
        if (vInt) {
          json.gps_device_id = vInt;
        }
      }

      json.alias = alias;
      json.license_plates = license_plates;
      json.description = description;
      json.responsible = responsible;
      json.note = note;
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

  createOpt() {
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.imei}</option>;
    };

    return fn;
  }

  render(props, state) {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <h5>Crear Vehiculo</h5>

            <form onSubmit={this.handleCreate()} >
              <div className="row">

                <div className="col s12 m12" style="margin: 0px 0px 10px 0px;">
                  <select className="browser-default sion-select" id="input-c-gps-device">
                    <option selectev>Dispositivo GPS</option>
                    {state.gps_devices_.map(this.createOpt())}
                    <option value="-1">Ninguno</option>
                  </select>
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-c-alias" placeholder="Alias" />
	              </div>

                <div className="col s12 m4">
                  <input type="text" id="input-c-license-plates" placeholder="Placas" />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-c-description" placeholder="Descripción" />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-c-responsible" placeholder="Responsable" />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-c-note" placeholder="Nota" />
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

              </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default CreateForm;
