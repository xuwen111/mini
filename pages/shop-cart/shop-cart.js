// pages/shop-cart/shop-cart.js
// pages/cart/cart.js
//导入app实例对象
const app = getApp()

Page({
  data: {
    cartList: [],
    selectAll: false,
    totalPrice: 0,
    totalCount: 0,
  },
  onLoad: function (options) {
    //1.把全局变量中的cartList传递给shop-cart
    this.setData({
      cartList: app.globalData.cartList
    })
    //定义购物车回调函数 => 调用价格计算&&长度赋值函数changeData
    app.addCartFunction = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: `我的购物车(${this.data.cartList.length})`,
    })
  },
  changeData(){
    let totalPrice = 0
    let totalCount = 0
    let selectAll 
    for(let item of this.data.cartList){
      if(!item.checked){
        selectAll = false
        break
      } else{
        totalPrice += parseFloat(item.price) * item.count
        totalCount ++
        selectAll = true
      }
    }
    this.setData({
      totalCount,
      totalPrice,
      selectAll
    })
    // console.log(totalPrice,totalCount);
  }
  
})