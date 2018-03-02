import * as types from './types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}

export const selectPlay = ({ commit, state }, { list, index }) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    commit(types.SET_PLAY_LIST, shuffle(list))
    commit(types.SET_CURRENT_INDEX, findIndex(list, list[index]))
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = ({ commit }, { list }) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, shuffle(list))
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = ({commit, state}, song) => {
  let { currentIndex } = state
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  const currentSong = playList[currentIndex]

  // 给 playList 插入 song
  let index = findIndex(playList, song)
  // 因为插入了歌曲 所以currentIndex要 +1
  currentIndex++
  playList.splice(currentIndex, 0, song)
  if (index > -1) {
    if (currentIndex > index) {
      playList.splice(index, 1)
      currentIndex--
    } else {
      playList.splice(index + 1, 1)
    }
  }

  // 给 sequenceList 插入 song
  let currentSequenceIndex = findIndex(sequenceList, currentSong) + 1
  let sequenceIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSequenceIndex, 0, song)
  if (sequenceIndex > -1) {
    if (currentSequenceIndex > sequenceIndex) {
      sequenceList.splice(sequenceIndex, 1)
    } else {
      sequenceList.splice(sequenceIndex + 1, 1)
    }
  }
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 保存搜索记录 到本地
export const saveHistorySearch = ({commit}, query) => {
  commit(types.SET_HISTORY_SEARCH, saveSearch(query))
}

export const deleteHistorySearch = ({commit}, query) => {
  commit(types.SET_HISTORY_SEARCH, deleteSearch(query))
}

export const clearHistorySearch = ({commit}) => {
  commit(types.SET_HISTORY_SEARCH, clearSearch())
}