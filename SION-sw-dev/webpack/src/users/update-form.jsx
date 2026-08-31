import { h, render, Component } from 'preact';

import constants from './../constants';

class UpdateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let o = this.props.item;
    if (o) {
      let inputUsername = document.querySelector('#input-u-username');
      let inputEmail = document.querySelector('#input-u-email');
      let inputName = document.querySelector('#input-u-name');
      let inputRole = document.querySelector('#input-u-type');

      inputUsername.value = o.username;
      inputEmail.value = o.email;
      inputName.value = o.name;
      inputRole.value = o.role;
    }
  }

  handleUpdate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputUsername = document.querySelector('#input-u-username');
      let inputEmail = document.querySelector('#input-u-email');
      let inputName = document.querySelector('#input-u-name');
      let inputRole = document.querySelector('#input-u-type');

      let username = inputUsername.value.trim();
      let email = inputEmail.value.trim();
      let name = inputName.value.trim();
      let role = inputRole.value.trim();

      let json = {};

      json.username = username;
      json.email = email;
      json.name = name;
      json.role = role;

      let o = this.props.item;
      if (o) {
        inputUsername.value = '';
        inputEmail.value = '';
        inputName.value = '';
        inputRole.value = '';

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

export default UpdateForm;
