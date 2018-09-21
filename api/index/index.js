import request from '~/utils/request'

const getArticleList = async (obj) => {
  return request({
    url: '/siteArticle/getArticleList',
    method: 'post',
    data: obj
  })
}

const getTagList = async () => {
  return request({
    url: '/siteArticle/getTagList',
    method: 'post'
  })
}

export default { getArticleList, getTagList }