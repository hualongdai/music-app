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

// 获取当前浏览器前缀
function getVendor () {
  let elementStyle = document.createElement('div').style

  const vendor = (() => {
    let transformNames = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    }

    for (let key in transformNames) {
      if (elementStyle[transformNames[key]] !== undefined) {
        return key
      }
    }

    return false
  })()
  return vendor
}

export function prefixStyle(style) {
  const vendor = getVendor()
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}