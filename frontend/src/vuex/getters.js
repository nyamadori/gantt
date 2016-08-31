import moment from 'moment'

export function showRangeLength (state) {
  const start = moment(state.showRange.start)
  const end = moment(state.showRange.end)
  return end.diff(start, 'days') + 1
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
    result.push(moment(start).add(i, 'days'))
  }

  return result
}

export function showMonths (state) {
  var result = []
  var rangeStart = moment(state.showRange.start)
  var rangeEnd = moment(state.showRange.end)

  var start = rangeStart.clone()

  while (true) {
    var end = start.clone().add(1, 'months').date(1) // start の次月はじめ
    console.log(start, end)

    if (end.isAfter(rangeEnd)) {
      result.push([start, rangeEnd.clone()])
      break
    } else {
      result.push([start, end])
    }

    start = end
  }

  return result
}
