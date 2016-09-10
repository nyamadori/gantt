<template>
  <div class="schedule-table-row" v-if="!isRoot" :style="[rowStyle]">
    <schedule-table-handle
      :date="schedule.startOn"
      @move="onMoveLeftHandle"></schedule-table-handle>
    <schedule-table-handle
      :date="schedule.startOn"
      :attach="'left'"
      :style="[ribbonStyle]"
      @move="onMoveRibbonHandle"></schedule-table-handle>
    <schedule-table-handle
      :date="schedule.endOn"
      :scale-base="'cell'"
      @move="onMoveRightHandle"></schedule-table-handle>

    <div class="schedule-table-cells">
      <div v-for="x in viewDates" class="cell" :style="[cellStyle]"></div>
    </div>
  </div>

  <schedule-table-row
    v-for="schedule in schedule.children | orderBy compareSchedule"
    :schedule="schedule"></schedule-table-row>
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
        width: this.viewRangeLength * this.viewCell.width + 'px'
      }
    },

    cellStyle () {
      return {
        width: this.viewCell.width + 'px',
        height: this.viewCell.height + 'px'
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
      console.log(date, this.schedule.endOn)
      if (moment(date).isBefore(moment(this.schedule.endOn).add(1, 'days'))) {
        this.setSchedule(this.schedule, 'startOn', date)
      }
    },

    onMoveRightHandle (date) {
      console.log(this.schedule.startOn, date)

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
  position: relative;
  line-height: 1;
  height: 40px;
  border-bottom: 1px solid #ddd;
}

/*
.schedule-table-row {
  display: flex;
  position: absolute;
  align-items:center;
  height: 40px;
  padding: 4px 0;
  z-index: 5;
}*/

.schedule-table-row-box {
  display: flex;
  top: 0;
  height: 32px;
  padding: 0 4px;
  width: 100%;
  background-color: #bcddeb;
  border: 1px solid #87ceeb;
  border-radius: 4px;
  font-size: 0.8rem;
  align-items: center;
  cursor: move;
}

.schedule-table-row.drop-target {
  z-index: 4;
}

.schedule-table-row.drop-target > .schedule-table-row-box {
  /*border: 1px dashed #000;*/
  /*background-color: transparent;*/
}

.title {
  line-height: 1;
  word-break: keep-all;
}
</style>
