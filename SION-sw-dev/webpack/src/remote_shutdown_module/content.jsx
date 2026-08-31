import { h, render, Component } from 'preact';

import Header from './../header.jsx';
import constants from './../constants.js';

const INFORMATION = 1;
const IMAGE = 2;

class ShutdownStopContent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  handleSubmit() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();


    };

    return fn;
  }

  render(props, state) {
    let o = false;

    return (
      <div>
        <Header o={o} module={constants.SHUTDOWN_REMOTE_MODULE} />

        <section className="contenedor_root animated fadeIn">
          <div className="container">
            <div className="paro">
              <div className="row">
                <div className="flexi">
                  <div className="col s12 m5 info">
                    <h5>Paro Remoto</h5>
                    <form onSubmit={this.handleSubmit()}>
                      <div className="col s6">
                        <select className="browser-default sion-select">
                          <option value="" disabled selected>Escoge un Pozo</option>
                          <option value="1">Pozo 1</option>
                          <option value="2">Pozo 2</option>
                        </select>
                      </div>
                      <div className="col s6">
                        <select className="browser-default sion-select">
                          <option value="" disabled selected>Escoge un Pozo</option>
                          <option value="1">Pozo 1</option>
                          <option value="2">Pozo 2</option>
                        </select>
                      </div>
                      <br />
                      <div className=" col s12" style="margin: 15px 0px;">
                        <select className="browser-default sion-select">
                          <option value="" disabled selected>Seleccione un usuario autorizado</option>
                          <option value="1">Gaylord Ramírez Martínez</option>
                          <option value="2">Omar Lezama Ibarra</option>
                          <option value="2">Julio Sánchez Merodio</option>
                        </select>
                      </div>

                      <div className="input-field col s12">
                        <input placeholder="{Usuario Seleccionado}" id="input-user" type="text" disabled selected />
			                </div>

                      <div className="input-field col s12">
                        <input placeholder="Contraseña" id="input-password" type="password" className="validate" />
                      </div>
				            </form>
                  </div>

                  <div className="col s12 m7 panic">

                    <div className="flexi animated fadeIn">
                      <div className="btn_paro pulse">
                        <a className="modal-trigger" href="#cerrar_sesion">
                          <i className="material-icons">power_settings_new</i>
                        </a>
                      </div>
                    </div>

                    <p className="animated fadeIn">Enviando datos...</p>
                    <p className="animated fadeIn">Esperando confirmación...</p>
                    <p className="animated fadeIn">Envío de paro remoto exitoso...</p>

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

render(<ShutdownStopContent />, document.getElementById('content-main'));
