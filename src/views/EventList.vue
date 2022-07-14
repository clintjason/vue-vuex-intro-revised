<template>
  <h1>Events For {{ User.user }}</h1>
  <div class="events" v-if="Event.events">
    <EventCard v-for="event in Event.events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Previous
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  props: ['page'],
  /* data() {
    return {
      events: null,
      totalEvents: 0,
    }
  }, */
  /* created() {
    watchEffect(() => {
      this.events = null
      EventService.getEvents(2, this.page)
        .then((response) => {
          this.events = response.data
          this.totalEvents = response.headers['x-total-count']
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }, */
  beforeRouteEnter(routeTo, routeFrom, next) {
    //NProgress.start()
    let data = {
      limit: 3,
      page: parseInt(routeTo.query.page) || 1,
    }
    next((comp) => {
      comp
        .fetchEvents(data)
        .then(() => {
          /* next((comp) => {
            comp.events = response.data
            comp.totalEvents = response.headers['x-total-count']
          }) */
        })
        .catch((error) => {
          console.log(error)
          next({ name: 'NetworkError' })
        })
    })
  },
  beforeRouteUpdate(routeTo) {
    console.log(routeTo.query.page)
    let page = parseInt(routeTo.query.page) || 1
    let data = {
      limit: 3,
      page: page,
    }
    console.log('page in before update is :', data.page)
    return this.fetchEvents(data)
      .then(() => {
        console.log(this.events)
      })
      .catch((error) => {
        console.log(error)
        return { name: 'NetworkError' }
      })
    /* next((comp) => {
      comp.$store
        .dispatch('fetchEvents', 3, parseInt(routeTo.query.page) || 1)
        .then(() => {
          console.log(this.events)
        })
        .catch((error) => {
          console.log(error)
          return { name: 'NetworkError' }
        })
    }) */
  },
  methods: {
    ...mapActions('Event', ['fetchEvents']),
  },
  computed: {
    hasNextPage() {
      // First, calculate total pages
      var totalPages = Math.ceil(this.Event.totalEvents / 3) // 2 is events per page

      // Then check to see if the current page is less than the total pages.
      return this.page < totalPages
    },
    ...mapState(['Event', 'User']),
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
