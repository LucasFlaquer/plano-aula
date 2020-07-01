import api from "../../services/api"
import router from "../../router"

export const namespaced = true

export const state = {
  disciplinas: [],
  disciplina: {}
}

export const mutations = {
  SET_DISCIPLINAS(state, disciplinas) {
    state.disciplinas = disciplinas
  },
  SET_DISCIPLINA(state, disciplina) {
    state.disciplina = disciplina
  }
}

export const actions = {
  async fetchDisciplinas({
    commit
  }) {
    try {
      const {
        data
      } = await api.get('disciplinas', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      commit('SET_DISCIPLINAS', data)

    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403)
        router.push({
          name: 'Login'
        })
    }
  },

}

export const getters = {
  getAllDisciplinas: state => {
    return state.disciplinas
  }
}