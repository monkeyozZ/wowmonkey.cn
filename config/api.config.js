const isProdMode = Object.is(process.env.NODE_ENV, 'production')
 
module.exports = {
  baseUrl: isProdMode ? 'https://wowmonkey.cn' : 'http://172.16.0.90:3000'
}