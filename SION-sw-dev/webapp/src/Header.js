import React, { Component } from "react";

import MenuLateralMatrix from './matrix_module/MenuLateral.js';
import MenuLateralLocation from './location_module/MenuLateral.js';
import MenuLateralLocator from './locator_module/MenuLateral.js';

import NotificationItem from './matrix_module/NotificationItem.js';

import constants from './constants';

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
    let fn = (evt) => {
      evt.preventDefault();

      window.$('#bar_notific').animate({ marginRight: '-300px' }, 100);
      window.$('#sbar_config').animate({ marginRight: '-300px' }, 100);
    };

    return fn;
  }

  handleOpenConfigMenu() {
    let fn = (evt) => {
      evt.preventDefault();

      window.$('#sbar_config').animate({ marginRight: '0px' }, 100);
    };

    return fn;
  }

  handleCloseConfigMenu() {
    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      window.$('#sbar_config').animate({ marginRight: '-300px' }, 100);
    };

    return fn;
  }

  handleOpenNotifications() {
    let fn = (evt) => {
      evt.preventDefault();

      window.$('#bar_notific').animate({ marginRight: '0px' }, 100);
    };

    return fn;
  }

  handleCloseNotifications() {
    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      window.$('#bar_notific').animate({ marginRight: '-300px' }, 100);
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

    let fn = (item, index) => {
      return <NotificationItem key={index} notification={item} onRemove={self.handleRemoveNotification()} />
    };

    return fn;
  }

  /* Header: Matriz */
  handleRestoreMatrix() {
    let self = this;

    let fn = (structure) => {
      let f = self.props.onRestoreMatrix;
      if (f) f(structure);
    };

    return fn;
  }

  handleItemGroup() {
    let self = this;

    let fn = (structure) => {
      let f = self.props.onItemGroup;
      if (f) f(structure);
    };

    return fn;
  }

  handleChangeMatrix() {
    let self = this;

    let fn = (m, s) => {
      let f = self.props.onChangeMatrix;
      if (f) f(m, s);
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

  render() {
    let styleSideBarConfig = { marginRight: '-300px'};
    let styleSideBarNotif = { marginRight: '-300px' };

    let srcAvatar = `/static/images/avatars/default.png`;
    if (window.USER_AVATAR !== '') srcAvatar = `/static/images/avatars/${window.USER_AVATAR}`;

    let module = this.props.module;
    let menuLateral = false;
    let notifications = [];

    if (module === constants.MATRIX_MODULE) {
      let o = this.props.o;

      menuLateral = <MenuLateralMatrix o={o}
                      onRestoreMatrix={this.handleRestoreMatrix()}
                      onItemGroup={this.handleItemGroup()}
                      onChangeMatrix={this.handleChangeMatrix()} />;

    } else if (module === constants.LOCATION_MODULE) {
      let o = this.props.o;

      menuLateral = <MenuLateralLocation o={o}
        onRestoreMatrix={this.handleRestoreMatrixLocation()}
        onItemGroup={this.handleItemGroupLocation()}
        onChangeMatrix={this.handleChangeMatrixLocation()} />;

    } else if (module === constants.LOCATOR_MODULE) {
      let o = this.props.o;

      menuLateral = <MenuLateralLocator o={o}
        onItemVehicle={this.handleItemVehicle()}
        onItemVehicleReport={this.handleItemVehicleReport()}
        onUpdateVisibilityVehicle={this.updateVisibilityVehicle()} />;
    }

    if (this.props.notifications) {
      notifications = this.props.notifications;
    }

    return (
      <div>
        <section className="menu_top">
          <div className="row">
            <div className="col s12 m5 contrato_px">
              <ul>
                <li>
                  <a className="logo_pemex animated fadeInLeft" href="#logo">
                    <img src={window.LOGO_LEFT} alt="Logo" />
                  </a>
                </li>
                <li>
                  <div className="contrato">
                    <p>
                      {window.TITLE_ONE_LEFT}
                      <br/>
                      {window.TITLE_TWO_LEFT}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col s12 m3 sion-contrato-client">
              <p>
                {window.TITLE_ONE}
                <br />
                {window.TITLE_TWO}
              </p>
            </div>
            <div className="col s12 m4 avatar_logo">
              <ul>
                <li>
                  <div className="avat">
                    <a className="img_redondo bar_config" href="#config-menu" onClick={this.handleOpenConfigMenu()}>
                      <p>
                        {window.USER_NAME}
                        <span>{window.USER_JOB}</span>
                      </p>
                      <img src={srcAvatar} alt="Avatar de usuario" />
                      <i className="material-icons right">arrow_drop_down</i>
                    </a>
                  </div>
                </li>
                <li>
                  <a className="logo_ttx animated fadeIn" href="#logo-ttx">
                    <img src="/static/images/logo_ttx_black.svg" alt="Logo" />
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
                <a id="mostrar_menu" className="button-collapse bar_matrices" data-activates="slide-out" href="#open-menu" onClick={this.handleOpenMenu()}>
                  <i className="material-icons">menu</i>
                </a>
              </li>
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
                <a href="http://138.68.224.153:5000" target="_blank" rel="noopener noreferrer">
                  <i className="material-icons">gps_fixed</i>Localizador
                </a>
              </li>
              <li>
                <a href="/explorer">
                  <i className="material-icons">pageview</i>Explorador
                </a>
              </li>

              <li className="float_right">
                <a href="#open-notifications" className="bar_notific" onClick={this.handleOpenNotifications()}>
                  <i className="material-icons">chat_bubble</i>
                  <span>{notifications.length}</span>
                </a>
              </li>
            </ul>

            {menuLateral}

            <ul id="sbar_config" className="sidebar_config" style={styleSideBarConfig}>
              <li>
                <div className="config">
                  <div className="avatar_bar">
                    <img src={srcAvatar} alt="Imagen" />
                  </div>
                  <h6>{window.USER_NAME}
                    <br />
                    <strong>{window.USER_JOB}</strong>
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
              <li>
                <div className="menu">
                  <a href="/configuration"><i className="material-icons">settings</i> Configuraciones</a>
                </div>
              </li>
              <li>
                <div className="menu">
                  <a href={`${constants.URL_SERVER_AUTH}/logout`}><i className="material-icons">highlight_off</i> Cerrar Sesión</a>
                </div>
              </li>
              <li>
                <a id="btn_cerrar_sidebar" href="#close-config-menu" className="btn bottm_left sidenav-close" onClick={this.handleCloseConfigMenu()}>
                  <i className="material-icons left">keyboard_arrow_left</i>
                </a>
              </li>
              <br />
            </ul>

            <ul id="bar_notific" className="sidebar_notif" style={styleSideBarNotif}>
              <li className="space"></li>

              {notifications.map(this.createItemNotification())}

              <li>
                <a href="#close-notifications" className="btn bottm_left sidenav-close" onClick={this.handleCloseNotifications()}>
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
