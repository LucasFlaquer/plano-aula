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
    const disciplina = getters.getOneById(id)
    if(disciplina) {
      commit('SET_DISCIPLINA', disciplina)
    } else {
      const response = await api.get(`/disciplinas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
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
  },
  async addEmenta({commit, getters}, {id, ementa}) {
    //const disciplina = getters.getOneBy Id(id)
    try {
      const response = await api.patch(`/disciplinas/ementa`, ementa, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id_disc: id
        }
      })
      console.log(response.data)
    } catch (error) {
      console.warn(error)
    }
  },
  async update({commit, getters}, {id, disciplina}) {
    try {
      const response = await api.put(`/disciplinas/${id}`, disciplina, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log('data->', response.data)
      const disciplinas = getters.getAll
      const newList = disciplinas.map(el => {
        if(el.id == response.data.id) {
          console.log(el.id)
          return response.data
        } else {
          return el
        }
      })
      console.log(newList)
      commit('SET_DISCIPLINAS', newList)
    } catch (error) {
      console.warn(error)
    }
  },
  async delete({ commit, getters }, { id }) {
    api.delete(`/disciplinas/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response=> {
      if(response.status == 200) {
        const oldList = getters.getAll
        const newList = oldList.filter(el=> el.id!= id)
        commit('SET_DISCIPLINAS', newList)
      }
    }).catch(error=> {
      console.warn(error)
    })
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