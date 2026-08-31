import { h, render, Component } from 'preact'
import { isDate, isNumber, isNaN, clone } from 'underscore'

import Header from '../header.jsx'
import constants from '../constants.js'

import Chart from './chart.jsx'
import ChartEmitter from './emitter.js'

const CHART_24 = '24'
const CHART_ANNUAL = 'annual'

class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notifications_: [],

      // Setpoints
      variables: [],
      variables_: [],
      alarms_: [],

      // Events
      files: [],
      eventChart: false,

      chart24Emitter: new ChartEmitter(),
      chartAnnualEmitter: new ChartEmitter(),
    }

    let self = this

    // Evento de Graficas de 24 hrs
    this.state.chart24Emitter.on(
      constants.EVENT_VARIABLES,
      (variables, setpoints) => {
        self.setState({ variables_: variables, variables: setpoints }, () => {
          $(`#setpoint-24`).modal('open')
        })
      }
    )

    this.state.chart24Emitter.on(constants.EVENT_OPEN_EVENT_CHART, (id) => {
      self.getEventChart(id)
    })

    this.state.chart24Emitter.on(
      constants.EVENT_OPEN_CREATE_EVENT_CHART,
      (json) => {
        let keyInputVariableEvent = `#input-variable-event-24`
        let keyInputCreatedAtEvent = `#input-created-at-event-24`

        let inputVariable = document.querySelector(keyInputVariableEvent)
        let inputCreatedAt = document.querySelector(keyInputCreatedAtEvent)

        inputVariable.value = json.variable_name
        inputCreatedAt.value = json.created_at_in

        self.setState({ eventChart: json, files: [] }, () => {
          $(`#events-24`).modal('open')
        })
      }
    )

    // Evento de Graficas Anual
    this.state.chartAnnualEmitter.on(
      constants.EVENT_VARIABLES,
      (variables, setpoints) => {
        self.setState({ variables_: variables, variables: setpoints }, () => {
          $(`#setpoint-annual`).modal('open')
        })
      }
    )

    this.state.chartAnnualEmitter.on(constants.EVENT_OPEN_EVENT_CHART, (id) => {
      self.getEventChart(id)
    })

    this.state.chartAnnualEmitter.on(
      constants.EVENT_OPEN_CREATE_EVENT_CHART,
      (json) => {
        let keyInputVariableEvent = `#input-variable-event-annual`
        let keyInputCreatedAtEvent = `#input-created-at-event-annual`

        let inputVariable = document.querySelector(keyInputVariableEvent)
        let inputCreatedAt = document.querySelector(keyInputCreatedAtEvent)

        inputVariable.value = json.variable_name
        inputCreatedAt.value = json.created_at_in

        self.setState({ eventChart: json, files: [] }, () => {
          $(`#events-annual`).modal('open')
        })
      }
    )
  }

  componentDidMount() {
    let self = this

    $('.modal').modal()

    Highcharts.createElement(
      'link',
      {
        href: 'https://fonts.googleapis.com/css?family=Unica+One',
        rel: 'stylesheet',
        type: 'text/css',
      },
      null,
      document.getElementsByTagName('head')[0]
    )

    if (CHART_THEME === constants.DARK_THEME) {
      Highcharts.theme = {
        colors: [
          '#2b908f',
          '#90ee7e',
          '#f45b5b',
          '#7798BF',
          '#aaeeee',
          '#ff0066',
          '#eeaaee',
          '#55BF3B',
          '#DF5353',
          '#7798BF',
          '#aaeeee',
        ],
        chart: {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, '#2a2a2b'],
              [1, '#3e3e40'],
            ],
          },
          style: {
            fontFamily: "'Unica One', sans-serif",
          },
          plotBorderColor: '#606063',
        },
        title: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px',
          },
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
          },
        },
        xAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3',
            },
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#A0A0A3',
            },
          },
        },
        yAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3',
            },
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3',
            },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          style: {
            color: '#F0F0F0',
          },
        },
        plotOptions: {
          series: {
            dataLabels: {
              color: '#B0B0B3',
            },
            marker: {
              lineColor: '#333',
            },
          },
          boxplot: {
            fillColor: '#505053',
          },
          candlestick: {
            lineColor: 'white',
          },
          errorbar: {
            color: 'white',
          },
        },
        legend: {
          itemStyle: {
            color: '#E0E0E3',
          },
          itemHoverStyle: {
            color: '#FFF',
          },
          itemHiddenStyle: {
            color: '#606063',
          },
        },
        credits: {
          style: {
            color: '#666',
          },
        },
        labels: {
          style: {
            color: '#707073',
          },
        },

        drilldown: {
          activeAxisLabelStyle: {
            color: '#F0F0F3',
          },
          activeDataLabelStyle: {
            color: '#F0F0F3',
          },
        },

        navigation: {
          buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
              fill: '#505053',
            },
          },
        },

        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
              color: '#CCC',
            },
            states: {
              hover: {
                fill: '#707073',
                stroke: '#000000',
                style: {
                  color: 'white',
                },
              },
              select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                  color: 'white',
                },
              },
            },
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
            backgroundColor: '#333',
            color: 'silver',
          },
          labelStyle: {
            color: 'silver',
          },
        },

        navigator: {
          handles: {
            backgroundColor: '#666',
            borderColor: '#AAA',
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
            color: '#7798BF',
            lineColor: '#A6C7ED',
          },
          xAxis: {
            gridLineColor: '#505053',
          },
        },

        scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043',
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)',
      }

      // Apply the theme
      Highcharts.setOptions(Highcharts.theme)
    }

    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    Highcharts.setOptions({
      time: {
        timezone: tz,
      },
    })

    Highcharts.setOptions({
      lang: {
        loading: 'Cargando...',
        months: [
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
        shortMonths: [
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
        weekdays: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
        ],
        decimalPoint: '.',
        numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
        resetZoom: 'Reiniciar zoom',
        resetZoomTitle: 'Reiniciar nivel de zoom 1:1',
        thousandsSep: ' ',
        rangeSelectorZoom: 'Zoom',
        rangeSelectorFrom: 'Desde',
        rangeSelectorTo: 'A',
        viewFullscreen: 'Vista pantalla completa',
        printChart: 'Imprimir grafico',
        downloadPNG: 'Descargar imagen PNG',
        downloadJPEG: 'Descargar imagen JPG',
        downloadPDF: 'Descargar PDF',
        downloadSVG: 'Descargar imagen SVG',
        contextButtonTitle: 'Menu Grafico',
        downloadCSV: 'Descargar CSV',
        downloadXLS: 'Descargar XLS',
        openInCloud: 'Abrir en Highcharts Cloud',
        viewData: 'Vista de tabla de datos',
      },
    })

    this.getNotifications()
  }

  getRecords24hrsVariable() {
    let self = this

    let fn = (f) => {
      let variable_id = parseInt(window.VariableID)

      //let now = new Date('2017-02-01 00:00:00');
      let now = new Date()
      let time = now.getTime() - 1000 * 60 * 60 * 24
      let start = new Date(time)

      let json = {
        variables: [variable_id],
        start_date: this.getDateToString(start),
        final_date: this.getDateToString(now),
      }

      console.log('24: ', json)

      let url = `${constants.URL_SERVER_VARIABLES}/record`
      if (window.VariableIsCustom) {
        url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/record`
      }

      let xhr = $.ajax({
        url: url,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json),
      })

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          let docs = res.docs

          console.log('Final 24hrs  ...', docs)

          if (docs.length > 0) {
            if (window.VariableIsCustom) {
              docs[0].variable_is_custom = true
            } else {
              docs[0].variable_is_custom = false
            }
          }

          let o = {
            variables: docs,
            start_date: json.start_date,
            final_date: json.final_date,
            title: 'Grafica de 24 hrs',
            subtitle: `${json.start_date} al ${json.final_date}`,
          }

          f(null, o)
        } else if (response.status === constants.STATUS_ACCEPTED) {
          f(res.message)
        }
      })

      xhr.fail((res, status, respose) => {
        if (res.responseJSON) {
          let json = res.responseJSON
          f(json.message)
        } else {
          f(constants.MESSAGE_ERROR)
        }
      })
    }

    return fn
  }

  getRecordsAnnualVariable() {
    let self = this

    let fn = (f) => {
      let variable_id = parseInt(window.VariableID)

      //let now = new Date('2017-02-01 00:00:00');
      let now = new Date()
      let time = now.getTime() - 1000 * 60 * 60 * 24 * 365
      let start = new Date(time)

      let start_date = this.getDateToString(start)
      let final_date = this.getDateToString(now)

      let json = {
        variables: [variable_id],
        start_date: start_date,
        final_date: final_date,
      }

      console.log('Anual: ', json)

      let url = `${constants.URL_SERVER_VARIABLES}/record`
      if (window.VariableIsCustom) {
        url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/record`
      }

      let xhr = $.ajax({
        url: url,
        type: constants.METHOD_POST,
        contentType: constants.APPLICATION_JSON,
        data: JSON.stringify(json),
      })

      xhr.done((res, status, response) => {
        if (response.status === constants.STATUS_OK) {
          let docs = res.docs

          console.log('Final Annual ...', docs)

          if (docs.length > 0) {
            if (window.VariableIsCustom) {
              docs[0].variable_is_custom = true
            } else {
              docs[0].variable_is_custom = false
            }
          }

          let o = {
            variables: docs,
            start_date: json.start_date,
            final_date: json.final_date,
            title: 'Grafica Anual',
            subtitle: `${json.start_date}`,
          }

          f(null, o)
        } else if (response.status === constants.STATUS_ACCEPTED) {
          f(res.message)
        }
      })

      xhr.fail((res, status, respose) => {
        if (res.responseJSON) {
          let json = res.responseJSON
          f(json.message)
        } else {
          f(constants.MESSAGE_ERROR)
        }
      })
    }

    return fn
  }

  getEventChart(id) {
    let self = this

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_CHART_EVENTS}/${id}`,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.setState({ eventChart: res.doc }, () => {
          $(`#event-chart`).modal('open')
        })
      } else if (response.status === constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON
        Materialize.toast(json.message, 2500)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)
      }
    })
  }

  addEventChart(json, fn) {
    let self = this

    let formData = new FormData()

    formData.append('json', JSON.stringify(json))

    let files = self.state.files
    let size = files.length
    if (size > 0) {
      for (let i = 0; i < size; i++) {
        const file = files[i]
        let key = `file_${i + 1}`
        formData.append(key, file)
      }
    }

    formData.append('size', size)

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_CHART_EVENTS}`,
      type: constants.METHOD_POST,
      processData: false,
      contentType: false,
      data: formData,
    })

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_CREATED) {
        fn(null, res.doc)
      } else if (response.status === constants.STATUS_ACCEPTED) {
        fn(res.message)
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON
        fn(json.message)
      } else {
        fn(constants.MESSAGE_ERROR)
      }
    })
  }

  getNotifications() {
    let self = this

    let url = `${constants.URL_SERVER_LOG_EVENTS}/notifications?is_seen=false`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        self.setState({ notifications_: res.docs })
      } else if (response.status === constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON
        Materialize.toast(json.message, 2500)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)
      }
    })
  }

  updateEventAsSeen(id) {
    let self = this

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_LOG_EVENTS}/notifications/${id}`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status === constants.STATUS_OK) {
        console.log('Notificación Ok')
      } else if (response.status === constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON
        Materialize.toast(json.message, 2500)
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)
      }
    })
  }

  handleNotifications() {
    let self = this

    let fn = () => {
      self.getNotifications()
    }

    return fn
  }

  handleRemoveNotification() {
    let self = this

    let fn = (id) => {
      let notifications = self.state.notifications_
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i]
        if (id === notification.id) {
          self.updateEventAsSeen(id)

          notifications.splice(i, 1)

          self.setState({ notifications_: notifications })
          return
        }
      }
    }

    return fn
  }

  handleInsert(key) {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let keyInputVariables = `#input-sp-variables-${key}`
      let keyInputAlarms = `#input-sp-alarms-${key}`

      let inputVariables = document.querySelector(keyInputVariables)
      let inputAlarms = document.querySelector(keyInputAlarms)

      let variable_id = inputVariables.value.trim()
      let alarma_id = inputAlarms.value.trim()

      variable_id = parseInt(variable_id)
      alarma_id = parseInt(alarma_id)

      if (isNaN(variable_id)) return
      if (isNaN(alarma_id)) return

      if (variable_id === '' || variable_id <= 0) return
      if (alarma_id === '' || alarma_id <= 0) return

      let variables = self.state.variables
      let variables_ = self.state.variables_

      for (let i = 0; i < variables_.length; i++) {
        const variable_ = variables_[i]
        if (variable_.id === variable_id) {
          let alarms = variable_.alarms
          if (!alarms) return

          for (let j = 0; j < alarms.length; j++) {
            const alarm = alarms[j]
            if (alarm.id === alarma_id) {
              let o = clone(alarm)

              o.variable_name = `${variable_.device}.${variable_.name}`
              o.variable_unit = variable_.unit
              variables.push(o)

              self.setState({ variables: variables })
              return
            }
          }

          return
        }
      }
    }

    return fn
  }

  handleRemoveVariable(index) {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let variables = self.state.variables
      variables.splice(index, 1)

      self.setState({ variables: variables })
    }

    return fn
  }

  handleChangeVariable() {
    let self = this

    let fn = (evt) => {
      let value = evt.target.value
      value = parseFloat(value)

      if (value) {
        if (value > 0) {
          let variables = self.state.variables_
          for (let i = 0; i < variables.length; i++) {
            const variable = variables[i]
            if (variable.id === value) {
              if (!variable.alarms) variable.alarms = []

              self.setState({ alarms_: variable.alarms })
              return
            }
          }
        }
      }

      self.setState({ alarms_: [] })
    }

    return fn
  }

  handleInsertSetpoint(key) {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let variables = clone(self.state.variables)
      if (key === CHART_24) {
        self.state.chart24Emitter.emit(constants.EVENT_SETPOINTS, variables)
      } else if (key === CHART_ANNUAL) {
        self.state.chartAnnualEmitter.emit(constants.EVENT_SETPOINTS, variables)
      }
    }

    return fn
  }

  handleCreateEvent(key) {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let keyInputNameEvent = `#input-name-event-${key}`
      let keyInputDescriptionEvent = `#input-description-event-${key}`

      let inputName = document.querySelector(keyInputNameEvent)
      let inputDescription = document.querySelector(keyInputDescriptionEvent)

      let name = inputName.value.trim()
      let description = inputDescription.value.trim()

      if (name === '' || description === '') {
        evt.stopPropagation()
        return
      }

      let json = {
        record_id: self.state.eventChart.record_id,
        variable_id: self.state.eventChart.variable_id,
        created_at_in: self.state.eventChart.created_at_in,
        name: name,
        description: description,
      }

      self.addEventChart(json, (err, doc) => {
        doc.value = self.state.eventChart.value
        doc.variable_name = self.state.eventChart.variable_name

        if (!err) {
          if (key === CHART_24) {
            self.state.chart24Emitter.emit(
              constants.EVENT_INSERT_EVENT_CHART,
              doc
            )
          } else if (key === CHART_ANNUAL) {
            self.state.chartAnnualEmitter.emit(
              constants.EVENT_INSERT_EVENT_CHART,
              doc
            )
          }
        }

        self.setState({ files: [] })

        inputName.value = ''
        inputDescription.value = ''

        $(`#events-${key}`).modal('close')
      })
    }

    return fn
  }

  handleChangeFile() {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let filesIn = []
      let files = evt.target.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        filesIn.push(file)
      }

      self.setState({ files: filesIn }, () => {
        let keyInputFilesEvent = `#input-files-event-24`
        let inputFile = document.querySelector(keyInputFilesEvent)
        let value = ''

        let files = self.state.files
        let size = files.length
        if (size === 0) {
          if (inputFile) inputFile.value = value
          return
        }

        for (let i = 0; i < size; i++) {
          const file = files[i]
          if (value === '') {
            value = `${file.name}`
          } else {
            value = `${file.name}, ${value}`
          }
        }

        if (inputFile) inputFile.value = value
      })
    }

    return fn
  }

  handleRemoveFile(index) {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let files = self.state.files
      files.splice(index, 1)

      self.setState({ files: files }, () => {
        let keyInputFilesEvent = `#input-files-event-24`
        let inputFile = document.querySelector(keyInputFilesEvent)
        let value = ''

        let files = self.state.files
        let size = files.length
        if (size === 0) {
          if (inputFile) inputFile.value = value
          return
        }

        for (let i = 0; i < size; i++) {
          const file = files[i]
          if (value === '') {
            value = `${file.name}`
          } else {
            value = `${file.name}, ${value}`
          }
        }

        if (inputFile) inputFile.value = value
      })
    }

    return fn
  }

  handleBack(key) {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      $(`#setpoint-${key}`).modal('close')

      let o = {
        variables: [],
        variables_: [],
        alarms_: [],
      }

      self.setState(o)
    }

    return fn
  }

  getDateToString(date) {
    let str = 'N/A'

    if (isDate(date) || isNumber(date)) {
      date = new Date(date)

      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      if (month < 10) {
        month = `0${month}`
      }

      if (day < 10) {
        day = `0${day}`
      }

      let hour = date.getHours()
      let min = date.getMinutes()
      let sec = date.getSeconds()

      if (hour < 10) {
        hour = `0${hour}`
      }

      if (min < 10) {
        min = `0${min}`
      }

      if (sec < 10) {
        sec = `0${sec}`
      }

      str = `${year}-${month}-${day} ${hour}:${min}:${sec}`
    }

    return str
  }

  createOptVariable() {
    let fn = (item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.device}.{item.name}
        </option>
      )
    }

    return fn
  }

  createOptAlarm() {
    let fn = (item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    }

    return fn
  }

  createItemSetpoint() {
    let self = this

    let fn = (item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.variable_name}</td>
          <td>{item.variable_unit}</td>
          <td>{item.name}</td>
          <td>{item.value}</td>
          <td>{item.unit}</td>
          <td>
            <a
              title='Borrar'
              className='btn-floating red'
              href='#'
              onClick={self.handleRemoveVariable(index)}
            >
              <i className='material-icons'>delete</i>
            </a>
          </td>
        </tr>
      )
    }

    return fn
  }

  createItemEventFile() {
    let self = this

    let fn = (item, index) => {
      return (
        <div className='sion-chip' key={index}>
          {item.name}
          <i
            className='close material-icons'
            onClick={self.handleRemoveFile(index)}
          >
            close
          </i>
        </div>
      )
    }

    return fn
  }

  createItemFile() {
    let self = this

    let fn = (file, index) => {
      let eventChart = self.state.eventChart
      let url = `/server/chart_events/file/${eventChart.id}/${file}`

      return (
        <a key={index} href={url} target='_blank'>
          {file}
          <br />
        </a>
      )
    }

    return fn
  }

  render(props, state) {
    let notifications = state.notifications_

    let axesGroup = false
    if (
      window.SYSTEM_HOST === 'sepec.technotex.com' ||
      window.SYSTEM_HOST === 'scada.technotex.com'
    )
      axesGroup = true

    return (
      <div>
        <Header
          module={constants.GRAPHIC_MODULE}
          notifications={notifications}
          onRemoveNotification={this.handleRemoveNotification()}
        />

        <section class='contenedor_root_graf animated fadeIn'>
          <Chart
            chart='24'
            init={this.getRecords24hrsVariable()}
            status_tools={false}
            RT={true}
            AG={axesGroup}
            onNotifications={this.handleNotifications()}
            chartEmitter={this.state.chart24Emitter}
          />

          <Chart
            chart='annual'
            init={this.getRecordsAnnualVariable()}
            status_tools={false}
            chartEmitter={this.state.chartAnnualEmitter}
          />
        </section>

        <div id='events-24' className='modal modal_evento'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown sion-modal-icon'>
              date_range
            </i>
            <div className='modal_box animated fadeIn'>
              <h5>Crear Evento</h5>
              <br />
              <form
                id='form-event-24'
                className='formulario'
                onSubmit={this.handleCreateEvent(CHART_24)}
              >
                <div className='input-field col s12 m6'>
                  <input
                    id='input-name-event-24'
                    type='text'
                    className='validate'
                    placeholder='Nombre'
                  />
                </div>
                <div className='input-field col s12 m6'>
                  <input
                    id='input-description-event-24'
                    type='text'
                    className='validate'
                    placeholder='Descripción'
                  />
                </div>
                <div className='dates col s12 m6'>
                  <input
                    id='input-variable-event-24'
                    placeholder='Variable'
                    disabled='disabled'
                  />
                </div>
                <div className='dates col s12 m6'>
                  <input
                    id='input-created-at-event-24'
                    placeholder='Fecha'
                    disabled='disabled'
                  />
                </div>
                <div className='file-field input-field col s12 m12'>
                  <div className='btn rojottx_btn' style='width: 20%;'>
                    <span>Subir</span>
                    <input
                      id='input-file-event-24'
                      type='file'
                      multiple
                      onChange={this.handleChangeFile()}
                    />
                  </div>
                  <div className='file-path-wrapper'>
                    <input
                      id='input-files-event-24'
                      className='file-path validate'
                      type='text'
                      placeholder='Subir un archivos'
                    />
                  </div>
                </div>

                <div id='content-files-event-24' className='chips_var'>
                  {this.state.files.map(this.createItemEventFile())}
                </div>

                <button
                  type='button'
                  className='modal-action modal-close btn btn_ttx_error darken-3'
                >
                  Cancelar
                </button>
                <button type='submit' className='btn btn_ttx_success'>
                  Aceptar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div id='events-annual' className='modal modal_evento'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown sion-modal-icon'>
              date_range
            </i>
            <div className='modal_box animated fadeIn'>
              <h5>Crear Evento</h5>
              <br />
              <form
                id='form-event-annual'
                className='formulario'
                onSubmit={this.handleCreateEvent(CHART_ANNUAL)}
              >
                <div className='input-field col s12 m6'>
                  <input
                    id='input-name-event-annual'
                    type='text'
                    className='validate'
                    placeholder='Nombre'
                  />
                </div>
                <div className='input-field col s12 m6'>
                  <input
                    id='input-description-event-annual'
                    type='text'
                    className='validate'
                    placeholder='Descripción'
                  />
                </div>
                <div className='dates col s12 m6'>
                  <input
                    id='input-variable-event-annual'
                    placeholder='Variable'
                    disabled='disabled'
                  />
                </div>
                <div className='dates col s12 m6'>
                  <input
                    id='input-created-at-event-annual'
                    placeholder='Fecha'
                    disabled='disabled'
                  />
                </div>
                <div className='file-field input-field col s12 m12'>
                  <div className='btn rojottx_btn' style='width: 20%;'>
                    <span>Subir</span>
                    <input
                      id='input-file-event-annual'
                      type='file'
                      multiple
                      onChange={this.handleChangeFile()}
                    />
                  </div>
                  <div className='file-path-wrapper'>
                    <input
                      id='input-files-event-annual'
                      className='file-path validate'
                      type='text'
                      placeholder='Subir un archivos'
                    />
                  </div>
                </div>

                <div id='content-files-event-annual' className='chips_var'>
                  {this.state.files.map(this.createItemEventFile())}
                </div>

                <button
                  type='button'
                  className='modal-action modal-close btn btn_ttx_error darken-3'
                >
                  Cancelar
                </button>
                <button type='submit' className='btn btn_ttx_success'>
                  Aceptar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div id='setpoint-24' className='modal modal_evento'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown sion-modal-icon'>
              date_range
            </i>
            <div className='modal_box animated fadeIn'>
              <h5>Setpoints</h5>
              <br />
              <form
                id='form-set-point-24'
                className='formulario'
                onSubmit={this.handleInsertSetpoint(CHART_24)}
              >
                <div className='row'>
                  <div className='col s12 m5'>
                    <select
                      className='browser-default sion-select sion-margin-select'
                      id='input-sp-variables-24'
                      onChange={this.handleChangeVariable()}
                    >
                      <option value='-1'>Ninguno</option>
                      {state.variables_.map(this.createOptVariable())}
                    </select>
                  </div>

                  <div className='col s12 m5'>
                    <select
                      className='browser-default sion-select sion-margin-select'
                      id='input-sp-alarms-24'
                    >
                      <option value='-1'>Ninguno</option>
                      {state.alarms_.map(this.createOptAlarm())}
                    </select>
                  </div>

                  <div className='col s12 m2'>
                    <button
                      type='button'
                      className='btn blue'
                      onClick={this.handleInsert(CHART_24)}
                    >
                      <i className='material-icons'>add</i>
                    </button>
                  </div>
                </div>

                <div className='row'>
                  <table className='responsive-table centered'>
                    <thead>
                      <tr>
                        <th>Nº</th>
                        <th>Variable</th>
                        <th>Unidad</th>
                        <th>Alarma</th>
                        <th>Setpoint</th>
                        <th>Unidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.variables.map(this.createItemSetpoint())}
                    </tbody>
                  </table>
                </div>

                <div className='col s12 m12'>
                  <br />
                  <button
                    type='button'
                    className='btn grey darken-3'
                    onClick={this.handleBack(CHART_24)}
                  >
                    Cancelar
                  </button>
                  <button type='submit' className='btn red'>
                    Aplicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id='setpoint-annual' className='modal modal_evento'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown sion-modal-icon'>
              date_range
            </i>
            <div className='modal_box animated fadeIn'>
              <h5>Setpoints</h5>
              <br />
              <form
                id='form-set-point-annual'
                className='formulario'
                onSubmit={this.handleInsertSetpoint(CHART_ANNUAL)}
              >
                <div className='row'>
                  <div className='col s12 m5'>
                    <select
                      className='browser-default sion-select sion-margin-select'
                      id='input-sp-variables-annual'
                      onChange={this.handleChangeVariable()}
                    >
                      <option value='-1'>Ninguno</option>
                      {state.variables_.map(this.createOptVariable())}
                    </select>
                  </div>

                  <div className='col s12 m5'>
                    <select
                      className='browser-default sion-select sion-margin-select'
                      id='input-sp-alarms-annual'
                    >
                      <option value='-1'>Ninguno</option>
                      {state.alarms_.map(this.createOptAlarm())}
                    </select>
                  </div>

                  <div className='col s12 m2'>
                    <button
                      type='button'
                      className='btn blue'
                      onClick={this.handleInsert(CHART_ANNUAL)}
                    >
                      <i className='material-icons'>add</i>
                    </button>
                  </div>
                </div>

                <div className='row'>
                  <table className='responsive-table centered'>
                    <thead>
                      <tr>
                        <th>Nº</th>
                        <th>Variable</th>
                        <th>Unidad</th>
                        <th>Alarma</th>
                        <th>Setpoint</th>
                        <th>Unidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.variables.map(this.createItemSetpoint())}
                    </tbody>
                  </table>
                </div>

                <div className='col s12 m12'>
                  <br />
                  <button
                    type='button'
                    className='btn grey darken-3'
                    onClick={this.handleBack(CHART_ANNUAL)}
                  >
                    Cancelar
                  </button>
                  <button type='submit' className='btn red'>
                    Aplicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id='event-chart' className='modal modal_evento'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown sion-modal-icon'>
              date_range
            </i>
            <div className='modal_box animated fadeIn'>
              <h5>{this.state.eventChart.name}</h5>
              <br />
              <p>{this.state.eventChart.description}</p>
              <p>{this.state.files.map(this.createItemFile())}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// <div className="background"></div>

render(<Content />, document.getElementById('content-main'))
