<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="playList">
      <div>
        <div v-if="recommends.length">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" class="item-img">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in playList" :key="item.dissid" class="item">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { getRecommendList, getPlayList } from 'api/recommend'
import { ERROR_CODE_OK } from 'api/config'

export default {
  components: {
    Slider,
    Scroll
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
</style>
