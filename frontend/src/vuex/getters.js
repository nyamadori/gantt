import moment from 'moment'

export function schedules (state) {
  return state.schedules
}

export function newSchedule (state) {
  return state.newSchedule
}

export function table (state) {
  return state.table
}

export function tableHeaders (state) {
  const len = tableLength(state)
  const start = state.table.start
  const result = {}

  for (var i = 0; i < len; i++) {
    const current = moment(start).add(i, 'days')
    const key = current.format('YYYY/MM')

    if (!result[key]) result[key] = []
    result[key].push(current.format('DD'))
  }

  return result
}

export function tableLength (state) {
  const start = moment(state.table.start)
  const end = moment(state.table.end)
  return end.diff(start, 'days')
}

export function tableDates (state) {
  const len = tableLength(state)
  const start = state.table.start
  const result = []

  for (var i = 0; i < len; i++) {
    result.push(moment(start).add(i, 'days').format())
  }

  return result
}

export function tableCell (state) {
  return state.tableCell
}

export function handle (state) {
  return state.handle
}
