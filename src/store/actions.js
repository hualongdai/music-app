import * as types from './types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils'

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