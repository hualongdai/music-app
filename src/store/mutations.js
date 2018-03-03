import * as types from './types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  // 播放器相关
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  // 歌单相关
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  // 排行榜
  [types.SET_TOP_LIST](state, rankItem) {
    state.topList = rankItem
  },
  // 历史搜索
  [types.SET_HISTORY_SEARCH](state, list) {
    state.historySearch = list
  },
  // 播放列表
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  // 喜欢列表
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}

export default mutations