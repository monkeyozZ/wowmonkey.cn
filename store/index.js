import uaParse from '~/utils/device-test.js'
import indexApi from '~/api/index'
import articleApi from '~/api/article'
import commentApi from '~/api/comment'

export const actions = {
  nuxtServerInit (store, {req}) {
    const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
    const { isMobile, isOpera, isIE, isSafari, isEdge, isFF, isBB, isChrome, isMaxthon, isIos } = uaParse(userAgent)
    store.commit('globalStatus/SET_MOBILE_LAYOUT', isMobile)
    return Promise.all([
    store.dispatch('getArticleList'),
    store.dispatch('getTagList')
    ])
  },
  // 加载文章列表
  getArticleList({commit}, obj) {
    return indexApi.getArticleList(obj).then((res) => {
      if (res.data.code === 0) {
        commit('article/SET_LIST_DATA', res.data.articleList)
      }
    }).catch((err) => {
      console.log(err)
    })
  },

  // 加载标签列表
  getTagList({commit}) {
    return indexApi.getTagList().then((res) => {
      if (res.data.code === 0) {
        // console.log(res.data.tagList)
        commit('tag/SET_LIST_DATA', res.data.tagList)
      }
    })
  },

  // 加载文章详情
  getArticleDetails({commit}, id) {
    return articleApi.getArticleDetails(id).then((res) => {
      if (res.data.code === 0) {
        commit('article/SET_DETAILS_DATA', res.data.articleDetails[0])
      }
    })
  },

  //初始化评论
  getCommentList({ commit },id) {
    return commentApi.getCommentList({ id: id }).then((res) => {
      if (res.data.code === 0) {
        commit('article/SET_COMMENT_DATA', res.data.commentList)
      }
    })
  }
}