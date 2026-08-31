'use strict';

const path = require('path');

module.exports = {
  entry: {
    //coriolis_module: path.join(__dirname, 'src', 'coriolis_module', 'content.jsx'),
    //login: path.join(__dirname, 'src', 'login-content.jsx'),
    //orbcomms_module: path.join(__dirname, 'src', 'orbcomms_module', 'content.jsx'),
    //overwrites_module: path.join(__dirname, 'src', 'overwrites_module', 'content.jsx'),
    //dashboard_module: path.join(__dirname, 'src', 'dashboard_module', 'content.jsx'),
    //matrices_module: path.join(__dirname, 'src', 'matrix_module', 'content.jsx'),
    matrices_module_m: path.join(__dirname,'src','matrix_module','content-multiple.jsx'),
    quick_chart: path.join(__dirname, 'src', 'charts_module', 'content.jsx'),
    charts_module: path.join(__dirname, 'src', 'charts_module', 'content_main.jsx'),
    //dynamometer_charts_module: path.join(__dirname, 'src', 'dynamometer_charts_module', 'content_main.jsx'),
    //dynamic_graphics_module: path.join(__dirname, 'src', 'dynamic_graphics_module', 'content.jsx'),
    //reports_module: path.join(__dirname, 'src', 'reports_module', 'content.jsx'),
    //explorer_module: path.join(__dirname, 'src', 'explorer_module', 'content.jsx'),
    //locator_module: path.join(__dirname, 'src', 'locator_module', 'content.jsx'),
    //location_module: path.join(__dirname, 'src', 'location_module', 'content.jsx'),
    //operations_module: path.join(__dirname, 'src', 'operations_module', 'content.jsx'),
    //events_module: path.join(__dirname, 'src', 'events_module', 'content.jsx'),
    //configuration: path.join(__dirname, 'src', 'configuration', 'content.jsx'),
    //profile: path.join(__dirname, 'src', 'profile', 'content.jsx'),
    //remote_shutdown: path.join(__dirname, 'src', 'remote_shutdown_module', 'content.jsx'),
    //users: path.join(__dirname, 'src', 'users', 'content.jsx'),
  },
  output: {
    path: path.join(__dirname, '..', 'public', 'js', 'src'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?/i,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        options: {
          presets: ['@babel/preset-env'],
          plugins: [['@babel/transform-react-jsx', { pragma: 'h' }]],
        },
      },
    ],
  },
  devtool: 'source-map',
  /*resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }*/
};
