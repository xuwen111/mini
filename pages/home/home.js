// pages/home/home.js
import {getGoodsData} from '../../network/home'

const types = ['sell', 'new', '', 'pop']

Page({
  data: {
    titles: ['全部', '狂暑季','直播', '便宜好货'],
    swiperImages: [
      '/assets/images/home/show/01.jpg',
      '/assets/images/home/show/02.jpg',
      '/assets/images/home/show/03.jpg',
      '/assets/images/home/show/04.jpg',
      '/assets/images/home/show/05.jpg'
    ],
    goodsData: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []}
    },
    currentType: 'pop',
    showBackTop: false,
    topPosition: 0,
    tabControlFixed: false,
    tabControl2Position: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '拼命加载中...',
    // })
    // setTimeout(() => {
    //   request({
    //     url: '/home/multidata'
    //   }).then(res => {
    //     console.log('---',res)
    //     wx.hideLoading()
    //   })
    // }, 3000)
    this._getGoodsData('pop')
    this._getGoodsData('sell')
    this._getGoodsData('new')

    //获取tab-control2的位置
    wx.createSelectorQuery().select(".tab-control2").boundingClientRect(rect => {
      this.data.tabControl2Position = rect.top
      // console.log(this.data.tabControl2Position)
    }).exec()

  },
  //--------------------------------------------数据请求函数-------------------------------------
  _getGoodsData(type){
    const page = this.data.goodsData[type].page + 1
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list
      const oldList = this.data.goodsData[type].list
      oldList.push(...list)
      //修改data中数据 ---> 拼接“变量”
      const listKey = `goodsData.${type}.list`
      const pageKey = `goodsData.${type}.page`
      this.setData({
        [listKey]: oldList,
        [pageKey]: page
      })
    })
  },


  //-------------------------------------------事件监听函数------------------------------------
  //1.tab-control的点击
  itemClick(event){
    const index = event.detail.index
    const type = types[index]
    if(type){
      this.setData({
        currentType: type
      })
    }else{
      return
    }
    this.selectComponent(".tab-control1").setCurrentIndex(index)
    this.selectComponent(".tab-control2").setCurrentIndex(index)
    //判断tab-control是否已经fixed，如果已经fixed，需要scroll回到tab-control2的位置
    if(this.data.tabControlFixed){
      const tabControl2Position = this.data.tabControl2Position
      this.setData({
        topPosition: tabControl2Position + 100
      })
    }
  },
  // 2.scroll-view的滚动监听
  handleScroll(event){
    const position = event.detail.scrollTop
    //2.1判断是否显示“back-top”组件
    const showBackTop = position > 1500
    if(showBackTop !== this.data.showBackTop){
      this.setData({
        showBackTop
      })
    }
    //2.2判断是否显示“固定的tab-control”组件
    const tabControlFixed = position > this.data.tabControl2Position + 88
    if(tabControlFixed !== this.data.tabControlFixed){
      this.setData({
        tabControlFixed
      })
    }
    // wx.createSelectorQuery().select('.tab-control2').boundingClientRect((rect) => {
    //   const tabControlFixed = rect.top < 0
    //   if(tabControlFixed !== this.data.tabControlFixed){
    //     this.setData({
    //       tabControlFixed
    //     })
    //   }
    // }).exec()
    
  },
  // 3."back-top"的点击监听
  toBackTop(){
    this.setData({
      showBackTop: false,
      topPosition: 0
    })
  },
  //4.轮播图图片的加载完成监听
  imagesLoad(){
    //获取tab-control2的位置
    // wx.createSelectorQuery().select(".tab-control2").boundingClientRect(rect => {
    //   this.data.tabControl2Position = rect.top
    //   console.log(this.data.tabControl2Position)
    // }).exec()
  },
  //5.scroll到底部 --> “上拉加载更多”监听
  loadMore(){
    //调用“加载当前类型数据”函数
    const type = this.data.currentType
    this._getGoodsData(type)
  }
  
  
  
  
  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})