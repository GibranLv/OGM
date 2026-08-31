import { h, render, Component } from 'preact';

class VariableCard extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    let variable = this.props.variable;

    let name = variable.name;
    let value = variable.value;
    let display = variable.unit;
    let timestamp = variable.timestamp;

    return (
      <div className="CardsD">
        <h4>{name}</h4>
        <br />
        <div className="col s12 m12 t_center">
          <h3>
            <strong>{value}</strong>{display}
            <span>{timestamp}</span>
          </h3>
        </div>
      </div>
    );
  }
}

export default VariableCard;