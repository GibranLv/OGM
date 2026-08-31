import { h, render, Component } from 'preact';

import Header from './../header.jsx';
import constants from './../constants.js';

const MODULES = [
  { id: constants.MATRIX_MODULE, name: 'Matriz de Variable' },
  { id: constants.GRAPHIC_MODULE, name: 'Gráficas' },
  { id: constants.REPORTS_MODULE, name: 'Reportes' },
  { id: constants.OPERATIONS_MODULE, name: 'Operaciones' },
  { id: constants.EVENTS_MODULE, name: 'Eventos' },
  { id: constants.LOCATION_MODULE, name: 'Ubicación' },
  { id: constants.LOCATOR_MODULE, name: 'Localización' },
  { id: constants.EXPLORER_MODULE, name: 'Explorador' },
  { id: constants.CONFIGURATION_MODULE, name: 'Configuración' },
  { id: constants.PROFILE_MODULE, name: 'Perfil' },
];

const RTS = [
  { id: constants.RT_WS, name: 'WS' },
  { id: constants.RT_HTTP, name: 'HTTP' },
];

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],

      matrices_: [],

      file: false,
      avatar: false,
    };
  }

  componentDidMount() {
    let self = this;

    this.getNotifications();

    this.getMatrices((message, matrices) => {
      if (message) {
        Materialize.toast(message, 4000);

        this.getProfile();
        return;
      }

      self.setState({ matrices_: matrices }, () => {
        self.getProfile();
        self.getConfiguration();
      });
    });
  }

  /* Notificaciones */

  getNotifications() {
    let self = this;

    let url = `${constants.URL_SERVER_LOG_EVENTS}/notifications?is_seen=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ notifications_: res.docs });

      } else if (response.status == constants.STATUS_ACCEPTED) {
        alert(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        alert(json.message);
      } else {
        alert(constants.MESSAGE_ERROR);
      }
    });
  }

  updateEventAsSeen(id) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_LOG_EVENTS}/notifications/${id}`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        console.log('Notificación Ok');

      } else if (response.status == constants.STATUS_ACCEPTED) {
        alert(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        alert(json.message);
      } else {
        alert(constants.MESSAGE_ERROR);
      }
    });
  }

  handleRemoveNotification() {
    let self = this;

    let fn = (id) => {
      let notifications = self.state.notifications_;
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (id == notification.id) {
          self.updateEventAsSeen(id);

          notifications.splice(i, 1);

          self.setState({ notifications_: notifications });
          return;
        }
      }
    };

    return fn;
  }

