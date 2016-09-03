<template>
  <div class="schedule-row" v-if="!isRoot" :style="[rowStyle]">
    <div
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
    </div>

    <div class="schedule-strip-cells">
      <div v-for="x in showDates" class="cell"></div>
    </div>
  </div>

  <schedule-strip-row
    v-for="schedule in schedule.children | orderBy compareSchedule"
    :schedule="schedule"></schedule-strip-row>
</template>

<script>
import moment from 'moment'
import ScheduleComparable from '../mixins/ScheduleComparable'
import ScheduleItem from '../mixins/ScheduleItem'
import { showRange, showRangeLength, showDates } from '../vuex/getters'
import { setSchedule } from '../vuex/actions'

export default {
  mixins: [ScheduleItem, ScheduleComparable],
  name: 'schedule-strip-row',

  vuex: {
    getters: { showRange, showRangeLength, showDates },
    actions: { setSchedule }
  },

  props: {
    schedule: Object
  },

  data () {
    return { dragging: false, dragStartX: 0, cursorOffsetX: 0, dayOffset: 0 }
  },

  computed: {
    length () {
      const start = moment(this.schedule.startOn)
      const end = moment(this.schedule.endOn)
      return end.diff(start, 'days') + 1
    },

    stripX () {
      return this.date * 32
    },

    stripWidth () {
      return this.length * 32
    },

    stripStyle () {
      return {
        left: this.stripX + 'px',
        width: this.stripWidth + 'px'
      }
    },

    rowStyle () {
      return {
        width: this.showRangeLength * 32 + 'px'
      }
    },

    dropTargetStyle () {
      return {
        left: (this.stripX + this.dayOffset * 32) + 'px'
      }
    },

    date () {
      const start = moment(this.schedule.startOn)
      const showRangeStart = moment(this.showRange.start)
      return start.diff(showRangeStart, 'days')
    },

    showDropTarget () {
      return !this.isRoot && this.dragging
    }
  },

  methods: {
    onStripDragStart (e) {
      e.target.style.opacity = 0
      this.dragging = true
      this.dragStartX = e.pageX
      this.dayOffset = 0
    },

    onStripDrag (e) {
      if (e.pageX === 0 && e.pageY === 0) {
        this.move(this.dayOffset)
        return
      }

      this.cursorOffsetX = e.pageX - this.dragStartX - 16
      this.dayOffset = parseInt(this.cursorOffsetX / 32)
    },

    onStripDragEnd (e) {
      e.target.style.opacity = 1
      this.dragging = false
    },

    onHandleDragStart (e) {
      this.dayOffset = 0
      this.dragStartX = e.pageX
      this.dragging = true
      console.log(this.dayOffset)
    },

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
.schedule-row {
  position: relative;
  line-height: 1;
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.schedule-strip {
  display: flex;
  position: absolute;
  align-items:center;
  height: 40px;
  padding: 4px 0;
  z-index: 5;
}

.schedule-strip > .handle {
  position: absolute;
  width: 4px;
  height: 32px;
  background-color: #ddd;
  z-index: 15;
}

.schedule-strip > .handle.left {
  cursor: w-resize;
  left: 0;
}

.schedule-strip > .handle.right {
  cursor: e-resize;
  right: 0;
}

.schedule-strip-box {
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

.schedule-strip.drop-target {
  z-index: 4;
}

.schedule-strip.drop-target > .schedule-strip-box {
  /*border: 1px dashed #000;*/
  /*background-color: transparent;*/
}

.title {
  line-height: 1;
  word-break: keep-all;
}
</style>
