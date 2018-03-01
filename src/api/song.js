import axios from 'axios'
// import jsonpTool from 'common/js/jsonp'
import { commonParams } from './config'

// 这个接口 qq 有安全限制 我们要本地模拟 修改下 headers
export function getLyricData(id) {
  const url = '/api/getLyric'
  const data = {
    ...commonParams,
    platform: 'yqq',
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0,
    nobase64: 0,
    musicid: id,
    format: 'json'
  }
  return axios.get(url, { params: data }).then((res) => {
    return Promise.resolve(res.data)
  })
}