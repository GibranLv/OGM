import { h, render, Component } from 'preact';
import { isNumber, isNaN } from 'underscore';

class PanelVariableItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let variable = this.props.variable;

    let styleIn = {
      color: `${variable.color}`
    };

    let value = 'N/A';

    if (isNumber(variable.value) && !isNaN(variable.value)) {
      value = variable.value;
    }

    return (
      <div className="VolThumb">
        <h2 style={styleIn}>
          {value}
          <span>{variable.unit}</span>
        </h2>
        <h6>{variable.name}</h6>
      </div>
    );
  }
}

export default PanelVariableItem;