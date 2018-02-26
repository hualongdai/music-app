import axios from 'axios'
import jsonpTool from 'common/js/jsonp'
import { commonParams, options } from './config'

// 获取推荐列表 轮播图列表
export function getRecommendList() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {
    ...commonParams,
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  }
  return jsonpTool(url, data, options)
}

// 获取推荐列表 歌单列表
// export function getPlayList() {
//   const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
//   const data = {
//     ...commonParams,
//     picmid: 1,
//     rnd: Math.random(),
//     loginUin: 0,
//     hostUin: 0,
//     platform: 'yqq',
//     needNewCode: 0,
//     categoryId: 10000000,
//     sortId: 5,
//     sin: 0,
//     ein: 29
//   }
//   return jsonpTool(url, data, options)
// }

// 运行时发现 这种直接通过jsonp的方式，获取不到 我们的数据，是因为 y.qq.com 服务器限制了 host 和 referer 必须是 y.qq.com
// 那么，怎么前端是不能直接修改 Request header的，那么就在webapck 的server 设置，伪装下 request header
// 具体修改 请查看 webpack.dev.conf.js 中 devServer 新增 before(app){ ... } 配置

export function getPlayList() {
  const url = 'api/getPlayList'
  const data = {
    ...commonParams,
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json' // 这里是本地模拟请求 不再是 jsonp了
  }

  return axios.get(url, { params: data }).then((res) => {
    return Promise.resolve(res.data)
  })
}