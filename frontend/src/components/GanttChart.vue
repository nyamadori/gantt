<template>
  <div class="gantt-chart">
    <div class="schedule-title-tree">
      <schedule :schedule="schedules[0]"></schedule>
    </div>

    <div class="schedule-strip-rows">
      <schedule-strip-header></schedule-strip-header>
      <schedule-strip-row :schedule="schedules[0]"></schedule-strip-row>
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

.schedule-strip-rows {
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
import ScheduleStripRow from './ScheduleStripRow'
import ScheduleStripHeader from './ScheduleStripHeader'

import { schedules, showRangeLength, showRange } from '../vuex/getters'

export default {
  vuex: {
    getters: { schedules, showRangeLength, showRange }
  },
  components: {
    Schedule,
    ScheduleStripRow,
    ScheduleStripHeader
  }
}
</script>