/* Notificaciones */

  getMatrices(fn) {
    let self = this;

    let url = `${constants.URL_SERVER_MATRICES}/list?with_structure=false&with_structure_json=false`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        fn(null, res.docs);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        fn(res.message);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        fn(json.message);
      } else {
        fn(constants.MESSAGE_ERROR);
      }
    });
  }

  getProfile() {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_USERS}/profile`,
      type: constants.METHOD_GET,
      dataType: constants.JSON
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.updateUserView(res.doc);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 4000)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 4000)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });
  }

  getConfiguration() {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_USERS}/configuration`,
      type: constants.METHOD_GET,
      dataType: constants.JSON
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.updateConfigView(res.doc);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 4000);

      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 4000)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });
  }

  updateProfile(formData) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_USERS}/profile`,
      type: constants.METHOD_PUT,
      processData: false,
      contentType: false,
      data: formData,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        Materialize.toast(constants.MESSAGE_SAVED_OK, 2500);

        let profile = res.doc;
        if (profile) {
          self.setState({ avatar: profile.avatar }, () => {
            let image = document.querySelector('#image-avatar');
            image.src = `/static/images/avatars/${profile.avatar}`;

            $('#btn-update-avatar').css({ border: '2px solid #8c8c8c' });
          });
        }

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 4000);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 4000)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });
  }

  updateConfiguration(json) {
    let self = this;

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_USERS}/configuration`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json)
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        Materialize.toast(constants.MESSAGE_SAVED_OK, 2500);

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 4000);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 4000)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 4000);
      }
    });
  }

  handleUploadAvatar() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.state.file;
      if (file) {
        let formData = new FormData();
        formData.append('avatar', file);

        self.updateProfile(formData);
      }
    };

    return fn;
  }

  handleChangeFile() {
    let self = this;

    let fn = (evt) => {
      let file = evt.target.files[0];
      if (file) {
        self.setState({ file: file }, () => {
          let image = document.querySelector('#image-avatar');
          image.src = window.URL.createObjectURL(file);
          $('#btn-update-avatar').css({ border: '2px solid green' });
        })
      }
    };

    return fn;
  }

  handleUpdateUser() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = document.querySelector('#input-u-name');
      let inputJob = document.querySelector('#input-u-job');
      let inputEmail = document.querySelector('#input-u-email');
      let inputCompany = document.querySelector('#input-u-company');
      let inputPhone = document.querySelector('#input-u-phone');

      let o = {};

      let name = inputName.value.trim();
      if (name != '') o.name = name;

      let job = inputJob.value.trim();
      if (job != '') o.job = job;

      let email = inputEmail.value.trim();
      if (email != '') o.email = email;

      let company = inputCompany.value.trim();
      if (company != '') o.company = company;

      let phone = inputPhone.value.trim();
      if (phone != '') o.phone = phone;

      let formData = new FormData();
      formData.append('json', JSON.stringify(o));

      self.updateProfile(formData);
    };

    return fn;
  }

  handleUpdateConfiguration() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputModule = document.querySelector('#input-u-module');
      let inputMatrix = document.querySelector('#input-u-matrix');
      let inputRT = document.querySelector('#input-u-rt');
      let inputCommentColumn = document.querySelector('#input-u-comment-column');

      let main_module = inputModule.value.trim();
      let main_matrix = inputMatrix.value.trim();
      let rt = inputRT.value.trim();
      let comment_column = inputCommentColumn.value.trim();

      main_module = parseInt(main_module);
      main_matrix = parseInt(main_matrix);
      rt = parseInt(rt);

      if (comment_column === '1') {
        comment_column = true;
      } else {
        comment_column = false;
      }

      let o = {
        main_module: main_module,
        main_matrix: main_matrix,
        rt: rt,
        comment_column: comment_column
      };

      self.updateConfiguration(o);
    };

    return fn;
  }

  updateUserView(user) {
    let inputUsername = document.querySelector('#input-u-username');
    let inputRole = document.querySelector('#input-u-role');
    let inputName = document.querySelector('#input-u-name');
    let inputJob = document.querySelector('#input-u-job');
    let inputEmail = document.querySelector('#input-u-email');
    let inputCompany = document.querySelector('#input-u-company');
    let inputPhone = document.querySelector('#input-u-phone');

    if (!user.job) user.job = '';
    if (!user.company) user.company = '';
    if (!user.phone) user.phone = '';

    if (inputUsername) inputUsername.value = user.username;
    if (inputRole) inputRole.value = user.role;
    if (inputName) inputName.value = user.name;
    if (inputJob) inputJob.value = user.job;
    if (inputEmail) inputEmail.value = user.email;
    if (inputCompany) inputCompany.value = user.company;
    if (inputPhone) inputPhone.value = user.phone;

    this.setState({ avatar: user.avatar });
  }

  updateConfigView(config) {
    let inputModule = document.querySelector('#input-u-module');
    let inputMatrix = document.querySelector('#input-u-matrix');
    let inputRT = document.querySelector('#input-u-rt');
    let inputCommentColumn = document.querySelector('#input-u-comment-column');

    if (config.main_module == 0) config.main_module = '';
    if (config.main_matrix == 0) config.main_matrix = '';
    if (config.rt == 0) config.rt = '';

    inputModule.value = config.main_module;
    inputMatrix.value = config.main_matrix;
    inputRT.value = config.rt;

    if (config.comment_column) {
      inputCommentColumn.value = 1;
    } else {
      inputCommentColumn.value = 0;
    }
  }

  createOpt() {
    let self = this;

    let fn = (item, index) => {
      return <option key={index} value={item.id}>{item.name}</option>;
    };

    return fn;
  }

  render(props, state) {
    let o = false;
    let notifications = state.notifications_;

    let srcAvatar = '/static/images/avatar.png';

    if (state.avatar) srcAvatar = `/static/images/avatars/${state.avatar}`;

    return (
      <div>
        <Header o={o} module={constants.PROFILE_MODULE}
                notifications={notifications}
                onRemoveNotification={this.handleRemoveNotification()} />

        <section className="contenedor_root animated fadeIn">
          <div className="container">
            <div className="profiles">

              <div className="row">

                <div className="col s12 m4 avatar">
                  <div className="img_avat">
                    <figure>
                      <img id="image-avatar" src={srcAvatar} alt="Image de perfil" />
                    </figure>
                  </div>

                  <div className="content">
                    <h5>{USER_NAME}</h5>
                    <p>{USER_JOB}</p>
                  </div>
                  <div className="footer">
                    <form onSubmit={this.handleUploadAvatar()}>
                      <div className="file-field input-field col s12">
                        <div className="btn indigo darken-4" style="float: none; margin-bottom: 15px;">
                          <span htmlFor="input-file">Imagen de perfil</span>
                          <input id="input-file" type="file" accept="image/*" onChange={this.handleChangeFile()} />
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="input-field col s12">
                        <button id="btn-update-avatar" type="submit" className="btn btn_ttx_success center">GUARDAR</button>
                        <br />
                        <br />
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col s12 m8 profile">

                  <div className="body_info animated fadeIn">
                    <br />
                    <form onSubmit={this.handleUpdateUser()}>
                      <div className="row">
                        <div className="input-field col s6">
                          <input type="text" id="input-u-username" placeholder="Usuario" disabled="true" style="color: #FFF; border: solid 1px;" />
                        </div>
                        <div className="input-field col s6">
                          <input type="text" id="input-u-role" placeholder="Rol" />
                        </div>
                        <div className="input-field col s6">
                          <input type="text" id="input-u-name" placeholder="Nombre" />
                        </div>
                        <div className="input-field col s6">
                          <input type="email" id="input-u-email" placeholder="Correo Electrónico" />
                        </div>
                        <div className="input-field col s6">
                          <input type="text" id="input-u-company" placeholder="Empresa" />
                        </div>
                        <div className="input-field col s6">
                          <input type="text" id="input-u-job" placeholder="Puesto" />
                        </div>
                        <div className="input-field col s6">
                          <input type="text" id="input-u-phone" placeholder="Teléfono" />
                        </div>
                        <div className="input-field col s6"></div>
                        <br />
                        <br />
                        <div className="input-field col s12">
                          <button type="submit" className="btn btn_ttx_success center">GUARDAR</button>
                          <br />
                          <br />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="body_info animated fadeIn">
                    <br />
                    <form onSubmit={this.handleUpdateConfiguration()}>
                      <div className="row">

                        <div className="col s4 m4">
                          <select className="browser-default sion-select" id="input-u-module">
                            <option value="" selected>Módulo Principal</option>
                            {MODULES.map(this.createOpt())}
                          </select>
                        </div>

                        <div className="col s4 m4">
                          <select className="browser-default sion-select" id="input-u-matrix">
                            <option value="" selected>Matriz de Variables Principal</option>
                            {state.matrices_.map(this.createOpt())}
                          </select>
                        </div>

                        <div className="col s4 m4">
                          <select className="browser-default sion-select" id="input-u-rt">
                            <option value="" selected>Real Time</option>
                            {RTS.map(this.createOpt())}
                          </select>
                        </div>

                      </div>
                      <div className="row" style="margin-top: 16px">

                        <div className="col s4 m4">
                          <select className="browser-default sion-select" id="input-u-comment-column">
                            <option value="1" selected>Columna de Comentario Activo</option>
                            <option value="0" selected>Columna de Comentario Inactivo</option>
                          </select>
                        </div>

                        <div className="col s4 m4"></div>

                        <div className="col s4 m4"></div>

                        <br />
                        <br />
                        <div className="input-field col s12" style="margin: 15px 0px;">
                          <button type="submit" className="btn btn_ttx_success center">GUARDAR</button>
                          <br />
                          <br />
                        </div>

                      </div>
                    </form>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default Profile