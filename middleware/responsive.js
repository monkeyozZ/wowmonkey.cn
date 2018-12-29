export default ({ route, store }, next) => {


  const fullColumn = ['about'].includes(route.name)


  if (store.state.globalStatus.fullColumn !== fullColumn) {
    store.commit('globalStatus/SET_ASIDE_STATUS', fullColumn)
  }

  next()
}