import request from  './request'

export function getCategory(){
  return request({
    url: '/category'
  })
}

export function getsubCategory(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}
