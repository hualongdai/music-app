<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTopList } from 'api/rank'
import { createSong } from 'common/js/song'
import { ERROR_CODE_OK } from 'api/config'
import MusicList from 'components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  created() {
    this.getTopListData()
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters(['topList'])
  },
  methods: {
    getTopListData() {
      if (!this.topList.id) {
        this.$router.push({ path: '/rank' })
        return
      }
      getTopList(this.topList.id).then(res => {
        if (res.code === ERROR_CODE_OK) {
          this.songs = this.formatSongs(res.songlist)
        }
        console.log(res.songlist)
      })
    },
    formatSongs(list) {
      return list.filter(item => item.data.songid && item.data.albummid)
        .map(item => createSong(item.data))
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
