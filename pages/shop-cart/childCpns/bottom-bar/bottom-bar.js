// pages/cart/childCpns/bottom-bar/bottom-bar.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalPrice: {
      type: Number,
      value: 0
    },
    totalCount: {
      type: Number,
      value: 0
    },
    selectAll: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleClickAll(){
      const temp = !this.properties.selectAll
      app.clickAll(temp)
    }
  }
})
