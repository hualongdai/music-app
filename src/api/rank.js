import axios from 'axios'
import jsonpTool from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getRankList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = {
    ...commonParams,
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  }
  return jsonpTool(url, data, options)
}

export function getTopList(id) {
  const url = 'api/getTopList'
  const data = {
    ...commonParams,
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: id,
    format: 'json' // 这里是本地模拟请求 不再是 jsonp了
  }

  return axios.get(url, { params: data }).then((res) => {
    return Promise.resolve(res.data)
  })
}