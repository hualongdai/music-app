import { playMode } from 'common/js/config'
import { getHistorySearchFromStorage } from 'common/js/cache'

const state = {
  singer: {},
  // 播放器相关
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  // 歌单相关
  disc: {},
  // 排行榜
  topList: {},
  // 历史搜索
  historySearch: getHistorySearchFromStorage()
}

export default state