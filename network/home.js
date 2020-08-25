import request from './request'

export function getGoodsData(type, page){
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}