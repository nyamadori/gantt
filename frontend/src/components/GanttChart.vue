<template>
  <div class="gantt-chart">
    <schedule-title-list :schedules="schedules"></schedule-title-list>
    <schedule-table :schedule="schedules"></schedule-table>
  </div>
</template>

<style scoped>
.gantt-chart {
  height: 100%;
  position: relative;
}

.schedule-table {
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
import ScheduleTable from './ScheduleTable'
import ScheduleTitleList from './ScheduleTitleList'
import { schedules } from '../vuex/getters'

export default {
  components: {
    ScheduleTitleList,
    ScheduleTable
  },

  vuex: {
    getters: { schedules }
  },

  methods: {
    onScroll (e) {
      this.setTable(this.table, 'scrollLeft', e.target.scrollLeft)
    }
  }
}
</script>
