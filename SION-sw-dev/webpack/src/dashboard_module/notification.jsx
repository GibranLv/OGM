import { h, render, Component } from 'preact';

class Notification extends Component {

  constructor(props) {
    super(props);
  }

  handleSeen() {
    let fn = (evt) => {
      evt.preventDefault();

      let notification = this.props.notification;

      let fn = this.props.onSeen;
      if (fn) fn(notification.id);
    }

    return fn;
  }

  render() {
    let notification = this.props.notification;
    let color = false;
    if (notification.color) color = notification.color;

    let style = {
      background: `${color}`,
      boxShadow: `0 0 8px ${color}`,
      border: `2px solid ${color}`,
      color: '#111111!important'
    }

    return (
      <div className="Alarms" style={style}>
        <div className="Alarm">
          <div className="BoxTxt">
            <h5>{notification.variable_device}.{notification.variable_name}
            <br/>
            {notification.message}</h5>
          </div>
          <div className="BoxClose">
            <a href="#" onClick={this.handleSeen()}>
              <i className="fa fa-close" style="display:vertical-align: bottom;"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Notification;