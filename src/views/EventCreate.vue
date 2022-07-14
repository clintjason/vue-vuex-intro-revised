<template>
  <h1>Create an event</h1>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label>Select a category: </label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
        >
          {{ option }}
        </option>
      </select>
      <h3>Name & describe your event</h3>
      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="event.date" type="text" placeholder="Date" />

      <label>Time</label>
      <input v-model="event.time" type="text" placeholder="Time" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
      },
    }
  },
  inject: ['GStore'],
  methods: {
    ...mapActions('Event', ['createEvent']),
    onSubmit() {
      console.log('the user is : ', this.User.user)
      console.log('event created is: ', this.Event.eventCreated)
      this.event.organizer = this.User.user
      this.event.id = uuidv4()
      //let rest = this.event.id
      this.createEvent(this.event)
        .then(() => {
          console.log('event created is: ', this.Event.eventCreated)
          if (this.Event.eventCreated) {
            this.GStore.flashMessage = 'New Event added!!'
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
            this.$router.push({
              name: 'EventLayout',
              params: { id: this.event.id },
            })
          }
        })
        .catch((error) => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error },
          })
        })
    },
    /*  createEvent() {
      return this.createEvent(this.event)
    }, */
  },
  computed: {
    ...mapState(['User', 'Event']),
  },
}
</script>
