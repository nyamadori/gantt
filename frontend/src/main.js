import Vue from 'vue'
import App from './App'
import DatePicker from './components/DatePicker'

Vue.component('date-picker', DatePicker)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
