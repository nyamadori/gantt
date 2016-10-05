import Vue from 'vue'
import App from './App'
import Calendar from './components/Calendar'
import DateInput from './components/DateInput'
import DateInputWithCalendar from './components/DateInputWithCalendar'

Vue.component('date-input', DateInput)
Vue.component('calendar', Calendar)
Vue.component('date-input-with-calendar', DateInputWithCalendar)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
