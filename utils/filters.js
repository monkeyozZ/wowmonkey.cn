/* eslint-disable no-sequences */
import gravatar from '~/plugins/gravatar'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
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

export function parseTimeLag(time) {
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
  const textMap = {
    ago: '前',
    just_now: '刚刚',
    minutes: '分钟',
    hours: '小时',
    weeks: '周',
    days: '天',
    months: '个月',
    years: '年'
  }
  const hourS = 3600
  const dayS = hourS * 24
  const weekS = dayS * 7
  const monthS = dayS * 30
  const yearS = monthS * 12

  const pluralize = (time, label) => {
    return `${time} ${label}${textMap.ago}`
  }

  if (between < hourS) {
    return ~~(between / 60) === 0
      ? textMap.just_now
      : pluralize(~~(between / 60), textMap.minutes)
  }
  if (between < dayS) {
    return pluralize(~~(between / hourS), textMap.hours)
  }
  if (between < weekS) {
    return pluralize(~~(between / dayS), textMap.days)
  }
  if (between < monthS) {
    return pluralize(~~(between / weekS), textMap.weeks)
  }
  if (between < yearS) {
    return pluralize(~~(between / monthS), textMap.months)
  }
  return pluralize(~~(between / yearS), textMap.years)
}

export function transfornOrigin(n) {
  if (n === 0) {
    return '原创'
  }
  if (n === 1) {
    return '转载'
  }
  if (n === 2) {
    return '混合'
  }
}

export function formatTime(time) {
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

export function tagName(arr) {
  return arr.map(item => item.name).join()
}

export function getGravatar(email) {
  const regexs = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  if (!regexs.test(email)) { return null }
  const gravatarUrl = gravatar.url(email, {
    // size: '96',
    // rating: 'pg',
    // default: 'https://gravatar.surmon.me/anonymous.jpg',
    protocol: 'https'
  })
  return gravatarUrl
}
