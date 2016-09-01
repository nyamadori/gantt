<template>
  <div class="schedule-strip-header" :style="[headerStyle]">
    <div
      :style="[dayHeaderStyle(month)]"
      v-for="month in showMonths" class="cell">
      {{ month.start | format 'YYYY/MM' }}
    </div>
  </div>

  <div class="schedule-strip-header" :style="[headerStyle]">
    <div v-for="date in showDates" class="cell">{{ date | format 'D' }}</div>
  </div>
</template>

<style scoped>

</style>

<script>
import moment from 'moment'
import { showDates, showRangeLength, showMonths } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      showDates, showRangeLength, showMonths
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
        width: this.showRangeLength * 32 + 'px'
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
