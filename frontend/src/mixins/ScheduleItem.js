export default {
  computed: {
    isRoot () {
      return this.schedule.id === 0
    }
  }
}
