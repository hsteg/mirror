import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    autoUpdate: false
  },
  mutations: {
    enableAutoUpdate(state) {
      state.autoUpdate = true;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    autoUpdate: state => {
      return state.autoUpdate;
    } 
  }
})
