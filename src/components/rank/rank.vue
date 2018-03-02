<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="topList" ref="topList">
      <ul>
        <li @click="selectItem(song)" v-for="song in topList" :key="song.id" class="item">
          <div class="icon">
            <img width="100" height="100" v-lazy="song.picUrl">
          </div>
          <div class="song-list">
            <p class="item-title">{{ song.topTitle }}</p>
            <ul>
              <li class="song" :key="index" v-for="(item,index) in song.songList">
                <span>{{ index + 1}}</span>
                <span>{{item.songname}} · {{item.singername}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { playListMixin } from 'common/js/mixin'
import { getRankList } from 'api/rank'
import { ERROR_CODE_OK } from 'api/config'
import { mapMutations } from 'vuex'

export default {
  mixins: [playListMixin],
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.topList.refresh()
    },
    getTopList() {
      getRankList().then(res => {
        if (res.code === ERROR_CODE_OK) {
          this.topList = res.data.topList
        }
      })
    },
    selectItem(item) {
      this.$router.push({ path: `/rank/${item.id}` })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import "~stylus/variable"
@import "~stylus/mixin"

  .rank
    position fixed
    top 88px
    width 100%
    bottom 0
    .topList
      height 100%
      overflow hidden
      .item
        display flex
        margin 0 20px
        padding-top 20px
        height 100px
        &:last-child
          padding-bottom 20px
        .icon
          flex 0 0 100px
          width 100px
          height 100px
        .song-list
          flex 1
          display flex
          flex-direction column
          justify-content center
          padding 0 20px
          height 100px
          overflow hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 20px
          .item-title
            no-wrap()
            font-size: $font-size-medium-x
            color $color-text-l
            margin-bottom 10px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style>
