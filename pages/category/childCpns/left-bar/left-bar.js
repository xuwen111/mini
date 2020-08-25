// pages/category/childCpns/left-bar/left-bar.js
Component({
  properties: {
    categories: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    handleClickItem(e){
      const index =e.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('handleClickItem', {index}, {})
    }
  }
})
