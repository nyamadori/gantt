<template>
  <div class="gantt-chart">
    <schedule-table :schedule="schedules" @scroll="onScroll"></schedule-table>
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
import { schedules, table } from '../vuex/getters'
import { setTable } from '../vuex/actions'

export default {
  components: {
    ScheduleTable
  },

  vuex: {
    getters: { schedules, table },
    actions: { setTable }
  },

  methods: {
    onScroll (e) {
      this.setTable(this.table, 'scrollLeft', e.target.scrollLeft)
    }
  }
}
</script>
