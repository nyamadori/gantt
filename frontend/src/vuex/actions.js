export const addSchedule = ({ dispatch }, schedule) => {
  dispatch('ADD_SCHEDULE', schedule)
}

export const setSchedule = ({ dispatch }, schedule, key, value) => {
  dispatch('SET_SCHEDULE', schedule, key, value)
}

export const setTable = ({ dispatch }, table, key, value) => {
  dispatch('SET_TABLE', table, key, value)
}

export const setSelectionSchedule = ({ dispatch }, schedule) => {
  dispatch('SET_SELECTION_SCHEDULE', schedule)
}
