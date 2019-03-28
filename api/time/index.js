import request from '~/utils/request'

const getTimeList = async (obj) => {
  return request({
    url: '/siteTime/getTimeList',
    method: 'post',
    data: obj
  })
}

export default { getTimeList }