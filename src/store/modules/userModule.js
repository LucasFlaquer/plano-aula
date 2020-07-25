import api from '../../services/api'
import router from '../../router/index'

export const namespaced = true

export const state = {
  users: [],
  user: {
    //
  },
  userLogged: {
    //
  }
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_USER_LOGGED(state, user) {
    state.userLogged = user
  }
}

export const actions = {
  async fetchAll({ commit }) {
    try {
      const response = await api.get('/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log('users', response.data)
      commit('SET_USERS', response.data)
    } catch (error) {
      console.warn(error)
      if (error.response.status == 403 || error.response.status === 401)
        router.push({
          name: 'Login'
        })
    }
  },
  async fetchOne({ commit, getters }, id) {
    const user = getters.getUserById(id)
    if (user) {
      console.log(user)
      commit('SET_USER', user)
    } else {
      try {
        const response = await api.get(`users/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        commit('SET_USER', response.data)
      } catch (error) {
        console.warn(error.response)
        if (error.response.status == 403 || error.response.status === 401)
          router.push({
            name: 'Login'
          })
      }
    }
  },
  async fetchCoordenadores({ commit }) {
    api
      .get('/coordenadores', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        commit('SET_USERS', response.data)
      })
      .catch(error => {
        console.warn(error)
      })
  },
  async makeLogin({ commit }, user) {
    try {
      const response = await api.post('/login', user)
      const { name, logged_in_as: email } = response.data
      commit('SET_USER_LOGGED', {
        name,
        email
      })
      localStorage.setItem('token', response.data.access_token)
      router.push({
        name: 'Home'
      })
    } catch (error) {
      console.warn(error.response)
      if (error.response.status == 403 || error.response.status === 401)
        return false
    }
  },
  async Authenticate({ commit }) {
    try {
      const response = await api.get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      commit('SET_USER_LOGGED', response.data)
    } catch (error) {
      console.warn(error.response)
      //deu algum erro aqui entao já manda para a login
      router.push({
        name: 'Login'
      })
    }
  },
  logout() {
    localStorage.removeItem('token')
    router.push({
      name: 'Login'
    })
  },
  async patchDisciplinas({ commit, getters }, { id, disc_ids }) {
    const data = {
      disc_ids
    }
    try {
      const response = await api.patch('/users/disciplinas', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          id_user: id
        }
      })
      console.log('------------------ usuario atualizaddo')
      const users = getters.getAll
      const newList = users.map(user => {
        if (user.id == response.data.id)
          return {
            id: response.data.id,
            name: user.name,
            email: user.email,
            disciplinas_ministradas: response.data.disciplinas_ministradas,
            acccess: user.access
          }
        else return user
      })
      commit('SET_USERS', newList)
    } catch (error) {
      console.warn(error)
    }
  }
}

export const getters = {
  getAll() {
    return state.users
  },
  getById: state => id => {
    return state.users.find(user => user.id === id)
  }
}
