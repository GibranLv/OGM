import { h, render, Component } from 'preact';

class Orbcomm extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isOpen: false,
			isOpenTimeout: false
		};
	}

	createVariable() {
		let self = this;

		let fn = (variable) => {
			return (
				<tr key={variable.id}>
					<td>{ variable.name }</td>
					<td>{ variable.parameter }</td>
					<td>{ variable.timestamp }</td>
					<td>{ self.getStatus(variable.is_timeout) }</td>
				</tr>
			);
		}

		return fn;
	}

  getStatus(isTimeout) {
    let classStatus = 'o-status-ok';
    if (isTimeout) classStatus = 'o-status-off';

    return (
      <div className={classStatus}></div>
    );
  }

	handleOpen() {
		let self = this;

		let fn = (evt) => {
			evt.preventDefault()

			self.setState({ isOpen: !self.state.isOpen })
		}

		return fn
	}

	handleOpenTimeout() {
		let self = this;

		let fn = (evt) => {
			evt.preventDefault()

			self.setState({ isOpenTimeout: !self.state.isOpenTimeout })
		}

		return fn
	}

	render (props) {
		let item = props.item;

		return (
			<section>
				<div className="row">
					<table className="responsive-table" style={{ margin: '10px 0px', border: '1px solid white' }}>
						<tbody>
							<tr>
								<td colSpan="1" style={{textAlign: 'left'}}>
									{ item.names.map(name => <span>{name}<br/></span>) }
								</td>
								<td colSpan="1" className="center" style={{ fontSize: '18px' }}>
									{ item.mobile_id }
								</td>
								<td colSpan="1" style={{ textAlign: 'right' }}>
									<a href="#" onClick={this.handleOpenTimeout()}>
										{ this.state.isOpenTimeout ?
											<i className="material-icons">remove</i>
											: <i className="material-icons">add</i>
										}
									</a>
								</td>
								<td colSpan="1" style={{ textAlign: 'right' }}>
									<a href="#" onClick={this.handleOpen()}>
										{ this.state.isOpen ?
											<i className="material-icons">keyboard_arrow_up</i>
											: <i className="material-icons">keyboard_arrow_down</i>
										}
									</a>
								</td>
							</tr>
							{
								this.state.isOpenTimeout ? 
									item.variables.filter(variable => variable.is_timeout === true).map(this.createVariable())
								:
									item.variables.filter(variable => variable.is_timeout === true).length > 0 ?
										<tr>
											<td colSpan="3" style={{ textAlign: 'left', fontSize: '18px' }}>
												{ item.variables.filter(variable => variable.is_timeout === true).length } variables
											</td>	
											<td colSpan="1">
												{ this.getStatus(true) }
											</td>	
										</tr> 
									: false
							}	
							{ 
								this.state.isOpen ?
									item.variables.filter(variable => variable.is_timeout === false).map(this.createVariable())
								: 
									item.variables.filter(variable => variable.is_timeout === false).length > 0 ?
										<tr>
											<td colSpan="3" style={{ textAlign: 'left', fontSize: '18px' }}>
												{ item.variables.filter(variable => variable.is_timeout === false).length } variables
											</td>	
											<td colSpan="1">
												{ this.getStatus(false) }
											</td>	
										</tr> 
									: false
							}	
						</tbody>
					</table>
				</div>
			</section>
		);
	}
}

export default Orbcomm;