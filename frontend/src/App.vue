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
.schedule-strip-header, .schedule-strip-cells {
  position: relative;
  width: 100%;
  height: 40px;
  font-size: 0.8rem;
  text-align: center;
}

.schedule-strip-header:after,
.schedule-strip-cells:after {
  display: '';
  clear: both;
  content: '';
}

.schedule-strip-header > .cell,
.schedule-strip-cells > .cell {
  width: 32px;
  height: 40px;
  float: left;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.schedule-strip-header {
  height: 18px;
}

.schedule-strip-header > .cell {
  height: 18px;
}
</style>
