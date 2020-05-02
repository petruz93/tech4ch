import axios from 'axios'

const url = 'http://localhost:8081/hello'

class GroupService {
  static getVisitGroup () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  static postGroup (group) {
    return axios.post('url', {
      group
    })
  }

  static getGroupMovement () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default GroupService
