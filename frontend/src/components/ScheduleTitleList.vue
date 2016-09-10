<template>
  <div class="schedule-title-list">
    <h1 class="header" :style="[scheduleStyle]">スケジュール</h1>

    <div
      class="schedule"
      v-for="schedule in schedules | orderBy compareSchedule"
      :schedule="schedule"
      :style="[scheduleStyle]">
      <div class="title">{{ schedule.title }}</div>
      <div class="period">
        {{ schedule.startOn | dateFormat 'YYYY/MM/DD' }} ―
        {{ schedule.endOn | dateFormat 'YYYY/MM/DD' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule-title-list {
  position: absolute;
  width: 200px;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  color: #e0e0e0;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.5);
}

.schedule-title-list > .header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #535353;
  align-items: center;
  font-size: 1rem;
  background-color: #444;
  line-height: 1;
}

.schedule {
  display: flex;
  justify-content: center;
  padding: 7px 14px;
  height: 40px;
  border-bottom: 1px solid #535353;
  flex-direction: column;
  line-height: 1;
}

.schedule > .title {
  margin-bottom: 4px;
}

.period {
  font-size: 0.7rem;
  color: #8f8f8f;
}
</style>

<script>
import ScheduleComparable from '../mixins/ScheduleComparable'
import { dateFormat } from '../filters'
import { viewCell } from '../vuex/getters'

export default {
  mixins: [ScheduleComparable],
  name: 'schedule',

  vuex: {
    getters: { viewCell }
  },

  props: {
    schedules: Array
  },
  filters: { dateFormat },

  computed: {
    scheduleStyle () {
      return {
        height: this.viewCell.height + 'px'
      }
    }
  }
}
</script>
