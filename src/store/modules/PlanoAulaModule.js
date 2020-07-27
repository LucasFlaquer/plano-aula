import api from '../../services/api'

export const namespaced = true

export const state = {
  planosAula: [],
  planoAula: {
    //
  }
}

export const mutations = {
  SET_PLANOAULA(state, plano) {
    state.planoAula = plano
  }
}

export const actions = {
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
