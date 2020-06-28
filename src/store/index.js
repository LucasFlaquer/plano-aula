import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import userService from '../services/userService'
import api from '../services/api'

import * as cursoModule from '@/store/modules/cursoModule'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    userStatus:false,
    userRequest:'nothing',
    count:0
  },
  mutations: {
    SET_USER_REQUEST(state, req) {
      state.userRequest = req
    },
    SET_USER_STATUS(state, status) {
      state.userStatus = status
    },
    SET_USER_DATA(state, user) {
      //set user from login
      state.user = user
    }
  },
  actions: {
    async makeLogin({ commit }, user) {
      try {
        commit('SET_USER_STATUS', true)
        const response = await userService.login(user)
        const { access_token:token } = response
        commit('SET_USER_DATA', response)
        commit('SET_USER_STATUS', false)
        localStorage.setItem('token', token)
        router.push({name:'Home'})

      } catch (error) {
        console.warn('ERRO:', error.response)
        return false
      }
      // const response = await userService.login(user)
      // console.log(response)
    },
    async fetchUser({ commit }) {
      const token = localStorage.getItem('token')
      console.log('peguei o token:', typeof token)
      
      if(token && token !== 'undefined') {
        try {
          const auth = await api.get('/users/me', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          
          commit('SET_USER_DATA', auth.data)
        } catch (error) {
          console.warn('------------------------------------------',error.response)
          if(error.response.status === 403 || error.response.status === 401)
            //token invalido
            console.warn('TOKEN INVALIDO')
            localStorage.removeItem('token')
            router.push({name:'Login'})

        }
      } else {
        router.push({name:'Login'})
      }
    },
    logout() {
      localStorage.removeItem('token')
      router.push({name:'Login'})
    }
  },
  getters: {
    getUserToken: state=> {
      return state.user.token
    }
    
  },
  modules: {
    cursoModule
  }
})
