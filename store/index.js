import uaParse from '~/utils/device-test.js'
import indexApi from '~/api/index'
import articleApi from '~/api/article'
import commentApi from '~/api/comment'
import timeApi from '~/api/time'

export const actions = {
  nuxtServerInit (store, {req}) {
    const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
    const { isMobile, isOpera, isIE, isSafari, isEdge, isFF, isBB, isChrome, isMaxthon, isIos } = uaParse(userAgent)
    store.commit('globalStatus/SET_MOBILE_LAYOUT', isMobile)
    return Promise.all([
      // store.dispatch('getArticleList', { page: 1, limit: 2, cate: null, tag: null}),
      store.dispatch('getTagList'),
      store.dispatch('getHotArticleList', { page: 1, limit: 8, hot: true,})
    ])
  },
  // 加载文章列表
  getArticleList({commit}, obj) {
    return articleApi.getArticleList(obj).then((res) => {
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
        commit('article/SET_DETAILS_DATA', res.data.articleDetails)
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
  },

  // 加载热门文章列表
  getHotArticleList({ commit }, obj) {
    return articleApi.getArticleList(obj).then((res) => {
      if (res.data.code === 0) {
        commit('article/SET_HOST_LIST_DATA', res.data.articleList)
      }
    }).catch((err) => {
      console.log(err)
    })
  },

  // 搜索文章列表
  searchArticleList({ commit }, obj) {
    return articleApi.getArticleList(obj).then((res) => {
      if (res.data.code === 0) {
        commit('article/SET_SEARCH_LIST_DATA', res.data.articleList)
      }
    }).catch((err) => {
      console.log(err)
    })
  },

    // 加载时间轴列表
  getTimeList ({ commit }) {
    return timeApi.getTimeList().then((res) => {
      if (res.data.code === 0) {
        // console.log(res.data.tagList)
        commit('time/SET_LIST_DATA', res.data.timeLineList)
      }
    })
  },
}