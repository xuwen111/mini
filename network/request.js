//声明baseURL
const baseURL = 'http://152.136.185.210:8000/api/z8'

export default function request(options){
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success(res){
        resolve(res)
      },
      fail(error){
        reject(error)
      }
    })
  })
}