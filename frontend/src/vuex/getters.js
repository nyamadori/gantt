import moment from 'moment'

export function schedules (state) {
  return state.schedules
}

export function selectionSchedule (state) {
  return state.selectionSchedule
}

export function table (state) {
  return state.table
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

export function tableMonths (state) {
  var result = []
  var rangeStart = moment(state.table.start)
  var rangeEnd = moment(state.table.end)

  var end = rangeStart.clone().month(rangeStart.month() + 1).date(1)
  result.push({ start: rangeStart.clone().format(), end: end.format() })

  while (true) {
    var start = end

    if (end.isSameOrAfter(rangeEnd)) {
      break
    } else {
      end = start.clone().add(1, 'months')
      result.push({ start: start.format(), end: end.format() })
    }
  }

  return result
}

export function tableCell (state) {
  return state.tableCell
}

export function handle (state) {
  return state.handle
}
