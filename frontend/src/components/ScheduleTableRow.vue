<template>
  <div class="schedule-table-row" v-if="!isRoot" :style="[rowStyle]">
    <schedule-table-handle
      :date="schedule.startOn"></schedule-table-handle>
    <schedule-table-handle
      :date="schedule.startOn"
      :attach="'left'"></schedule-table-handle>
    <schedule-table-handle
      :date="schedule.endOn"></schedule-table-handle>
    <!-- <div
      class="schedule-strip" draggable="true"
      v-if="!isRoot" :style="[stripStyle]"
      @dragstart="onStripDragStart" @drag="onStripDrag" @dragend="onStripDragEnd">
      <div
        class="handle left"
        @click="onClick"
        @dragstart="onHandleDragStart"
        @drag="onHandleDrag"
        @dragend="onHandleDragEnd"></div>
      <div class="schedule-strip-box">
        <div class="title">{{ schedule.title }}</div>
      </div>
      <div
        class="handle right"
        @dragstart="onHandleDragStart"
        @drag="onHandleDrag"
        @dragend="onHandleDragEnd"></div>
    </div>

    <div class="schedule-strip drop-target" v-if="showDropTarget" :style="[stripStyle, dropTargetStyle]">
      <div class="schedule-strip-box">
        <div class="title">{{ schedule.title }}</div>
      </div>
    </div> -->

    <div class="schedule-table-cells">
      <div v-for="x in viewDates" class="cell"></div>
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
import { viewRangeLength, viewDates } from '../vuex/getters'
import { setSchedule } from '../vuex/actions'

export default {
  mixins: [ScheduleItem, ScheduleComparable],
  name: 'schedule-table-row',

  components: {
    ScheduleTableHandle
  },

  vuex: {
    getters: { viewRangeLength, viewDates },
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
    length () {
      const start = moment(this.schedule.startOn)
      const end = moment(this.schedule.endOn)
      return end.diff(start, 'days') + 1
    },

    scheduleStartFromviewRange () {
      const start = moment(this.schedule.startOn)
      const viewRangeStart = moment(this.view.range.start)
      return start.diff(viewRangeStart, 'days')
    },

    rowStyle () {
      return {
        width: this.viewRangeLength * 32 + 'px'
      }
    },

    showDropTarget () {
      return !this.isRoot && this.dragging
    }
  },

  methods: {
    onHandleDrag (e) {
      this.cursorOffsetX = e.pageX - this.dragStartX - 16
      this.dayOffset = parseInt(this.cursorOffsetX / 32)
    },

    onHandleDragEnd (e) {
      this.dragging = false
    },

    move (dayOffset) {
      this.setSchedule(this.schedule, 'startOn', moment(this.schedule.startOn).add(dayOffset, 'days'))
      this.setSchedule(this.schedule, 'endOn', moment(this.schedule.endOn).add(dayOffset, 'days'))
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
