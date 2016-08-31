<template>
  <div class="schedule" v-if="!isRoot">
    <div class="schedule-title">
      {{ schedule.title }}
    </div>

    <div class="children">
      <schedule
        v-for="schedule in schedule.children | orderBy compareSchedule"
        :schedule="schedule"></schedule>
    </div>
  </div>

  <schedule
    v-for="schedule in schedule.children | orderBy compareSchedule"
    v-if="isRoot"
    :schedule="schedule"></schedule>
</template>

<style scoped>
.schedule-title {
  padding: 7px 12px;
  height: 40px;
  border-bottom: 1px solid #ddd;
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
    schedule: Object
  }
}
</script>
