<template>
  <scroll
    ref="listview"
    class="listview"
    :data="data"
    :isListenScroll="isListenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <li v-for="(group,index) in data" :key="index" ref="listGroup" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,chidlIndex) in group.items" :key="chidlIndex" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li
          v-for="(item,index) in shortCutList"
          :data-index="index"
          :key="index"
          class="item"
          :class="{'current':currentIndex===index}"
          >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixedTitle">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import { getDOMData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGTH = 30

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Scroll
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() {
    this.touch = {}
    this.isListenScroll = true
    this.probeType = 3
  },
  computed: {
    shortCutList() {
      return this.data.map(item => item.title)
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      const anchorIndex = getDOMData(e.target, 'index')
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this.scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      // 要计算 我当前的pageY 和 touchStart的 pageY
      this.touch.y2 = e.touches[0].pageY
      // ANCHOR_HEIGHT 为每个 字母 的高度
      // 向下取整
      const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      const anchorIndex = Number(this.touch.anchorIndex) + delta
      this.scrollTo(anchorIndex)
    },
    scrollTo(index) {
      // 当 单击 shortCutList 内容的空白处（index === null），不应该滚动
      if (index === null) return
      // 处理touchmove 边界值
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    calculateHeight() {
      this.listHeight = []
      let height = 0
      this.listHeight.push(height)
      this.$refs.listGroup.forEach(item => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      // listHeight.length - 1 是因为listHeight是包含了 上下限，所以要 比 shortCutList 要多一个
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newValue) {
      const fixedTop = newValue > 0 && newValue < TITLE_HEIGTH ? newValue - TITLE_HEIGTH : 0
      if (this.fixedTop === fixedTop) return
      this.fixedTop = fixedTop
      this.$refs.fixedTitle.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>
