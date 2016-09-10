import moment from 'moment'
import { viewCell, viewRange } from '../vuex/getters'

export default {
  vuex: {
    getters: { viewRange, viewCell }
  },

  methods: {
    toDate (pixel) {
      return moment(this.viewRange.start).add(this.toDateNum(pixel), 'days').format()
    },

    toDateNum (pixel) {
      return Math.round(pixel / this.viewCell.width)
    },

    toPixel (date) {
      return moment(date).diff(moment(this.viewRange.start), 'days') * this.viewCell.width
    },

    scheduleWidth (schedule) {
      return this.toPixel(schedule.endOn) - this.toPixel(schedule.startOn) + this.viewCell.width
    }
  }
}
