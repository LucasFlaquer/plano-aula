import api from "../../services/api"
import router from "../../router"

export const namespaced = true

export const state = {
  disciplinas: [],
  disciplina: {}
}

export const mutations = {
  ADD_DISCIPLINA(state, disciplina) {
    state.disciplinas = [...state.disciplinas, disciplina]
  },
  SET_DISCIPLINAS(state, disciplinas) {
    state.disciplinas = disciplinas
  },
  SET_DISCIPLINA(state, disciplina) {
    state.disciplina = disciplina
  }
}

export const actions = {
  async fetchAll({ commit }) {
    try {
      const { data } = await api.get('disciplinas', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      commit('SET_DISCIPLINAS', data)
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403)
        router.push({ name: 'Login' })
    }
  },
  async fetchOne({commit, getters}, id) {
    console.log('estou aqui')
    const disciplina = getters.getOneById(id)
    console.log(disciplina)
    if(disciplina) {
      console.log('entrie no commit');
      commit('SET_DISCIPLINA', disciplina)
    } else {
      console.log('to aqui')
      const response = await api.get(`/disciplinas/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response)
      const disciplinas = getters.getAll
      commit('SET_DISCIPLINAS', [...disciplinas, response.data])
      commit('SET_DISCIPLINA', response.data)
    }
  },
  async add({commit}, disciplina) {
    try {
      const response = await api.post('/disciplinas', disciplina, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response.data)
      commit('ADD_DISCIPLINA', response.data)
    } catch (error) {
      console.warn(error)
      //
    }
  }

}

export const getters = {
  getAll: state => {
    return state.disciplinas
  },
  getOneById: state => id => {
    return state.disciplinas.find(el => el.id === id) || null
  }
}