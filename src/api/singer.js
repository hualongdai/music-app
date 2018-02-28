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

// 获取歌手详情
export function getSingerDetail(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = {
    ...commonParams,
    platform: 'yqq',
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0,
    channel: 'singer',
    page: 'list',
    order: 'order',
    begin: 'listen',
    num: 100,
    songstatus: 1,
    singermid: id
  }
  return jsonpTool(url, data, options)
}