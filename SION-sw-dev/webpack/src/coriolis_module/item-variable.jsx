import { h, render, Component } from 'preact';

class ItemVariable extends Component {

  constructor(props) {
    super(props)

    this.state = {
    };
  }

  handleDelete() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let variable = this.props.item;
      if (variable) {
        self.props.onRemove(variable.index);
      }
    };

    return fn;
  }

  render(props, state) {
    let variable = props.item;

    return (
      <tr>
        <td style="padding: 5px 3px;">
          {variable.device}.{variable.name}
        </td>
        <td style="padding: 5px 3px;">
          {variable.value}
        </td>
        <td style="padding: 5px 3px;">
          {variable.timestamp}
        </td>
        <td style="padding: 5px 3px;">
          <button type="button" className="btn red" onClick={this.handleDelete()}>
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    )
  }
}

export default ItemVariable;