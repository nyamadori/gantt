<template>
  <div class="schedule-title-list">
    <h1 class="header">スケジュール</h1>

    <div
      class="schedule"
      v-for="schedule in schedules | orderBy compareSchedule"
      :schedule="schedule">
      <div class="schedule-title">
        {{ schedule.title }}
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

.header {
  display: flex;
  padding: 0 12px;
  border-bottom: 1px solid #535353;
  align-items: center;
  height: 42px;
  font-size: 1rem;
  background-color: #444;
}

.schedule-title {
  display: flex;
  align-items: center;
  padding: 7px 12px;
  height: 40px;
  border-bottom: 1px solid #535353;
}

.children {
  margin-left: 16px;
}
</style>

<script>
import ScheduleComparable from '../mixins/ScheduleComparable'
import ScheduleItem from '../mixins/ScheduleItem'

export default {
  mixins: [ScheduleComparable, ScheduleItem],
  name: 'schedule',

  props: {
    schedules: Array
  }
}
</script>
