
function getRandomInt(min, max) {
  // max - min + 1 是为了 能获取到max
  // + min 是为了 能获取到min
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 打乱数组(洗牌)
export function shuffle(arr) {
  let newArr = arr.slice()
  for (let i = 0, len = newArr.length; i < len; i++) {
    const j = getRandomInt(0, i)
    let t = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = t
  }
  return arr
}

const funcLimit = function(fn, interval, isDebounce) {
  var timer
  return function() {
    let context = this
    let args = arguments
    var throttler = function() {
      timer = null
      fn.apply(context, args)
    }
    // 如果是 debounce，前一个函数调用的 timer会清除，前一个函数不会执行，会重新设置timer
    // 如果是 throttle 只有timer 为空的时候 才会重新设置timer
    if (isDebounce) clearTimeout(timer)
    if (isDebounce || !timer) timer = setTimeout(throttler, interval)
  }
}

export const throttle = function(fn, intetval) {
  return funcLimit(fn, intetval, false)
}

export const debounce = function(fn, interval) {
  return funcLimit(fn, interval, true)
}