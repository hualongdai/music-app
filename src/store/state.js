import { playMode } from 'common/js/config'

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
  topList: {}
}

export default state