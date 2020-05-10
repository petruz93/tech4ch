import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: '95.246.215.34:705/'
  })
}
