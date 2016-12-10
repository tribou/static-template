'use strict'

const Hapi = require('hapi')
const Good = require('good')
const Inert = require('inert')

const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000,
  routes: {
    cors: true,
    security: {
      xframe: 'sameorigin',
    },
  },
})

server.register([
  {
    register: Inert,
  },
  {
    register: Good,
    options: {
      ops: {
        interval: 10000,
      },
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', request: '*', response: '*', error: '*' }],
        }, {
          module: 'good-console',
        }, 'stdout'],
      },
    },
  },
], () => {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'build/public',
        lookupCompressed: true,
      },
    },
  })

  server.ext('onPreResponse', (request, reply) => {

    if (request.response.isBoom) {

      if (request.response.output.statusCode === 404) {

        return reply.redirect('/')

      }

    }

    return reply.continue()

  })

  server.start(() => {

    server.log(['info'], `Server running at: ${server.info.uri}`)

  })

})
