import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {}
  },
  mutations: {
  },
  actions: {
    login({commit}) {
      console.log('Button clicked from store');
    },
    register() {

    },
    logout() {

    }
  },
  getters: {
    isLoggedIn: state => !!state.token
  },
  modules: {
  }
})
