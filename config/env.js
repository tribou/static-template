// Grab from env vars if they are set
const {

  NODE_ENV,
  API_URL,
  ROOT_URL,

} = process.env


// Set defaults
const env = {

  // Since NODE_ENV is automatically used by many plugins, we can't ensure it
  // will produce dev/prod parity by itself. Consequently, we need to use
  // separate ENVs for apps.
  NODE_ENV: NODE_ENV || 'production',

  // App settings
  API_URL: API_URL || 'https://api.example.com',
  ROOT_URL: ROOT_URL || 'http://localhost:3000',

}


export default env
