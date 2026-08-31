import { h, render, Component } from 'preact';
import { isString } from 'underscore';

class CreateFile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: false
    };
  }

  handleCancel() {
    let self = this;

    let fn = (evt) => {
      self.props.onCancel();
    };

    return fn;
  }

  handleUpload() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let file = self.state.file;
      if (file) {
        let inputName = document.querySelector('#input-name');
        let name = inputName.value.trim();
        if (name == '') return;

        name = self.addExtension(name);
        if (!name) return;

        let o = {
          name: name,
          file: file
        }

        self.props.onUpload(o);

        inputName.value = '';
      }
    };

    return fn;
  }

  handleChangeFile() {
    let self = this;

    let fn = (evt) => {
      let file = evt.target.files[0];
      if (file) {
        let fileName = file.name;
        let inputName = document.querySelector('#input-name');
        let name = inputName.value.trim();
        if (name === '') {
          let extension = self.getExtension(fileName);
          if (!extension) {
            let message = 'El archivo no tiene extensión';
            Materialize.toast(message, 2500)(message);
            return;
          }

          fileName = self.removeExtension(fileName);
          if (!fileName) {
            let message = 'El archivo no tiene extensión';
            Materialize.toast(message, 2500)(message);
            return;
          }

          inputName.value = fileName;
        }

        self.setState({ file: file });
      }
    };

    return fn;
  }

  addExtension(nName) {
    let file = this.state.file;
    if (file) {
      let extension = this.getExtension(file.name);
      if (extension) nName = `${nName}.${extension}`;
      return nName;
    }

    return false;
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

  getExtension(filename) {
    let value = filename.split('.').pop();
    if (value) {
      if (isString(value)) {
        value = value.toLowerCase();
      }
    }

    return value;
  }  

  render(props, state) {
    return (
      <div className="row" style="display: inline-block;">
        <div className="col s12">
          <div className="explorer-card">
            <div className="white-text">
              <form onSubmit={this.handleUpload()}>
                <div className="input-field col s12">
                  <label htmlFor="input-name" className="active">Nombre</label>
                  <input type="text" className="form-control" id="input-name" placeholder="Nombre" style="color: #080348;" />
                </div>
                <div className="file-field input-field col s12">
                  <div className="btn indigo darken-4">
                    <span htmlFor="input-file">Archivo</span>
                    <input id="input-file" type="file" onChange={this.handleChangeFile()} />
                  </div>
                </div>
                <button type="submit" className="btn red">Subir archivo</button>
                <button type="button" className="modal-action modal-close btn grey darken-3" onClick={this.handleCancel()}>Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateFile;