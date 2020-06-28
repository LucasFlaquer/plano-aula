import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
// import userService from '../services/userService'
// import api from '../services/api'

import * as cursoModule from '@/store/modules/cursoModule'
import * as userModule from '@/store/modules/userModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  getters: {
    
  },
  modules: {
    cursoModule,
    userModule
  }
})
