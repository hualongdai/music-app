import jsonp from 'jsonp'

export default function jsonpTool(url, data, option) {
  url += (url.indexOf('?') === -1 ? '?' : '&') + formatUrl(data)
  return new Promise((resolve, reject) => {
    jsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function formatUrl(data) {
  let url = ''
  for (const item in data) {
    let value = data[item] !== undefined ? data[item] : ''
    url += `&${item}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}