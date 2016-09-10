import moment from 'moment'

export function viewRange (state) {
  return state.view.range
}

export function viewRangeLength (state) {
  const start = moment(state.view.range.start)
  const end = moment(state.view.range.end)
  return end.diff(start, 'days')
}

export function schedules (state) {
  return state.schedules
}

export function viewDates (state) {
  const len = viewRangeLength(state)
  const start = state.view.range.start
  const result = []

  for (var i = 0; i < len; i++) {
    result.push(moment(start).add(i, 'days').format())
  }

  return result
}

export function viewMonths (state) {
  var result = []
  var rangeStart = moment(state.view.range.start)
  var rangeEnd = moment(state.view.range.end)

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

export function viewCell (state) {
  return state.view.cell
}

export function viewHeader (state) {
  return state.view.header
}

export function viewHandle (state) {
  return state.view.handle
}
