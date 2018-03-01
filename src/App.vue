<template>
  <div id="app">
    <music-header></music-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import MusicHeader from 'components/header/header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

export default {
  components: {
    MusicHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable'

#app
  background-color: $color-background

</style>
