'use strict'

const Glob = require('glob')

const client = {
  // include CSS files here where order of precedence is needed
  // Bundle vendor libraries in a separate chunk
  vendor: [
    'debug',
    'jquery',
  ],
  bundle: [
    'normalize.css/normalize.css',
    './src/styles/fonts.css',
    './src/styles/app.css',
    './src/styles/images.css',
    './src/styles/sprites.css',
    './src/js/index.js',
  ].concat(Glob.sync('./src/styles/modules/**/*.css')),
}


const server = client


module.exports = {

  development: {
    client,
    server,
  },

  production: {
    client,
    server,
  },

}
