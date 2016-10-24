function getLength (s) {
  const start = new Date(s.startOn)
  const end = new Date(s.endOn)
  return end - start
}

function compareStartOn (a, b) {
  if (!a.startOn && !b.startOn) return 0
  if (!a.startOn) return Infinity
  if (!b.startOn) return -Infinity
  const aStart = new Date(a.startOn)
  const bStart = new Date(b.startOn)
  return aStart - bStart
}

function compareId (a, b) {
  return a.id - b.id
}

function compareLength (a, b) {
  return getLength(a) - getLength(b)
}

export default {
  methods: {
    compareSchedule (a, b) {
      const comps = [
        compareStartOn(a, b),
        compareLength(a, b) * -1,
        compareId(a, b)
      ]

      return comps.find((c) => c !== 0)
    }
  }
}
