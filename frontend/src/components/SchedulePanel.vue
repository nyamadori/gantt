<template>
  <div class="schedule-panel" v-if="selectionSchedule">
    <h1 class="header">{{ selectionSchedule.title }}</h1>
    <p><input v-model="schedule.title"></input></p>
    <p><input v-model="schedule.startOn"></input></p>
    <p><input v-model="schedule.endOn"></input></p>
  </div>
</template>

<style scoped>
.schedule-panel {
  flex-shrink: 0;
  flex-basis: 240px;
  height: 100%;
  padding: 0 12px;
  border-left: 1px solid #dddddd;
  background-color: #f6f6f6;
}

.header {
  display: flex;
  margin: auto -12px;
  padding: 0 12px;
  align-items: center;
  height: 44px;
  font-size: 1.3rem;
  border-bottom: 1px solid #ddd;
}
</style>

<script>
import { dateFormat } from '../filters'
import { selectionSchedule } from '../vuex/getters'
import { setSchedule } from '../vuex/actions'

export default {
  vuex: {
    getters: { selectionSchedule },
    actions: { setSchedule }
  },

  filters: { dateFormat },

  props: {
    schedule: {
      required: true,
      type: Object
    }
  }
}
</script>
