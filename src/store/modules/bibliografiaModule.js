import api from '../../services/api'
import router from '../../router'
import handleErrors from '../../functions/handleErrors'

export const namespaced = true

export const state = {
  bibliografias: [],
  bibliografia: {
    //
  }
}

export const mutations = {
  ADD_BIBLIOGRAFIA(state, bibliografia) {
    state.bibliografias.push(bibliografia)
  },
  SET_BIBLIOGRAFIAS(state, bibliografias) {
    state.bibliografias = bibliografias
  },
  SET_BIBLIOGRAFIA(state, bibliografia) {
    state.bibliografia = bibliografia
  }
}

export const actions = {
  fetchAll({ commit }) {
    api
      .get('/bibliografias', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        commit('SET_BIBLIOGRAFIAS', response.data)
      })
      .catch(error => {
        if (error.response.status == 403 || error.response.status == 401)
          router.push({
            name: 'Login'
          })
      })
  },
  async fetchOne({ commit, getters }, id) {
    const bibliografia = getters.getById(id)
    if (bibliografia) {
      commit('SET_BIBLIOGRAFIA', bibliografia)
    } else {
      try {
        const response = await api.get(`/bibliografias/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        commit('SET_BIBLIOGRAFIA', response.data)
      } catch (error) {
        console.warn(error)
        if (error.response.status === 401 || error.response.status === 403)
          router.push({
            name: 'Login'
          })
      }
    }
  },
  async add({ commit }, bibliografia) {
    try {
      const response = await api.post('/bibliografias', bibliografia, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      commit('ADD_BIBLIOGRAFIA', response.data)
    } catch (error) {
      const { status, message } = handleErrors(error)
      switch (status) {
        case 403:
          router.push({
            name: 'Login'
          })
          break
        case 422:
          return error
        default:
          break
      }
    }
  },
  async update({ commit, getters }, { bibliografia, id }) {
    try {
      const response = await api.put(`/bibliografias/${id}`, bibliografia, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      const bibliografias = getters.getAll
      console.log(bibliografias)
      const newList = bibliografias.map(bibliografia => {
        if (bibliografia.id == response.data.id)
          return {
            id: response.data.id,
            nome: response.data.nome,
            conteudo: response.data.conteudo
          }
        else return bibliografia
      })
      commit('SET_BIBLIOGRAFIAS', newList)
    } catch (error) {
      const { status, message } = handleErrors(error)
      switch (status) {
        case 403:
          router.push({
            name: 'Login'
          })
          break
        case 422:
          return error

        default:
          break
      }
    }
  },
  async delete({ commit, getters }, id) {
    api
      .delete(`/bibliografias/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        const bibliografias = getters.getAll
        const newList = bibliografias.filter(el => el.id !== id)
        commit('SET_BIBLIOGRAFIAS', newList)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const getters = {
  getAll: state => {
    return state.bibliografias
  },
  getById: state => id => {
    return state.bibliografias.find(bibliografia => bibliografia.id === id)
  }
}
