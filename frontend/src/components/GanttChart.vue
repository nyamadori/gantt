<template>
  <div class="gantt-chart">
    <div class="schedule-title-tree">
      <schedule
        v-for="schedule in schedules | orderBy compareSchedule"
        :schedule="schedule"></schedule>
    </div>
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

.schedule-title-tree {
  position: absolute;
  width: 240px;
  height: 100%;
  z-index: 10;
  border-right: 1px solid #ddd;
  background: #fff;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.5);
}

.schedule-table-rows {
  position: absolute;
  left: 240px;
  width: calc(100% - 240px);
  overflow: scroll;
  height: 100%;
}

.header {
  text-align: center;
}
</style>

<script>
import Schedule from './Schedule'
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
    Schedule,
    ScheduleTableRow,
    ScheduleTableHeader
  }
}
</script>
