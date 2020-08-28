const state = {
  roles: null, // 角色
  routes: []
}

const mutations = {
  'SET_ROUTES'(state, routes) {
    state.routes = routes;
  }
}

const actions = {
  generateRoutes({ commit }, routes) {
    return new Promise(resolve => {
      commit('SET_ROUTES', routes);
      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
