import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json'
  // }
})

export default api
