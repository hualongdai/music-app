<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number, // 滚动的类型，1表示会派发事件，会截流
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    isListenScroll: { // 是否监听滚动
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll() {
      if (!this.$refs.scrollWrapper) return
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.isListenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() { // 滚动到固定位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() { // 滚动到固定 dom
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => { // 20 是一个经验值 是保证 DOM 已经ready
        this.refresh()
      }, 20)
    }
  }
}
</script>
