import request from '~/utils/request'

const getTagList = () => {
  return request({
    url: '/siteArticle/getTagList',
    method: 'post'
  })
}

export default { getTagList }
