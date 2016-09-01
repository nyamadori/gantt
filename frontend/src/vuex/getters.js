import moment from 'moment'

export function showRangeLength (state) {
  const start = moment(state.showRange.start)
  const end = moment(state.showRange.end)
  return end.diff(start, 'days')
}

export function schedules (state) {
  return state.schedules
}

export function showRange (state) {
  return state.showRange
}

export function showDates (state) {
  const len = showRangeLength(state)
  const start = showRange(state).start
  const result = []

  for (var i = 0; i < len; i++) {
    result.push(moment(start).add(i, 'days').format())
  }

  return result
}

export function showMonths (state) {
  var result = []
  var rangeStart = moment(state.showRange.start)
  var rangeEnd = moment(state.showRange.end)

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
