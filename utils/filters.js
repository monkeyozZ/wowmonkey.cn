const pluralize = (time, label) => {
  return time + label + '前'
}
const timefilter = (time) => {
  time = time instanceof Date ? time : new Date(parseInt(time))
  const between = Date.now() / 1000 - (Number(time) / 1000)
  if (between < 3600) {
    if (Object.is(~~(between / 60), 0)) return '刚刚'
    return pluralize(~~(between / 60), '分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时')
  } else {
    return pluralize(~~(between / 86400), '天')
  }
}

const parseTime = (time, cFormat) => {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(parseInt(time))
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
  const timestr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timestr
}

const substring = (str) => {
  if (str) {
    if (str.length > 22) {
      return str.substring(0, 22) + '...'
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

export default { timefilter, parseTime, substring, mobileSubstring, transfornOrigin  }