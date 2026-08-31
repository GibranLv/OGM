import { h, render, Component } from 'preact';

import constants from './../constants';

class NotificationItem extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    
  }

  handleRemove() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      let notification = self.props.notification;
      let id = notification.id;

      let f = self.props.onRemove;
      if (f) f(id);
    };

    return fn;
  }

  render(props, state) {
    let notification = props.notification;
    let type = notification.type;

    let icon = 'notifications';

    if (type == constants.TYPE_VALUE_ALARM) {
      icon = 'warning';
    } else if (type == constants.TYPE_TIMEOUT_ALARM) {
      icon = 'alarm';
    }

    // warning
    // message comentario
    // volume_off silenciar alarma
    // portable_wifi_off perdida de conexion

    return (
      <li>
        <div className="notifica">
          <div className="row thumb">
            <div className="flexi"> 
              <div className="col s2">
                <i className="material-icons">{icon}</i>
              </div>
              <div className="col s10">
                <p>{notification.description}</p>
              </div>
              <div className="borrar_notif">
                <a className="btn_noti " href="#" onClick={this.handleRemove()}>
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default NotificationItem;