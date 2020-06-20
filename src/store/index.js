import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email:'lucas.flaquer@gmail.com',
      password:'123456',
      name: 'Lucas Henrique',
      token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTI0NDQ2NDUsIm5iZiI6MTU5MjQ0NDY0NSwianRpIjoiOGQ1OGI2MTAtYWUwYS00YWQwLTk1NGYtZjA3OTMzYjNmMjcyIiwiZXhwIjoxNTkyODc2NjQ1LCJpZGVudGl0eSI6IjVlZTk3NGViY2UxYTg3NjE2ZGZkZmRkYiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.1_iQpb4HRqGevPYqb2Sp8XDqPBxsQ7qdPbu-Xsgmaw4'
    },
    count:0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
  },
  getters: {
    getUserToken: state=> {
      return state.user.token
    }
  },
  modules: {
  }
})
