import { scrollAnimation } from '~/utils/common'
export const state = () => {
  return {
    list: {
      data: []
    },
    hot_list: {
      data: []
    },
    search_list: {
      data: []
    },
    details: {
      data: {}
    },
    commentList: {
      data: [],
      count: null
    }
  }
}

export const getters = {
  list: state => state.list.data,
  hot_list: state => state.hot_list.data,
  search_list: state => state.search_list.data,
  details: state => state.details.data,
  comment_list: state => state.commentList.data,
  comment_count: state => state.commentList.count
}

export const mutations = {
  SET_LIST_DATA (state, action) {
    state.list.data = action
  },
  SET_HOST_LIST_DATA (state, action) {
    state.hot_list.data = action
  },
  SET_SEARCH_LIST_DATA (state, action) {
    state.search_list.data = action
  },
  SET_DETAILS_DATA (state, action) {
    state.details.data = action
  },
  SET_DETAILS_DATA_LIKE (state, num) {
    state.details.data.like = num
  },
  SET_COMMENT_DATA (state, action) {
    // state.commentList.data = action
    const obj = {}
    state.commentList.data = action.concat(state.commentList.data).reduce((item, next) => {
      // eslint-disable-next-line no-unused-expressions
      obj[next._id] ? '' : obj[next._id] = true && item.push(next)
      return item
    }, [])
  },
  SET_CONCAT_COMMENT_DATA (state, action) {
    // state.commentList.data = action
    const obj = {}
    state.commentList.data = state.commentList.data.concat(action).reduce((item, next) => {
      // eslint-disable-next-line no-unused-expressions
      obj[next._id] ? '' : obj[next._id] = true && item.push(next)
      return item
    }, [])
  },
  RESET_COMMENT_DATA (state, action) {
    state.commentList.data = []
  },
  SET_COMMENT_DATA_LIKE (state, obj) {
    state.commentList.data[obj.i].like = obj.num
  },
  SET_COMMENT_DATA_COMMENTCOUNT (state, count) {
    state.commentList.count = count
  },
  SET_COMMENT_DATA_LIKESTATUS (state, obj) {
    state.commentList.data[obj.i].userlike = obj.status
  },
  SET_COMMENT_DATA_HASCHILDREN (state, obj) {
    console.log(state.commentList.data[obj.i], obj.i)
    state.commentList.data[obj.i].openChild = obj.status
    state.commentList.data.map((item, index) => {
      if (index !== obj.i) {
        item.openChild = false
      }
    })
    if (obj.status) {
      const itemOffsetHeightStart = document.querySelector(`.comment-item-${obj.i}`).offsetTop
      setTimeout(() => {
        const itemOffsetHeight = document.querySelector(`.comment-item-${obj.i}`).offsetTop
        const screenHeight = document.documentElement.clientHeight
        const scrollTop = itemOffsetHeight - (screenHeight * 0.3)
        // window.scrollTo(0, scrollTop)
        if (itemOffsetHeightStart - itemOffsetHeight < 100) {
          return
        }
        scrollAnimation(itemOffsetHeight, scrollTop)
      }, 500)
    }
  },
  SET_COMMENT_DATA_CHILDCOMMENTCOUNT (state, index) {
    state.commentList.data[index].childCount += 1
  },
  SET_COMMENT_DATA_REPLYCOMMENT (state, obj) {
    state.commentList.data[obj.i].replyComment = obj.list
  }
}
