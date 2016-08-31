<template>
  <div class="schedule-row" v-if="!isRoot" :style="[rowStyle]">
    <div class="schedule-strip" v-if="!isRoot" :style="[stripStyle]">
      <div class="schedule-strip-box">
        <div class="title">{{ schedule.title }}</div>
      </div>
    </div>

    <!-- <div class="schedule-strip-cells">
      <div v-for="x in showDates" class="cell"></div>
    </div> -->
  </div>

  <schedule-strip-row
    v-for="schedule in schedule.children | orderBy compareSchedule"
    :schedule="schedule"></schedule-strip-row>
</template>

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
  padding: 4px;
  z-index: 5;
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
}

.title {
  line-height: 1;
  word-break: keep-all;
}
</style>

<script>
import moment from 'moment'
import ScheduleComparable from '../mixins/ScheduleComparable'
import ScheduleItem from '../mixins/ScheduleItem'
import { showRange, showRangeLength, showDates } from '../vuex/getters'

export default {
  mixins: [ScheduleItem, ScheduleComparable],
  name: 'schedule-strip-row',

  vuex: {
    getters: { showRange, showRangeLength, showDates }
  },

  props: {
    schedule: Object
  },

  computed: {
    length () {
      const start = moment(this.schedule.startOn)
      const end = moment(this.schedule.endOn)
      return end.diff(start, 'days')
    },

    stripStyle () {
      return {
        left: this.date * 32 + 'px',
        width: this.length * 32 + 'px'
      }
    },

    rowStyle () {
      return {
        width: this.showRangeLength * 32 + 'px'
      }
    },

    date () {
      const start = moment(this.schedule.startOn)
      const showRangeStart = moment(this.showRange.start)
      return start.diff(showRangeStart, 'days')
    }
  },

  methods: {
    getDateFromIndex (i) {

    }
  }
}
</script>
