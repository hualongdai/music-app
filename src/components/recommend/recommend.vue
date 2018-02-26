<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="playList">
      <div>
        <div v-if="recommends.length">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in playList" :key="item.dissid" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!playList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getRecommendList, getPlayList } from 'api/recommend'
import { ERROR_CODE_OK } from 'api/config'

export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      playList: []
    }
  },
  created () {
    this.getRecommendData()
    this.getPlayListData()
  },
  methods: {
    getRecommendData() {
      getRecommendList().then((res) => {
        if (res.code === ERROR_CODE_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    getPlayListData() {
      getPlayList().then((res) => {
        if (res.code === ERROR_CODE_OK) {
          this.playList = res.data.list
        }
      })
    },
    loadImage() {
      // 这里只需要判断是否已经加载过了 避免反复执行refresh 方法
      if (!this.loadedImage) {
        this.$refs.scroll.refresh()
        this.loadedImage = true
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
