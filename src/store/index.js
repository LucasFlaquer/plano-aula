import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import userService from '../services/userService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email:'',
      name: '',
    },
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
      state.user = {
        email: user.logged_in_as,
        name: user.name
      }
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
      
      if(token) {
        try {
          const auth = await userService.me(token)
          const { email, name } = auth
          commit('SET_USER_DATA', { email, name })
        } catch (error) {
          console.warn(error.response)
          if(error.response.status === 403)
            //token invalido
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
  }
})
