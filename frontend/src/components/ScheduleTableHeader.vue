<template>
  <div class="schedule-table-header" :style="[headerRowStyle]">
    <div
      :style="[headerCellStyle, monthHeaderCellStyle(month)]"
      v-for="month in viewMonths" class="cell">
      {{ month.start | format 'YYYY/MM' }}
    </div>
  </div>

  <div class="schedule-table-header" :style="[headerRowStyle]">
    <div
      v-for="date in viewDates"
      class="cell"
      :style="[headerCellStyle]">{{ date | format 'D' }}</div>
  </div>
</template>

<style scoped>

</style>

<script>
import moment from 'moment'
import ScheduleMeasurement from '../mixins/ScheduleMeasurement'
import { viewCell, viewDates, viewRangeLength, viewMonths, viewHeader } from '../vuex/getters'

export default {
  mixins: [ ScheduleMeasurement ],
  vuex: {
    getters: {
      viewCell, viewDates, viewRangeLength, viewMonths, viewHeader
    }
  },

  filters: {
    format (value, format) {
      return moment(value).format(format)
    }
  },

  computed: {
    headerRowStyle () {
      return {
        width: this.viewRangeLength * this.viewCell.width + 'px',
        height: this.viewHeader.height + 'px'
      }
    },

    headerCellStyle () {
      return {
        width: this.viewCell.width + 'px',
        height: this.viewHeader.height + 'px'
      }
    }
  },

  methods: {
    monthHeaderCellStyle (month) {
      const days = moment(month.end).diff(moment(month.start), 'days')
      return { width: days * this.viewCell.width + 'px' }
    }
  }
}
</script>
