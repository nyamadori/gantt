<template>
  <div class="header" :style="headerStyle">
    <template v-if="schedule.status === 'new'">
      <div class="title">
        <input
          type="text"
          v-model="currentSchedule.title"
          placeholder="新規タスク名"
          @keyup.enter="createSchedule"></input>
      </div>
    </template>

    <template v-if="schedule.status !== 'new'">
      <div class="title">{{ schedule.title }}</div>
      <div class="period" v-if="!schedule.isNew">
        {{ schedule.startOn | dateFormat 'YYYY/MM/DD' }} ―
        {{ schedule.endOn | dateFormat 'YYYY/MM/DD' }}
      </div>
    </template>
  </div>
</template>

<script>
import { dateFormat } from '../../filters'
import { table, tableCell } from '../../vuex/getters'
import { addSchedule } from '../../vuex/actions'

export default {
  filters: { dateFormat },
  vuex: {
    getters: { table, tableCell },
    actions: { addSchedule }
  },

  props: {
    schedule: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      scheduleBase: Object.assign({}, this.schedule)
    }
  },

  computed: {
    currentSchedule: {
      get () {
        return this.scheduleBase
      },

      set (value) {
        this.scheduleBase = value
      }
    },

    headerStyle () {
      return {
        left: this.table.scrollLeft + 'px',
        height: this.tableCell.height - 1 + 'px'
      }
    }
  },

  methods: {
    createSchedule () {
      if (!this.currentSchedule.title) return

      const newSchedule = Object.assign({}, this.currentSchedule)
      newSchedule.isNew = false
      newSchedule.status = 'periodUnSetted'
      this.addSchedule(newSchedule)
      this.currentSchedule.title = ''
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  padding: 0 16px;
  position: absolute;
  width: 180px;
  z-index: 200;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.95);
}

.header .title {
  font-size: 1.2rem;
  margin-bottom: 3px;
  color: #4a4a4a;
}

.header .title input {
  display: inline-block;
  font-size: 1.2rem;
  border-style: none;
  padding: 0;
  width: 100%;
}

.header .period {
  font-size: 0.7rem;
  color: #4a4a4a;
}
</style>
