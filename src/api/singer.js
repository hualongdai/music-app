import jsonpTool from 'common/js/jsonp'
import { commonParams, options } from './config'

// 获取歌手列表
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = {
    ...commonParams,
    platform: 'yqq',
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1
  }
  return jsonpTool(url, data, options)
}