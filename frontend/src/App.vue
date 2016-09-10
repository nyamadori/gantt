<template>
  <div id="app">
    <gantt-chart></gantt-chart>
  </div>
</template>

<script>
import GanttChart from 'components/GanttChart'
import store from './vuex/store'

export default {
  components: {
    GanttChart
  },

  store
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

html {
  font-size: 12pt;
}

/* TODO bad naming */
.schedule-table-header, .schedule-table-cells {
  position: relative;
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
}

.schedule-table-header:after,
.schedule-table-cells:after {
  display: '';
  clear: both;
  content: '';
}

.schedule-table-header > .cell,
.schedule-table-cells > .cell {
  float: left;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
</style>
