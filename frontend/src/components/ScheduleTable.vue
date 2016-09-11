<template>
  <div class="schedule-table" @scroll="onScroll">
    <schedule-table-header></schedule-table-header>
    <schedule-table-row
      v-for="schedule in schedules | orderBy compareSchedule"
      :schedule="schedule"></schedule-table-row>
  </div>
</template>

<script>
import ScheduleTableRow from './ScheduleTableRow'
import ScheduleTableHeader from './ScheduleTableHeader'
import ScheduleComparable from '../mixins/ScheduleComparable'
import { schedules } from '../vuex/getters'

export default {
  mixins: [ ScheduleComparable ],
  vuex: {
    getters: { schedules }
  },

  components: {
    ScheduleTableRow,
    ScheduleTableHeader
  }
}
</script>
