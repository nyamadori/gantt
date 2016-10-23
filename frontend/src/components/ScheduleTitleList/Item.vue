<template>
  <div class="schedule" :style="[scheduleStyle]">
    <div v-if="schedule.isNew">
      <input type="text" v-model="schedule.title"></input>
    </div>
    <div v-if="!schedule.isNew">
      <div class="title">{{ schedule.title }}</div>
      <div class="period" v-if="!schedule.isNew">
        {{ schedule.startOn | dateFormat 'YYYY/MM/DD' }} ―
        {{ schedule.endOn | dateFormat 'YYYY/MM/DD' }}
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '../../filters'
import { tableCell } from '../../vuex/getters'

export default {
  vuex: {
    getters: { tableCell }
  },

  props: {
    schedule: {
      type: Object,
      required: true
    }
  },

  filters: { dateFormat },

  computed: {
    scheduleStyle () {
      return {
        height: this.tableCell.height + 'px'
      }
    }
  }
}
</script>

<style scoped>
.schedule {
  display: flex;
  justify-content: center;
  padding: 7px 14px;
  height: 40px;
  border-bottom: 1px solid #535353;
  flex-direction: column;
  line-height: 1;
}

.schedule .title {
  margin-bottom: 4px;
}

.period {
  font-size: 0.7rem;
  color: #8f8f8f;
}
</style>
