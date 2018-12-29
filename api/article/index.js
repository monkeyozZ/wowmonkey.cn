import request from '~/utils/request'

const getArticleList = async (obj) => {
  return request({
    url: '/siteArticle/getArticleList',
    method: 'post',
    data: obj
  })
}

const getArticleDetails = async (id) => {
  return request({
    url: '/siteArticle/getArticleDetails',
    method: 'post',
    data: {id: id}
  })
}

const like = async (obj) => {
  return request({
    url: '/siteArticle/likeArticle',
    method: 'post',
    data: obj
  })
}

export default { getArticleList, getArticleDetails, like }