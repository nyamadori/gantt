<template>
  <div
    class="handle"
    :style="handleStyle"
    @mousedown="onMouseDown"></div>
</template>

<script>
import { viewCell } from '../vuex/getters'

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
    getters: { viewCell }
  },

  data () {
    return {
      x: 0,
      y: 0,
      prevMouseX: null,
      prevMouseY: null,
      dragging: false
    }
  },

  computed: {
    handleStyle () {
      return {
        left: this.x + 'px',
        height: this.viewCell.height + 'px'
      }
    }
  },

  created () {
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.addEventListener('mouseup', this.onMouseUp.bind(this))
  },

  methods: {
    onMouseDown (e) {
      this.dragging = true
    },

    onMouseMove (e) {
      if (!this.dragging) return
      if (this.prevMouseX === null) this.prevMouseX = e.x
      if (this.prevMouseY === null) this.prevMouseY = e.y

      const movX = e.x - this.prevMouseX
      this.x += movX
      console.log(this.x, e.movementX, e.x)
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
  height: 40px;
  width: 10px;
  background-color: #900;
  z-index: 100
}
</style>
