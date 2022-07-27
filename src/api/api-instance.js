import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'https://www.anapioficeandfire.com/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default apiInstance
