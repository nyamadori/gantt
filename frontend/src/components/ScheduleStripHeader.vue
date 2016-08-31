<template>
  <div class="schedule-strip-header" :style="[headerStyle]">
    <div v-for="date in showDates" class="cell">{{ date | format 'D' }}</div>
  </div>
</template>

<style>

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
  }
}
</script>
