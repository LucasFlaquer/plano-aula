import api from './api'

const cursoService = {
  async getAllCursos(token) {
    const response = await api.get('/cursos', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  },
  async saveCurso(data, token) {
    try {
      await api.post('/cursos', data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      return 0
    } catch (err) {
      alert('error ao cadastrar curso')
      return err
    }
  },
}
