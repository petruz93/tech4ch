import { baseUrl } from './services/Api'

class FetchDataUtils {
  static async getAllData () {
    try {
      const res = await baseUrl.getBaseUrl().get('alldata')
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default FetchDataUtils
