import { h, render, Component } from 'preact';
import { w3cwebsocket } from 'websocket';
import { isString } from 'underscore';

import Header from './../header.jsx';
import constants from './../constants.js';

const wseURL = `ws://${URLWSE}/ws`;

import CreateFile from './create-file.jsx';
import UploadFile from './upload-file.jsx';
import File from './file.jsx';

const UPLOAD_FILE = 1;
const CREATE_FILE = 2;

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notifications_: [],

      paths: ['.'],
      files: [],
      changeFile: false,
      copyFile: false,
      form:  false,

      connection_errors_wse: 0,
    };
  }

  componentDidMount() {
    $('.modal').modal();

    this.serviceWSE();

    this.getNotifications();
  }

  serviceWSE() {
    let self = this;

    let v = window.sessionStorage.getItem(constants.ACCESS_TOKEN_WSE);
    let url = `${wseURL}?${constants.ACCESS_TOKEN_WSE}=${v}`;
    self.ws = new w3cwebsocket(url, constants.TTX_PROTOCOL);

    self.ws.onerror = () => {
      console.log('WebSocket connection Error');
    };

    self.ws.onopen = () => {
      console.log('WebSocket connected');

      self.getContent();
    };

    self.ws.onclose = () => {
      console.log('WebSocket closed');

      setTimeout(() => {
        let connection_errors = self.state.connection_errors_wse;
        if (connection_errors >= constants.LIMIT_FOR_RECONNECTION) {
          connection_errors = 0;
          self.getTokenWSE();
        }

        connection_errors = connection_errors + 1;
        self.state.connection_errors_wse = connection_errors;

        self.serviceWSE();
      }, 1000);
    };

    self.ws.onmessage = (evt) => {
      let s = evt.data;
      let o = JSON.parse(s)
      if (o.err) {
        Materialize.toast(o.content, 2500);

        if (o.evt == constants.EVENT_COPY_FILE || o.evt == constants.EVENT_MOVE_FILE) {
          let copyFile = self.state.copyFile;
          if (copyFile) {
            let files = self.state.files;
            for (let i = 0; i < files.length; i++) {
              files[i].copy_ = false;
            }

            self.setState({ copyFile: false, files: files });
          }
        }

        return;
      }

      if (o.evt == constants.EVENT_GET_CONTENT) {
        let files = o.content;

        for (let i = 0; i < files.length; i++) {
          files[i].copy_ = false;

          let copyFile = self.state.copyFile;
          if (copyFile) {
            let f = files[i];
            if (f.is_dir) {
              if (f.id != copyFile.id) {
                files[i].copy_ = true
              }
            }
          }
        }

        self.setState({ files: files });

      } else if (o.evt == constants.EVENT_CREATE_FILE) {
        let file = o.content;
        file.copy_ = false

        let files = self.state.files;
        files.push(file);

        self.setState({ files: files });

      } else if (o.evt == constants.EVENT_RENAME_FILE) {
        let file = o.content;
        file.copy_ = false

        let files = self.state.files;
        for (let i = 0; i < files.length; i++) {
          let f = files[i];
          if (f.id == file.id) {
            for (let key in file) {
              let hasKey = file.hasOwnProperty(key);
              if (hasKey) {
                files[i][key] = file[key];
              }
            }

            break;
          }
        }

        self.setState({ files: files });

      } else if (o.evt == constants.EVENT_DELETE_FILE) {
        let file = o.content;

        let removeCopy = false;
        let copyFile = self.state.copyFile;
        if (copyFile) {
          if (file.id == copyFile.id) {
            removeCopy = true
          }
        }

        if (removeCopy) {
          let files = self.state.files;
          for (let i = 0; i < files.length; i++) {
            let f = files[i];
            files[i].copy_ = false;

            if (f.id == file.id) {
              files.splice(i, 1)
            }
          }

          self.setState({ copyFile: false, files: files }, () => {
            self.getContent();
          });

        } else {
          let files = self.state.files;
          for (let i = 0; i < files.length; i++) {
            let f = files[i];
            if (f.id == file.id) {
              files.splice(i, 1)
              break;
            }
          }

          self.setState({ files: files });
        }

      } else if (o.evt == constants.EVENT_COPY_FILE) {
        let copyFile = self.state.copyFile;
        if (copyFile) {
          let files = self.state.files;
          for (let i = 0; i < files.length; i++) {
            files[i].copy_ = false;
          }

          self.setState({ copyFile: false, files: files }, () => {
            self.getContent();
          });
        }

      } else if (o.evt == constants.EVENT_MOVE_FILE) {
        let copyFile = self.state.copyFile;
        if (copyFile) {
          let file = o.content;
          if (copyFile.id == file.id) {
            let files = self.state.files;

            for (let i = 0; i < files.length; i++) {
              files[i].copy_ = false;
            }

            
            self.setState({ copyFile: false, files: files }, () => {
              self.getContent();
            });
          }
        }
      }
    };
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
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
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

  getTokenWSE() {
    let self = this;

    let url = `${constants.URL_SERVER_USERS}/tokens?${constants.ACCESS_TOKEN_WSE}=true`;

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
    });

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let doc = res.doc;

        let token_wse = doc.access_token_wse;
        if (token_wse) window.sessionStorage.setItem(constants.ACCESS_TOKEN_WSE, token_wse);

        //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
        //if (token_wse) Cookies.set(constants.ACCESS_TOKEN_WSE, token_wse, { expires: sixtySeconds });

        console.log('Reconnection WSE Ok');

      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500);
      }
    });

    xhr.fail((res, status, respose) => {
      console.log(res, status);
      if (res.responseJSON) {
        let json = res.responseJSON;
        Materialize.toast(json.message, 2500);
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500);
      }
    });
  }

  getContent() {
    let pathOut = '';

    let paths = this.state.paths;
    let size = paths.length;
    
    for (let i = 0; i < size; i++) {
      let p = paths[i];
      if (pathOut == '') {
        pathOut = p;
      } else {
        pathOut = `${pathOut}/${p}`;
      }
    }

    let f = {
      path: pathOut
    };

    let o = {
      evt: constants.EVENT_GET_CONTENT,
      content: f
    };

    let s = JSON.stringify(o);
    this.ws.send(s);
  }

  handleGoConfigurations() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      location.href = '/configuration/matrices';
    };

    return fn;
  }

  handlePath(index) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let paths = self.state.paths;

      let ps = [];
      for (let i = 0; i < paths.length; i++) {
        let p = paths[i];
        ps.push(p);

        if (index == i) {
          break;
        }
      }

      self.state.paths = ps;
      self.getContent();
    };

    return fn;
  }

  handleOpen() {
    let self = this;

    let fn = (pathIn) => {
      self.state.paths.push(pathIn);
      self.getContent();
    };

    return fn;
  }

  handleCancel() {
    let self = this;

    let fn = () => {
      self.setState({ form: false });
    };

    return fn;    
  }

  handleOpenCreateFile() {
    let self = this;

    let fn = () => {
      self.setState({ form: CREATE_FILE });
    };

    return fn;
  }

  handleOpenUploadFile() {
    let self = this;

    let fn = () => {
      self.setState({ form: UPLOAD_FILE });
    };

    return fn;
  }

  handleOpenChangeName() {
    let self = this;

    let fn = (file) => {
      if (file) {
        self.state.changeFile = file;

        let inputChangeName = document.querySelector('#input-change-name');
        if (inputChangeName) {
          let name = file.name;
          if (!file.is_dir) {
            let extension = this.getExtension(name);
            if (extension) {
              name = this.removeExtension(name);
            }
          }

          inputChangeName.value = name;
        }

        $('#form-change-name').modal('open');
      }
    };

    return fn;
  }  

  handleChangeName() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let changeFile = self.state.changeFile;
      if (changeFile) {
        let inputChangeName = document.querySelector('#input-change-name');
        let nName = inputChangeName.value.trim();
        if (nName == '') return;

        if (!changeFile.is_dir) {
          nName = self.addExtension(nName);
          if (!nName) return;
        }

        if (nName === changeFile.name) {
          let message = 'El archivo tiene el mismo nombre';
          Materialize.toast(message, 2500);
          return;
        }

        let f = {
          id: changeFile.id,
          n_name: nName
        };

        let o = {
          evt: constants.EVENT_RENAME_FILE,
          content: f
        };

        let s = JSON.stringify(o);
        self.ws.send(s);

        $('#form-change-name').modal('close');
      }
    };

    return fn;
  }  

  handleCopyFile() {
    let self = this;

    let fn = (file) => {
      let files = self.state.files;
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f.is_dir) {
          if (f.id != file.id) {
            files[i].copy_ = true;
          }
        }
      }

      let s = JSON.stringify(file);
      let f = JSON.parse(s);

      f.evt_ = constants.EVENT_COPY_FILE;

      self.state.copyFile = f;
      self.state.files = files;
    };

    return fn;
  }

  handleMoveFile() {
    let self = this;

    let fn = (file) => {
      let files = self.state.files;
      for (let i = 0; i < files.length; i++) {
        let f = files[i];
        if (f.is_dir) {
          if (f.id != file.id) {
            files[i].copy_ = true
          }
        }
      }

      let s = JSON.stringify(file)
      let f = JSON.parse(s);

      f.evt_ = constants.EVENT_MOVE_FILE;

      this.state.copyFile = f;
      this.state.files = files;
    };

    return fn;
  }  

  handlePasteFile() {
    let self = this;

    let fn = (file) => {
      let copyFile = self.state.copyFile;
      if (!copyFile) return;

      let pathIn = `${file.path}/${file.name}`;

      let f = {
        id: copyFile.id,
        n_path: pathIn
      };

      let o = {
        evt: copyFile.evt_,
        content: f
      };

      if (copyFile.is_dir) {
        o.evt = constants.EVENT_MOVE_FILE
      }

      let s = JSON.stringify(o);
      self.ws.send(s);
    };

    return fn;
  }

  handlePasteOfBtn() {
    let self = this;

    let fn = (file) => {
      let copyFile = self.state.copyFile;
      if (!copyFile) return;

      let pathOut = '';

      let paths = self.state.paths;
      for (let i = 0; i < paths.length; i++) {
        let p = paths[i];
        if (pathOut == '') {
          pathOut = p;
        } else {
          pathOut = `${pathOut}/${p}`;
        }
      }

      let f = {
        id: copyFile.id,
        n_path: pathOut
      };

      let o = {
        evt: copyFile.evt_,
        content: f
      };

      if (copyFile.is_dir) {
        o.evt = constants.EVENT_MOVE_FILE
      }

      let s = JSON.stringify(o);
      self.ws.send(s);
    };

    return fn;
  }

  handleDeleteFile() {
    let self = this;

    let fn = (id) => {
      let f = {
        id: id
      };

      let o = {
        evt: constants.EVENT_DELETE_FILE,
        content: f
      };

      let s = JSON.stringify(o);
      self.ws.send(s);
    };

    return fn;
  }  

  handleCreateFile() {
    let self = this;

    let fn = (name) => {
      let pathOut = '';

      let paths = self.state.paths;
      for (let i = 0; i < paths.length; i++) {
        let p = paths[i];
        if (pathOut == '') {
          pathOut = p;
        } else {
          pathOut = `${pathOut}/${p}`;
        }
      }

      let f = {
        name: name,
        is_dir: true,
        path: pathOut
      };

      let o = {
        evt: constants.EVENT_CREATE_FILE,
        content: f
      };

      let s = JSON.stringify(o);
      self.ws.send(s);
    };

    return fn;
  }

  handleUploadFile() {
    let self = this;

    let fn = (json) => {
      let fileReader = new FileReader();

      fileReader.addEventListener("loadend", function () {
        console.log("sending " + fileReader.result.byteLength + " bytes");
        self.ws.send(fileReader.result);
      });

      let pathOut = '';

      let paths = self.state.paths;
      for (let i = 0; i < paths.length; i++) {
        let p = paths[i];
        if (pathOut == '') {
          pathOut = p;
        } else {
          pathOut = `${pathOut}/${p}`;
        }
      }

      let file = json.file;
      if (!file) return;

      let f = {
        name: json.name,
        type: file.type,
        path: pathOut
      }

      let o = {
        evt: constants.EVENT_CREATE_FILE,
        content: f
      }

      let s = JSON.stringify(o)
      let size = s.length;
      let cSize = size.toString().length

      let blob = new Blob([s], { type: file.type });
      blob = new Blob([blob, file], { type: file.type })

      let sizeJSON = [];
      for (let i = cSize; i < 4; i++) {
        sizeJSON.push(0)
      }

      sizeJSON.push(size)
      sizeJSON.push(blob)

      blob = new Blob(sizeJSON, { type: file.type });

      fileReader.readAsArrayBuffer(blob);      
    };

    return fn;
  }

  addExtension(nName) {
    let file = this.state.changeFile;
    if (file) {
      let extension = this.getExtension(file.name);
      if (extension) nName = `${nName}.${extension}`;
      return nName;
    }

    return false;
  }

  getExtension(filename) {
    let value = filename.split('.').pop();
    if (value) {
      if (isString(value)) {
        value = value.toLowerCase();
      }
    }

    return value;
  }

  removeExtension(filename) {
    let value = false;
    let values = filename.split('.');
    values.pop();
    if (values) {
      value = values.join('.');
      if (isString(value)) {
        return value;
      }
    }

    return value;
  }  

  createItemPath() {
    let self = this;

    let fn = (item, index) => {
      if (item == '.') {
        return (
          <a href="#" className="breadcrumb" onClick={this.handlePath(index)}>
            <i className="material-icons" style="line-height: 55px; font-size: 48px;">storage</i>
          </a>
        );
      }

      return <a href="#" className="breadcrumb" onClick={this.handlePath(index)}>{item}</a>;
    };

    return fn;
  }

  createItemFile() {
    let self = this;

    let fn = (item, index) => {
      return <File key={item.id} file={item}
                onOpen={this.handleOpen()}
                onOpenChangeName={this.handleOpenChangeName()}
                onCopy={this.handleCopyFile()}
                onMove={this.handleMoveFile()}
                onPaste={this.handlePasteFile()}
                onDelete={this.handleDeleteFile()} />;
    };

    return fn;
  }

  render(props, state) {
    let notifications = state.notifications_;

    let form = state.form;
    
    if (form == CREATE_FILE) {
      form = <CreateFile onCreate={this.handleCreateFile()} onCancel={this.handleCancel()} />;
    } else if (form == UPLOAD_FILE) {
      form = <UploadFile onUpload={this.handleUploadFile()} onCancel={this.handleCancel()} />;
    }
    
    return (
      <div>
        <Header module={constants.EXPLORER_MODULE}
                notifications={notifications}
                onRemoveNotification={this.handleRemoveNotification()} />

        <section class="contenedor_root animated fadeIn">
          <div className="row">
            <div className="settings">                
              <div className="nav-wrapper">
                <div className="col s12 explorer-nav-wrapper">
                  {state.paths.map(this.createItemPath())}
                </div>
              </div>

              <div style="text-align: center;">
                {form}
              </div>

              <div className="fixed-action-btn horizontal click-to-toggle">
                <a className="btn-floating btn-large btn_ttx_rojo">
                  <i className="material-icons">menu</i>
                </a>
                <ul>
                  <li>
                    <a onClick={this.handleOpenUploadFile()} className="btn-floating green">
                      <i className="material-icons">cloud_upload</i>
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handleOpenCreateFile()} className="btn-floating blue">
                      <i className="material-icons">add</i>
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handlePasteOfBtn()} className="btn-floating yellow darken-1">
                      <i className="material-icons">content_paste</i>
                    </a>
                  </li>
                </ul>
              </div>
              
              <br />
              <div className="col s12">
                {state.files.map(this.createItemFile())}
              </div>
            </div>
          </div>
        </section>

        <div id="form-change-name" className="modal comment_macro">
          <div className="modal-content">
            <h5>Cambiar nombre</h5>
            <form className="formulario" onSubmit={this.handleChangeName()}>
              <div className="input-field col s12">
                <input placeholder="Nombre" id="input-change-name" type="text" className="validate" />
              </div>
              <button type="submit" className="btn red">Aceptar</button>
              <button type="button" onClick={this.handleCancel()} className="modal-action modal-close btn grey darken-3">
                Cancelar
              </button>
            </form>
          </div>
        </div>

      </div>    
    );
  }
}

render(<Content />, document.getElementById('content-main'));