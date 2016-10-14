<template>
  <div class="schedule-table-header">
    <div class="cell month-cell" v-for="(month, days) in tableHeaders">
      <div class="title">
        {{ month }}
      </div>

      <div class="schedule-table-header">
        <div
          class="cell day-cell" v-for="day in days" :style="headerCellStyle"
        >
          <div class="title">{{ day }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule-table-header {
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
}

.cell {
  background-color: #f6f6f6;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
}

.month-cell > .title {
  height: 24px;
  border-right: 2px solid #ddd;
}

.day-cell > .title {
  height: 20px;
  font-size: 0.8rem;
}

.day-cell:last-child > .title {
  border-right: 2px solid #ddd;
}
</style>

<script>
import moment from 'moment'
import ScheduleMeasurement from '../mixins/ScheduleMeasurement'
import { dateFormat } from '../filters'
import { tableCell, tableLength, tableHeaders } from '../vuex/getters'

export default {
  mixins: [ ScheduleMeasurement ],
  vuex: {
    getters: {
      tableCell, tableLength, tableHeaders
    }
  },
  filters: { dateFormat },

  computed: {
    headerRowStyle () {
      return {
        width: this.tableLength * this.tableCell.width + 'px'
      }
    },

    headerCellStyle () {
      return {
        width: this.tableCell.width + 'px'
      }
    }
  },

  methods: {
    monthHeaderCellStyle (month) {
      const days = moment(month.end).diff(moment(month.start), 'days')
      return { width: days * this.tableCell.width + 'px' }
    }
  }
}
</script>
