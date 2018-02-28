<template>
<transition name="slide">
  <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { createSong } from 'common/js/song'
import { ERROR_CODE_OK } from 'api/config'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  created() {
    this.getSingerDetailData()
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  methods: {
    getSingerDetailData() {
      if (!this.singer.id) {
        this.$router.push({ path: '/singer' })
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERROR_CODE_OK) {
          this.songs = this.formatSongs(res.data.list)
        }
      })
    },
    formatSongs(list) {
      return list.filter(item => item.musicData.songid && item.musicData.albummid)
        .map(item => createSong(item.musicData))
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
