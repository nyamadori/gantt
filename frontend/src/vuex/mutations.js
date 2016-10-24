export default {
  ADD_SCHEDULE (state, schedule) {
    schedule.id = state.uid++
    state.schedules.push(schedule)
  },

  SET_SCHEDULE (state, schedule, key, value) {
    schedule[key] = value
  },

  SET_TABLE (state, table, key, value) {
    table[key] = value
  }
}
