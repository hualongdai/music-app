import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const insertArray = (arr, value, compare, maxLen) => {
  const index = arr.findIndex(compare)
  if (index === 0) return
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(value)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, item => item === query, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function getHistorySearchFromStorage() {
  return storage.get(SEARCH_KEY, [])
}

function deleteAraryItem(arr, compare) {
  const index = arr.findIndex(compare)
  arr.splice(index, 1)
  return arr
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteAraryItem(searches, item => item === query)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}