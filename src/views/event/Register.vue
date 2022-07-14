<template>
  <p>Registration form here</p>
  <button @click="register">Register Me!</button>
</template>

<script>
export default {
  name: 'EventRegister',
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      this.GStore.flashMessage =
        'You are Succesfully Registered for ' + this.event.title
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      this.$router.push({
        name: 'EventDetails',
      })
    },
  },
}
</script>
