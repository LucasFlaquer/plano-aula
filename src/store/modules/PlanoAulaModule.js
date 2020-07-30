import api from '../../services/api'

export const namespaced = true

export const state = {
  planosAula: [],
  planoAula: {
    //
  }
}

export const mutations = {
  SET_PLANOS_AULA(state, planos) {
    state.planosAula = planos
  },
  SET_PLANOAULA(state, plano) {
    state.planoAula = plano
  }
}

export const actions = {
  async fetchByUser({ commit }) {
    const response = await api.get('/plano-aula', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    commit('SET_PLANOS_AULA', response.data)
  },
  async addNew({ commit }, data) {
    try {
      const response = await api.post('/plano-aula', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      commit('SET_PLANOAULA', response.data)
    } catch (error) {
      console.warn(error)
    }
  }
}
