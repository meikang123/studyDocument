import Vue from "vue";
import Vuex from "vuex";
import user from './module/user';

const modules = {user};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: false, // 是否是移动端
    isOpenSideBar: true,
    withoutAnimation: false
  },
  mutations: {
    "CHANGE_MOBILE_STATUS"(state, data) {
      state.isMobile = data;
    },
    "CHANGE_OPEN_SIDEBAR_STATUS"(state) {
      state.isOpenSideBar = !state.isOpenSideBar;
      state.withoutAnimation = false;
    },
    "CLOSE_SIDEBAR"(state, data) {
      state.isOpenSideBar = false;
      state.withoutAnimation = data;
    }
  },
  actions: {
    changeMobile({ commit }, isMobile) {
      commit('CHANGE_MOBILE_STATUS', isMobile);
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleSideBar({ commit }) {
      commit('CHANGE_OPEN_SIDEBAR_STATUS');
    }
  },
  modules
});
