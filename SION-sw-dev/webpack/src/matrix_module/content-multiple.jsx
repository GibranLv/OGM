import { h, render, Component } from 'preact'
import { parallel } from 'async'
import { isArray, sortBy, isString, isNumber, clone } from 'underscore'
import { w3cwebsocket } from 'websocket'

import ListView from './list-view.jsx'
import ListViewMin from './list-view-min.jsx'
import TableView from './table-view.jsx'
import TableViewCol from './table-view-col.jsx'
import ChartView from './chart-view.jsx'

import Header from './../header.jsx'
import constants from './../constants.js'

const wsURL = `ws://${URLWS}/ws`
const wsaURL = `ws://${URLWSA}/ws`

const LIST_VIEW = 1
const LIST_VIEW_MIN = 2
const TABLE_VIEW = 3
const CHART_VIEW = 4
const TABLE_VIEW_COL = 5

class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matrices_: [],
      notifications_: [],

      structures: [],
      view: TABLE_VIEW_COL,
      matrix: false,
      comment: false,

      log_alarms_view: false,
      logAlarm: false,

      variables_: [],
      footer_variables: [],
      log_alarms: [],

      matrix_sounds: [],
      active_vars: [],

      connection_errors_ws: 0,
      connection_errors_wsa: 0,
    }
  }

  componentDidMount() {
    let self = this

    $('.modal').modal({ dismissible: false })
    $('.collapsible').collapsible()

    setTimeout(() => {
      parallel(
        {
          configuration: (fn) => {
            self.getConfiguration(fn)
          },
          notifications: (fn) => {
            self.getNotifications(fn)
          },
          footer_variables: (fn) => {
            self.getFooterVariables(fn)
          },
          log_alarms: (fn) => {
            if (SYSTEM_HOST === 'sepec.technotex.com') {
              fn()
              return
            }

            self.getLogAlarms(fn)
          },
        },
        (err, res) => {
          if (err) {
            Materialize.toast(err, 2500)
            return
          }

          let footer_variables = res.footer_variables
          let notifications = res.notifications
          let configuration = res.configuration
          let log_alarms = res.log_alarms

          footer_variables = self.orderByOS(footer_variables, 'position', true)

          if (!configuration) configuration = []
          self.state.matrix_sounds = configuration
          self.getMatrices()

          if (!footer_variables) footer_variables = []
          if (!notifications) notifications = []
          if (!log_alarms) log_alarms = []

          self.setState({
            footer_variables: footer_variables,
            log_alarms: log_alarms,
            notifications_: res.docs,
          })
        }
      )

      this.setUpCharts()

      if (window.RT === constants.RT_WS) {
        this.serviceWS()
        this.serviceWSA()
      } else if (window.RT === constants.RT_HTTP) {
        setInterval(() => {
          self.getVariableLastRecords()
          self.getComments()
          self.getNotifications()
        }, 1000 * 15)
      }
    }, 1500)

    if (SYSTEM_HOST === 'sepec.technotex.com') {
      return
    }

    setInterval(() => {
      self.getLogAlarms()
    }, 1000 * 60 * 3)
  }

  setUpCharts() {
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

    /*Highcharts.setOptions({
      global: {
        useUTC: true
      }
    });*/

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
  }

  /* WS */
  serviceWS() {
    let self = this

    let v = window.sessionStorage.getItem(constants.ACCESS_TOKEN_WS)
    let url = `${wsURL}?${constants.ACCESS_TOKEN_WS}=${v}`
    this.ws = new w3cwebsocket(url, constants.TTX_PROTOCOOL)

    this.ws.onerror = () => {
      console.log('WS: connection Error')
    }

    this.ws.onopen = (evt) => {
      console.log('WS connected')
    }

    this.ws.onclose = (evt) => {
      console.log('WS closed')

      setTimeout(() => {
        let connection_errors = self.state.connection_errors_ws
        if (connection_errors >= constants.LIMIT_FOR_RECONNECTION) {
          connection_errors = 0
          self.getTokenWS()
        }

        connection_errors = connection_errors + 1
        self.state.connection_errors_ws = connection_errors

        self.serviceWS()
      }, 1000)
    }

    this.ws.onmessage = (evt) => {
      let s = evt.data
      let o = {}

      try {
        o = JSON.parse(s)
        if (o.err) {
          return
        }
      } catch (e) {
        console.log('WS.ERROR: JSON.parse: ', s)
        return
      }

      if (!o.content) {
        console.log('WS.ERROR: Content Empty')
        return
      }

      if (o.evt == constants.EVENT_UDAPTE_VARIABLES_VALUE) {
        self.updateVariablesValueInMatrix(o.content)
        self.updateVariablesValueInFooter(o.content)
      } else if (o.evt == constants.EVENT_UPDATE_VARIABLE_COMMENT) {
        self.updateVariableCommentInMatrix(o.content)
      } else if (o.evt == constants.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE) {
        self.emptyUpdateVariablesValueInMatrix(o.content)
      } else if (o.evt == constants.EVENT_UPDATE_COMMENT_GROUP) {
        let content = []
        if (!isArray(o.content)) content.push(o.content)

        self.updateGroupCommentInMatrix(content)
      }
    }
  }

  serviceWSA() {
    let self = this

    let v = window.sessionStorage.getItem(constants.ACCESS_TOKEN_WSA)
    let url = `${wsaURL}?${constants.ACCESS_TOKEN_WSA}=${v}`
    this.wsa = new w3cwebsocket(url, constants.TTX_PROTOCOOL)

    this.wsa.onerror = () => {
      console.log('WSA: connection Error')
    }

    this.wsa.onopen = (evt) => {
      console.log('WSA connected')
    }

    this.wsa.onclose = (evt) => {
      console.log('WSA closed')

      setTimeout(() => {
        let connection_errors = self.state.connection_errors_wsa
        if (connection_errors == constants.LIMIT_FOR_RECONNECTION) {
          connection_errors = 0
          self.getTokenWSA()
        }

        connection_errors = connection_errors + 1
        self.state.connection_errors_wsa = connection_errors

        self.serviceWSA()
      }, 1000)
    }

    this.wsa.onmessage = (evt) => {
      let s = evt.data

      let o = {}

      try {
        o = JSON.parse(s)
        if (o.err) {
          return
        }
      } catch (e) {
        console.log('WSA.ERROR: JSON.parse: ', s)
      }

      if (o.evt == constants.EVENT_UDAPTE_VARIABLES_ALARM) {
        // Insertar in Notifications console.log(o.content);
        self.getNotifications()
      } else if (o.evt == constants.EVENT_UDAPTE_ALARMS_ACTIVE) {
        self.getVariablesWithAlarms()
      } else if (o.evt == constants.EVENT_UDAPTE_VARIABLES_TIMEOUT) {
        // Insertar in Notifications console.log(o.content);
        self.getNotifications()
        self.getVariablesWithAlarms()
      }
    }
  }
  /* WS */

  /* HTTP Requests */

  getTokenWS() {
    let self = this

    let url = `${constants.URL_SERVER_USERS}/tokens?${constants.ACCESS_TOKEN_WS}=true`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let doc = res.doc

        let token_ws = doc.access_token_ws
        if (token_ws)
          window.sessionStorage.setItem(constants.ACCESS_TOKEN_WS, token_ws)

        //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
        //if (token_ws) Cookies.set(constants.ACCESS_TOKEN_WS, token_ws, { expires: sixtySeconds });

        console.log('Reconnection WS Ok')
      } else if (response.status == constants.STATUS_ACCEPTED) {
        console.log(res.message)
      }
    })

    xhr.fail((res, status, respose) => {
      console.log(res, status)
      if (res.responseJSON) {
        let json = res.responseJSON
        console.log(json.message)
      } else {
        console.log(constants.MESSAGE_ERROR)
      }
    })
  }

  getTokenWSA() {
    let self = this

    let url = `${constants.URL_SERVER_USERS}/tokens?${constants.ACCESS_TOKEN_WSA}=true`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let doc = res.doc

        let token_wsa = doc.access_token_wsa
        if (token_wsa)
          window.sessionStorage.setItem(constants.ACCESS_TOKEN_WSA, token_wsa)

        //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
        //if (token_wsa) Cookies.set(constants.ACCESS_TOKEN_WSA, token_wsa, { expires: sixtySeconds });

        console.log('Reconnection WSA Ok')
      } else if (response.status == constants.STATUS_ACCEPTED) {
        console.log(res.message)
      }
    })

    xhr.fail((res, status, respose) => {
      console.log(res, status)
      if (res.responseJSON) {
        let json = res.responseJSON
        console.log(json.message)
      } else {
        console.log(constants.MESSAGE_ERROR)
      }
    })
  }

  getConfiguration(fn) {
    let self = this

    let url = `${constants.URL_SERVER_USERS}/sounds/matrix`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs)
          return
        }

        if (!res.docs) res.docs = []

        self.state.matrix_sounds = res.docs

        self.getMatrices()
      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON

        Materialize.toast(json.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })
  }

  getNotifications(fn) {
    let self = this

    let url = `${constants.URL_SERVER_LOG_EVENTS}/notifications?is_seen=false`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs)
          return
        }

        self.setState({ notifications_: res.docs })
      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON

        Materialize.toast(json.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })
  }

  getMatrices() {
    let self = this

    let url = `${constants.URL_SERVER_MATRICES}/list?with_structure=true&with_structure_json=false`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        self.setState({ matrices_: res.docs }, () => {
          $('select').material_select()

          if (self.state.matrices_.length > 0) {
            // INSERT_CONVERSION
            let matricesIn = self.state.matrices_
            for (let i = 0; i < matricesIn.length; i++) {
              const m = matricesIn[i]
              if (window.SYSTEM_HOST == 'diavaz.technotex.com') {
                if (m.id == 2) {
                  window.INSERT_CONVERSION = true
                  break
                }
              }
            }

            if (isNumber(window.MatrixID)) {
              let positions = []

              if (window.MatrixID > 0) {
                let matricesIn = self.state.matrices_
                for (let i = 0; i < matricesIn.length; i++) {
                  const matrix = matricesIn[i]
                  if (matrix.id == window.MatrixID) {
                    positions.push(i)
                    break
                  }
                }

                let matrices = []
                let structures = []

                for (let i = 0; i < positions.length; i++) {
                  let position = positions[i]
                  let m = self.state.matrices_[position]
                  let s = m.structure

                  matrices.push(m)
                  structures.push(s)
                }

                self.setState(
                  { matrices: matrices, structures: structures },
                  () => {
                    self.updateActiveVarsInMatrix()
                    self.getVariableLastRecords()
                  }
                )
              } else {
                let matricesIn = self.state.matrices_
                if (matricesIn.length > 0) {
                  positions.push(0)
                }

                let matrices = []
                let structures = []

                for (let i = 0; i < positions.length; i++) {
                  let position = positions[i]
                  let m = self.state.matrices_[position]
                  let s = m.structure

                  matrices.push(m)
                  structures.push(s)
                }

                self.setState(
                  { matrices: matrices, structures: structures },
                  () => {
                    self.updateActiveVarsInMatrix()
                    self.getVariableLastRecords()
                  }
                )
              }
            } else if (isString(window.MatrixID)) {
              let sJSON = window.MatrixID
              let positions = []

              try {
                let aJSON = JSON.parse(sJSON)
                let matrices = self.state.matrices_

                for (let i = 0; i < aJSON.length; i++) {
                  let id = aJSON[i]
                  for (let j = 0; j < matrices.length; j++) {
                    const matrix = matrices[j]
                    if (matrix.id == id) {
                      positions.push(j)
                      break
                    }
                  }
                }
              } catch (e) {
                console.log(`MatrixID isn't JSON`, e)
              }

              let matrices = []
              let structures = []

              for (let i = 0; i < positions.length; i++) {
                let position = positions[i]
                let m = self.state.matrices_[position]

                let s = m.structure

                matrices.push(m)
                structures.push(s)
              }

              self.setState(
                { matrices: matrices, structures: structures },
                () => {
                  self.updateActiveVarsInMatrix()
                  self.getVariableLastRecords()
                }
              )
            }
          }
        })
      } else if (response.status == constants.STATUS_ACCEPTED) {
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

  getVariableLastRecords() {
    let self = this

    parallel(
      {
        variables: (fn) => {
          let url = `${constants.URL_SERVER_VARIABLES}/list/last_record`

          let xhr = $.ajax({
            url: url,
            type: constants.METHOD_GET,
            dataType: constants.JSON,
          })

          xhr.done((res, status, response) => {
            if (response.status == constants.STATUS_OK) {
              let content = []

              let docs = res.docs
              for (let i = 0; i < docs.length; i++) {
                let doc = docs[i]

                let o = {
                  variable_id: doc.id,
                  value: doc.value,
                  timestamp: doc.timestamp,
                  is_custom: false,
                }

                content.push(o)
              }

              fn(null, content)
            } else if (response.status == constants.STATUS_ACCEPTED) {
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
        },
        custom_variables: (fn) => {
          let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list/last_record`

          let xhr = $.ajax({
            url: url,
            type: constants.METHOD_GET,
            dataType: constants.JSON,
          })

          xhr.done((res, status, response) => {
            if (response.status == constants.STATUS_OK) {
              let content = []

              let docs = res.docs
              for (let i = 0; i < docs.length; i++) {
                let doc = docs[i]

                let o = {
                  variable_id: doc.id,
                  value: doc.value,
                  timestamp: doc.timestamp,
                  is_custom: true,
                  name: doc.name,
                }

                content.push(o)
              }

              fn(null, content)
            } else if (response.status == constants.STATUS_ACCEPTED) {
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
        },
      },
      (err, res) => {
        if (err) {
          Materialize.toast(err, 2500)
          return
        }

        let variables = res.variables
        let custom_variables = res.custom_variables

        for (let i = 0; i < custom_variables.length; i++) {
          const variable = custom_variables[i]
          variables.push(variable)
        }

        self.updateVariablesValueInMatrix(variables)
        self.updateVariablesValueInFooter(variables)

        self.getVariablesWithAlarms()
      }
    )
  }

  getVariablesWithAlarms() {
    let self = this

    parallel(
      {
        variables: (fn) => {
          let url = `${constants.URL_SERVER_VARIABLES}/list/alarms`

          let xhr = $.ajax({
            url: url,
            type: constants.METHOD_GET,
            dataType: constants.JSON,
          })

          xhr.done((res, status, response) => {
            if (response.status == constants.STATUS_OK) {
              fn(null, res.docs)
            } else if (response.status == constants.STATUS_ACCEPTED) {
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
        },
        custom_variables: (fn) => {
          let url = `${constants.URL_SERVER_CUSTOM_VARIABLES}/list/alarms`

          let xhr = $.ajax({
            url: url,
            type: constants.METHOD_GET,
            dataType: constants.JSON,
          })

          xhr.done((res, status, response) => {
            if (response.status == constants.STATUS_OK) {
              fn(null, res.docs)
            } else if (response.status == constants.STATUS_ACCEPTED) {
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
        },
      },
      (err, res) => {
        if (err) {
          Materialize.toast(err, 2500)
          return
        }

        let variables = res.variables
        let custom_variables = res.custom_variables

        for (let i = 0; i < custom_variables.length; i++) {
          const variable = custom_variables[i]
          variables.push(variable)
        }

        self.updateVariablesAlarmInMatrix(variables)
      }
    )
  }

  updateVariableSoundsConfig(json) {
    let self = this

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_USERS}/sounds`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json),
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let message = 'Configuración de sonidos de variables, Ok'
        console.log(message)
        console.log(res.doc)
      } else if (response.status == constants.STATUS_ACCEPTED) {
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

  getComments(fn) {
    let self = this

    let url = `${constants.URL_SERVER_GROUPS}/list/comment`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs)
          return
        }

        let content = []
        let size = res.docs.length
        for (let i = 0; i < size; i++) {
          let group = res.docs[i]

          if (!group.comment) group.comment = 'N/A'

          let o = {
            group_id: group.id,
            comment: group.comment,
          }

          content.push(o)
        }

        self.updateGroupCommentInMatrix(content)
      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON

        Materialize.toast(json.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })
  }

  getFooterVariables(fn) {
    let self = this

    let url = `${constants.URL_SERVER_FOOTER_VARIABLES}/list`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs)
          return
        }

        self.setState({ footer_variables: res.docs })
      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON

        Materialize.toast(json.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })
  }

  getLogAlarms(fn) {
    let self = this

    let url = `${constants.URL_SERVER_LOG_ALARMS}/list?checked=false`

    let xhr = $.ajax({
      url: url,
      type: constants.METHOD_GET,
      dataType: constants.JSON,
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        if (fn) {
          fn(null, res.docs)
          return
        }

        self.setState({ log_alarms: res.docs })
      } else if (response.status == constants.STATUS_ACCEPTED) {
        Materialize.toast(res.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })

    xhr.fail((res, status, respose) => {
      if (res.responseJSON) {
        let json = res.responseJSON

        Materialize.toast(json.message, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      } else {
        Materialize.toast(constants.MESSAGE_ERROR, 2500)

        if (fn) {
          fn(null, [])
          return
        }
      }
    })
  }

  updateCommentGroup(id, json) {
    let self = this

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_GROUPS}/${id}/comment`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json),
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        json.group_id = id

        let content = [json]
        self.updateGroupCommentInMatrix(content)

        if (self.ws) {
          let o = {
            evt: constants.EVENT_UPDATE_COMMENT_GROUP,
            content: json,
          }

          let s = JSON.stringify(o)
          self.ws.send(s)
        }
      } else if (response.status == constants.STATUS_ACCEPTED) {
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
      if (response.status == constants.STATUS_OK) {
        console.log('Notificación Ok')
      } else if (response.status == constants.STATUS_ACCEPTED) {
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

  updateCommentVariable(id, json) {
    let self = this

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_VARIABLES}/${id}/comment`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json),
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        json.variable_id = id
        json.is_custom = false

        let content = [json]
        self.updateVariableCommentInMatrix(content)
      } else if (response.status == constants.STATUS_ACCEPTED) {
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

  updateCommentCustomVariable(id, json) {
    let self = this

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_CUSTOM_VARIABLES}/${id}/comment`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json),
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        json.variable_id = id
        json.is_custom = true

        let content = [json]
        self.updateVariableCommentInMatrix(content)
      } else if (response.status == constants.STATUS_ACCEPTED) {
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

  updateLogAlarm(id, json) {
    let self = this

    let xhr = $.ajax({
      url: `${constants.URL_SERVER_LOG_ALARMS}/${id}/comment`,
      type: constants.METHOD_PUT,
      contentType: constants.APPLICATION_JSON,
      data: JSON.stringify(json),
    })

    xhr.done((res, status, response) => {
      if (response.status == constants.STATUS_OK) {
        let logAlarmIn = res.doc
        if (logAlarmIn) {
          let log_alarms = self.state.log_alarms
          let size = log_alarms.length

          for (let i = 0; i < size; i++) {
            const logAlarm = log_alarms[i]
            if (logAlarm.id === logAlarmIn.id) {
              log_alarms[i] = logAlarmIn
              break
            }
          }

          self.setState({ log_alarms: log_alarms })
        }
      } else if (response.status == constants.STATUS_ACCEPTED) {
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

  /* HTTP Requests */

  updateVariablesValueInFooter(content) {
    let self = this

    if (isArray(content)) {
      let footer_variables = self.state.footer_variables
      for (let i = 0; i < footer_variables.length; i++) {
        const footer_variable = footer_variables[i]

        for (let j = 0; j < content.length; j++) {
          const variable = content[j]

          let id = variable.variable_id
          let is_custom = variable.is_custom
          let value = variable.value
          let timestamp = variable.timestamp
          let name = variable.name

          if (!is_custom) is_custom = false

          if (footer_variable.variable_id === id) {
            if (footer_variable.is_custom === is_custom) {
              footer_variables[i].value = value
              footer_variables[i].timestamp = timestamp

              if (name) footer_variables[i].name = name
              break
            }
          }
        }
      }

      self.setState({ footer_variables: footer_variables })
    }
  }

  updateVariablesValueInMatrix(content) {
    let self = this

    if (isArray(content)) {
      let structures = self.state.structures

      for (let j = 0; j < structures.length; j++) {
        let structure = structures[j]

        for (let i = 0; i < content.length; i++) {
          let variable = content[i]

          let id = variable.variable_id
          let is_custom = variable.is_custom
          let value = variable.value
          let timestamp = variable.timestamp

          if (!is_custom) is_custom = false

          structure = self.updateVariablesValue(
            structure,
            id,
            is_custom,
            value,
            timestamp
          )
        }

        structures[j] = structure
      }

      self.setState({ structures: structures })
    }
  }

  emptyUpdateVariablesValueInMatrix(content) {
    let self = this

    if (isArray(content)) {
      let structures = self.state.structures

      for (let j = 0; j < structures.length; j++) {
        let structure = structures[j]

        for (let i = 0; i < content.length; i++) {
          let variable = content[i]

          let id = variable.variable_id
          let is_custom = variable.is_custom
          let value = variable.value

          if (value !== ' ') value = ' '

          let timestamp = variable.timestamp

          if (!is_custom) is_custom = false

          structure = self.emptyUpdateVariablesValue(
            structure,
            id,
            is_custom,
            value,
            timestamp
          )
        }

        structures[j] = structure
      }

      self.setState({ structures: structures })
    }
  }

  updateVariablesAlarmInMatrix(content) {
    let self = this

    if (isArray(content)) {
      let structures = self.state.structures

      for (let j = 0; j < structures.length; j++) {
        let structure = structures[j]

        for (let i = 0; i < content.length; i++) {
          let o = content[i]

          let variable_id = o.variable_id
          let is_custom = o.is_custom
          let color = o.color
          let is_timeout = o.is_timeout

          if (!is_custom) is_custom = false
          if (!color) color = false
          if (!is_timeout) is_timeout = false

          if (self.state.view === CHART_VIEW) {
            // EXPERIMENTAL alarm_id

            if (is_timeout) {
              structure = self.updateVariablesTimeout(
                structure,
                variable_id,
                is_custom,
                color
              )
            } else {
              let alarm_id = o.alarm_id
              let alarm_setpoint = o.setpoint
              let alarm_alias = o.alias

              structure = self.updateVariablesAlarm(
                structure,
                variable_id,
                is_custom,
                color,
                alarm_id,
                alarm_alias,
                alarm_setpoint
              )
            }
          } else {
            if (is_timeout) {
              structure = self.updateVariablesTimeout(
                structure,
                variable_id,
                is_custom,
                color
              )
            } else {
              structure = self.updateVariablesAlarm(
                structure,
                variable_id,
                is_custom,
                color
              )
            }
          }

          let sound = self.updateActiveVariables(o)
          structure = self.updateVariablesSound(
            structure,
            variable_id,
            is_custom,
            sound
          )
        }

        structures[j] = structure
      }

      self.updateSoundStatus()

      self.setState({ structures: structures })
    }
  }

  updateActiveVarsInMatrix() {
    let matrices = this.state.matrices

    let active_vars = []
    let variablesIn = []

    for (let h = 0; h < matrices.length; h++) {
      let matrix = matrices[h]
      if (matrix) {
        let s = matrix.structure
        if (s) {
          let variables = this.getVariablesInMatrix(s)

          let matrix_sounds = this.state.matrix_sounds

          for (let i = 0; i < matrix_sounds.length; i++) {
            const matrix_sound = matrix_sounds[i]
            if (matrix_sound) {
              let matrix_id = matrix_sound.matrix_id
              if (matrix_id == matrix.id) {
                let active_variables = matrix_sound.active_vars
                for (let j = 0; j < active_variables.length; j++) {
                  const active_variable = active_variables[j]
                  for (let k = 0; k < variables.length; k++) {
                    const variable = variables[k]
                    if (active_variable.id == variable.id) {
                      if (active_variable.is_custom == variable.is_custom) {
                        active_vars.push(active_variable)
                        break
                      }
                    }
                  }
                }
              }
            }
          }

          for (let i = 0; i < variables.length; i++) {
            let isNew = true
            let variable = variables[i]

            for (let j = 0; j < variablesIn.length; j++) {
              let variableIn = variablesIn[j]
              if (variable.id == variableIn.id) {
                if (variable.is_custom == variableIn.is_custom) {
                  isNew = false
                  break
                }
              }
            }

            if (isNew) variablesIn.push(variable)
          }
        }
      }
    }

    this.state.variables_ = variablesIn
    this.state.active_vars = active_vars
  }

  updateActiveVariables(o) {
    let self = this

    let sound = {
      is_ringing: false,
      mute: false,
    }

    let active_vars = self.state.active_vars
    for (let i = 0; i < active_vars.length; i++) {
      const variable = active_vars[i]
      if (variable.id == o.variable_id) {
        if (variable.is_custom == o.is_custom) {
          if (!o.alarm_id) {
            active_vars.splice(i, 1)
            self.state.active_vars = active_vars
            return sound
          }

          active_vars[i].sound = o.sound
          active_vars[i].priority_level = o.priority_level

          let mute = active_vars[i].mute

          sound.is_ringing = true
          sound.mute = mute

          return sound
        }
      }
    }

    if (!o.alarm_id) return sound

    let insert = false
    let variables = self.state.variables_
    for (let i = 0; i < variables.length; i++) {
      const variable = variables[i]
      if (variable.id == o.variable_id) {
        if (variable.is_custom == o.is_custom) {
          insert = true
        }
      }
    }

    if (!insert) return sound

    let active = {
      id: o.variable_id,
      is_custom: o.is_custom,
      sound: o.sound,
      priority_level: o.priority_level,
      mute: false,
    }

    active_vars.push(active)
    self.state.active_vars = active_vars

    sound.is_ringing = true
    sound.mute = false

    return sound
  }

  updateSoundStatus() {
    let self = this

    let active_vars = self.state.active_vars
    let size = active_vars.length
    if (size == 0) {
      for (const key in window.AUDIO) {
        window.AUDIO[key].pause()

        if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[key] = true
      }

      return
    }

    let key = 'priority_level'
    active_vars = sortBy(active_vars, key)

    let active = false
    for (let i = size - 1; i >= 0; i--) {
      const active_variable = active_vars[i]
      if (active_variable.sound) {
        if (!active_variable.mute) {
          active = active_variable
          break
        }
      }
    }

    if (active) {
      for (const key in window.AUDIO) {
        if (!window.AUDIO[key].paused) {
          window.AUDIO[key].pause()

          if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[key] = true
        }
      }

      let key = ''
      if (active.sound == constants.DANGER_VALUE) {
        key = constants.DANGER_SOUND
      } else if (active.sound == constants.WARNING_VALUE) {
        key = constants.WARNING_SOUND
      } else if (active.sound == constants.TIMEOUT_VALUE) {
        key = constants.TIMEOUT_SOUND
      }

      if (window.AUDIO[key]) {
        if (window.AUDIO_PAUSED) {
          if (window.AUDIO_PAUSED[key]) {
            if (window.AUDIO[key].paused) {
              let wAudio = window.AUDIO[key].play()
              if (wAudio !== undefined) {
                wAudio
                  .then((_) => {
                    //console.log(window.AUDIO[key], ' PLAY OK');
                    if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[key] = false
                  })
                  .catch((error) => {
                    console.error(window.AUDIO[key], ' ERROR PLAY')
                  })
              }
            }
          }
        } else {
          if (window.AUDIO[key].paused) {
            let wAudio = window.AUDIO[key].play()
            if (wAudio !== undefined) {
              wAudio
                .then((_) => {
                  //console.log(window.AUDIO[key], ' PLAY OK');
                  if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[key] = false
                })
                .catch((error) => {
                  console.error(window.AUDIO[key], ' BEFORE ERROR PLAY')
                })
            }
          }
        }
      }

      return
    }

    for (const key in window.AUDIO) {
      window.AUDIO[key].pause()

      if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[key] = true
    }
  }

  /*updateSoundStatus() {
    let self = this;

    let active_vars = self.state.active_vars;
    let size = active_vars.length;
    if (size == 0) {
      for (const key in window.AUDIO) {
        window.AUDIO[key].pause();
      }

      return;
    }

    let key = 'priority_level';
    active_vars = sortBy(active_vars, key);

    let active = false;
    for (let i = size - 1; i >= 0; i--) {
      const active_variable = active_vars[i];
      if (active_variable.sound) {
        if (!active_variable.mute) {
          active = active_variable;
          break;
        }
      }
    }

    if (active) {
      for (const key in window.AUDIO) {
        if (!window.AUDIO[key].paused) window.AUDIO[key].pause();
      }

      let key = '';
      if (active.sound == constants.DANGER_VALUE) {
        key = constants.DANGER_SOUND;

      } else if (active.sound == constants.WARNING_VALUE) {
        key = constants.WARNING_SOUND;

      } else if (active.sound == constants.TIMEOUT_VALUE) {
        key = constants.TIMEOUT_SOUND;
      }

      if (window.AUDIO[key]) {
        if (window.AUDIO[key].paused) {
          let wAudio =  window.AUDIO[key].play();
          if (wAudio !== undefined) {
            wAudio.then(_ => {
              //console.log(window.AUDIO[key], ' PLAY OK');

            }).catch(error => {
              console.error(window.AUDIO[key], ' ERROR PLAY');
            });
          }
        }
      }

      return;
    }

    for (const key in window.AUDIO) {
      window.AUDIO[key].pause();
    }
  }*/

  updateVariableCommentInMatrix(content) {
    let self = this

    if (isArray(content)) {
      if (content.length > 0) {
        let variable = content[0]

        let id = variable.variable_id
        let is_custom = variable.is_custom
        let comment = variable.comment

        if (!is_custom) is_custom = false

        let structures = self.state.structures

        for (let i = 0; i < structures.length; i++) {
          let structure = structures[i]

          structure = self.updateVariableComment(
            structure,
            id,
            is_custom,
            comment
          )

          structures[i] = structure
        }

        self.setState({ structures: structures }, () => {
          $('.tooltipped').tooltip({ delay: 20 })
        })
      }
    }
  }

  updateGroupCommentInMatrix(content) {
    let self = this

    if (isArray(content)) {
      if (content.length > 0) {
        let group = content[0]

        let id = group.group_id
        let comment = group.comment

        let structures = self.state.structures

        for (let i = 0; i < structures.length; i++) {
          let structure = structures[i]

          structure = self.updateGroupComment(structure, id, comment)

          structures[i] = structure
        }

        self.setState({ structures: structures }, () => {
          $('.tooltipped').tooltip({ delay: 20 })
        })
      }
    }
  }

  updateVariablesValue(groups, variable_id, is_custom, value, timestamp) {
    if (!groups) groups = []

    for (let i = 0; i < groups.length; i++) {
      let g = groups[i]
      let variables = g.variables
      if (variables) {
        for (let j = 0; j < variables.length; j++) {
          let v = variables[j]
          if (v.id == variable_id) {
            if (v.is_custom == is_custom) {
              groups[i].variables[j].value = value
              groups[i].variables[j].timestamp = timestamp

              if (groups[i].variables[j].on_timeout) {
                groups[i].variables[j].on_timeout = false
                groups[i].variables[j].color = false
              }

              return groups
            }
          }
        }
      } else {
        if (g.sons) {
          groups[i].sons = this.updateVariablesValue(
            g.sons,
            variable_id,
            is_custom,
            value,
            timestamp
          )
        }
      }
    }

    return groups
  }

  emptyUpdateVariablesValue(groups, variable_id, is_custom, value, timestamp) {
    if (!groups) groups = []

    for (let i = 0; i < groups.length; i++) {
      let g = groups[i]
      let variables = g.variables
      if (variables) {
        for (let j = 0; j < variables.length; j++) {
          let v = variables[j]
          if (v.id == variable_id) {
            if (v.is_custom == is_custom) {
              groups[i].variables[j].value = value
              groups[i].variables[j].timestamp = timestamp

              if (groups[i].variables[j].on_timeout) {
                groups[i].variables[j].on_timeout = false
                groups[i].variables[j].color = false
              }

              return groups
            }
          }
        }
      } else {
        if (g.sons) {
          groups[i].sons = this.emptyUpdateVariablesValue(
            g.sons,
            variable_id,
            is_custom,
            value,
            timestamp
          )
        }
      }
    }

    return groups
  }

  // EXPERIMENTAL alarm_id, setpoint
  updateVariablesAlarm(
    groups,
    variable_id,
    is_custom,
    color,
    alarm_id,
    alarm_alias,
    alarm_setpoint
  ) {
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i]
      let variables = g.variables
      if (variables) {
        for (let j = 0; j < variables.length; j++) {
          let v = variables[j]
          if (v.id == variable_id) {
            if (v.is_custom == is_custom) {
              groups[i].variables[j].color = color
              groups[i].variables[j].on_timeout = false

              groups[i].variables[j].alarm_id = alarm_id
              if (alarm_id) {
                groups[i].variables[j].alarm_alias = alarm_alias
                groups[i].variables[j].alarm_setpoint = alarm_setpoint
              } else {
                groups[i].variables[j].alarm_alias = false
                groups[i].variables[j].alarm_setpoint = false
              }

              return groups
            }
          }
        }
      } else {
        if (g.sons) {
          groups[i].sons = this.updateVariablesAlarm(
            g.sons,
            variable_id,
            is_custom,
            color,
            alarm_id,
            alarm_alias,
            alarm_setpoint
          )
        }
      }
    }

    return groups
  }

  updateVariablesTimeout(groups, variable_id, is_custom, color) {
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i]
      let variables = g.variables
      if (variables) {
        for (let j = 0; j < variables.length; j++) {
          let v = variables[j]
          if (v.id == variable_id) {
            if (v.is_custom == is_custom) {
              groups[i].variables[j].color = color
              groups[i].variables[j].on_timeout = true

              return groups
            }
          }
        }
      } else {
        if (g.sons) {
          groups[i].sons = this.updateVariablesTimeout(
            g.sons,
            variable_id,
            is_custom,
            color
          )
        }
      }
    }

    return groups
  }

  updateVariablesSound(groups, variable_id, is_custom, sound) {
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i]
      let variables = g.variables
      if (variables) {
        for (let j = 0; j < variables.length; j++) {
          let v = variables[j]
          if (v.id == variable_id) {
            if (v.is_custom == is_custom) {
              groups[i].variables[j].is_ringing = sound.is_ringing
              groups[i].variables[j].mute = sound.mute

              return groups
            }
          }
        }
      } else {
        if (g.sons) {
          groups[i].sons = this.updateVariablesSound(
            g.sons,
            variable_id,
            is_custom,
            sound
          )
        }
      }
    }

    return groups
  }

  updateVariableComment(groups, variable_id, is_custom, comment) {
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i]
      let variables = g.variables
      if (variables) {
        for (let j = 0; j < variables.length; j++) {
          let v = variables[j]
          if (v.id == variable_id) {
            if (v.is_custom == is_custom) {
              groups[i].variables[j].comment = comment

              return groups
            }
          }
        }
      } else {
        if (g.sons) {
          groups[i].sons = this.updateVariableComment(
            g.sons,
            variable_id,
            is_custom,
            comment
          )
        }
      }
    }

    return groups
  }

  updateGroupComment(groups, group_id, comment) {
    for (let i = 0; i < groups.length; i++) {
      let g = groups[i]
      if (g.id == group_id) {
        groups[i].comment = comment

        return groups
      }

      if (g.sons) {
        groups[i].sons = this.updateGroupComment(g.sons, group_id, comment)
      }
    }

    return groups
  }

  getVariablesInMatrix(s) {
    let variables = []

    for (let i = 0; i < s.length; i++) {
      const g = s[i]
      let variables_ = []

      if (g.sons) variables_ = this.getVariablesInMatrix(g.sons)

      if (g.variables) {
        for (let j = 0; j < g.variables.length; j++) {
          const variable = g.variables[j]

          let v = { id: variable.id, is_custom: variable.is_custom }
          variables_.push(v)
        }
      }

      for (let j = 0; j < variables_.length; j++) {
        const variable = variables_[j]
        variables.push(variable)
      }
    }

    return variables
  }

  /* Other Events */
  handleOpenDynamicGraphicsGroup(mi) {
    let self = this

    // ACTUALIZAR

    let fn = (group_id) => {
      let matrices = self.state.matrices
      if (matrices) {
        let matrix = matrices[mi]
        if (matrix) {
          let url = `/dynamic_graphics/${matrix.id}/${group_id}`
          window.location = url
          win.focus()
        }
      }
    }

    return fn
  }

  handleOpenCommentGroup() {
    let self = this

    let fn = (group) => {
      self.setState({ comment: group })
    }

    return fn
  }

  handleOpenCommentVariable() {
    let self = this

    let fn = (variable) => {
      if (variable) {
        self.setState({ comment: variable })
      }
    }

    return fn
  }

  handleChangeComment() {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let comment = self.state.comment
      if (comment) {
        let inputComment = document.querySelector('#input-comment')
        let value = inputComment.value.trim()

        if (value != '') {
          // Comentario de variable o variable personalizada
          if (comment.variable_id) {
            let o = {
              comment: value,
            }

            if (comment.is_custom) {
              self.updateCommentCustomVariable(comment.variable_id, o)
            } else {
              self.updateCommentVariable(comment.variable_id, o)
            }
          } else {
            // Comentario de grupo
            let o = {
              comment: value,
            }

            self.updateCommentGroup(comment.group_id, o)
          }

          inputComment.value = ''
          $('#comentarios_macro').modal('close')
        }
      }
    }

    return fn
  }

  handleChangeSoundVariable(mi) {
    let self = this

    let fn = (variable) => {
      let active_vars = self.state.active_vars

      let size = active_vars.length
      if (size == 0) return

      let variable_id = variable.id
      let is_custom = variable.is_custom

      for (let i = 0; i < active_vars.length; i++) {
        let active_variable = active_vars[i]
        if (active_variable.id == variable_id) {
          if (active_variable.is_custom == is_custom) {
            let mute = active_variable.mute
            self.state.active_vars[i].mute = !mute

            let structures = self.state.structures

            for (let j = 0; j < structures.length; j++) {
              let structure = structures[j]

              let sound = {
                is_ringing: variable.is_ringing,
                mute: !mute,
              }

              structure = self.updateVariablesSound(
                structure,
                variable_id,
                is_custom,
                sound
              )

              structures[j] = structure
            }

            self.setState({ structures: structures }, () => {
              self.updateSoundStatus()
              // ACTUALIZAR

              // Actualización en la configuración del usuario
              let matrices = self.state.matrices
              if (matrices) {
                let matrix = matrices[mi]
                if (matrix) {
                  let active_vars = clone(self.state.active_vars)
                  let variables = self.getVariables(matrix.structure)

                  let size = active_vars.length - 1
                  for (let i = size; i >= 0; i--) {
                    let active_var = active_vars[i]
                    let remove = true

                    for (let j = 0; j < variables.length; j++) {
                      let variable = variables[j]
                      if (variable.id == active_var.id) {
                        if (variable.is_custom == active_var.is_custom) {
                          remove = false
                          break
                        }
                      }
                    }

                    if (remove) {
                      active_vars.splice(i, 1)
                    }
                  }

                  let o = {
                    matrix_id: matrix.id,
                    active_vars: active_vars,
                  }

                  let s = JSON.stringify(o)
                  let json = { json_matrix_sounds_in: s }
                  self.updateVariableSoundsConfig(json)
                }
              }
            })

            return
          }
        }
      }
    }

    return fn
  }

  handleChangeLogAlarm(id) {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      let log_alarms = self.state.log_alarms

      let size = log_alarms.length
      let logAlarm = false

      for (let i = 0; i < size; i++) {
        const logOne = log_alarms[i]
        if (logOne.id === id) {
          const checked = log_alarms[i].checked
          if (!checked) {
            logAlarm = log_alarms[i]
            $('#comentarios_log_alarm').modal('open')
            $('#input-comment-log-alarm').val(logOne.comment)
          }

          break
        }
      }

      self.setState({ logAlarm: logAlarm })
    }

    return fn
  }

  handleCommentLogAlarm() {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      if (SYSTEM_HOST === 'sepec.technotex.com') return

      let comment = $('#input-comment-log-alarm').val()
      if (!comment || comment == '') return

      let logAlarm = self.state.logAlarm
      if (!logAlarm) return

      let id = logAlarm.id

      let json = {
        comment: comment,
        checked: true,
      }

      self.updateLogAlarm(id, json)
    }

    return fn
  }

  handleLogAlarmClose() {
    let self = this

    let fn = (evt) => {
      evt.preventDefault()

      self.setState({ logAlarm: false })
    }

    return fn
  }

  /* View Events */
  handleListView() {
    let self = this

    let fn = () => {
      let value = LIST_VIEW
      if (value != self.state.view) {
        self.setState({ view: value })
      }
    }

    return fn
  }

  handleListViewMin() {
    let self = this

    let fn = () => {
      let value = LIST_VIEW_MIN
      if (value != self.state.view) {
        self.setState({ view: value })
      }
    }

    return fn
  }

  handleChartView() {
    let self = this

    let fn = () => {
      let num = 0

      let structures = self.state.structures
      if (structures.length == 0) return

      for (let i = 0; i < structures.length; i++) {
        let s = structures[i]
        let variables = self.getVariables(s)
        num = num + variables.length
      }

      if (num > 30) {
        window.location.href = '/charts'
        return
      }

      let value = CHART_VIEW
      if (value != self.state.view) {
        self.setState({ view: value })
      }
    }

    return fn
  }

  handleTableView() {
    let self = this

    let fn = () => {
      let value = TABLE_VIEW
      if (value != self.state.view) {
        self.setState({ view: value })
      }
    }

    return fn
  }

  handleTableViewCol() {
    let self = this

    let fn = () => {
      let value = TABLE_VIEW_COL
      if (value != self.state.view) {
        self.setState({ view: value })
      }
    }

    return fn
  }

  handlePanelView() {
    let self = this

    let fn = () => {
      let value = 4
      if (value != self.state.view) {
        self.setState({ view: value })
      }
    }

    return fn
  }

  handleLogAlarmsView() {
    let self = this

    let fn = () => {
      let status = self.state.log_alarms_view
      self.setState({ log_alarms_view: !status })
    }

    return fn
  }

  /* View Events */

  /* Header: Matriz */
  handleRestoreMatrix() {
    let self = this

    let fn = (s, index) => {
      let structures = this.state.structures
      if (structures[index]) {
        structures[index] = s

        self.setState({ structures: structures })
      }
    }

    return fn
  }

  handleItemGroup() {
    let self = this

    let fn = (s, index) => {
      let structures = this.state.structures
      if (structures[index]) {
        structures[index] = s

        self.setState({ structures: structures })
      }
    }

    return fn
  }

  handleChangeMatrix() {
    let self = this

    let fn = (m, s, mi, si) => {
      let o = {}

      let matrices = this.state.matrices
      let structures = this.state.structures

      if (matrices[mi]) {
        matrices[mi] = m
        o.matrices = matrices
      }

      if (structures[si]) {
        structures[si] = s
        o.structures = structures
      }

      self.setState(o, () => {
        self.updateActiveVarsInMatrix()
        self.getVariableLastRecords()
      })
    }

    return fn
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

          self.setState({ notifications_: notifications })
          return
        }
      }
    }

    return fn
  }

  orderByOS(os, field, asc) {
    os.sort((a, b) => {
      let hasA = a.hasOwnProperty(field)
      let hasB = b.hasOwnProperty(field)
      if (hasA && hasB) {
        let vA = a[field]
        let vB = b[field]

        if (isString(vA)) vA = vA.toLowerCase()
        if (isString(vB)) vB = vB.toLowerCase()

        if (asc) {
          if (vA < vB) return -1
          if (vA > vB) return 1
        } else {
          if (vA < vB) return 1
          if (vA > vB) return -1
        }
      }

      return 0
    })

    return os
  }

  /* Header: Matriz */

  createTitleFV() {
    let self = this

    let fn = (variable, index) => {
      let unit = false
      if (variable.unit) unit = `(${variable.unit})`

      return (
        <th key={index}>
          {variable.name} {unit}
        </th>
      )
    }

    return fn
  }

  createItemFV() {
    let self = this

    let fn = (variable, index) => {
      let variable_color = variable.color
      if (!variable_color) variable_color = ''

      let variable_id = variable.variable_id
      let variable_is_custom = variable.is_custom
      let variable_value = variable.value
      let variable_timestamp = variable.timestamp

      if (variable_color === '') variable_color = 'white'
      if (variable_value === '0' || variable_value === 0) {
        variable_value = (
          <span style='color: #F2ED0A !important;'>{variable_value}</span>
        )
      }

      let urlQuick = `/charts/${variable_id}`
      if (variable_is_custom) {
        urlQuick = `/charts/${variable_id}/true`
      }

      return (
        <td key={index}>
          <div className='Flex center'>
            <strong>
              <a
                href={urlQuick}
                title={variable_timestamp}
                style={`font-weight bolder; color: ${variable_color} !important;`}
              >
                {variable_value}
              </a>
            </strong>
          </div>
        </td>
      )
    }

    return fn
  }

  createLogAlarm() {
    let self = this

    let fn = (item, index) => {
      if (item.checked) return

      return (
        <tr key={index}>
          <td>
            <strong>{item.created_at_out}</strong>
          </td>
          <td>{item.variable_device}</td>
          <td>{item.variable_name}</td>
          <td>{item.is_timeout ? constants.NA : item.value}</td>
          <td>{item.message}</td>
          <td>
            <div className='switch'>
              <label>
                <input type='checkbox' checked={item.checked} />
                <span
                  className='lever'
                  onClick={self.handleChangeLogAlarm(item.id)}
                ></span>
                Aprobar
              </label>
            </div>
          </td>
        </tr>
      )
    }

    return fn
  }

  createOptMatrix() {
    let fn = (item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    }

    return fn
  }

  getVariables(sons) {
    let variables = []

    for (let i = 0; i < sons.length; i++) {
      let son = sons[i]

      if (son.sons) {
        if (son.sons[0]) {
          son.sons[0]._group = {
            id: son.id,
            name: son.name,
            type: son.type,
            comment: son.comment,
          }
        }

        let variablesOut = this.getVariables(son.sons)
        for (let j = 0; j < variablesOut.length; j++) {
          const variableOut = variablesOut[j]
          variables.push(variableOut)
        }
      }

      if (son.variables) {
        for (let j = 0; j < son.variables.length; j++) {
          let variable = son.variables[j]

          if (j == 0) {
            variable._group = {
              id: son.id,
              name: son.name,
              type: son.type,
              comment: son.comment,
            }

            if (son._group) {
              let group = son._group
              variable._group._group = {
                id: group.id,
                name: group.name,
                type: group.type,
                comment: group.comment,
              }
            }
          }

          variable.is_variable = true
          variables.push(variable)
        }
      }
    }

    return variables
  }

  createMatrix() {
    let self = this

    let fn = (s, mi) => {
      let view = false

      if (self.state.view == LIST_VIEW) {
        view = (
          <ListView
            structure={s}
            first={mi}
            onListViewMin={self.handleListViewMin()}
            onTableView={self.handleTableView()}
            onTableViewCol={self.handleTableViewCol()}
            onChartView={self.handleChartView()}
            onOpenDynamicGraphicsGroup={self.handleOpenDynamicGraphicsGroup(mi)}
            onOpenCommentGroup={self.handleOpenCommentGroup()}
            onOpenCommentVariable={self.handleOpenCommentVariable()}
            onChangeSoundVariable={self.handleChangeSoundVariable(mi)}
          />
        )
      } else if (self.state.view == LIST_VIEW_MIN) {
        view = (
          <ListViewMin
            structure={s}
            first={mi}
            onListView={self.handleListView()}
            onTableView={self.handleTableView()}
            onTableViewCol={self.handleTableViewCol()}
            onChartView={self.handleChartView()}
            onOpenDynamicGraphicsGroup={self.handleOpenDynamicGraphicsGroup(mi)}
            onOpenCommentGroup={self.handleOpenCommentGroup()}
            onOpenCommentVariable={self.handleOpenCommentVariable()}
            onChangeSoundVariable={self.handleChangeSoundVariable(mi)}
          />
        )
      } else if (self.state.view == TABLE_VIEW) {
        view = (
          <TableView
            structure={s}
            first={mi}
            onListView={self.handleListView()}
            onListViewMin={self.handleListViewMin()}
            onTableViewCol={self.handleTableViewCol()}
            onChartView={self.handleChartView()}
            onOpenCommentGroup={self.handleOpenCommentGroup()}
            onOpenCommentVariable={self.handleOpenCommentVariable()}
            onChangeSoundVariable={self.handleChangeSoundVariable(mi)}
          />
        )
      } else if (self.state.view == TABLE_VIEW_COL) {
        view = (
          <TableViewCol
            structure={s}
            first={mi}
            onListView={self.handleListView()}
            onListViewMin={self.handleListViewMin()}
            onTableView={self.handleTableView()}
            onChartView={self.handleChartView()}
            onLogAlarmsView={self.handleLogAlarmsView()}
            onOpenCommentGroup={self.handleOpenCommentGroup()}
            onOpenCommentVariable={self.handleOpenCommentVariable()}
            onChangeSoundVariable={self.handleChangeSoundVariable(mi)}
          />
        )
      } else if (self.state.view == CHART_VIEW) {
        view = (
          <ChartView
            structure={s}
            first={mi}
            onListView={self.handleListView()}
            onListViewMin={self.handleListViewMin()}
            onTableView={self.handleTableView()}
            onTableViewCol={self.handleTableViewCol()}
            onOpenCommentGroup={self.handleOpenCommentGroup()}
            onOpenCommentVariable={self.handleOpenCommentVariable()}
            onChangeSoundVariable={self.handleChangeSoundVariable(mi)}
          />
        )
      }

      return view
    }

    return fn
  }

  render(props, state) {
    let self = this

    let structures = state.structures
    let matrices = state.matrices

    let notifications = state.notifications_

    let comment_name = false

    let comment = this.state.comment
    if (comment) {
      if (comment.variable_id) {
        comment_name = `${comment.device}.${comment.name}`
      } else {
        comment_name = `${comment.name}`
      }
    }

    if (!matrices) matrices = []
    if (!structures) structures = []

    let o = {
      matrices_: state.matrices_,
      matrices: matrices,
    }

    let contentClass = 'contenedor_root animated fadeIn'

    // SOLO PARA V2
    if (state.view == TABLE_VIEW_COL) {
      contentClass = 'MatrizUpdateDVZ animated fadeIn'
    }

    let log_alarms_view = state.log_alarms_view
    let log_alarms = state.log_alarms

    if (!log_alarms) log_alarms = []
    let footer_alarms = false

    if (log_alarms.length > 0 && log_alarms_view) {
      footer_alarms = (() => {
        return (
          <section className='LogAlarms'>
            <div className='row'>
              <div className='col s12 m12'>
                <table
                  className='responsive-table table-static-2'
                  style='border-collapse: collapse;'
                >
                  <thead>
                    <tr>
                      <th>FECHA/HORA</th>
                      <th>INSTALACIÓN</th>
                      <th>VARIABLE</th>
                      <th>VALOR</th>
                      <th>MENSAJE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{log_alarms.map(self.createLogAlarm())}</tbody>
                </table>
              </div>
            </div>
          </section>
        )
      })()
    }

    let footerVariables = false
    let footer_variables = state.footer_variables

    if (footer_variables.length > 0) {
      footerVariables = (() => {
        return (
          <section className='FooterDVZ'>
            <div className='row'>
              <div className='col s12 m12'>
                <table
                  className='responsive-table'
                  style='border-collapse: collapse;'
                >
                  <thead>
                    <tr>{footer_variables.map(self.createTitleFV())}</tr>
                  </thead>
                  <tbody>
                    <tr>{footer_variables.map(self.createItemFV())}</tr>
                  </tbody>
                </table>
              </div>
            </div>

            {footer_alarms}
          </section>
        )
      })()
    }

    return (
      <div>
        <Header
          o={o}
          module={constants.MATRIX_MODULE}
          notifications={notifications}
          onRestoreMatrix={this.handleRestoreMatrix()}
          onItemGroup={this.handleItemGroup()}
          onChangeMatrix={this.handleChangeMatrix()}
          onRemoveNotification={this.handleRemoveNotification()}
        />

        <section className={contentClass}>
          <div className='matriz_clasica'>
            <div className='row'>{structures.map(this.createMatrix())}</div>
          </div>

          {footerVariables}
        </section>

        <div className='background'></div>

        <div id='comentarios_macro' className='modal modal_sesion'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown'>announcement</i>
            <div className='modal_box animated fadeIn'>
              <h5>Agregar un comentario a {comment_name}</h5>
              <form
                className='formulario'
                onSubmit={this.handleChangeComment()}
              >
                <div className='input-field col s6'>
                  <input
                    placeholder='Agrega un comentario'
                    id='input-comment'
                    type='text'
                    className='validate'
                  />
                </div>
                <button
                  type='button'
                  className='modal-action modal-close btn btn_ttx_error darken-3'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='modal-action modal-close btn btn_ttx_success'
                >
                  Aceptar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div id='comentarios_log_alarm' className='modal modal_sesion'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown'>announcement</i>
            <div className='modal_box animated fadeIn'>
              <h5>Agregar un comentario</h5>
              <form
                className='formulario'
                onSubmit={this.handleCommentLogAlarm()}
              >
                <div className='input-field col s6'>
                  <input
                    placeholder='Agrega un comentario'
                    id='input-comment-log-alarm'
                    type='text'
                    className='validate'
                  />
                </div>
                <button
                  type='button'
                  className='modal-action modal-close btn btn_ttx_error darken-3'
                  onClick={this.handleLogAlarmClose()}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='modal-action modal-close btn btn_ttx_success'
                >
                  Aceptar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div id='paro_remoto' className='modal modal_sesion'>
          <div className='modal-content'>
            <i className='material-icons animated fadeInDown'>warning</i>
            <div className='modal_box animated fadeIn'>
              <h4>PARO REMOTO</h4>
              <br />
              <h5>¿Está seguro de que quieres realizar esta acción?</h5>
              <br />
              <a
                href='#!'
                className='modal-action modal-close btn btn_ttx_error darken-3'
              >
                Cancelar
              </a>
              <a
                href='#!'
                className='modal-action modal-close btn btn_ttx_success'
              >
                Aceptar
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

render(<Content />, document.getElementById('content-main'))
