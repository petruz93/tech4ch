import axios from 'axios'

export const baseUrl = {
  getBaseUrl: function () {
    return axios.create({
      baseURL: 'http://localhost:3000/'
    })
  }
}
