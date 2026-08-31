const constants = {
  URL_SERVER_ALARMS: '/server/alarms',
  URL_SERVER_AUTH: '/server/auth',
  URL_SERVER_GEOMAPS: '/server/geomaps',
  URL_SERVER_GROUPS: '/server/groups',
  URL_SERVER_GPS_DEVICES: '/server/gps_devices',
  URL_SERVER_VEHICLES: '/server/vehicles',
  URL_SERVER_VARIABLES: '/server/variables',
  URL_SERVER_CUSTOM_VARIABLES: '/server/custom_variables',
  URL_SERVER_MATRICES: '/server/matrices',
  URL_SERVER_REPORTS: '/server/reports',
  URL_SERVER_UNITS: '/server/units',
  URL_SERVER_USERS: '/server/users',
  URL_SERVER_EVENTS: '/server/events',
  URL_SERVER_CHARTS: '/server/charts',
  URL_SERVER_GRAPHICS: '/server/graphics',
  URL_SERVER_CHART_EVENTS: '/server/chart_events',
  URL_SERVER_OPERATIONS: '/server/operations',
  URL_SERVER_FOOTER_VARIABLES: '/server/footer_variables',
  URL_SERVER_DASHBOARD_VARIABLES: '/server/dashboard_variables',
  URL_SERVER_LOG_EVENTS: '/server/log/events',
  URL_SERVER_LOG_ALARMS: '/server/log/alarms',
  URL_SERVER_LOG_ORBCOMMS: '/server/log/orbcomms',
  URL_SERVER_OVERWRITES: '/server/overwrites',

  URL_SERVER_CORIOLIS: '/server/variables/coriolis',

  EVENT_UDAPTE_VARIABLES: 'update-variables',
  EVENT_ALARMS_VARIABLES: 'alarms-variables',
  EVENT_COMMENT_VARIABLE: 'comment-variable',

  EVENT_UPDATE_COMMENT_GROUP: 'update-comment-group',

  EVENT_EMPTY_UDAPTE_VARIABLES_VALUE: 'empty-update-variables-value',

  EVENT_UDAPTE_ALARMS_ACTIVE: 'update-alarms-active',
  EVENT_UDAPTE_VARIABLES_VALUE: 'update-variables-value',
  EVENT_UDAPTE_VARIABLES_ALARM: 'update-variables-alarm',
  EVENT_UDAPTE_VARIABLES_TIMEOUT: 'update-variables-timeout',

  EVENT_REQUEST_REPORT: 'request-report',
  EVENT_RESPONSE_REPORT: 'response-report',

  EVENT_REQUEST_REPORT_LOCATOR: 'request-report-locator',
  EVENT_RESPONSE_REPORT_LOCATOR: 'response-report-locator',

  EVENT_UDAPTE_VEHICLE: 'update-vehicle',

  EVENT_CREATE_FILE: 'create-file',
  EVENT_COPY_FILE: 'copy-file',
  EVENT_MOVE_FILE: 'move-file',
  EVENT_RENAME_FILE: 'rename-file',
  EVENT_DELETE_FILE: 'delete-file',
  EVENT_GET_CONTENT: 'get-content',

  EVENT_VARIABLES: 'variables',
  EVENT_SETPOINTS: 'setpoints',
  EVENT_OPEN_CREATE_EVENT: 'open-create-event-chart',
  EVENT_OPEN_EVENT_CHART: 'open-event-chart',
  EVENT_INSERT_EVENT_CHART: 'insert-event-chart',

  LABEL_EVENTS: 'Eventos',

  MATRIX_MODULE: 1,
  GRAPHIC_MODULE: 2,
  REPORTS_MODULE: 3,
  EVENTS_MODULE: 4,
  LOCATION_MODULE: 5,
  LOCATOR_MODULE: 6,
  EXPLORER_MODULE: 7,
  CONFIGURATION_MODULE: 8,
  OPERATIONS_MODULE: 9,
  PROFILE_MODULE: 10,
  SHUTDOWN_REMOTE_MODULE: 11,
  CORIOLIS_MODULE: 12,
  DASHBOARD_MODULE: 13,

  TIMEOUT_VALUE: 1,
  WARNING_VALUE: 2,
  DANGER_VALUE: 3,

  TYPE_VALUE_ALARM: 1,
  TYPE_TIMEOUT_ALARM: 2,

  TIMEOUT_DEFAULT: 5,

  RT_HTTP: 1,
  RT_WS: 2,

  DARK_THEME: 1,
  WHITE_THEME: 2,

  TYPE_VALUE_ALARM: 1,

  WARNING_SOUND: '/static/media/warning.mp3',
  DANGER_SOUND: '/static/media/danger.mp3',
  TIMEOUT_SOUND: '/static/media/timeout.mp3',

  EXT_DOC: 'doc',
  EXT_DOCX: 'docx',
  EXT_GIF: 'gif',
  EXT_JPEG: 'jpeg',
  EXT_JPG: 'jpg',
  EXT_MIDI: 'midi',
  EXT_MP3: 'mp3',
  EXT_MP4: 'mp4',
  EXT_PDF: 'pdf',
  EXT_PNG: 'png',
  EXT_PPT: 'ppt',
  EXT_PPTX: 'pptx',
  EXT_PUB: 'pub',
  EXT_RAR: 'rar',
  EXT_TXT: 'txt',
  EXT_VSD: 'vsd',
  EXT_WAV: 'wav',
  EXT_XLS: 'xls',
  EXT_XLSX: 'xlsx',
  EXT_ZIP: 'zip',

  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_ACCEPTED: 202,

  METHOD_GET: 'GET',
  METHOD_POST: 'POST',
  METHOD_PUT: 'PUT',
  METHOD_DELETE: 'DELETE',

  JSON: 'json',
  APPLICATION_JSON: 'application/json',

  ACCESS_TOKEN_WS: 'access_token_ws',
  ACCESS_TOKEN_WSA: 'access_token_wsa',
  ACCESS_TOKEN_WSE: 'access_token_wse',

  TTX_PROTOCOOL: 'ttx-protocol',

  MARKER_ICON: 'marker_icon',
  TEMPLATE: 'template',

  NA: 'N/A',

  MESSAGE_SAVED_OK: 'Los cambios se guardaron correctamente',
  MESSAGE_ERROR: 'Ocurrió un error al solicitar la información',

  LIMIT_FOR_RECONNECTION: 3,

  ROLES: [
    'Administrador General',
    'Administrador de Sistema',
    'Administrador',
    'Operador',
    'Invitado',
  ],
};

export default constants;