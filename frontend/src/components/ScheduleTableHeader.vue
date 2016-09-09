<template>
  <div class="schedule-table-header" :style="[headerStyle]">
    <div
      :style="[dayHeaderStyle(month)]"
      v-for="month in viewMonths" class="cell">
      {{ month.start | format 'YYYY/MM' }}
    </div>
  </div>

  <div class="schedule-table-header" :style="[headerStyle]">
    <div v-for="date in viewDates" class="cell">{{ date | format 'D' }}</div>
  </div>
</template>

<style scoped>

</style>

<script>
import moment from 'moment'
import { viewDates, viewRangeLength, viewMonths } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      viewDates, viewRangeLength, viewMonths
    }
  },

  filters: {
    format (value, format) {
      return moment(value).format(format)
    }
  },

  computed: {
    headerStyle () {
      return {
        width: this.viewRangeLength * 32 + 'px'
      }
    }
  },

  methods: {
    dayHeaderStyle (month) {
      const days = moment(month.end).diff(moment(month.start), 'days')
      return { width: days * 32 + 'px' }
    }
  }
}
</script>
