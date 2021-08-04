import request from '~/utils/request'

const getArticleList = (params) => {
  return request({
    url: '/webArticle/list',
    method: 'get',
    params
  })
}

const getArticleDetails = (params) => {
  return request({
    url: '/webArticle/detail',
    method: 'get',
    params
  })
}

const like = (params) => {
  return request({
    url: '/webArticle/like',
    method: 'get',
    params
  })
}

export default { getArticleList, getArticleDetails, like }
