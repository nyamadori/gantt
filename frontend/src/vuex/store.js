import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  schedules: [
    {
      id: 1,
      title: '全体設計',
      startOn: '2016-08-27',
      endOn: '2016-09-03',
      tasks: []
    },
    {
      id: 2,
      title: 'ERD',
      startOn: '2016-9-02',
      endOn: '2016-09-03',
      tasks: []
    },
    {
      id: 3,
      title: '要件定義',
      startOn: '2016-08-27',
      endOn: '2016-08-31',
      tasks: []
    },
    {
      id: 4,
      title: '用語定義',
      startOn: '2016-09-01',
      endOn: '2016-09-01',
      tasks: []
    },
    {
      id: 5,
      title: 'aaaaaa',
      startOn: '2016-08-26',
      endOn: '2016-09-10',
      tasks: []
    }
  ],

  view: {
    range: {
      start: moment('2016-08-01').format(),
      end: moment('2016-10-01').format()
    },

    cell: {
      width: 24,
      height: 44
    },

    handle: {
      width: 10
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: true
})
