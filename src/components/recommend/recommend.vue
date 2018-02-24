<template>
  <div class="recommend">
    <div v-if="recommends.length">
      <slider>
        <div v-for="item in recommends" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" class="item-img">
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import { getRecommendList, getPlayList } from 'api/recommend'
import { ERROR_CODE_OK } from 'api/config'

export default {
  components: {
    Slider
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

</style>
