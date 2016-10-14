<template>
  <div class="calendar" v-el:container @focusin="onFocusIn" @focusout="onFocusOut">
    <h1 class="header">{{ date | dateFormat 'YYYY年MM月' }}</h1>
    <span @click.prevent="prevMonth">前月</span>
    <span @click.prevent="currentMonth">今日</span>
    <span @click.prevent="nextMonth">次月</span>

    <table>
      <thead>
        <tr><th v-for="str in weekdays">{{ str }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="week in weekRows">
          <td
            class="day-cell" v-for="day in week"
            @click.prevent.stop="selectDay(day)" :class="dayClasses(day)">
            {{ day.date | dateFormat 'D' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import { dateFormat } from '../filters'

export default {
  filters: { dateFormat },

  props: {
    date: {
      type: String,
      default: moment().format()
    }
  },

  watch: {
    date (val) {
      this.$dispatch('changed', val)
    }
  },

  computed: {
    weekdays () {
      return moment.weekdaysMin()
    },

    dayOfFirstWeek () {
      return moment(this.date).startOf('month').startOf('week').format()
    },

    dayOfLastWeek () {
      return moment(this.date).endOf('month').endOf('week').format()
    },

    weekRows () {
      var d = moment(this.dayOfFirstWeek)
      const rows = []
      var week = []

      while (d.isSameOrBefore(this.dayOfLastWeek)) {
        if (d.day() === 0) {
          week = []
          rows.push(week)
        }

        week.push({
          date: d.format(),
          isSelectionDay: d.isSame(moment(this.date).startOf('day')),
          isDifferentMonth: d.month() !== moment(this.date).month(),
          isToday: d.isSame(moment().startOf('day'))
        })
        d = d.add(1, 'day')
      }

      return rows
    }
  },

  methods: {
    prevMonth () {
      this.date = moment(this.date).subtract(1, 'month').format()
    },

    nextMonth () {
      this.date = moment(this.date).add(1, 'month').format()
    },

    currentMonth () {
      this.date = moment().format()
    },

    selectDay (day) {
      this.date = day.date
    },

    dayClasses (day) {
      return {
        'is-selection-day': day.isSelectionDay,
        'is-different-month': day.isDifferentMonth,
        'is-today': day.isToday
      }
    },

    onFocusOut (e) {
      if (!this.$els.container.contains(e.relatedTarget)) {
        this.$dispatch('blurred')
        console.log(this, 'blurred', e.relatedTarget)
      }
    },

    onFocusIn (e) {
      if (!this.$els.container.contains(e.relatedTarget)) {
        this.$dispatch('focused')
        console.log(this, 'focused')
      }
    }
  }
}
</script>

<style scoped>
.calendar {
  display: inline-block;
  padding: 4px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: #fff;
}

table {
  border-collapse: collapse;
  font-size: 11px;
  font-family: Helvetica, Arial, sans-serif;
  table-layout: fixed;
  width: 161px;
}

tr {
  margin-bottom: 2px;
}

td, th {
  width: 22px;
  height: 22px;
  text-align: right;
}

th {
  vertical-align: bottom;
  padding: 4px;
  color: #bbbbbb;
}

thead {
  border-bottom: 1px solid #ddd;
}

.day-cell {
  padding: 4px;
  border-radius: 2px;
  color: #000;
  text-decoration: none;
}

.day-cell:hover {
  background-color: #e8e8e8;
}

.day-cell.is-selection-day {
  background-color: #bfbfbf;
  color: #fff;
}

.day-cell.is-selection-day.is-today {
  background-color: #0088f3;
  color: #fff;
}

.header {
  font-size: 12px;
}

.day-cell.is-different-month {
  color: #ddd;
}

.day-cell.is-today {
  color: #0088f3;
}
</style>
