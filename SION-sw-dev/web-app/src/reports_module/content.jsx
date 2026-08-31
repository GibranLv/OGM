import { h, render, Component } from 'preact'
import { isNumber, isString } from 'underscore'

import Header from './../header.jsx'
import constants from './../constants.js'

const DAILY = 'daily'
const MONTHLY = 'monthly'
const ANNUAL = 'annual'
const CUSTOM = 'custom'

const MINUTE = 'minute'
const HOUR = 'hour'
const DAY = 'day'

const CUSTOM_PREFIX = 'PERSONALIZADO'
const DAILY_PREFIX = 'DIARIO'
const MONTHLY_PREFIX = 'MENSUAL'
const ANNUAL_PREFIX = 'ANUAL'

const BTN_HTML = $('<i class="material-icons prefix left ">file_download</i>')

class Content extends Component {
	constructor() {
		super()

		this.state = {
			notifications_: [],
			reports_: [],
		}
	}

	componentDidMount() {
		this.getReports()
		this.getNotifications()

		//this.serviceWSR();
	}

	/* Notificaciones */

	getNotifications() {
		let self = this

		const url = `${constants.URL_SERVER_LOG_EVENTS}/notifications?is_seen=false`

	  const xhr = $.ajax({
			url: url,
			type: constants.METHOD_GET,
			dataType: constants.JSON,
		})

		xhr.done((res, _, response) => {
			if (response.status == constants.STATUS_OK) {
				self.setState({ notifications_: res.docs }, () => {
					$('select').material_select()
					self.initializePickers()
				})
			} else if (response.status == constants.STATUS_ACCEPTED) {
				alert(res.message)
			}
		})

		xhr.fail((res) => {
			if (res.responseJSON) {
				let json = res.responseJSON
				alert(json.message)
			} else {
				alert(constants.MESSAGE_ERROR)
			}
		})
	}

	updateEventAsSeen(id) {
		const xhr = $.ajax({
			url: `${constants.URL_SERVER_LOG_EVENTS}/notifications/${id}`,
			type: constants.METHOD_PUT,
			contentType: constants.APPLICATION_JSON,
		})

		xhr.done((res, _, response) => {
			if (response.status == constants.STATUS_OK) {
				console.log('Notificación Ok')
			} else if (response.status == constants.STATUS_ACCEPTED) {
				alert(res.message)
			}
		})

		xhr.fail((res) => {
			if (res.responseJSON) {
				let json = res.responseJSON
				alert(json.message)
			} else {
				alert(constants.MESSAGE_ERROR)
			}
		})
	}

	handleRemoveNotification() {
		let self = this

		let fn = (id) => {
			let notifications = self.state.notifications_
			for (let i = 0; i < notifications.length; i++) {
				const notification = notifications[i]
				if (id == notification.id) {
					self.updateEventAsSeen(id)

					notifications.splice(i, 1)

					self.setState({ notifications_: notifications }, () => {
						$('select').material_select()
						self.initializePickers()
					})

					return
				}
			}
		}

		return fn
	}

	/* Notificaciones */

	initializePickers() {
		$('#content-input-d-date').html('')
		$('#content-input-d-date').append(`
      <label for="input-d-date">Fecha</label>
      <input type="text" id="input-d-date" class="datepicker" />`)

		$('#content-input-c-date-of').html('')
		$('#content-input-c-date-of').append(`
      <label for="input-c-date-of">Fecha de</label>
      <input type="text" id="input-c-date-of" class="datepicker" />`)

		$('#content-input-c-date-to').html('')
		$('#content-input-c-date-to').append(`
      <label for="input-c-date-to">Fecha de</label >
      <input type="text" id="input-c-date-to" class="datepicker" />`)

		$('#content-input-m-date-of').html('')
		$('#content-input-m-date-of').append(`
      <label for="input-m-date-of">Fecha de</label >
      <input type="text" id="input-m-date-of" class="datepicker" />`)

		$('#content-input-m-date-to').html('')
		$('#content-input-m-date-to').append(`
      <label for="input-m-date-to">A</label >
      <input type="text" id="input-m-date-to" class="datepicker" />`)

		if (window.SYSTEM_HOST !== 'scada.technotex.com') {
			$('.timepicker').pickatime({
				default: 'now',
				fromnow: 0,
				twelvehour: false,
				donetext: 'OK',
				cleartext: 'Limpiar',
				canceltext: 'Cancelar',
				autoclose: false,
				ampmclickable: true,
			})
		}

		$('.datepicker').pickadate({
			selectMonths: true,
			selectYears: 15,
			format: 'dd-mm-yyyy',
			today: 'Hoy',
			clear: 'Limpiar',
			close: 'Ok',
			closeOnSelect: true,
			monthsFull: [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre',
			],
			monthsShort: [
				'Ene',
				'Feb',
				'Mar',
				'Abr',
				'May',
				'Jun',
				'Jul',
				'Ago',
				'Sep',
				'Oct',
				'Nov',
				'Dic',
			],
			weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
			weekdaysFull: [
				'Domingo',
				'Lunes',
				'Martes',
				'Miércoles',
				'Jueves',
				'Viernes',
				'Sabado',
			],
			weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		})

		$('.datepicker').on('mousedown', function (event) {
			event.preventDefault()
		})
	}

