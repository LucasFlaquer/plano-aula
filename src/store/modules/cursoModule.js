import api from '../../services/api'

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
  // createCurso({commit, dispatch, getters}, curso) {
  //   //já é para ter passado pela validação do formulario
    
  // }
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
    })
  }
}

export const getters = {

}