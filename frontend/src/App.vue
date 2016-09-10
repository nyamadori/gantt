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
  font-size: 14px;
}
</style>
