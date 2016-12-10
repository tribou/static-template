'use strict'

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
    './src/browser.index.js',
  ],
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
