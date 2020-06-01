
import axios from 'axios'

const url = 'http://localhost:3000/alldata'

class GroupService {
  static async getAllData () {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async postGroup (group) {
    return await axios.post('url', {
      group
    })
  }
}

export default GroupService
