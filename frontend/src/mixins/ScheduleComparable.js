function getLength (s) {
  const start = new Date(s.startOn)
  const end = new Date(s.endOn)
  return end - start
}

export default {
  methods: {
    compareStartOn (a, b) {
      const aStart = new Date(a.startOn)
      const bStart = new Date(b.startOn)
      return aStart - bStart
    },

    compareId (a, b) {
      return a.id - b.id
    },

    compareLength (a, b) {
      return getLength(a) - getLength(b)
    },

    compareSchedule (a, b) {
      const comps = [
        this.compareStartOn(a, b),
        this.compareLength(a, b) * -1,
        this.compareId(a, b)
      ]
      return comps.find((c) => c !== 0)
    }
  }
}
