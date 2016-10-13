<template>
  <span :class="{ 'inner-input': true, 'has-focus': hasFocus }">
    {{ currentText }}
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      hasFocus: false,
      currentText: this.text,
      touched: false
    }
  },

  watch: {
    text (newVal) {
      this.currentText = newVal
    }
  },

  methods: {
    focus () {
      this.hasFocus = true
    },

    blur () {
      this.hasFocus = false
      this.touched = false
    },

    insertDigit (d) {
      const newString = this.currentText.concat(d)

      if (this.touched) {
        this.currentText = newString
      } else {
        this.currentText = d.toString()
      }

      this.touched = true
    },

    removeDigit () {
      const newString = this.currentText.slice(0, -1)

      if (this.touched) {
        this.currentText = newString
      } else {
        this.currentText = ''
      }

      this.touched = true
    },

    revert () {
      this.currentText = this.text
    }
  }
}
</script>

<style scoped>
.inner-input {
  display: inline-block;
  text-align: right;
}

.inner-input.has-focus {
  background-color: rgb(163, 201, 237);
}
</style>
