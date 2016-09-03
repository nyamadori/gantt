export default {
  ADD_SCHEDULE (state, schedule) {
    state.schedules.push(schedule)
  },

  SET_SCHEDULE (state, schedule, key, value) {
    schedule[key] = value
  }
}
