<template>
  <div class="gantt-chart">
    <schedule-title-list :schedules="schedules"></schedule-title-list>

    <div class="schedule-table" @scroll="onScroll">
      <schedule-table-header></schedule-table-header>
      <schedule-table-row
        v-for="schedule in schedules | orderBy compareSchedule"
        :schedule="schedule"></schedule-table-row>
    </div>

    <schedule-table :schedule="schedules"></schedule-table>
    <schedule-panel></schedule-panel>
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

.schedule-panel {
  flex-shrink: 0;
  flex-basis: 240px;
  height: 100%;
}

.header {
  text-align: center;
}
</style>

<script>
import ScheduleTable from './ScheduleTable'
import ScheduleTitleList from './ScheduleTitleList'
<<<<<<< HEAD
import ScheduleTableRow from './ScheduleTableRow'
import ScheduleTableHeader from './ScheduleTableHeader'
import SchedulePanel from './SchedulePanel'
import ScheduleComparable from '../mixins/ScheduleComparable'
import { schedules, table } from '../vuex/getters'
import { setTable } from '../vuex/actions'
=======
import { schedules } from '../vuex/getters'
>>>>>>> master

export default {
  components: {
    ScheduleTitleList,
<<<<<<< HEAD
    ScheduleTableRow,
    ScheduleTableHeader,
    SchedulePanel
=======
    ScheduleTable
  },

  vuex: {
    getters: { schedules }
>>>>>>> master
  },

  methods: {
    onScroll (e) {
      this.setTable(this.table, 'scrollLeft', e.target.scrollLeft)
    }
  }
}
</script>
