//app.js
App({
  globalData: {
    token: '',
    ////定义全局变量，存储购物车的商品
    cartList: []
  },
    //--------------------------------------------------- 事件监听 -----------------------------------------------
  //1.监听“添加购物车”的点击
  addCart(obj){
    //1.1判断obj是否已经加入购物车
    const oldProduct = this.globalData.cartList.find(item => item.iid ===obj.iid)
    if(oldProduct){
      oldProduct.count += obj.count
    } else{
      obj.checked = false
      this.globalData.cartList.push(obj)
    }
    // console.log(this.globalData.cartList);
    //1.2 调用全选点击
    this.clickAll(true)
    //1.3执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  },
  //2.减少购物车内商品的数量
  reduceCount(obj){
    const oldProduct = this.globalData.cartList.find(item => item.iid ===obj.iid)
    if(oldProduct){
      oldProduct.count -= 1
    }
    //2.1执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  },
  //3.增加购物车内商品的数量
  addCount(obj){
    //更改obj的 数量为1
    obj.count = 1
    //调用“addCart”函数
    this.addCart(obj)
  },
  //4.更改cartList中goods的状态
  changeGoodsState(goods, index){
    const temp = this.globalData.cartList[index]
    this.globalData.cartList[index].checked = !temp.checked
    console.log(temp.checked);
    
    //4.1执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  },
  //5.全选按钮的点击监听
  clickAll(temp){
    for(let item of this.globalData.cartList){
      item.checked = temp
    }
    //5.1执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  },


  //----------------------------------------------生命周期函数--------------------------------------
  onLaunch: function () {
    //询问用户权限
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })

    


    // 从本地存储能力取出token
    const token =wx.getStorageSync('TOKEN')
    //2.判断token是否为空
    if(token && token.length){
      //2.1携带token，进行数据请求
      this.check_token(token)
    } else {
    // 2.2登录
    wx.login({
      success: res => {
        // 2.2.1发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: (res) => {
            //1)取出token
            const token = res.data.token
            //2)把token存储到全局变量中
            this.globalData.token = token
            //3)把token存储到storage中
            wx.setStorage({
              key: 'TOKEN',
              data: token,
              success: (res) => {
                console.log(res);
              }
            })
          }
        })
      }
    })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  check_token(token){
    wx.request({
      // url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res) => {
        // console.log("请求到了数据",res)
      }
    })
  }
})