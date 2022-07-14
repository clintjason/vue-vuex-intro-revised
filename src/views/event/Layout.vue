<template>
  <div v-if="Event.event">
    <h1>{{ Event.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <p>{{ $route.fullPath }}</p>
    <router-view :event="Event.event" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'EventLayout',
  /*  data() {
    return {
      event: null,
    }
  }, */
  props: ['id'],
  created() {
    //watchEffect(() => {
    // fetch event (by id) and set local event data
    this.fetchEvent(this.id).catch((error) => {
      console.log(error)
      if (error.response && error.response.status == 404) {
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' },
        })
      } else {
        this.$router.push({ name: 'NetworkError' })
      }
    })
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    //watchEffect(() => {
    // fetch event (by id) and set local event data
    let id = routeTo ? routeTo.params.id : undefined
    if (id === undefined) {
      next()
    } else {
      next((comp) => {
        comp.fetchEvent(id).catch((error) => {
          console.log(error)
          if (error.response && error.response.status == 404) {
            routeTo({
              name: '404Resource',
              params: { resource: 'event' },
            })
          } else {
            routeTo({ name: 'NetworkError' })
          }
        })
        console.log(Event.event)
      })
    }
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    //watchEffect(() => {
    // fetch event (by id) and set local event data
    console.log('id status : ', this.Event.valid_id)
    let id = routeTo ? routeTo.params.id : undefined
    if (id === undefined) {
      next()
    } else {
      return this.fetchEvent(this.id).catch((error) => {
        console.log(error)
        if (error.response && error.response.status == 404) {
          this.$router.push({
            name: '404Resource',
            params: { resource: 'event' },
          })
        } else {
          this.$router.push({ name: 'NetworkError' })
        }
      })
    }
  },

  /*  watch: {
    Event(newVal, oldVal) {
      //event(newVal, oldVal) {
      // fetch event (by id) and set local event data
      console.log(`Old Value is : ${oldVal}`)
      console.log(`New Value is : ${newVal}`)
      this.fetchEvent(this.id).catch((error) => {
        console.log(error)
        if (error.response && error.response.status == 404) {
          this.$router.push({
            name: '404Resource',
            params: { resource: 'event' },
          })
        } else {
          this.$router.push({ name: 'NetworkError' })
        }
      })
      //},
    },
  }, */
  methods: {
    ...mapActions('Event', ['fetchEvent', 'checkId']),
  },
  computed: {
    ...mapState(['Event']),
  },
}
</script>
