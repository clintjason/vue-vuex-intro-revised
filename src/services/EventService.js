import axios from 'axios'
//baseURL: 'https://my-json-server.typicode.com/clintjason/real-world-vue3-application',
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  async getEvents(perPage, page) {
    return await apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },

  async getEvent(id) {
    return await apiClient.get('/events/' + id)
  },

  async postEvent(event) {
    return await apiClient.post('/events', event)
  },
}
