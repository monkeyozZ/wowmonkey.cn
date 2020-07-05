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
      data: []
    }
  }
}

export const getters = {
  list: state => state.list.data,
  hot_list: state => state.hot_list.data,
  search_list: state => state.search_list.data,
  details: state => state.details.data,
  comment_list: state => state.commentList.data
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
    state.commentList.data = action
  },
  SET_COMMENT_DATA_LIKE (state, obj) {
    state.commentList.data[obj.i].like = obj.num
  },
  SET_COMMENT_DATA_COMMENTNUM (state, obj) {
    state.commentList.data[obj.i].comment_num = obj.num
  },
  SET_COMMENT_DATA_LIKESTATUS (state, obj) {
    state.commentList.data[obj.i].userlike = obj.status
  },
  SET_COMMENT_DATA_HASCHILDREN (state, obj) {
    state.commentList.data[obj.i].haschildren = obj.status
  }
}
