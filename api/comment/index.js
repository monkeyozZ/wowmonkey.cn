import request from '~/utils/request'

const saveMsg = (obj) => {
  return request({
    url: '/siteComment/saveMsg',
    method: 'post',
    data: obj
  })
}

const getCommentList = (obj) => {
  return request({
    url: '/siteComment/getCommentList',
    method: 'post',
    data: obj
  })
}
const like = (obj) => {
  return request({
    url: '/siteComment/like',
    method: 'post',
    data: obj
  })
}

export default { saveMsg, getCommentList, like }
