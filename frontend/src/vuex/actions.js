export const addSchedule = ({ dispatch }, schedule) => {
  dispatch('ADD_SCHEDULE', schedule)
}

export const setSchedule = ({ dispatch }, schedule, key, value) => {
  dispatch('SET_SCHEDULE', schedule, key, value)
}
