import { h, render, Component, options } from 'preact';

import constants from './../constants';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gps_devices_: []
    };
  }

  componentDidMount() {
    let o = this.props.item;
    if (!o) {
      let message = 'No se encontró la información del vehiculo';
      Materialize.toast(message, 2500);
      return;
    }

    let inputAlias = document.querySelector('#input-u-alias');
    let inputLicensePlates = document.querySelector('#input-u-license-plates');
    let inputDescription = document.querySelector('#input-u-description');
    let inputResponsible = document.querySelector('#input-u-responsible');
    let inputNote = document.querySelector('#input-u-note');
    let inputStatus = document.querySelector('#input-u-status');

    inputAlias.value = o.alias;
    inputLicensePlates.value = o.license_plates;
    inputDescription.value = o.description;
    inputResponsible.value = o.responsible;
    inputNote.value = o.note;
    inputStatus.checked = o.status;

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

          let o = this.props.item;
          if(o) {
            let inputGPSDevice = document.querySelector('#input-u-gps-device');
            if (o.gps_device_id) inputGPSDevice.value = o.gps_device_id;
          }

          $('#input-u-gps-device').material_select();
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

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let o = this.props.item;
      if (!o) {
        let message = 'No se encontró la información del vehicle';
        Materialize.toast(message, 2500);
        return;
      }      

      let inputGPSDevice = document.querySelector('#input-u-gps-device');
      let inputAlias = document.querySelector('#input-u-alias');
      let inputLicensePlates = document.querySelector('#input-u-license-plates');
      let inputDescription = document.querySelector('#input-u-description');
      let inputResponsible = document.querySelector('#input-u-responsible');
      let inputNote = document.querySelector('#input-u-note');
      let inputStatus = document.querySelector('#input-u-status');

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
            <h5>Editar Vehiculo</h5>

            <form onSubmit={this.handleUpdate()} >

              <div className="row">

                <div className="col s12 m12" style="margin: 0px 0px 10px 0px;">
                  <select className="browser-default sion-select" id="input-u-gps-device">
                    <option selectev>Dispositivo GPS</option>
                    {state.gps_devices_.map(this.createOpt())}
                    <option value="-1">Ninguno</option>
                  </select>
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-u-alias" placeholder="Alias" />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-u-license-plates" placeholder="Placas" />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-u-description" placeholder="Descripción" />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-u-responsible" placeholder="Responsable" />
                </div>

                <div className="col s12 m4">
                  <input type="text" id="input-u-note" placeholder="Nota" />
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