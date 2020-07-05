import request from '~/utils/request'

const getArticleList = (obj) => {
  return request({
    url: '/siteArticle/getArticleList',
    method: 'post',
    data: obj
  })
}

const getArticleDetails = (id) => {
  return request({
    url: '/siteArticle/getArticleDetails',
    method: 'post',
    data: { id }
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
