import { h, render, Component } from 'preact';

import constants from './constants.js';

class LoginContent extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleLogin() {
    let fn = (evt) => {
      evt.preventDefault();

      let inputUsername = document.querySelector('#input-username');
      let inputPassword = document.querySelector('#input-password');

      let username = inputUsername.value.trim();
      let password = inputPassword.value.trim();

      if (username == "" || password == "") return;

      let json = {
        username: username,
        password: password
      };

      this.login(json);
    };

    return fn;
  }

  login(json) {
    let xhr = $.ajax({
      url: `${constants.URL_SERVER_AUTH}/login`,
      type: constants.METHOD_POST,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json),
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        location.href = '/';
      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 4000)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 4000);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });
  }

  render() {
    return (
      <div className="login animated fadeIn">
        <div className="login_body hoverable">
          <form onSubmit={this.handleLogin()}>
            <div className="logointro">
              <img src="/static/images/logo_ttx_black.svg" alt="Logo" />
				    </div>
            <div className="form-group">
              <label htmlFor="input-username">Usuario / Correo electrónico</label>
              <input type="text" className="form-control" id="input-username" placeholder="Usuario / Correo electrónico" />
            </div>
            <div className="form-group">
              <label htmlFor="input-password">Contraseña</label>
              <input type="password" className="form-control" id="input-password" placeholder="Contraseña" />
            </div>
            <button type="submit" className="margin_top btn btn_ttx_flat waves-effect">
              Iniciar sesión
            </button>
            <p class="t_right" style="color: #777;">O&GM v4 ™</p>
			    </form>
        </div>
      </div>
    );
  }
}

render(<LoginContent />, document.getElementById('content-main'));
