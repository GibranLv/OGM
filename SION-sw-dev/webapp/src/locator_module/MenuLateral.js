import React from 'react';

class LocatorMenuLateral extends React.Component {

  componentDidMount() {
    window.$(".button-collapse").sideNav();
    window.$('.collapsible').collapsible();
  }


  handleCloseMenuLateral() {
    let fn = (evt) => {
      evt.preventDefault();

      window.$('.button-collapse').sideNav('hide');
    };

    return fn;
  }

  handleItemVehicle(vehicle) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onItemVehicle;
      if (f) f(vehicle);
    };

    return fn;
  }

  handleItemVehicleReport(vehicle) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onItemVehicleReport;
      if (f) f(vehicle);
    };

    return fn;
  }

  handleChecked(item) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let id = item.id;
      if (id) {
        let element = `#input-visible-${id}`;
        let inputVisible = document.querySelector(element);
        let checked = inputVisible.checked;
        inputVisible.checked = !checked

        let json = {
          visible: inputVisible.checked
        };

        let f = self.props.onUpdateVisibilityVehicle;
        if (f) f(json, id);
      }
    };

    return fn;
  }

  createItemVehicle() {
    let self = this;

    let fn = (item, index) => {
      return (
        <li key={index}>
          <div className="collapsible-header">
            <div className="col s2">
              <i className="material-icons">directions_car</i>
            </div>
            <div className="col s10 txt"
              style={{fontSize: '1.4em', marginLeft: '0.4em', fontWeight: '200'}}
              onClick={self.handleItemVehicle(item)}>
              {item.alias}
            </div>
          </div>
          <div className="collapsible-body" style={{display: 'none'}}>
            <li style={{textAlign: 'center'}}>
              <div class="switch">
                <label onClick={self.handleChecked(item)}>
                  Off
                  <input id={`input-visible-${item.id}`} checked={item.visible} type="checkbox" />
                  <span class="lever"></span>
                  On
                </label>
              </div>
            </li>
            <li style={{textAlign: 'center'}} onClick={self.handleItemVehicleReport(item)}>
              <i className="material-icons" style={{fontSize: '2em', color: '#d4d4d4', cursor: 'pointer'}}>
                insert_drive_file
              </i>
            </li>
          </div>
        </li>
      );
    };

    return fn;
  }

  render() {
    let o = this.props.o;

    if (!o) {
      o = { vehicles: [] };
    } else {
      if (!o.vehicles) o.vehicles = [];
    }

    return (
      <ul id="slide-out" className="side-nav collapsible" data-collapsible="expandable">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="/static/images/sidebar.jpg" alt="Imagen" />
            </div>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons">directions_car</i> Vehiculos
          </div>
          <div className="collapsible-body">
            <ul className="collapsible" data-collapsible="expandable">
              {o.vehicles.map(this.createItemVehicle())}
            </ul>
          </div>
        </li>
        <li>
          <a href="#close" className="btn bottm_right" onClick={this.handleCloseMenuLateral()}>
            <i className="material-icons left">keyboard_arrow_left</i>
          </a>
        </li>
      </ul>
    );
  }
}

export default LocatorMenuLateral;