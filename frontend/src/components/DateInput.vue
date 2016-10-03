<template>
  <span class="date-input" v-el:container @click="onClick">
    <span class="inputs-container" v-el:inputs-container>
      <input
        class="year-input"
        :style="numericalInputStyle(font, '9999')"
        v-el:year-input
        v-model="year" number
        @click="inputClicked"
        @keydown.up.prevent="yearUp"
        @keydown.down.prevent="yearDown"
        @keydown.left.prevent="focusPrev"
        @keydown.right.prevent="focusNext"></input>
      /
      <input
        class="month-input"
        :style="numericalInputStyle(font, '99')"
        v-el:month-input
        v-model="month" number
        @click="inputClicked"
        @keydown.up.prevent="monthUp"
        @keydown.down.prevent="monthDown"
        @keydown.left.prevent="focusPrev"
        @keydown.right.prevent="focusNext"></input>
      /
      <input
        class="day-input"
        :style="numericalInputStyle(font, '99')"
        v-el:day-input
        v-model="day" number
        @click="inputClicked"
        @keydown.up.prevent="dayUp"
        @keydown.down.prevent="dayDown"
        @keydown.left.prevent="focusPrev"
        @keydown.right.prevent="focusNext"></input>
    </span>
    <calendar
      v-if="isEditing"
      :date="date"
      :style="calendarStyle()"
      @changed="onCalendarChanged"></calendar>
  </span>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    date: {
      type: String,
      default: moment().format()
    }
  },

  data () {
    return {
      font: '',
      focusCounter: 0,
      currentDate: null,
      isEditing: false
    }
  },

  computed: {
    currentDate: {
      get (v) {
        return this.date
      },

      set (v) {
        if (!moment(v).isValid()) return
        this.date = v
        this.$dispatch('changed', v)
      }
    },

    year: {
      get () {
        return moment(this.date).format('YYYY')
      },

      set (v) {
        this.currentDate = moment(this.date).year(v).format()
      }
    },

    month: {
      get () {
        return moment(this.date).format('MM')
      },

      set (v) {
        this.currentDate = moment(this.date).month(v - 1).format()
      }
    },

    day: {
      get () {
        return moment(this.date).format('DD')
      },

      set (v) {
        this.currentDate = moment(this.date).date(v).format()
      }
    },

    focusIndex: {
      get () {
        return this.focusCounter
      },

      set (v) {
        if (v >= this.$inputs.length) {
          this.focusCounter = 0
        } else if (v < 0) {
          this.focusCounter = this.$inputs.length - 1
        } else {
          this.focusCounter = v
        }

        const input = this.$inputs[this.focusCounter]
        input.focus()
      }
    }
  },

  compiled () {
    document.addEventListener('click', this.onClickDocument.bind(this))
  },

  ready () {
    this.font = window.getComputedStyle(this.$els.container, null).getPropertyValue('font')
    this.$inputs = ['year', 'month', 'day'].map((name) => this.$els[name + 'Input'])
    this.focusIndex = 0
  },

  destroyed () {
    document.removeEventListener('click', this.onClickDocument)
  },

  methods: {
    measureTextSize (text, font) {
      // FIXME: extract this method from here
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.font = font
      return ctx.measureText(text)
    },

    numericalInputStyle (font, str) {
      const measure = this.measureTextSize(str, font)

      return {
        width: measure.width + 'px',
        height: measure.height + 'px'
      }
    },

    yearUp () { this.year++ },
    yearDown () { this.year-- },
    monthUp () { this.month++ },
    monthDown () { this.month-- },
    dayUp () { this.day++ },
    dayDown () { this.day-- },

    focusPrev () {
      this.focusIndex = this.focusIndex - 1
    },

    focusNext () {
      this.focusIndex = this.focusIndex + 1
    },

    inputClicked (e) {
      this.focusIndex = this.$inputs.indexOf(e.target)
    },

    onClick (e) {
      this.isEditing = true
    },

    calendarStyle () {
      return {
        position: 'absolute',
        top: window.getComputedStyle(this.$els.inputsContainer, null).height
      }
    },

    onClickDocument (e) {
      if (this.$els.container.contains(e.target)) return

      this.isEditing = false
    },

    onCalendarChanged (date) {
      this.currentDate = date
    }
  }
}
</script>

<style scoped>
.date-input, .inputs-container {
  display: inline-flex;
  position: relative;
  font-family: Helvetica, Arial, sans-serif;
}

input {
  box-sizing: content-box;
  padding: 0 2px;
  border-radius: 2px;
  border-style: none;
  border-bottom: 1px solid transparent;
  font-family: inherit;
  background: transparent;
  text-align: right;
  font-size: inherit;
  outline: 0;
  color: transparent;
  text-shadow: 0 0 0 #000;
}

input:focus {
  background-color: rgb(163, 201, 237)
}
</style>
