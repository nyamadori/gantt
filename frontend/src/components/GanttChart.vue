<template>
  <div class="gantt-chart">
    <schedule-title-list :schedules="schedules"></schedule-title-list>

    <div class="schedule-table-rows">
      <schedule-table-header></schedule-table-header>
      <schedule-table-row
        v-for="schedule in schedules | orderBy compareSchedule"
        :schedule="schedule"></schedule-table-row>
    </div>
  </div>
</template>

<style scoped>
.gantt-chart {
  height: 100%;
  position: relative;
}

.schedule-table-rows {
  position: absolute;
  width: 100%;
  padding-left: 200px;
  overflow: scroll;
  height: 100%;
}

.header {
  text-align: center;
}
</style>

<script>
import ScheduleTitleList from './ScheduleTitleList'
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
    ScheduleTitleList,
    ScheduleTableRow,
    ScheduleTableHeader
  }
}
</script>
