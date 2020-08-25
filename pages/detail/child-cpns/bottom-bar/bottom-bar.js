// pages/detail/child-cpns/bottom-bar/bottom-bar.js
Component({
  properties: {

  },
  data: {
    isLike: false
  },
  methods: {
    //1."收藏"的点击
    handleLikeIt(){
      const isLike = !this.data.isLike
      this.setData({
        isLike
      })
      //如果收藏，显示“收藏成功”
      if(isLike){
        wx.showToast({
          title: '收藏成功',
          duration: 2000
        })
      }
      //否则，显示“取消收藏”
      if(!isLike){
        wx.showToast({
          title: '取消收藏',
          duration: 2000
        })
      }
    },
    //2.“加入购物车”的点击
    addCart(){
      this.triggerEvent("addCart")
    },
    //3.“立即购买”的点击
    buyIt(){
      this.triggerEvent("buyIt")
    }
  }
})
