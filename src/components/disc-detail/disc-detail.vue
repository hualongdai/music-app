<template>
<transition name="slide">
  <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
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
    this.getDiscDetailData()
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters(['disc'])
  },
  methods: {
    getDiscDetailData() {
      if (!this.disc.dissid) {
        this.$router.push({ path: '/recommend' })
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERROR_CODE_OK) {
          this.songs = this.formatSongs(res.cdlist[0].songlist)
        }
      })
    },
    formatSongs(list) {
      return list.filter(item => item.songid && item.albummid)
        .map(item => createSong(item))
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
