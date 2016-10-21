<template>
  <div
    class="schedule-table-row"
    v-el:container
    :style="[rowStyle]"
    @mousemove="onMouseMove"
    @click="onClick"
  >
    <div v-if="!currentSchedule.isNew">
      <schedule-table-handle
        :date="currentSchedule.startOn"
        @move="onMoveLeftHandle"></schedule-table-handle>
      <schedule-table-handle
        class="schedule-table-ribbon"
        :date="currentSchedule.startOn"
        :attach="'left'"
        :style="[ribbonStyle]"
        @move="onMoveRibbonHandle">
        <div class="inner">
          <span class="title">{{ schedule.title }}</span>
        </div>
      </schedule-table-handle>
      <schedule-table-handle
        :date="currentSchedule.endOn"
        :scale-base="'cell'"
        @move="onMoveRightHandle"></schedule-table-handle>
    </div>

    <div v-if="currentSchedule.isNew">
      <schedule-table-handle
        v-if="currentSchedule.startOn"
        :date="currentSchedule.startOn"
        :style="{ 'background-color': '#000' }"></schedule-table-handle>
      <schedule-table-handle
        v-if="currentSchedule.endOn"
        :date="currentSchedule.endOn"
        :style="{ 'background-color': '#000' }"></schedule-table-handle>
    </div>

    <div class="schedule-table-cells">
      <div v-for="(key, days) in tableHeaders" class="cell month-cell">
        <div v-for="day in days" class="cell day-cell" :style="[cellStyle]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ScheduleTableHandle from './ScheduleTableHandle'
import ScheduleComparable from '../mixins/ScheduleComparable'
import ScheduleMeasurement from '../mixins/ScheduleMeasurement'
import { tableLength, tableHeaders, tableCell, table } from '../vuex/getters'
import { setSchedule } from '../vuex/actions'

export default {
  mixins: [ScheduleComparable, ScheduleMeasurement],
  name: 'schedule-table-row',

  components: {
    ScheduleTableHandle
  },

  vuex: {
    getters: { tableLength, tableHeaders, tableCell, table },
    actions: { setSchedule }
  },

  props: {
    schedule: Object
  },

  data () {
    return {
      scheduleBase: Object.assign({}, this.schedule),
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
    currentSchedule: {
      get () {
        return this.scheduleBase
      },

      set (value) {
        this.scheduleBase = value
      }
    },

    rowStyle () {
      return {
        width: this.tableLength * this.tableCell.width + 'px',
        height: this.tableCell.height + 'px'
      }
    },

    cellStyle () {
      return {
        width: this.tableCell.width + 'px',
        height: this.tableCell.height - 1 + 'px'
      }
    },

    ribbonStyle () {
      return {
        width: this.scheduleWidth(this.currentSchedule) + 'px'
      }
    }
  },

  methods: {
    update () {
      this.setSchedule(this.schedule, 'startOn', this.currentSchedule.startOn)
      this.setSchedule(this.schedule, 'endOn', this.currentSchedule.endOn)
    },

    onMoveLeftHandle (date) {
      if (moment(date).isBefore(moment(this.currentSchedule.endOn).add(1, 'days'))) {
        this.currentSchedule.startOn = date
        this.update()
      }
    },

    onMoveRightHandle (date) {
      if (moment(this.currentSchedule.startOn).isBefore(moment(date).add(1, 'days'))) {
        this.currentSchedule.endOn = date
        this.update()
      }
    },

    onMoveRibbonHandle (date) {
      const diff = moment(date).diff(moment(this.currentSchedule.startOn), 'days')
      this.currentSchedule.startOn =
        moment(this.currentSchedule.startOn).add(diff, 'days').format()
      this.currentSchedule.endOn =
        moment(this.currentSchedule.endOn).add(diff, 'days').format()
      this.update()
    },

    onMouseMove (e) {
      if (!this.currentSchedule.isNew) return

      const x = e.clientX - this.$els.container.offsetLeft + this.table.scrollLeft

      switch (this.createStatus) {
        case 'startOn':
          this.currentSchedule.startOn = this.toDate(x)
          break
        case 'endOn':
          this.currentSchedule.endOn = this.toDate(x)
          break
      }
    },

    onClick (e) {
      console.log(e)
      switch (this.createStatus) {
        case 'startOn':
          this.createStatus = 'endOn'
          break
        case 'endOn':
          this.createStatus = 'finished'
          break
        case 'finished':
          // 何かやる。多分スケジュールの追加処理
      }
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
  display: flex;
  position: relative;
  line-height: 1;
  border-bottom: 1px solid #ddd;
}

.schedule-table-cells, .cell {
  display: flex;
}

.day-cell {
  border-right: 1px solid #f4f4f4;
}

.day-cell:last-child {
  border-right: 2px solid #f4f4f4;
}

.schedule-table-ribbon {
  display: flex;
  padding-top: 5px;
  padding-bottom: 6px;
  background-color: transparent;
}

.schedule-table-ribbon > .inner {
  display: flex;
  padding: 4px;
  align-items: center;
  width: 100%;
  background-color: rgba(141, 192, 214, 0.7);
  border-radius: 4px;
  z-index: 10;
  font-size: 0.85rem;
  white-space: nowrap;
  user-select: none;
  cursor: move;
}

.schedule-table-ribbon.dragging > .inner {
  background-color: rgba(69, 133, 162, 0.7);
}

.title {
  line-height: 1;
  word-break: keep-all;
}
</style>
