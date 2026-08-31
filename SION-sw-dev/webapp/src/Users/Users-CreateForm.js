import React from 'react';

import constants from '../constants';

class UsersCreateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.pwdRef = React.createRef();
    this.emailRef = React.createRef();
    this.nameRef = React.createRef();
    this.typeRef = React.createRef();
  }

  componentDidMount() {
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let username = self.usernameRef.current.value.trim();
      let password = self.passwordRef.current.value.trim();
      let pwd = self.pwdRef.current.value.trim();
      let email = self.emailRef.current.value.trim();
      let name = self.nameRef.current.value.trim();
      let role = self.typeRef.current.value.trim();

      let isEmpty = password === '';
      let isEqual = password === pwd;

      if (isEmpty && !isEqual) {
        let message = 'Las contraseña no coinciden o no son validas';
        window.Materialize.toast(message, 2500);
        return;
      }

      let json = {};

      json.username = username;
      json.password = password;
      json.pwd = pwd;
      json.email = email;
      json.name = name;
      json.role = role;

      self.usernameRef.current.value = '';
      self.passwordRef.current.value = '';
      self.pwdRef.current.value = '';
      self.emailRef.current.value = '';
      self.nameRef.current.value = '';
      self.typeRef.current.value = '';

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
            <form onSubmit={this.handleCreate()} >

              <div className="input-field col s12 m4">
                <input type="text" id="input-c-username" placeholder="Usuario" />
                <label htmlFor="input-c-username" className="active">Usuario</label>
              </div>

              <div className="input-field col s12 m4">
                <input type="password" id="input-c-password" placeholder="Contraseña" />
                <label htmlFor="input-c-password" className="active">Contraseña</label>
              </div>

              <div className="input-field col s12 m4">
                <input type="password" id="input-c-pwd" placeholder="*Contraseña (Confirmar)" />
                <label htmlFor="input-c-pwd" className="active">*Contraseña (Confirmar)</label>
              </div>

              <div className="col s12 m4">
                <select className="browser-default sion-select sion-margin-select" id="input-c-type">
                  <option value="">Rol</option>
                  {constants.ROLES.map(this.createOption())}
                </select>
              </div>

              <div className="input-field col s12 m4">
                <input type="text" id="input-c-name" placeholder="Nombre Completo" />
                <label htmlFor="input-c-name" className="active">Nombre Completo</label>
              </div>

              <div className="input-field col s12 m4">
                <input type="email" id="input-c-email" placeholder="Correo Electrónico" />
                <label htmlFor="input-c-email" className="active">Correo Electrónico</label>
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

export default UsersCreateForm;
