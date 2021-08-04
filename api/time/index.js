import request from '~/utils/request'

const getTimeList = (params) => {
  return request({
    url: '/time/list',
    method: 'get',
    params
  })
}

export default { getTimeList }
