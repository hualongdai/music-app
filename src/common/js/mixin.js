/**
 * 在VUE中，如果几个组件都要做类似的事，那么就用mixin 来做
 * 在VUE component 的方法会覆盖mixin 定义的方法
 */

import { mapGetters } from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  // keep-live 组件激活调用
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newValue) {
      this.handlePlayList(this.playList)
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList method')
    }
  }
}