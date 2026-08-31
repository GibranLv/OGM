import { h, render, Component, Fragment } from 'preact';

import MenuLateralMatrix from './matrix_module/menu-lateral.jsx';
import MenuLateralLocation from './location_module/menu-lateral.jsx';
import MenuLateralLocator from './locator_module/menu-lateral.jsx';

import NotificationItem from './matrix_module/notification-item.jsx';

import constants from './constants';

const PROFILE = 1;
const CONFIGURATION = 2;
const LOGOUT = 3;

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpenNotifications: false,
    }
  }

  componentDidMount() {
  }

  handleOpenMenu() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('#bar_notific').animate({ marginRight: '-300px' }, 100);
      $('#sbar_config').animate({ marginRight: '-300px' }, 100);
    };

    return fn;
  }

  handleOpenConfigMenu() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('#sbar_config').animate({ marginRight: '0px' }, 100);
    };

    return fn;
  }

  handleCloseConfigMenu() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      $('#sbar_config').animate({ marginRight: '-300px' }, 100);
    };

    return fn;
  }

  handleOpenNotifications() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      $('#bar_notific').animate({ marginRight: '0px' }, 100);
    };

    return fn;
  }

  handleCloseNotifications() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      $('#bar_notific').animate({ marginRight: '-300px' }, 100);
    };

    return fn;
  }

  handleRemoveNotification() {
    let self = this;

    let fn = (id) => {
      let f = self.props.onRemoveNotification;
      if (f) f(id);
    };

    return fn;
  }

  createItemNotification() {
    let self = this;

    let fn = (item) => {
      return <NotificationItem notification={item} onRemove={this.handleRemoveNotification()} />
    };

    return fn;
  }

  /* Header: Matriz */
  handleRestoreMatrix() {
    let self = this;

    let fn = (structure, mi) => {
      let f = self.props.onRestoreMatrix;
      if (f) f(structure, mi);
    };

    return fn;
  }

  handleItemGroup() {
    let self = this;

    let fn = (structure, mi) => {
      let f = self.props.onItemGroup;
      if (f) f(structure, mi);
    };

    return fn;
  }

  handleChangeMatrix() {
    let self = this;

    let fn = (m, s, mi, si) => {
      let f = self.props.onChangeMatrix;
      if (f) f(m, s, mi, si);
    };

    return fn;
  }
  /* Header: Matriz */

  /* Header: Ubicación */
  handleRestoreMatrixLocation() {
    let self = this;

    let fn = (structure) => {
      let f = self.props.onRestoreMatrix;
      if (f) f(structure);
    };

    return fn;
  }

  handleItemGroupLocation() {
    let self = this;

    let fn = (structure) => {
      let f = self.props.onItemGroup;
      if (f) f(structure);
    };

    return fn;
  }

  handleChangeMatrixLocation() {
    let self = this;

    let fn = (m, s) => {
      self.setState({ matrix: m, structure: s }, () => {
        let f = self.props.onChangeMatrix;
        if (f) f(m, s);
      });
    };

    return fn;
  }
  /* Header: Ubicación */

  /* Header: Localización de Pozos */
  handleItemVehicle() {
    let self = this;

    let fn = (vehicle) => {
      let f = self.props.onItemVehicle(vehicle);
      if (f) f();
    };

    return fn;
  }

  handleItemVehicleReport() {
    let self = this;

    let fn = (vehicle) => {
      let f = self.props.onItemVehicleReport(vehicle);
      if (f) f();
    };

    return fn;
  }

  updateVisibilityVehicle() {
    let self = this;

    let fn = (json, id) => {
      let f = self.props.onUpdateVisibilityVehicle(json, id);
      if (f) f();
    };

    return fn;
  }

  /* Header: Localización de Pozos */

  render(props, state) {
    let srcAvatar = `/static/images/avatars/default.png`;
    if (USER_AVATAR != '') srcAvatar = `/static/images/avatars/${USER_AVATAR}`;

    let module = this.props.module;
    let menuLateral = false;
    let notifications = [];

    let itemMenuDashboard = false;
    if (window.SYSTEM_HOST === "diavaz.technotex.com") {
      itemMenuDashboard = (() => {
        return (
          <li>
            <a href="/dashboard">
              <i className="material-icons">dashboard</i> Dashboard
            </a>
          </li>
        )
      })()
    }

    if (module == constants.MATRIX_MODULE) {
      let o = props.o;

      menuLateral = <MenuLateralMatrix o={o}
                      onRestoreMatrix={this.handleRestoreMatrix()}
                      onItemGroup={this.handleItemGroup()}
                      onChangeMatrix={this.handleChangeMatrix()} />;

    } else if (module == constants.LOCATION_MODULE) {
      let o = props.o;

      menuLateral = <MenuLateralLocation o={o}
        onRestoreMatrix={this.handleRestoreMatrixLocation()}
        onItemGroup={this.handleItemGroupLocation()}
        onChangeMatrix={this.handleChangeMatrixLocation()} />;

    } else if (module == constants.LOCATOR_MODULE) {
      let o = props.o;

      menuLateral = <MenuLateralLocator o={o}
        onItemVehicle={this.handleItemVehicle()}
        onItemVehicleReport={this.handleItemVehicleReport()}
        onUpdateVisibilityVehicle={this.updateVisibilityVehicle()} />;
    }

    if (props.notifications) {
      notifications = props.notifications;
    }

    return (
      <div>
        <section className="menu_top">
          <div className="row">
            <div className="col s12 m5 contrato_px">
              <ul>
                <li>
                  <a className="logo_pemex animated fadeInLeft" href="#">
                    <img src={LOGO_LEFT} alt="Logo" />
                  </a>
                </li>
                <li>
                  <div className="contrato">
                    <p>
                      {TITLE_ONE_LEFT}
                      <br/>
                      {TITLE_TWO_LEFT}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col s12 m3 sion-contrato-client">
              <p>
                {TITLE_ONE}
                <br />
                {TITLE_TWO}
              </p>
            </div>
            <div className="col s12 m4 avatar_logo">
              <ul>
                <li>
                  <div className="avat">
                    <a className="img_redondo bar_config" href="#" onClick={this.handleOpenConfigMenu()}>
                      <p>
                        {USER_NAME}
                        <span>{USER_JOB}</span>
                      </p>
                      <img src={srcAvatar} />
                      <i className="material-icons right">arrow_drop_down</i>
                    </a>
                  </div>
                </li>
                <li>
                  <a className="logo_ttx animated fadeIn" href="#">
                    <img src={window.LOGO_TTX_DEFAULT} alt="Logo" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <nav>
          <div className="row">
            <ul id="nav-mobile" className="nav_menu ">
              <li>
                <a id="mostrar_menu" className="button-collapse bar_matrices" data-activates="slide-out" href="#" onClick={this.handleOpenMenu()}>
                  <i className="material-icons">menu</i>
                </a>
              </li>
              {itemMenuDashboard}
              <li>
                <a href="/matrices">
                  <i className="material-icons">developer_board</i>Matriz
                </a>
              </li>
              <li>
                <a href="/charts">
                  <i className="material-icons">timeline</i>Gráfica
                </a>
              </li>
              <li>
                <a href="/reports">
                  <i className="material-icons">assessment</i>Reportes
                </a>
              </li>
							{ USER_NAME !== 'Litoral Costero' && USER_NAME !== 'Medición Costero' ? 
									<Fragment>
										<li>
											<a href="/dynamic_graphics">
												<i className="material-icons">filter_b_and_w</i>Gráficos Dinámicos
											</a>
										</li>
										<li>
											<a href="/operations">
												<i className="material-icons">assignment</i>Operaciones
										</a>
										</li>
										<li>
											<a href="/events">
												<i className="material-icons">date_range</i>Eventos
											</a>
										</li>
										<li>
											<a href="/location">
												<i className="material-icons">room</i>Ubicación
											</a>
										</li>
										<li>
											<a href="http://138.68.224.153:5000" target="_blank">
												<i className="material-icons">gps_fixed</i>Localizador
											</a>
										</li>
										<li>
											<a href="/explorer">
												<i className="material-icons">pageview</i>Explorador
											</a>
										</li>
									</Fragment>
								: false
							} 

              <li className="float_right">
                <a href="#" className="bar_notific" onClick={this.handleOpenNotifications()}>
                  <i className="material-icons">chat_bubble</i>
                  <span>{notifications.length}</span>
                </a>
              </li>
            </ul>

            {menuLateral}

            <ul id="sbar_config" className="sidebar_config" style="margin-right: -300px;">
              <li>
                <div className="config">
                  <div className="avatar_bar">
                    <img src={srcAvatar} alt="Imagen" />
                  </div>
                  <h6>{USER_NAME}
                    <br />
                    <strong>{USER_JOB}</strong>
                  </h6>
                </div>
              </li>
              <li>
                <br />
              </li>
              <li>
                <div className="menu">
                  <a href="/profile"><i className="material-icons">edit</i> Editar Perfil</a>
                </div>
              </li>
							{
									USER_NAME !== 'Litoral Costero' && USER_NAME !== 'Medición Costero' ?
										<li>
											<div className="menu">
												<a href="/configuration"><i className="material-icons">settings</i> Configuraciones</a>
										</div>
									</li>
								: false
							}
              <li>
                <div className="menu">
                  <a href={`${constants.URL_SERVER_AUTH}/logout`}><i className="material-icons">highlight_off</i> Cerrar Sesión</a>
                </div>
              </li>
              <li>
                <a id="btn_cerrar_sidebar" href="#" className="btn bottm_left sidenav-close" onClick={this.handleCloseConfigMenu()}>
                  <i className="material-icons left">keyboard_arrow_left</i>
                </a>
              </li>
              <br />
            </ul>

            <ul id="bar_notific" class="sidebar_notif" style="margin-right: -300px;">
              <li className="space"></li>

              {notifications.map(this.createItemNotification())}

              <li>
                <a href="#" className="btn bottm_left sidenav-close" onClick={this.handleCloseNotifications()}>
                  <i className="material-icons left">keyboard_arrow_left</i>
                </a>
              </li>
            </ul>

          </div>
        </nav>

      </div>
    );
  }
}

export default Header;
