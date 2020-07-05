import request from '~/utils/request'

const getTimeList = (obj) => {
  return request({
    url: '/siteTime/getTimeList',
    method: 'post',
    data: obj
  })
}

export default { getTimeList }
