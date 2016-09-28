<template>
  <div class="calendar">
    <h1 class="header">{{ date | dateFormat 'YYYY年MM月' }}</h1>
    <a href="#" @click.prevent="prevMonth">前月</a>
    <a href="#" @click.prevent="currentMonth">今日</a>
    <a href="#" @click.prevent="nextMonth">次月</a>

    <table>
      <thead>
        <tr><th v-for="str in weekdays">{{ str }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="week in weekRows">
          <td class="day-cell" v-for="day in week">
            <a href="#" @click="selectDay(day)" :class="dayClasses(day)">
              {{ day.date | dateFormat 'D' }}
            </a>
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
          isSameDay: d.isSame(moment(this.date).startOf('day')),
          isDifferentMonth: d.month() !== moment(this.date).month()
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
        'same-day': day.isSameDay,
        'is-different-month': day.isDifferentMonth
      }
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  font-size: 10px;
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
  font-weight: normal;
  padding: 2px 4px;
}

thead {
  border-bottom: 1px solid #ddd;
}

.day-cell > a {
  display: block;
  padding: 4px;
  border-radius: 2px;
  color: #000;
  text-decoration: none;
}

.day-cell > a:hover {
  background-color: #e8e8e8;
}

.day-cell > a.same-day {
  background-color: #bfbfbf;
  color: #fff;
}

.header {
  font-size: 12px;
}

.day-cell > a.is-different-month {
  color: #ddd;
}
</style>
