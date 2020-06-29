import api from '../../services/api'
import router from '../../router/index'

export const namespaced = true

export const state = {
  cursos:[],
  curso:{}
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
  addNewCurso({commit}, data) {
    api.post('/cursos', data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response=> {
      commit('ADD_CURSO', response.data)
      router.push({name:'ListagemCursos'})
    }).catch(error => {
      console.warn(error)
    })
  },
  fetchCursos({commit}) {
    api.get('/cursos', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response=> {
      console.log(response.data)
      commit('SET_CURSOS', response.data)
    }).catch(error=> {
      console.warn(error)
      if(error.response.status == 403 || error.response.status === 401)
      router.push({name:'Login'})
    })
  },
  fetchCurso({ commit, getters }, id) {
    const curso = getters.getCursoById(id)
    if(curso) {
      commit('SET_CURSO', curso)
    } else {
      api.get(`/cursos/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response=> {
        commit('SET_CURSO', response.data)
      }).catch(error=> {
        console.warn(error)
        if(error.response.status == 403 || error.response.status === 401)
          router.push({name:'Login'})
      })
    }
  }
}

export const getters = {
  getCursoById: state => id => {
    return state.cursos.find(curso => curso.id === id)
  }
}