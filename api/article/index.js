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

const like = (obj) => {
  return request({
    url: '/siteArticle/likeArticle',
    method: 'post',
    data: obj
  })
}

export default { getArticleList, getArticleDetails, like }
