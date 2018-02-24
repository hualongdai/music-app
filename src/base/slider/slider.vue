<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentIndex === index}" :key="index" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '@/common/js/dom'

export default {
  data() {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()

      if (this.autoPlay) {
        this.play()
      }
    }, 20)

    window.addEventListener('resize', () => { // 视口改变自适应
      if (!this.slider) {
        return
      }
      this.setSliderWidth(true) // 重新设置宽度
      this.slider.refresh() // 刷新轮播
    })
  },
  activated() {
    if (this.autoPlay) {
      this.play()
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = `${sliderWidth}px`
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        // 首尾加一个 slider-item DOM 结构
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = `${width}px`
    },
    initDots() {
      this.dots = new Array(this.children.length)
    },
    initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 横向滚动
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })

      this.slider.on('scrollEnd', () => {
        let currentIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          currentIndex -= 1
        }
        this.currentIndex = currentIndex

        if (this.autoPlay) {
          this.play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    play() {
      let pageIndex = this.currentIndex + 1
      if (this.loop) { // 循环轮播是+2
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400) // 直接去到下一页
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~stylus/variable'

  .slider
    position: relative
    width: 100%
    overflow: hidden
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 6px
        height: 6px
        border-radius: 50%
        background: rgba(144,144,144,.8)
        &.active
          background: #fff
</style>
