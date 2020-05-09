
import axios from 'axios'

const allDataUrl = 'http://localhost:3000/alldata'

class UploadUtils {
  static async getAllData () {
    try {
      const res = await axios.get(allDataUrl)
      const data = res.data
      return data
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  static async postallData (allData) {
    return await axios.post('url', {
      allData
    })
  }
}

export default UploadUtils
