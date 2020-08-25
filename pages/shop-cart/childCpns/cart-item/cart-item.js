// pages/cart/childCpns/cart-item/cart-item.js
const app = getApp()

Component({
  properties: {
    cartItem: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },
  data: {
  },
  methods: {
    //1.商品的点击监听
    clickItem(e){
      const goods = app.globalData.cartList.find(item => {
        item.iid === this.properties.cartItem.iid
      })
      // 1.1.获取当前商品的index
      const index = e.currentTarget.dataset.index;
      console.log(e);
      app.changeGoodsState(goods, index)
    },
    //2.商品数量的增加按钮监听
    handleAdd(e){
      app.addCount(this.properties.cartItem)
    },
    //3.商品数量的减少按钮监听
    handleReduce(event){
      if(this.properties.cartItem.count > 1){
        app.reduceCount(this.properties.cartItem)
      }
    }
  }
})
