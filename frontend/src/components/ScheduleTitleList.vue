<template>
  <div class="schedule-title-list">
    <table class="schedule-table">
      <thead class="schedule-table-header">
        <tr>
          <th>タイトル</th>
          <th>開始日</th>
          <th>終了日</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="schedule in schedules | orderBy compareSchedule"
          class="schedule-table-row"
          :style="[scheduleStyle]"
        >
          <td>
            <input type="text" class="title" v-model="schedule.title"></input>
          </td>
          <td>
            <date-input :date="schedule.startOn"></date-input>
          </td>
          <td>
            <date-input :date="schedule.endOn"></date-input>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.schedule-title-list {
  position: absolute;
  height: 100%;
  z-index: 100;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.5);
  background-color: #fff;
}

.schedule-table {
  border-collapse: collapse;
}

.schedule-table-row {
  border-bottom: 1px solid #ddd;
}

.schedule-table td {
  padding: 8px;
}

.schedule-table td:first-child {
  padding-left: 16px;
}

.schedule-table td:last-child {
  padding-right: 16px;
}

.schedule-table-header tr {
  border-bottom: 1px solid #ddd;
  height: 43px;
}
</style>

<script>
import ScheduleComparable from '../mixins/ScheduleComparable'
import { dateFormat } from '../filters'
import { tableCell } from '../vuex/getters'

export default {
  mixins: [ScheduleComparable],
  vuex: {
    getters: { tableCell }
  },

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
