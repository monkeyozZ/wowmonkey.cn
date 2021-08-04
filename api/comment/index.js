import request from '~/utils/request'

const saveMsg = (obj) => {
  return request({
    url: '/webComment/save',
    method: 'post',
    data: obj
  })
}

const getCommentList = (params) => {
  return request({
    url: '/webComment/list',
    method: 'get',
    params
  })
}
const like = (params) => {
  return request({
    url: '/webComment/like',
    method: 'get',
    params
  })
}

export default { saveMsg, getCommentList, like }
