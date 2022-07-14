import EventService from '@/services/EventService.js'

export default {
  namespaced: true,
  state: {
    events: [],
    event: {},
    totalEvents: null,
    valid_id: null,
    eventCreated: false,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
      state.eventCreated = true
    },
    SET_EVENTS(state, response) {
      state.events = response.data
      state.totalEvents = response.headers['x-total-count']
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    VALID_ID(state, result) {
      state.valid_id = result
    },
  },
  actions: {
    async createEvent({ commit }, event) {
      await EventService.postEvent(event)
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
      console.log('existing event is : ', existingEvent)
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then((response) => {
            console.log('the data is: ', response.data)
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            console.log(error)
            throw error
          })
      }
    },
    checkId({ commit, state }, id) {
      console.log('the id parsed is: ', id)
      let result = state.events.find((event) => event.id === id)
      if (result === undefined) {
        commit('VALID_ID', false)
      } else {
        commit('VALID_ID', true)
      }
    },
  },
}
