import { createStore } from 'vuex'
import User from './modules/user'
import Event from './modules/event'

export default createStore({
  /* state: {
    user: 'Adam Jahr',
    events: [],
    event: {},
    totalEvents: null,
  },
  getters: {},
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, response) {
      state.events = response.data
      state.totalEvents = response.headers['x-total-count']
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch((error) => {
          console.log(error)
          throw error
        })
    },
    fetchEvents(context, data) {
      console.log('limit is : ', data.limit)
      console.log('page is : ', data.page)
      EventService.getEvents(data.limit, data.page)
        .then((response) => {
          context.commit('SET_EVENTS', response)
        })
        .catch((error) => {
          console.log(error)
          throw error
        })
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event) => event.id === id)
      if (existingEvent) {
        this.commit('SET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            console.log(error)
            throw error
          })
      }
    },
  }, */
  modules: { User, Event },
})
