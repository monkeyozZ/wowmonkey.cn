import request from '~/utils/request'

const getTagList = () => {
  return request({
    url: '/webTag/list',
    method: 'get'
  })
}

export default { getTagList }
