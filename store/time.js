export const state = () => {
  return {
    list: {
      data: []
    }
  }
}

export const getters = {
  list: state => state.list.data
}

export const mutations = {
  SET_LIST_DATA(state, action) {
    console.log(action)
    state.list.data = action
  }
}
