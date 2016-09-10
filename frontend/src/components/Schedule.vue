<template>
  <div class="schedule">
    <div class="schedule-title">
      {{ schedule.title }}
    </div>
  </div>
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
