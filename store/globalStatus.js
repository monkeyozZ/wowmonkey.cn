export const state = () => {
  return {
    mobileLayout: false,
    mobileSearch: false
  }
}

export const getters = {
  mobileLayout: state => state.mobileLayout,
  mobileSearch: state => state.mobileSearch
}

export const mutations = {
  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action
  },
  SET_MOBILE_SEARCH(state, action) {
    state.mobileSearch = action
  }
}