<template>
  <div class="schedule-table">
    <schedule-table-header></schedule-table-header>
    <schedule-table-row
      v-for="schedule in schedules | orderBy compareSchedule"
      :schedule="schedule"></schedule-table-row>
    <schedule-table-row :schedule="newSchedule">
    </schedule-table-row>
  </div>
</template>

<script>
import ScheduleTableRow from './ScheduleTableRow'
import ScheduleTableHeader from './ScheduleTableHeader'
import ScheduleComparable from '../mixins/ScheduleComparable'
import { schedules, newSchedule } from '../vuex/getters'

export default {
  mixins: [ ScheduleComparable ],
  vuex: {
    getters: { schedules, newSchedule }
  },

  components: {
    ScheduleTableRow,
    ScheduleTableHeader
  }
}
</script>
