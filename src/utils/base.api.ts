import axios from 'axios'

export const BASE_URL = 'https://api.github.com'

export const BASE_REQUEST =  {
  get: async function(url: string) {
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
        }
      })
      return response.data;
    } catch(error: any) { // catch argument type should be any or unknown if specified
      throw error;
    }
  }
}