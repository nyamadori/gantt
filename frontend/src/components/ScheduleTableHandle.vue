<template>
  <div
    :class="{ handle: true, dragging: dragging }"
    :style="[handleStyle]"
    @mousedown="onMouseDown"><slot></slot></div>
</template>

<script>
import ScheduleMeasurement from '../mixins/ScheduleMeasurement'
import { viewRange, viewCell, viewHandle } from '../vuex/getters'

export default {
  mixins: [ ScheduleMeasurement ],
  props: {
    date: {
      type: String,
      required: true
    },
    attach: {
      type: String,
      default: 'center',
      validator: (value) => { return ['left', 'center'].indexOf(value) !== -1 }
    },
    scaleBase: {
      type: String,
      default: 'grid',
      validator: (value) => { return ['grid', 'cell'].indexOf(value) !== -1 }
    }
  },

  vuex: {
    getters: { viewRange, viewCell, viewHandle }
  },

  data () {
    return {
      _date: null,
      x: 0,
      y: 0,
      prevMouseX: null,
      prevMouseY: null,
      dragging: false
    }
  },

  computed: {
    left () {
      return this.toPixel(this.date) + this.handleOffsetX + this.scaleOffsetX
    },

    handleOffsetX () {
      switch (this.attach) {
        case 'left':
          return 0
        case 'center':
          return -this.viewHandle.width / 2
      }
    },

    scaleOffsetX () {
      switch (this.scaleBase) {
        case 'grid':
          return 0
        case 'cell':
          return this.viewCell.width
      }
    },

    handleStyle () {
      return {
        left: this.left + 'px',
        height: this.viewCell.height + 'px'
      }
    }
  },

  created () {
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
      this.$dispatch('move', this.toDate(this.x))

      this.prevMouseX = e.x
      this.prevMouseY = e.y
    },

    onMouseUp (e) {
      this.dragging = false
    }
  }
}
</script>

<style>
.handle {
  position: absolute;
  background-color: transparent;
  z-index: 50;
  width: 10px;
  cursor: col-resize;
}
</style>
