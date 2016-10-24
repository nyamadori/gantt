<template>
  <div class="gantt-chart">
    <schedule-table v-ref:table :schedule="schedules" @scroll="onScroll"></schedule-table>
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

  ready () {
    window.addEventListener('resize', this.onResize.bind(this))
    this.updateTableWidth()
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    updateTableWidth () {
      this.setTable(
        this.table,
        'width',
        parseInt(window.getComputedStyle(document.body, null).width))
    },

    onScroll (e) {
      this.setTable(this.table, 'scrollLeft', e.target.scrollLeft)
    },

    onResize () {
      this.updateTableWidth()
    }
  }
}
</script>
