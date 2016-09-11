import moment from 'moment'
import { tableCell, table } from '../vuex/getters'

export default {
  vuex: {
    getters: { tableCell, table }
  },

  methods: {
    toDate (pixel) {
      return moment(this.table.start).add(this.toDateNum(pixel), 'days').format()
    },

    toDateNum (pixel) {
      return Math.round(pixel / this.tableCell.width)
    },

    toPixel (date) {
      return moment(date).diff(moment(this.table.start), 'days') * this.tableCell.width
    },

    scheduleWidth (schedule) {
      return this.toPixel(schedule.endOn) - this.toPixel(schedule.startOn) + this.tableCell.width
    }
  }
}
