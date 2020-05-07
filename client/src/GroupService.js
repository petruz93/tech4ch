import axios from 'axios'

const url = 'http://localhost:8081/hello'

class GroupService {
  static async getVisitGroup () {
    try {
      const res = await axios.get(url)
      const data = res.data
      return data
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  static async postGroup (group) {
    return await axios.post('url', {
      group
    })
  }
}

export default GroupService
