<template>
  <div
    class="schedule-table-row"
    v-el:container
    :style="[rowStyle]"
  >
    <schedule-header :schedule="schedule"></schedule-header>
    <period-editor :schedule="schedule"></period-editor>
  </div>
</template>

<script>
import PeriodEditor from './PeriodEditor'
import ScheduleHeader from './ScheduleHeader'
import ScheduleComparable from '../../mixins/ScheduleComparable'
import ScheduleMeasurement from '../../mixins/ScheduleMeasurement'
import { tableLength, tableHeaders, tableCell, table } from '../../vuex/getters'
import { setSchedule, addSchedule } from '../../vuex/actions'
import { dateFormat } from '../../filters'

export default {
  mixins: [ScheduleComparable, ScheduleMeasurement],
  name: 'schedule-table-row',

  components: {
    PeriodEditor, ScheduleHeader
  },

  filters: {
    dateFormat
  },

  vuex: {
    getters: { tableLength, tableHeaders, tableCell, table },
    actions: { setSchedule, addSchedule }
  },

  props: {
    schedule: Object
  },

  data () {
    return {
      createStatus: 'startOn' // 'startOn' -> 'endOn' -> finished
    }
  },

  ready () {
    window.addEventListener('keyup', this.onWindowKeyUp.bind(this))
  },

  beforeDestroy () {
    window.removeEventListener(this.onWindowKeyUp)
  },

  computed: {
    rowStyle () {
      return {
        width: this.tableLength * this.tableCell.width + 'px',
        height: this.tableCell.height + 'px'
      }
    }
  },

  methods: {
    createSchedule () {
      const newSchedule = Object.assign({}, this.currentSchedule)
      newSchedule.isNew = false
      this.createStatus = 'startOn'
      this.currentSchedule.startOn = null
      this.currentSchedule.endOn = null

      this.addSchedule(newSchedule)
    },

    onMouseUp (e) {
      console.log(e.target)
    },

    onWindowKeyUp (e) {
      if (e.key !== 'Escape') return

      this.onEscape(e)
    },

    onEscape (e) {
      this.createStatus = 'startOn'
      this.currentSchedule.endOn = null
    }
  }
}
</script>

<style scoped>
.schedule-table-row {
  border-bottom: 1px solid #ddd;
}
</style>
