<template>
  <div class="gantt-chart">
    <schedule-title-list :schedules="schedules"></schedule-title-list>
    <schedule-table></schedule-table>
    <schedule-panel :schedule="selectionSchedule"></schedule-panel>
  </div>
</template>

<style scoped>
.gantt-chart {
  display: flex;
  height: 100%;
}

.schedule-table {
  overflow: scroll;
  height: 100%;
  flex-grow: 1;
  flex-basis: auto;
}
</style>

<script>
import ScheduleTable from './ScheduleTable'
import ScheduleTitleList from './ScheduleTitleList'
import SchedulePanel from './SchedulePanel'
import { schedules, selectionSchedule } from '../vuex/getters'

export default {
  components: {
    ScheduleTitleList,
    SchedulePanel,
    ScheduleTable
  },

  vuex: {
    getters: { schedules, selectionSchedule }
  },

  methods: {
    onScroll (e) {
      this.setTable(this.table, 'scrollLeft', e.target.scrollLeft)
    }
  }
}
</script>
