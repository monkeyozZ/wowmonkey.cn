export const state = () => {
  return {
    mobileLayout: false,
    mobileSearch: false,
    fullColumn: false
  }
}

export const getters = {
  mobileLayout: state => state.mobileLayout,
  mobileSearch: state => state.mobileSearch,
  fullColumn: state => state.fullColumn
}

export const mutations = {
  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action
  },
  SET_MOBILE_SEARCH(state, action) {
    state.mobileSearch = action
  },
  // 设置是否需要侧边栏
  SET_ASIDE_STATUS(state, action) {
    state.fullColumn = action
  }
}
