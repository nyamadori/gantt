import Vue from 'vue'
import App from './App'
import DateInput from './components/DateInput'
Vue.component('date-input', DateInput)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
