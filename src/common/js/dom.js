export function addClass(el, className) {
  if (hasClass(el, className)) return
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join('')
}

export function hasClass(el, className) {
  return el.classList.contains(className)
}

// 获取/设置 DOM结构 中data-* 值
export function getDOMData(el, name, value) {
  const prefix = 'data-'
  name = `${prefix}${name}`
  if (value) {
    return el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}