	getReports() {
		let self = this

		let url = `${constants.URL_SERVER_REPORTS}/list`

		let xhr = $.ajax({
			url: url,
			type: constants.METHOD_GET,
			dataType: constants.JSON,
		})

		xhr.done((res, _, response) => {
			if (response.status == constants.STATUS_OK) {
				const nReports = res.docs || []; 

				self.setState({ 
					reports_: nReports.sort(self.orderByName())
				}, () => {
					$('select').material_select()
					self.initializePickers()
				})
			} else if (response.status == constants.STATUS_ACCEPTED) {
				alert(res.message)
			}
		})

		xhr.fail((res) => {
			if (res.responseJSON) {
				let json = res.responseJSON
				alert(json.message)
			} else {
				alert(constants.MESSAGE_ERROR)
			}
		})
	}

	generateReport(json) {
		const xhr = $.ajax({
			url: `${constants.URL_SERVER_REPORTS}/generate`,
			type: constants.METHOD_POST,
			contentType: constants.APPLICATION_JSON,
			data: JSON.stringify(json),
		})

		xhr.done((res, _, response) => {
			if (response.status == constants.STATUS_CREATED) {
				let message = 'El reporte se genero correctamente'
				Materialize.toast(message, 2500)

				let url = `${constants.URL_SERVER_REPORTS}/generate/${res.doc}`
				window.open(url, '_blank')
			} else if (response.status == constants.STATUS_ACCEPTED) {
				Materialize.toast(res.message, 2500)
			}

			if (json.report === DAILY) {
				$('#btn-daily').attr('disabled', false)
				$('#btn-daily').html(BTN_HTML)
				$('#btn-daily').append('Generar')
			} else if (json.report === MONTHLY) {
				$('#btn-monthly').attr('disabled', false)
				$('#btn-monthly').html(BTN_HTML)
				$('#btn-monthly').append('Generar')
			} else if (json.report === ANNUAL) {
				$('#btn-annual').attr('disabled', false)
				$('#btn-annual').html(BTN_HTML)
				$('#btn-annual').append('Generar')
			} else if (json.report === CUSTOM) {
				$('#btn-custom').attr('disabled', false)
				$('#btn-custom').html(BTN_HTML)
				$('#btn-custom').append('Generar')
			}
		})

		xhr.fail((res) => {
			if (res.responseJSON) {
				let json = res.responseJSON
				Materialize.toast(json.message, 2500)
			} else {
				Materialize.toast(constants.MESSAGE_ERROR, 2500)
			}

			if (json.report === DAILY) {
				$('#btn-daily').attr('disabled', false)
				$('#btn-daily').html(BTN_HTML)
				$('#btn-daily').append('Generar')
			} else if (json.report === MONTHLY) {
				$('#btn-monthly').attr('disabled', false)
				$('#btn-monthly').html(BTN_HTML)
				$('#btn-monthly').append('Generar')
			} else if (json.report === ANNUAL) {
				$('#btn-annual').attr('disabled', false)
				$('#btn-annual').html(BTN_HTML)
				$('#btn-annual').append('Generar')
			} else if (json.report === CUSTOM) {
				$('#btn-custom').attr('disabled', false)
				$('#btn-custom').html(BTN_HTML)
				$('#btn-custom').append('Generar')
			}
		})
	}

	parseDate(s) {
		if (s) {
			if (isString(s)) {
				let elements = s.split('-')
				elements = elements.reverse()

				let value = ''
				for (let i = 0; i < elements.length; i++) {
					const element = elements[i]
					if (i == 0) {
						value = `${element}`
					} else {
						value = `${value}-${element}`
					}
				}

				return value
			}
		}

		return s
	}

	handleGoConfigurations() {
		const fn = (evt) => {
			evt.preventDefault()
			evt.stopPropagation()

			location.href = '/configuration/matrices'
		}

		return fn
	}

