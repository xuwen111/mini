// components/tab-bar/tab-bar.js
Component({
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    handleClickItem(event){
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('itemClick',{index})
    },
    setCurrentIndex(index){
      this.setData({
        currentIndex: index
      })
    }
  }
})
