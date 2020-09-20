const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  // baseUrl: isProdMode ? 'http://api.wowmonkey.cn' : 'http://127.0.0.1:3030'
  baseUrl: isProdMode ? 'http://api.wowmonkey.cn' : 'http://localhost:3000'
}
