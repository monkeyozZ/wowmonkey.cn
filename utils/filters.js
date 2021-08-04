/* eslint-disable camelcase */
import gravatar from '~/plugins/gravatar'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else {
        time = time.replace(/-/g, '/').replace('T', ' ').replace(/\+[0-9:]+/ig, '')// 为了兼容ios的时间格式转化
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

const pluralize = (time, label) => {
  return time + label + '前'
}
const timefilter = (time) => {
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else {
        time = time.replace(/-/g, '/').replace('T', ' ').replace(/\+[0-9:]+/ig, '')// 为了兼容ios的时间格式转化
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const between = Date.now() / 1000 - (Number(date) / 1000)
  if (between < 3600) {
    if (Object.is(~~(between / 60), 0)) { return '刚刚' }
    return pluralize(~~(between / 60), '分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时')
  } else {
    // return pluralize(~~(between / 86400), '天')
    return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
  }
}

const parseTimeSub = (time, cFormat) => {
  // eslint-disable-next-line no-undef
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) { time = parseInt(time) * 1000 }
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate()
  }
  const timestr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timestr
}

const substring = (str) => {
  if (str) {
    if (str.length > 18) {
      return str.substring(0, 18) + '...'
    } else {
      return str
    }
  }
}

const mobileSubstring = (str) => {
  if (str) {
    if (str.length > 15) {
      return str.substring(0, 15) + '...'
    } else {
      return str
    }
  }
}

const transfornOrigin = (str) => {
  if (str) {
    if (str === '0') {
      return '原创'
    }
    if (str === '1') {
      return '转载'
    }
    if (str === '2') {
      return '混合'
    }
  }
}

const formatTime = (time) => {
  if (time === 0) { return '00:00' }
  let minute = Math.floor(Math.floor(time % 3600) / 60)
  let second = parseInt(time % 60)
  minute = minute.toString().length === 1 ? `0${minute}` : minute
  second = second.toString().length === 1 ? `0${second}` : second
  if (minute !== '00') {
    return `${minute}:${second}`
  } else {
    return `00:${second}`
  }
}

const tagName = (arr) => {
  return arr.map(item => item.name).join()
}

const getGravatar = (email) => {
  const regexs = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  if (!regexs.test(email)) { return null }
  const gravatarUrl = gravatar.url(email, {
    // size: '96',
    // rating: 'pg',
    // default: 'https://gravatar.surmon.me/anonymous.jpg',
    protocol: 'http'
  })
  return gravatarUrl
}

export default { parseTime, timefilter, substring, mobileSubstring, transfornOrigin, parseTimeSub, formatTime, tagName, getGravatar }
