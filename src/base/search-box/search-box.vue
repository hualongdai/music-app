<template>
  <div class="search-box">
    <i class="icon-Search"></i>
    <input ref="input" v-model="query" type="text" class="box" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
import { debounce } from 'common/js/utils'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch('query', debounce((newValue) => {
      this.$emit('query', newValue)
    }, 300))
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    blur() {
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~stylus/variable"
  .search-box
    display flex
    align-items center
    width 100%
    padding 0 6px
    height 40px
    border-radius 6px
    box-sizing border-box
    background $color-highlight-background
    .icon-Search
      font-size 24px
      color: $color-background
    .box
      flex 1
      margin 0 5px
      line-height 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      outline none
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
