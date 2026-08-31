import React, { Component } from 'react';

import constants from '../constants';

class GroupsCreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: false,
    };

    this.nameRef = React.createRef();
    this.typeRef = React.createRef();
    this.latitudeRef = React.createRef();
    this.longitudeRef = React.createRef();
  }

  componentDidMount() {
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = this.nameRef.current;
      let inputType = this.typeRef.current;
      let inputLatitude = this.latitudeRef.current;
      let inputLongitude = this.longitudeRef.current;

      let name      = inputName.value.trim();
      let type      = inputType.value.trim();
      let latitude  = inputLatitude.value.trim();
      let longitude = inputLongitude.value.trim();

      let json = {};

      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);

      if (!latitude) {
        latitude = 0;
      }

      if (!longitude) {
        longitude = 0;
      }

      json.name = name;
      json.type = type;
      json.latitude = latitude;
      json.longitude = longitude;

      let formData = new FormData();
      let file = self.state.file;
      if (file) {
        formData.append(constants.MARKER_ICON, file);
      }

      formData.append('json', JSON.stringify(json));

      self.props.onCreate(formData);
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

  handleChangeFile() {
    let self = this;

    let fn = (evt) => {
      let file = evt.target.files[0];
      if (file) {
        if (file.type !== 'image/png') {
          let message = 'Formato invalido';
          window.Materialize.toast(message, 2500);
          return;
        }

        if (file.size > 10000) {
          let message = 'La imagen excede el tamaño';
          window.Materialize.toast(message, 2500);
          return;
        }

        self.state.file = file;
      }
    };

    return fn;
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <form onSubmit={this.handleCreate()} >

              <div className="col s12 m4">
                <input type="text" id="input-c-name" placeholder="Nombre" ref={this.nameRef} />
              </div>

              <div className="col s12 m4">
                <input type="text" id="input-c-type" placeholder="Tipo" ref={this.typeRef} />
              </div>

              <div className="col s12 m2">
                <input type="text" id="input-c-latitude" placeholder="Latitud" ref={this.latitudeRef} />
              </div>

              <div className="col s12 m2">
                <input type="text" id="input-c-longitude" placeholder="Longitud" ref={this.longitudeRef} />
              </div>

              <div className="col s12 m12">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Imagen ~75 x 75 px (.png) 10kb</span>
                    <input type="file" id="input-c-marker-icon" lang="es" onChange={this.handleChangeFile()} />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
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

export default GroupsCreateForm;
