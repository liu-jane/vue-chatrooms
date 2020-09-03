import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import socket from './modules/socket.js'
import getters from './getters'
import createPersistedState from "vuex-persistedstate"

export default new Vuex.Store({
  modules:{
    socket
  },
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
        return {
        // 只储存state中的assessmentData
        socket: val.socket
      }
   }
})]
})