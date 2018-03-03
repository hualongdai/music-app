export const singer = state => state.singer

// 播放器相关
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = state => state.playList[state.currentIndex] || {}

// 歌单相关
export const disc = state => state.disc

// 排行榜
export const topList = state => state.topList

// 历史搜索
export const historySearch = state => state.historySearch

// 播放列表
export const playHistory = state => state.playHistory

// 喜欢列表
export const favoriteList = state => state.favoriteList
