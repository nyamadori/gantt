export default {
  ADD_SCHEDULE (state, schedule) {
    state.schedules.push(schedule)
  },

  SET_SCHEDULE (state, schedule, key, value) {
    schedule[key] = value
  },

  SET_TABLE (state, table, key, value) {
    table[key] = value
  },

  SET_SELECTION_SCHEDULE (state, schedule) {
    state.selectionSchedule = schedule
  }
}
