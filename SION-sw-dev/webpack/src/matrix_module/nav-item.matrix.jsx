import { h, render, Component } from 'preact';

class NavItemMatrix extends Component {

  constructor(props) {
    super(props);

  }

  render(props, state) {
    let matrix = props.matrix;

    return (
      <div className="variable" style={{ backgroundColor: color }} onClick={this.handleShowOptions()}>
        <table>
          <tbody>
            <tr>
              <td style="padding: 0px;">{variable_name}</td>
              <td style="padding: 0px;">000000.0000</td>
              <td style="padding: 0px;">{variable.display}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default NavItemMatrix;