import axios from 'axios'

export const BASE_URL = 'https://api.github.com'
export const BASE_URL2 = 'https://api.github.com'

export const BASE_REQUEST =  {
  get: async function(url: string) {
    try {
      const response = await axios.get(url)
      return response.data;
    } catch(error: any) { // catch argument type should be any or unknown if specified
      throw error;
    }
  },
  
  post: async function(url: string, data: Object) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch(error: any) {
      throw error;
    }
  },

  delete: async function(url: string, data: Object) {
    try {
      const response = await axios.delete(url, data);
      return response.data;
    } catch(error: any) {
      throw error;
    }
  },

}