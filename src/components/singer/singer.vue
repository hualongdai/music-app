<template>
  <div class="singer">
    <list-view :data="singerList"></list-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERROR_CODE_OK } from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

const HOT_NAME = '热门'
const HOT_NAEM_LEN = 10

export default {
  components: {
    ListView
  },
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this.getSingersListData()
  },
  methods: {
    getSingersListData() {
      getSingerList().then((res) => {
        if (res.code === ERROR_CODE_OK) {
          this.singerList = this.formatDataSource(res.data.list)
        }
      })
    },
    formatDataSource(dataSource) {
      const result = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      dataSource.forEach((item, index) => {
        if (index < HOT_NAEM_LEN) {
          result.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!result[key]) {
          result[key] = {
            title: key,
            items: []
          }
        }
        result[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 为了得到有序列表 hot A B C .. Z
      const hot = []
      const others = []
      for (const item in result) {
        const value = result[item]
        if (value.title.match(/[a-zA-Z]/)) {
          others.push(value)
        } else if (value.title === HOT_NAME) {
          hot.push(value)
        }
      }
      others.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      return hot.concat(others)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~stylus/variable"
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
