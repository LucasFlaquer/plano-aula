import api from './api'

const userService = {
  async login(user_data) {
    const response = await api.post('/login', user_data)
    return response.data
  },
  async me(token) {
    const response = await api.get('/users/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  },
}

export default userService
