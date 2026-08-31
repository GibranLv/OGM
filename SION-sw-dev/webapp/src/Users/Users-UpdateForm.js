import React from 'react';

import constants from '../constants';

class UsersUpdateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.usernameRef = React.createRef();
    this.emailRef = React.createRef();
    this.nameRef = React.createRef();
    this.typeRef = React.createRef();
  }

  componentDidMount() {
    let o = this.props.item;
    if (o) {
      this.usernameRef.current.value = o.username;
      this.emailRef.current.value = o.email;
      this.nameRef.current.value = o.name;
      this.typeRef.current.value = o.role;
    }
  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let username = self.usernameRef.current.value.trim();
      let email = self.emailRef.current.value.trim();
      let name = self.nameRef.current.value.trim();
      let role = self.typeRef.current.value.trim();

      let json = {};

      json.username = username;
      json.email = email;
      json.name = name;
      json.role = role;

      let o = this.props.item;
      if (o) {
        self.usernameRef.current.value = '';
        self.emailRef.current.value = '';
        self.nameRef.current.value = '';
        self.typeRef.current.value = '';

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

  createOption() {
    let stop = 0;
    for (let i = 0; i < constants.ROLES.length; i++) {
      const value = constants.ROLES[i];
      if (window.USER_ROLE === value) {
        stop = i;
        break;
      }
    }

    let fn = (value, index) => {
      if (index < stop) return;

      return (
        <option key={index} value={value}>{value}</option>
      );
    };

    return fn;
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="col s12 m12">
            <form onSubmit={this.handleUpdate()} >

              <div className="row">
                <div className="input-field col s12 m6">
                  <input type="text" id="input-u-username" placeholder="Usuario" />
                  <label htmlFor="input-u-username" className="active">Usuario</label>
                </div>

                <div className="col s12 m6">
                  <select className="browser-default sion-select sion-margin-select" id="input-u-type">
                    <option value="">Rol</option>
                    {constants.ROLES.map(this.createOption())}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m6">
                  <input type="text" id="input-u-name" placeholder="Nombre Completo" />
                  <label htmlFor="input-u-name" className="active">Nombre Completo</label>
                </div>

                <div className="input-field col s12 m6">
                  <input type="email" id="input-u-email" placeholder="Correo Electrónico" />
                  <label htmlFor="input-u-email" className="active">Correo Electrónico</label>
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

export default UsersUpdateForm;
