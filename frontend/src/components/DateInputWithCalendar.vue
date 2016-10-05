<template>
  <div class="date-input-with-calendar">
    <date-input
      :date="date"
      @changed="dateChanged"
      @focused="dateInputFocused"
      @blurred="dateInputBlurred"></date-input>
    <calendar
      :date="date"
      @changed="dateChanged"
      @focused="calendarFocused"
      @blurred="calendarBlurred"></calendar>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    date: String,
    default: moment().format()
  },

  data () {
    return {
      haveDateInputFocus: false,
      haveCalendarFocus: false
    }
  },

  methods: {
    dateChanged (date) {
      this.date = date
    },

    dateInputFocused () { this.haveDateInputFocus = true },
    dateInputBlurred () { this.haveDateInputFocus = false },
    calendarFocused () { this.haveCalendarFocus = true },
    calendarBlurred () { this.haveCalendarFocus = false }
  }
}
</script>
