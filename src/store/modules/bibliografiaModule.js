import api from "../../services/api"
import router from "../../router"

export const namespaced= true

export const state = {
  bibliografias:[],
  bibliografia: {}
}

export const mutations = {
  ADD_BIBLIOGRAFIA(state, bibliografia) {
    state.bibliografias.push(bibliografia)
  },
  SET_BIBLIOGRAFIAS(state, bibliografias) {
    state.bibliografias = bibliografias
  }

}

export const actions = {
  fetchBibliografias({commit}) {
    api.get('/bibliografias', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response=>{
      commit('SET_BIBLIOGRAFIAS', response.data)
    }).catch(error=> {
      if(error.response.status == 403 || error.response.status == 401)
        router.push({name:'Login'})
    })
  }
}

export const getters= {
  getAllBibliografias: state=> {
    return state.bibliografias
  }
}