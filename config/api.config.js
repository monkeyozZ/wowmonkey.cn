const isProdMode = Object.is(process.env.NODE_ENV, 'production')
 
module.exports = {
  baseUrl: isProdMode ? 'https://wowmonkey.cn' : 'http://192.168.2.133:3000'
}