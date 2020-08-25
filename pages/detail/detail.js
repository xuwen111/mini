// pages/detail/detail.js
import {getGoodsDetail, 
        getGoodsRecommend, 
         BaseInfo, DetailCommentInfo, ParamsInfo, ChooseBarData} from '../../network/detail'

//获取App的实例对象
const app = getApp()

Page({
  data: {
    iid: '',
    baseInfo: {},
    detailCommentInfo: {},
    shopInfo: {},
    paramsInfo: {},
    recommendData: {},
    chooseBarData: {},
    showBackTop: false,
    topPosition: 0,
    titles: ['宝贝','评价','详情','推荐'],
    isAdd: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.获取传递过来的商品iid
    const iid = options.iid
    // const iid = '1m70y5k'
    this.setData({iid})
    //2.根据iid获取商品详情数据
    this._getGoodsDetail(iid)
    //3.获取商品的推荐数据
    this._getGoodsRecommend()
  },
  //---------------------------------------------数据请求函数------------------------------------------
  //1.获取详情数据
  _getGoodsDetail(iid){
    getGoodsDetail(iid).then(res => {
      //1.0.获取商品详情数据
      const data = res.data.result
      console.log(data)
      //1.1获取商品基本信息
      const baseInfo = new BaseInfo(data.columns, data.itemInfo)
      //1.2获取评论信息
      const detailCommentInfo = new DetailCommentInfo(data.rate)
      //1.3获取店铺信息
      const shopInfo = data.shopInfo 
      //1.4获取商品参数信息
      const paramsInfo = new ParamsInfo(data.detailInfo, data.itemParams)
      //1.5 获取商品choose-bar展示信息
      const chooseBarData = new ChooseBarData(data.skuInfo, data.topBar, data.itemInfo)      
      // console.log(chooseBarData)

      //1.6保存到data中
      this.setData({
        baseInfo,
        detailCommentInfo,
        shopInfo,
        paramsInfo,
        chooseBarData
      })
    })
  },
  //2.获取推荐数据
  _getGoodsRecommend(){
    getGoodsRecommend().then(res => {
      const recommendData = res.data.data
      // console.log(recommendData)
      this.setData({
        recommendData
      })
    })
  },

  //---------------------------------------------------事件监听函数-----------------------------------------
  //1.监听scroll-view的滚动
  handleScroll(event){
    //当前滚动的scrollTop
    const scrollTop = event.detail.scrollTop
    const showBackTop = scrollTop > 1500
    if(showBackTop !== this.data.showBackTop){
      this.setData({
        showBackTop
      })
    }
  },
  //2.监听“back-top”的点击
  toBackTop(){
    this.setData({
      showBackTop: false,
      topPosition: 0
    })
  },
  //3.监听“加入购物车”的点击
  addCart(){
    console.log("jiaru");
    this.setData({
      isAdd: true
    })
  },
  //4.监听“立即购买”的点击
  buyIt(){
    console.log("buyit");
    this.setData({
      isAdd: true
    })
  },
  //5.监听choose-bar的“确定”按钮点击
  handleSure(event){
    console.log(event);
    //取出choose的style和数量
    const size = event.detail.style.size
    const color = event.detail.style.color
    const count = event.detail.count
    const style = {size, color}
    //3.0 隐藏choose-bar
    this.setData({
      isAdd: false
    })
    //3.1.创建选中对象
    const obj = {}
    obj.iid = this.data.iid
    obj.title = this.data.chooseBarData.title
    obj.image = this.data.chooseBarData.colorImages[0].img
    obj.price = this.data.chooseBarData.price
    obj.style = style
    obj.count = count
    //3.2.调用app的addCart()
    app.addCart(obj)
    //3.3.添加成功后，显示toast
    wx.showToast({
      title: '添加购物车成功',
      duration: 2000
    })
  },
  //6.监听choose-bar的“取消”按钮的点击
  cancelChoose(){
    this.setData({
      isAdd: false
    })
  }





  
  ,
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