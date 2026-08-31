import { h, render, Component } from 'preact';

class CreateFile extends Component {
  
  constructor(props) {
    super(props);
  }

  handleCancel() {
    let self = this;

    let fn = (evt) => {
      self.props.onCancel();
    };

    return fn;
  }

  handleCreate() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let inputName = document.querySelector('#input-name');

      let value = inputName.value.trim();
      if (value == '') return;

      self.props.onCreate(value);

      inputName.value = '';
    };

    return fn;
  }  

  render(props, state) {
    return(
      <div className="row" style="display: inline-block;">
        <div className="col s12">
          <div className="explorer-card">
            <div className="white-text">
              <form onSubmit={this.handleCreate()}>
                <div className="input-field col s12">
                  <label htmlFor="input-name" className="active">Nombre</label>
                  <input type="text" className="form-control" id="input-name" placeholder="Nombre" style="color: #080348;" />
                </div>
                <button type="submit" className="btn red">Crear Carpeta</button>
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