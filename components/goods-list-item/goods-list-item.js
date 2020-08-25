// components/goods-list-item/goods-list-item.js

Component({
  properties: {
    "itemInfo": {
      type: Object,
      value: {}
    }
  },
  data: {
    iid: ''
  },
  methods: {
    goodsItemClick(){
      const iid = this.properties.itemInfo.iid
      this.setData({
        iid
      })
      console.log(this.data.iid)
      //将商品的iid传递给“详情页”
      wx.navigateTo({
        url: '/pages/detail/detail?iid='+ iid
      })
    }
  }
  
})
