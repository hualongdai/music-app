// import axios from 'axios'
import jsonpTool from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = {
    ...commonParams,
    platform: 'h5',
    needNewCode: 1
  }

  return jsonpTool(url, data, options)
}

export function getSearchResult(keyword, pageNo = 1, zhida = true, pageSize = 20) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = {
    ...commonParams,
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    w: keyword,
    zhidaqu: zhida ? 1 : 0,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: pageSize,
    n: pageSize,
    p: pageNo,
    remoteplace: 'txt.mqq.all'
  }

  return jsonpTool(url, data, options)
}