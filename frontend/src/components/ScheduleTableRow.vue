<template>
  <div class="schedule-table-row" v-if="!isRoot" :style="[rowStyle]">
    <schedule-table-handle
      :date="schedule.startOn"
      @move="onMoveLeftHandle"></schedule-table-handle>
    <schedule-table-handle
      class="schedule-table-ribbon"
      :date="schedule.startOn"
      :attach="'left'"
      :style="[ribbonStyle]"
      @move="onMoveRibbonHandle">
      <div class="inner">
        <span class="title">{{ schedule.title }}</span>
      </div>
    </schedule-table-handle>
    <schedule-table-handle
      :date="schedule.endOn"
      :scale-base="'cell'"
      @move="onMoveRightHandle"></schedule-table-handle>

    <div class="schedule-table-cells">
      <div v-for="x in viewDates" class="cell" :style="[cellStyle]"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ScheduleTableHandle from './ScheduleTableHandle'
import ScheduleComparable from '../mixins/ScheduleComparable'
import ScheduleItem from '../mixins/ScheduleItem'
import ScheduleMeasurement from '../mixins/ScheduleMeasurement'
import { viewRangeLength, viewDates, viewCell } from '../vuex/getters'
import { setSchedule } from '../vuex/actions'

export default {
  mixins: [ScheduleItem, ScheduleComparable, ScheduleMeasurement],
  name: 'schedule-table-row',

  components: {
    ScheduleTableHandle
  },

  vuex: {
    getters: { viewRangeLength, viewDates, viewCell },
    actions: { setSchedule }
  },

  props: {
    schedule: Object
  },

  data () {
    return {
      dragging: false,
      dragStartX: 0,
      cursorOffsetX: 0,
      dayOffset: 0
    }
  },

  computed: {
    rowStyle () {
      return {
        width: this.viewRangeLength * this.viewCell.width + 'px',
        height: this.viewCell.height + 'px'
      }
    },

    cellStyle () {
      return {
        width: this.viewCell.width + 'px',
        height: this.viewCell.height - 1 + 'px'
      }
    },

    ribbonStyle () {
      return {
        width: this.scheduleWidth(this.schedule) + 'px'
      }
    }
  },

  methods: {
    onMoveLeftHandle (date) {
      if (moment(date).isBefore(moment(this.schedule.endOn).add(1, 'days'))) {
        this.setSchedule(this.schedule, 'startOn', date)
      }
    },

    onMoveRightHandle (date) {
      if (moment(this.schedule.startOn).isBefore(moment(date).add(1, 'days'))) {
        this.setSchedule(this.schedule, 'endOn', date)
      }
    },

    onMoveRibbonHandle (date) {
      const diff = moment(date).diff(moment(this.schedule.startOn), 'days')
      this.setSchedule(
        this.schedule, 'startOn',
        moment(this.schedule.startOn).add(diff, 'days').format())
      this.setSchedule(this.schedule, 'endOn',
        moment(this.schedule.endOn).add(diff, 'days').format())
    }
  }
}
</script>

<style scoped>
.schedule-table-row {
  display: flex;
  position: relative;
  line-height: 1;
  border-bottom: 1px solid #dddddd;
}

.schedule-table-cells {
  display: flex;
}

.schedule-table-cells > .cell {
  border-right: 1px solid #f1f1f1;
}

.schedule-table-ribbon {
  display: flex;
  padding-top: 4px;
  padding-bottom: 5px;
  z-index: 10;
  background-color: transparent;
}

.schedule-table-ribbon > .inner {
  display: flex;
  padding: 4px;
  align-items: center;
  width: 100%;
  background-color: rgba(141, 192, 214, 0.7);
  border-radius: 4px;
  z-index: 100;
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
