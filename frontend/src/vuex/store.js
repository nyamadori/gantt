import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  schedules: [
    {
      id: 0,
      title: 'root',
      children: [
        {
          id: 1,
          title: '全体設計',
          startOn: '2016-08-27',
          endOn: '2016-09-03',
          children: [
            {
              id: 2,
              parentId: 1,
              title: 'ERD',
              startOn: '2016-9-02',
              endOn: '2016-09-03',
              children: []
            },
            {
              id: 3,
              parentId: 1,
              title: '要件定義',
              startOn: '2016-08-27',
              endOn: '2016-08-31',
              children: []
            },
            {
              id: 4,
              parentId: 1,
              title: '用語定義',
              startOn: '2016-09-01',
              endOn: '2016-09-01',
              children: []
            }
          ]
        },
        {
          id: 5,
          parentId: null,
          title: 'aaaaaa',
          startOn: '2016-08-26',
          endOn: '2016-09-10',
          children: []
        }
      ]
    }
  ],

  showRange: {
    start: '2016-08-01',
    end: '2016-10-01'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: true
})
