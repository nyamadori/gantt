<template>
  <div class="schedule-title-list">
    <h1 class="header" :style="[scheduleStyle]">スケジュール</h1>
    <item
      v-for="schedule in schedules | orderBy compareSchedule"
      :schedule="schedule"></item>
    <item :schedule="{ isNew: true }"></item>
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
</style>

<script>
import Item from './Item'
import ScheduleComparable from '../../mixins/ScheduleComparable'
import { dateFormat } from '../../filters'
import { tableCell } from '../../vuex/getters'

export default {
  mixins: [ScheduleComparable],
  vuex: {
    getters: { tableCell }
  },

  components: { Item },

  props: {
    schedules: Array
  },
  filters: { dateFormat },

  computed: {
    scheduleStyle () {
      return {
        height: this.tableCell.height + 'px'
      }
    }
  }
}
</script>