	handleCreate(value) {
		let self = this

		const fn = (evt) => {
			evt.preventDefault()

			if (value == DAILY) {
				let inputReport = document.querySelector('#input-d-report')
				let inputDate = document.querySelector('#input-d-date')

				let sId = inputReport.value.trim()
				if (sId == '') return

				let date = inputDate.value.trim()
				if (date == '') return

				let report_id = parseInt(sId)
				if (!isNumber(report_id)) return

				$('#btn-daily').attr('disabled', true)
				$('#btn-daily').text('Cargando ...')

				date = self.parseDate(date)

				let json = {
					report_id: report_id,
					date_of: date,
					report: DAILY,
				}

				self.generateReport(json)

				/*let o = {
					evt: constants.EVENT_REQUEST_REPORT,
					content: content
				}

				console.log("REQ: ", o);

				if (self.ws) {
					let msg = JSON.stringify(o);
					self.ws.send(msg);
				}*/
			} else if (value == MONTHLY) {
				let inputReport = document.querySelector('#input-m-report')
				let inputDateOf = document.querySelector('#input-m-date-of')
				let inputDateTo = document.querySelector('#input-m-date-to')
				let inputType = document.querySelector('#input-m-type')

				let sId = inputReport.value.trim()
				if (sId == '') return

				let dateOf = inputDateOf.value.trim()
				if (dateOf == '') return

				let dateTo = inputDateTo.value.trim()
				if (dateTo == '') return

				let type = inputType.value.trim()

				let report_id = parseInt(sId)
				if (!isNumber(report_id)) return

				$('#btn-monthly').attr('disabled', true)
				$('#btn-monthly').text('Cargando ...')

				dateOf = self.parseDate(dateOf)
				dateTo = self.parseDate(dateTo)

				let json = {
					report_id: report_id,
					date_of: dateOf,
					date_to: dateTo,
					report: MONTHLY,
					type: type,
				}

				self.generateReport(json)

				/*let o = {
					evt: constants.EVENT_REQUEST_REPORT,
					content: content
				}

				console.log("REQ: ", o);

				if (self.ws) {
					let msg = JSON.stringify(o);
					self.ws.send(msg);
				}*/
			} else if (value == ANNUAL) {
				let inputReport = document.querySelector('#input-a-report')
				let inputYear = document.querySelector('#input-a-year')

				let sId = inputReport.value.trim()
				if (sId == '') return

				let sYear = inputYear.value.trim()
				if (sYear == '') return

				let report_id = parseInt(sId)
				if (!isNumber(report_id)) return

				let year = parseInt(sYear)
				if (!isNumber(year)) return

				$('#btn-annual').attr('disabled', true)
				$('#btn-annual').text('Cargando ...')

				let json = {
					report_id: report_id,
					year: year,
					report: ANNUAL,
				}

				self.generateReport(json)

				/*let o = {
					evt: constants.EVENT_REQUEST_REPORT,
					content: content
				}

				console.log("REQ: ", o);

				if (self.ws) {
					let msg = JSON.stringify(o);
					self.ws.send(msg);
				}*/
			} else if (value == CUSTOM) {
				let inputReport = document.querySelector('#input-c-report')
				let inputDateOf = document.querySelector('#input-c-date-of')
				let inputDateTo = document.querySelector('#input-c-date-to')
				let inputTimeOf = document.querySelector('#input-c-time-of')
				let inputTimeTo = document.querySelector('#input-c-time-to')
				let inputType = document.querySelector('#input-c-type')

				let sId = inputReport.value.trim()
				if (sId == '') return

				let dateOf = inputDateOf.value.trim()
				if (dateOf == '') return

				let dateTo = inputDateTo.value.trim()
				if (dateTo == '') return

				let timeOf = inputTimeOf.value.trim()
				if (timeOf == '') return

				let timeTo = inputTimeTo.value.trim()
				if (timeTo == '') return

				let type = inputType.value.trim()
				if (type == '') return

				let report_id = parseInt(sId)
				if (!isNumber(report_id)) return

				$('#btn-custom').attr('disabled', true)
				$('#btn-custom').text('Cargando ...')

				dateOf = self.parseDate(dateOf)
				dateTo = self.parseDate(dateTo)

				let json = {
					report_id: report_id,
					date_of: `${dateOf} ${timeOf}:00`,
					date_to: `${dateTo} ${timeTo}:00`,
					type: type,
					report: CUSTOM,
				}

				self.generateReport(json)

				/*let o = {
					evt: constants.EVENT_REQUEST_REPORT,
					content: content
				}

				console.log("REQ: ", o);

				if (self.ws) {
					let msg = JSON.stringify(o);
					self.ws.send(msg);
				}*/
			}
		}

		return fn
	}

