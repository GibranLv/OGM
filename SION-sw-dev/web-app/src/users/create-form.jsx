import { h, render, Component } from 'preact';

import constants from './../constants';

class CreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputUsername = document.querySelector('#input-c-username');
      let inputPassword = document.querySelector('#input-c-password');
      let inputPwd = document.querySelector('#input-c-pwd');
      let inputEmail = document.querySelector('#input-c-email');
      let inputName = document.querySelector('#input-c-name');
      let inputRole = document.querySelector('#input-c-type');

      let username = inputUsername.value.trim();
      let password = inputPassword.value.trim();
      let pwd = inputPwd.value.trim();
      let email = inputEmail.value.trim();
      let name = inputName.value.trim();
      let role = inputRole.value.trim();

      let isEmpty = password == '';
      let isEqual = password === pwd;

      if (isEmpty && !isEqual) {
        let message = 'Las contraseña no coinciden o no son validas';
        Materialize.toast(message, 2500);
        return; 
      }

      let json = {};

      json.username = username;
      json.password = password;
      json.pwd = pwd;
      json.email = email;
      json.name = name;
      json.role = role;

      inputUsername.value = '';
      inputPassword.value = '';
      inputPwd.value = '';
      inputEmail.value = '';
      inputName.value = '';
      inputRole.value = '';

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
      if (USER_ROLE == value) {
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

  render(props, state) {
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

export default CreateForm;
