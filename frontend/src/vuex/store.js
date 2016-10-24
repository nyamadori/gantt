import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  schedules: [],
  uid: 1,

  newSchedule: {
    title: '',
    startOn: null,
    endOn: null,
    status: 'new',
    tasks: []
  },

  table: {
    scrollLeft: 0,
    start: moment('2016-08-01').format(),
    end: moment('2016-10-01').format(),
    width: 0
  },

  tableCell: {
    width: 24,
    height: 44
  },

  handle: {
    width: 10
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: true
})
