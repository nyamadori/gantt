<template>
  <span
    class="date-input" tabindex="0" v-el:container
    @focus="onFocused" @blur="onBlurred"
    @keydown.up.prevent="increment"
    @keydown.down.prevent="decrement"
    @keydown.left.prevent="focusInnerPrev"
    @keydown.right.prevent="focusInnerNext"
    @keydown.tab="onPressedTab"
    @keydown="onKeydown"
  >
    <inner-input
      v-ref:year
      :text="yearString" :style="numericalInputStyle(font, '9999')"
      @click="onInputFocused"></inner-input>
    /
    <inner-input
      v-ref:month
      :text="monthString" :style="numericalInputStyle(font, '99')"
      @click="onInputFocused"></inner-input>
    /
    <inner-input
      v-ref:day
      :text="dayString" :style="numericalInputStyle(font, '99')"
      @click="onInputFocused"></inner-input>

    <calendar
      v-if="hasFocus"
      :date="currentDate"
      :style="calendarStyle"
      @changed="onCalendarChanged"></calendar>
  </span>
</template>

<script>
import moment from 'moment'
import InnerInput from './InnerInput'

export default {
  components: {
    InnerInput
  },

  props: {
    date: {
      type: String,
      default: moment().format()
    }
  },

  watch: {
    date (newVal) {
      this.currentDate = newVal
    }
  },

  data () {
    return {
      font: '',
      focusIndexBase: 0,
      hasFocus: false,
      tabShift: false,
      height: 0,
      dateChanges: {
        originalValue: this.date,
        newValue: null
      }
    }
  },

  computed: {
    currentDate: {
      get () {
        return this.dateChanges.newValue || this.dateChanges.originalValue
      },

      set (v) {
        this.dateChanges.newValue = v
      }
    },

    year: {
      get () {
        return moment(this.currentDate).year()
      },

      set (v) {
        this.currentDate = moment(this.currentDate).year(v).format()
      }
    },

    yearString () { return moment(this.currentDate).format('YYYY') },

    month: {
      get () {
        return moment(this.currentDate).month() + 1
      },

      set (v) {
        this.currentDate = moment(this.currentDate).month(v - 1).format()
      }
    },

    monthString () { return moment(this.currentDate).format('MM') },

    day: {
      get () {
        return moment(this.currentDate).date()
      },

      set (v) {
        this.currentDate = moment(this.currentDate).date(v).format()
      }
    },

    dayString () { return moment(this.currentDate).format('DD') },

    focusIndex: {
      get () {
        return this.focusIndexBase
      },

      set (v) {
        this.getFocusedInput().blur()
        this.$set(this.focusKey, parseInt(this.getFocusedInput().currentText))
        if (!this.validate()) {
          this.revertInputs()
        }

        if (v >= this.$inputs.length) {
          this.focusIndexBase = 0
        } else if (v < 0) {
          this.focusIndexBase = this.$inputs.length - 1
        } else {
          this.focusIndexBase = v
        }

        if (this.hasFocus) this.getFocusedInput().focus()
      }
    },

    focusKey () {
      return this.$inputKeys[this.focusIndex]
    },

    calendarStyle () {
      return { position: 'absolute', top: this.height }
    }
  },

  ready () {
    this.font = window.getComputedStyle(this.$els.container, null).getPropertyValue('font')
    this.height = window.getComputedStyle(this.$els.container, null).getPropertyValue('height')
    this.$inputKeys = ['year', 'month', 'day']
    this.$inputs = this.$inputKeys.map((name) => this.$refs[name])
    this.focusIndex = 0

    document.addEventListener('keydown', this.onDocumentKeydown.bind(this))
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.onDocumentKeydown)
  },

  methods: {
    isValid () {
      return moment(this.currentDate).isValid()
    },

    validate () {
      if (this.isValid()) {
        this.dateChanges.originalValue = this.dateChanges.newValue
        this.dateChanges.newValue = null
        return true
      } else {
        this.dateChanges.newValue = null
        return false
      }
    },

    revert () {
      this.dateChanges.newValue = null
    },

    revertInputs () {
      this.$inputs.map((input) => input.revert())
    },

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

    increment () {
      this.$set(this.focusKey, this.$get(this.focusKey) + 1)
      this.validate()
    },

    decrement () {
      this.$set(this.focusKey, this.$get(this.focusKey) - 1)
      this.validate()
    },

    getFocusedInput () {
      return this.$inputs[this.focusIndex]
    },

    focusInnerPrev () {
      this.focusIndex = this.focusIndex - 1
    },

    focusInnerNext () {
      this.focusIndex = this.focusIndex + 1
    },

    insertDigit (d) {
      this.getFocusedInput().insertDigit(d)
    },

    removeDigit () {
      this.getFocusedInput().removeDigit()
    },

    calendarStyle () {
      return {
        position: 'absolute',
        top: window.getComputedStyle(this.$els.inputsContainer, null).height
      }
    },

    onDocumentKeydown (e) {
      if (e.key !== 'Tab') return

      this.tabShift = e.shiftKey
    },

    onKeydown (e) {
      if (e.key === 'Backspace') {
        this.onPressedBackspace(e)
      } else {
        const d = parseInt(e.key)
        if (!isNaN(d)) this.onPressedDigit(e, d)
      }
    },

    onFocused (e) {
      this.hasFocus = true

      if (this.tabShift) {
        this.focusIndex = this.$inputs.length - 1
      } else {
        this.focusIndex = 0
      }
    },

    onBlurred (e) {
      this.hasFocus = false
      this.getFocusedInput().blur()
    },

    onPressedTab (e) {
      if (e.shiftKey) {
        if (this.focusIndex === 0) return
        this.focusInnerPrev()
      } else {
        if (this.focusIndex === this.$inputs.length - 1) return
        this.focusInnerNext()
      }

      e.preventDefault()
    },

    onPressedBackspace (e) {
      this.removeDigit()
    },

    onPressedDigit (e, digit) {
      this.insertDigit(digit)
    },

    onInputFocused (e) {
      this.focusIndex = this.$inputs.indexOf(e.target.__vue__)
    },

    onCalendarChanged (date) {
      this.currentDate = date
    },

    onFocusOut (e) {
      if (!this.$els.container.contains(e.relatedTarget)) {
        console.log(this, 'blurred')
        this.$dispatch('blurred')
      }
    },

    onFocusIn (e) {
      if (!this.$els.container.contains(e.relatedTarget)) {
        console.log(this, 'focused')
        this.$dispatch('focused')
      }
    }
  }
}
</script>

<style scoped>
.date-input {
  display: inline-flex;
  position: relative;
  font-family: Helvetica, Arial, sans-serif;
}

.date-input:focus {
  border-bottom: 2px solid rgb(184, 213, 241);
  outline: 0
}

.calendar {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
