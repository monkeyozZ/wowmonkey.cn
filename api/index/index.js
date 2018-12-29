import request from '~/utils/request'

const getTagList = async () => {
  return request({
    url: '/siteArticle/getTagList',
    method: 'post'
  })
}

export default { getTagList }