import api from './api'

const userService = {
  async login(user_data) {
    const response = await api.post('/login', user_data)
    return response.data
  }
}

export default userService