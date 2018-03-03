<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k.trim())" v-for="(item,index) in hotKeyList" class="item" :key="index">
                <span>{{item.k.trim()}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="historySearch.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteHistorySearch" @select="addQuery" :historyList="historySearch"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest ref="suggest" @select="saveSearch" :query="query" @scrolling="blurInput"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearHistorySearch" text="是否清空搜索列表"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import { getHotKey } from 'api/search'
import { ERROR_CODE_OK } from 'api/config'
import { mapActions, mapGetters } from 'vuex'
import { playListMixin, searchMixin } from 'common/js/mixin'

export default {
  mixins: [playListMixin, searchMixin],
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  data() {
    return {
      hotKeyList: [],
      query: ''
    }
  },
  created() {
    this.getHotKeyList()
  },
  computed: {
    shortcut() {
      return this.hotKeyList.concat(this.historySearch)
    },
    ...mapGetters(['historySearch'])
  },
  watch: {
    query(newValue) {
      // 当播放列表 切到 搜索列表，query 有 —> 无, 要手动刷新下
      if (!newValue) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  methods: {
    handlePlayList(playList) {
      // 处理播放器造成的 滚动覆盖问题
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
      // 搜索列表
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
    },
    getHotKeyList() {
      getHotKey().then(res => {
        if (res.code === ERROR_CODE_OK) {
          this.hotKeyList = res.data.hotkey.slice(0, 10)
        }
      })
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    ...mapActions(['clearHistorySearch'])
  }
}
</script>

<style lang="stylus" scoped>
@import "~stylus/variable"
  .search
    .search-box-wrapper
      margin 20px
    .shortcut-wrapper
      position fixed
      top 178px
      bottom 0
      width 100%
      .shortcut
        height 100%
        overflow hidden
        .hot-key
          margin 0 20px 20px 20px
          .title
            margin-bottom 20px
            font-size $font-size-medium
            color $color-text-l
          .item
            display inline-block
            padding 5px 10px
            margin 0 15px 10px 0
            border-radius 4px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
