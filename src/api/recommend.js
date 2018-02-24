import jsonpTool from '@/common/js/jsonp'
import { commonParams, options } from './config'

export default function getRecommendList() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {
    ...commonParams,
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  }
  return jsonpTool(url, data, options)
}