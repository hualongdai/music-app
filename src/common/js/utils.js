
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