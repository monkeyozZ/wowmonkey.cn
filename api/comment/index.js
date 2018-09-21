import request from '~/utils/request'

const saveMsg = async (obj) => {
  return request({
    url: '/siteComment/saveMsg',
    method: 'post',
    data: obj
  })
}

const getCommentList = async (obj) => {
  return request({
    url: '/siteComment/getCommentList',
    method: 'post',
    data: obj
  })
}
const like = async (obj) => {
  return request({
    url: '/siteComment/like',
    method: 'post',
    data: obj
  })
}

export default { saveMsg, getCommentList, like }