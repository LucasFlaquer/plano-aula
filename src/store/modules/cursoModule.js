import api from '../../services/api'
import router from '../../router/index'

export const namespaced = true

export const state = {
  cursos: [],
  curso: {
    //
  }
}

export const mutations = {
  ADD_CURSO(state, curso) {
    state.cursos.push(curso)
  },
  SET_CURSOS(state, cursos) {
    state.cursos = cursos
  },
  SET_CURSO(state, curso) {
    state.curso = curso
  }
}

export const actions = {
  async add({ commit }, data) {
    try {
      const response = await api.post('/cursos', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response.data)
      commit('ADD_CURSO', response.data)
    } catch (error) {
      console.warn(error)
    }
  },
  async update({ commit, getters }, { curso, id }) {
    console.log(id)
    try {
      const response = await api.put(`/cursos/${id}`, curso, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      const cursos = getters.getAll
      console.log(cursos)
      const newCursos = cursos.map(curso => {
        if (curso.id == response.data.id) {
          console.log(response.data)
          return response.data
        } else {
          console.log(curso)
          return curso
        }
      })
      commit('SET_CURSOS', newCursos)
    } catch (error) {
      console.warn(error)
      if (error.response.status === 403 || error.response.status === 401)
        router.push({
          name: 'Login'
        })
    }
  },
  async deleteCurso({ commit, getters }, id) {
    api
      .delete(`/cursos/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        const cursos = getters.getAll
        commit(
          'SET_CURSOS',
          cursos.filter(curso => curso.id !== id)
        )
      })
      .catch(error => {
        if (error.response.status === 403 || error.response.status === 401)
          router.push({
            name: 'Login'
          })
      })
  },
  async fetchAll({ commit }) {
    const response = await api.get('/cursos', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    commit('SET_CURSOS', response.data)
  },
  async fetchOne({ commit, getters }, id) {
    const curso = getters.getCursoById(id)
    if (curso) {
      commit('SET_CURSO', curso)
    } else {
      try {
        const response = await api.get(`/cursos/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        commit('SET_CURSO', response.data)
      } catch (error) {
        console.warn(error)
        if (error.response.status == 403 || error.response.status === 401)
          router.push({
            name: 'Login'
          })
      }
    }
  },
  async getDataForUpdate({ dispatch }, id) {
    await dispatch('fetchOne', id)
    await dispatch('disciplinaModule/fetchAll', null, {
      root: true
    })
    await dispatch('userModule/fetchAll', null, {
      root: true
    })
  },
  async fetchOneCoordenador({ commit }) {
    const response = await api.get('/coordenador/curso', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response.data)
    commit('SET_CURSO', response.data)
  }
}

export const getters = {
  getAll: state => {
    return state.cursos
  },
  getCursoById: state => id => {
    return state.cursos.find(curso => curso.id === id)
  }
}
