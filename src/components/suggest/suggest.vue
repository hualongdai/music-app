<template>
  <scroll
    ref="suggest"
    :data="result"
    :pullUp="pullUp"
    :beforeScroll="beforeScroll"
    class="suggest"
    @scrollToEnd="loadMore"
    @beforeScroll="listScrolling"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
        <div class="icon"><i :class="getIconClassName(item)"></i></div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import { getSearchResult } from 'api/search'
import Scroll from 'base/scroll/scroll'
import { ERROR_CODE_OK } from 'api/config'
import { createSong } from 'common/js/song'
import Loading from 'base/loading/loading'
import { mapMutations, mapActions } from 'vuex'
import Singer from 'common/js/singer'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const PAGE_SIZE = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  },
  data() {
    return {
      pageNo: 1,
      result: [],
      pullUp: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  created() {
    this.existSingerData = false
  },
  watch: {
    query(newValue, oldValue) {
      if (newValue.trim() !== oldValue.trim()) {
        this.existSingerData = false
      }
      this.search()
    }
  },
  methods: {
    search() {
      this.hasMore = true
      // 每次query变化 触发search 的时候重置下pageNo
      this.pageNo = 1
      this.$refs.suggest.scrollTo(0)

      getSearchResult(this.query, this.pageNo, this.showSinger, PAGE_SIZE).then(res => {
        if (res.code === ERROR_CODE_OK) {
          this.result = this.formatData(res.data)
          // 检查还有没有更多数据
          this.checkHasMore(res.data)
        }
      })
    },
    formatData(list) {
      const ret = []
      if (list.zhida && list.zhida.singermid && !this.existSingerData) {
        this.existSingerData = true
        ret.push({ ...list.zhida, type: TYPE_SINGER })
      }
      return ret.concat(list.song.list.map(item => createSong(item)))
    },
    getIconClassName(item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDisplayName(item) {
      return item.type === TYPE_SINGER ? `${item.singername}` : `${item.name} - ${item.singer}`
    },
    loadMore() {
      if (!this.hasMore) return
      this.pageNo++
      getSearchResult(this.query, this.pageNo, this.showSinger, PAGE_SIZE).then(res => {
        if (res.code === ERROR_CODE_OK) {
          this.result = this.result.concat(this.formatData(res.data))
          // 检查还有没有更多数据
          this.checkHasMore(res.data)
        }
      })
    },
    checkHasMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * PAGE_SIZE > song.totalnum)) {
        this.hasMore = false
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({ id: item.singermid, name: item.singername })
        this.$router.push({ path: `/search/${singer.id}` })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    listScrolling() {
      this.$emit('scrolling')
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "~stylus/variable"
@import "~stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      margin-top: -67px
      transform: translateY(-50%)
</style>
