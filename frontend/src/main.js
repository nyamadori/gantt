import Vue from 'vue'
import App from './App'
import Calendar from './components/Calendar'
import DateInput from './components/DateInput'

Vue.component('date-input', DateInput)
Vue.component('calendar', Calendar)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
