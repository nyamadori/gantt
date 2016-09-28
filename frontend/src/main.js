import Vue from 'vue'
import App from './App'
import Calendar from './components/Calendar'
import DatePicker from './components/DatePicker'

Vue.component('date-picker', DatePicker)
Vue.component('calendar', Calendar)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
