<template>
  <div class="schedule-table-header month" :style="[headerRowStyle]">
    <div
      :style="[headerCellStyle, monthHeaderCellStyle(month)]"
      v-for="month in viewMonths" class="cell">
      {{ month.start | dateFormat 'YYYY/MM' }}
    </div>
  </div>

  <div class="schedule-table-header date" :style="[headerRowStyle]">
    <div
      v-for="date in viewDates"
      class="cell"
      :style="[headerCellStyle]">{{ date | dateFormat 'D' }}</div>
  </div>
</template>

<style scoped>
.schedule-table-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  background-color: #f6f6f6;
}

.schedule-table-header > .cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.schedule-table-header.month {
  height: 28px;
  font-size: 0.9rem;
}

.schedule-table-header.month > .cell {
  border-right: 1px solid #dddddd;
}

.schedule-table-header.date {
  height: 16px;
  font-size: 0.8rem;
}
</style>

<script>
import moment from 'moment'
import ScheduleMeasurement from '../mixins/ScheduleMeasurement'
import { dateFormat } from '../filters'
import { viewCell, viewDates, viewRangeLength, viewMonths, viewHeader } from '../vuex/getters'

export default {
  mixins: [ ScheduleMeasurement ],
  vuex: {
    getters: {
      viewCell, viewDates, viewRangeLength, viewMonths, viewHeader
    }
  },
  filters: { dateFormat },

  computed: {
    headerRowStyle () {
      return {
        width: this.viewRangeLength * this.viewCell.width + 'px'
      }
    },

    headerCellStyle () {
      return {
        width: this.viewCell.width + 'px'
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