	orderByName() {
		const fn = (a, b) => {
			const aName = a.name?.replaceAll('PERSONALIZADO.', '').toLowerCase()
			const bName = b.name?.replaceAll('PERSONALIZADO.', '').toLowerCase()

			if (aName < bName) {
				return -1
			}

			if (aName > bName) {
				return 1
			}

			return 0
		}

		return fn
	}

	createOptReport(prefix) {
		let self = this

		let fn = (item, index) => {
			let name = self.getName(prefix, item.name)
			if (!name) return

			return (
				<option key={index} value={item.id}>
					{name}
				</option>
			)
		}

		return fn
	}

	getName(prefix, nameIn) {
		let index = nameIn.indexOf(prefix)
		if (index === 0) {
			let parts = nameIn.split('.')
			if (parts.length > 1) {
				let name = parts[1]
				return name
			}
		}

		return false
	}

	render(_, state) {
		let notifications = state.notifications_

		return (
			<div>
				<Header
					module={constants.REPORTS_MODULE}
					notifications={notifications}
					onRemoveNotification={this.handleRemoveNotification()}
				/>

				<section className='contenedor_root animated fadeIn'>
					<div className='reports'>
						<div className='container'>
							<div className='row'>
								<div className='col s12 m3 reportes'>
									<ul
										className='collapsible popout'
										data-collapsible='expandable'
									>
										<li>
											<div className='collapsible-header'>
												<h4>
													<i className='material-icons'>today</i>
													<br />
													Reporte Diario
												</h4>
											</div>
											<div className='collapsible-body'>
												<form
													className='formulario'
													onSubmit={this.handleCreate(DAILY)}
												>
													<div className='all_notes'>
														<div className='variable'>
															<label htmlFor='input-d-report'>Reporte</label>
															<select
																className='browser-default sion-select'
																id='input-d-report'
															>
																<option value='' disabled selected>
																	Reporte
																</option>
																{state.reports_.map(
																	this.createOptReport(DAILY_PREFIX)
																)}
															</select>
														</div>

														<div className='variable'>
															<div className='row'>
																<div
																	id='content-input-d-date'
																	className='input-field col s12'
																></div>
															</div>
														</div>

														<div className='row'>
															<div className=' col s12 m12'>
																<div className='btn_ttx green'>
																	<button id='btn-daily'>
																		<i className='material-icons prefix left '>
																			file_download
																		</i>
																		Generar
																	</button>
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>
										</li>
									</ul>
								</div>

								{USER_NAME !== 'Litoral Costero' &&
								USER_NAME !== 'Medición Costero' ? (
									<>
										<div className='col s12 m3 reportes'>
											<ul
												className='collapsible popout'
												data-collapsible='expandable'
											>
												<li>
													<div className='collapsible-header'>
														<h4>
															<i className='material-icons'>date_range</i>
															<br />
															Reporte Personalizado
														</h4>
													</div>

													<div className='collapsible-body'>
														<form
															className='formulario'
															onSubmit={this.handleCreate(CUSTOM)}
														>
															<div className='all_notes'>
																<div className='variable'>
																	<label htmlFor='input-c-report'>
																		Reporte
																	</label>
																	<select
																		className='browser-default sion-select'
																		id='input-c-report'
																	>
																		<option value='' disabled selected>
																			Reporte
																		</option>
																		{state.reports_.map(
																			this.createOptReport(CUSTOM_PREFIX)
																		)}
																	</select>
																</div>

																<div className='row'>
																	<div
																		id='content-input-c-date-of'
																		className='input-field col s6'
																	></div>

																	<div className='input-field col s6'>
																		<label htmlFor='input-c-time-of'>
																			Hora de
																		</label>
																		{/*<input type="text" id="input-c-time-of" className="timepicker" /> */}

																		<input
																			id='input-c-time-of'
																			value='00:00'
																			className={
																				window.SYSTEM_HOST !==
																				'scada.technotex.com'
																					? 'timepicker'
																					: ''
																			}
																			type={
																				window.SYSTEM_HOST !==
																				'scada.technotex.com'
																					? 'text'
																					: 'time'
																			}
																		/>
																	</div>
																</div>

																<div className='row'>
																	<div
																		id='content-input-c-date-to'
																		className='input-field col s6'
																	></div>

																	<div className='input-field col s6'>
																		<label htmlFor='input-c-time-to'>
																			Hora de
																		</label>
																		{/*<input type="text" id="input-c-time-to" className="timepicker" />*/}

																		<input
																			id='input-c-time-to'
																			value='00:00'
																			className={
																				window.SYSTEM_HOST !==
																				'scada.technotex.com'
																					? 'timepicker'
																					: ''
																			}
																			type={
																				window.SYSTEM_HOST !==
																				'scada.technotex.com'
																					? 'text'
																					: 'time'
																			}
																		/>
																	</div>
																</div>

																<div className='variable'>
																	<label htmlFor='input-c-type'>Tipo</label>
																	<select
																		className='browser-default sion-select'
																		id='input-c-type'
																	>
																		<option value='' disabled selected>
																			Tipo
																		</option>
																		<option value={constants.NA}>Normal</option>
																		<option value={MINUTE}>Minuto</option>
																		<option value={HOUR}>Hora</option>
																		<option value={DAY}>Día</option>
																	</select>
																</div>

																<div className='row'>
																	<div className=' col s12 m12'>
																		<div className='btn_ttx green'>
																			<button id='btn-custom'>
																				<i className='material-icons prefix left '>
																					file_download
																				</i>
																				Generar
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</li>
											</ul>
										</div>

										<div className='col s12 m3 reportes'>
											<ul
												className='collapsible popout'
												data-collapsible='expandable'
											>
												<li>
													<div className='collapsible-header'>
														<h4>
															<i className='material-icons'>today</i>
															<br />
															Reporte Mensual
														</h4>
													</div>

													<div className='collapsible-body'>
														<form
															className='formulario'
															onSubmit={this.handleCreate(MONTHLY)}
														>
															<div className='all_notes'>
																<div className='variable'>
																	<label htmlFor='input-m-report'>
																		Reporte
																	</label>
																	<select
																		className='browser-default sion-select'
																		id='input-m-report'
																	>
																		<option value='' disabled selected>
																			Reporte
																		</option>
																		{state.reports_.map(
																			this.createOptReport(MONTHLY_PREFIX)
																		)}
																	</select>
																</div>

																<div className='row'>
																	<div
																		id='content-input-m-date-of'
																		className='input-field col s12'
																	></div>
																</div>

																<div className='row'>
																	<div
																		id='content-input-m-date-to'
																		className='input-field col s12'
																	></div>
																</div>

																<div className='variable'>
																	<label htmlFor='input-m-type'>Tipo</label>
																	<select
																		className='browser-default sion-select'
																		id='input-m-type'
																	>
																		<option value='' selected>
																			POR DIA
																		</option>
																		<option value={DAILY}>CORTE POR DIA</option>
																	</select>
																</div>

																<div className='row'>
																	<div className=' col s12 m12'>
																		<div className='btn_ttx green'>
																			<button id='btn-monthly'>
																				<i className='material-icons prefix left '>
																					file_download
																				</i>
																				Generar
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</li>
											</ul>
										</div>

										<div className='col s12 m3 reportes'>
											<ul
												className='collapsible popout'
												data-collapsible='expandable'
											>
												<li>
													<div className='collapsible-header'>
														<h4>
															<i className='material-icons'>today</i>
															<br />
															Reporte Anual
														</h4>
													</div>

													<div className='collapsible-body'>
														<form
															className='formulario'
															onSubmit={this.handleCreate(ANNUAL)}
														>
															<div className='all_notes'>
																<div className='variable'>
																	<label htmlFor='input-a-report'>
																		Reporte
																	</label>
																	<select
																		className='browser-default sion-select'
																		id='input-a-report'
																	>
																		<option value='' disabled selected>
																			Reporte
																		</option>
																		{state.reports_.map(this.createOptReport(ANNUAL_PREFIX))}
																	</select>
																</div>

																<div className='variable'>
																	<label htmlFor='input-a-year'>Año</label>
																	<select
																		className='browser-default sion-select'
																		id='input-a-year'
																	>
																		<option value='' disabled selected>
																			Año
																		</option>
																		<option>2017</option>
																		<option>2018</option>
																		<option>2019</option>
																		<option>2020</option>
																		<option>2021</option>
																		<option>2022</option>
																		<option>2023</option>
																	</select>
																</div>

																<div className='row'>
																	<div className=' col s12 m12'>
																		<div className='btn_ttx green'>
																			<button id='btn-annual'>
																				<i className='material-icons prefix left '>
																					file_download
																				</i>
																				Generar
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</li>
											</ul>
										</div>
									</>
								) : (
									false
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Content

//render(<Content />, document.getElementById('content-main'));
