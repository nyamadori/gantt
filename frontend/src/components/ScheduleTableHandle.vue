<template>
  <div
    class="handle"
    :style="handleStyle"
    @mousedown="onMouseDown"></div>
</template>

<script>
import moment from 'moment'
import { viewRange, viewCell } from '../vuex/getters'

export default {
  props: {
    date: {
      type: String,
      required: true
    },
    attach: {
      type: String,
      default: 'center',
      validator: (value) => { return ['left', 'center'].indexOf(value) !== -1 }
    }
  },

  vuex: {
    getters: { viewRange, viewCell }
  },

  data () {
    return {
      _date: null,
      x: 0,
      y: 0,
      prevMouseX: null,
      prevMouseY: null,
      dragging: false,
      width: 10
    }
  },

  computed: {
    currentDate () {
      return this.toDate(this.x)
    },

    left () {
      return this.toPixel(this.currentDate) + this.offsetX
    },

    offsetX () {
      switch (this.attach) {
        case 'left':
          return 0
        case 'center':
          return -this.width / 2
      }
    },

    handleStyle () {
      return {
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.viewCell.height + 'px'
      }
    }
  },

  created () {
    this._date = this.date
    this.x = this.toPixel(this.date)
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.addEventListener('mouseup', this.onMouseUp.bind(this))
  },

  methods: {
    onMouseDown (e) {
      this.dragging = true
      this.prevMouseX = e.x
      this.prevMouseY = e.y
    },

    onMouseMove (e) {
      if (!this.dragging) return

      const movX = e.x - this.prevMouseX
      this.x += movX

      this.prevMouseX = e.x
      this.prevMouseY = e.y
    },

    onMouseUp (e) {
      this.dragging = false
    },

    toDate (pixel) {
      return moment(this.viewRange.start).add(this.toDateNum(pixel), 'days').format()
    },

    toDateNum (pixel) {
      return Math.round(pixel / this.viewCell.width)
    },

    toPixel (date) {
      return moment(date).diff(moment(this.viewRange.start), 'days') * this.viewCell.width
    }
  }
}
</script>

<style>
.handle {
  position: absolute;
  background-color: #900;
  z-index: 100
}
</style>
