// pages/detail/child-cpns/choose-bar/choose-bar.js
Component({
  properties: {
    chooseBarData: {
      type: Object,
      value: {}
    }
  },
  data: {
    isChooseStyle: false,
    choosedSize: '',
    choosedColor: '',
    choosedStyle: {},
    count: 1,
  },
  methods: {
    //“确定”按钮的点击
    handleSure(){
      const size = this.data.choosedSize
      const color = this.data.choosedColor
      //判断，如果尺码、颜色均已选择，则传递事件
      if(size && color){
        const style = {
          size,
          color
        }
        this.triggerEvent("handleSure",{style:style, count: this.data.count})
      }
    },
    //“取消”按钮的点击
    cancelChoose(){
      this.triggerEvent("cancelChoose")
    },
    //“-”按钮的点击监听
    submitCount(){
      const count = this.data.count
      if(count > 1){
        this.setData({
          count: count-1
        })
      }
    },
    //“+”按钮的点击监听
    addCount(){
      const count = this.data.count
      this.setData({
        count: count + 1
      })
    },
    //"尺码"的选择
    sizeChoose(event){
      const size = event.currentTarget.dataset.size
      this.setData({
        choosedSize: size
      })
      if(!this.data.choosedColor){
        this.setData({
          choosedStyle: '尺码:'+ size+ '，未选择颜色分类',
          isChooseStyle: true
        })
      } else {
        const style = "尺码:" + size + "，颜色:"+ this.data.choosedColor
        this.setData({
          choosedStyle: style,
          isChooseStyle: true
        })
      }
    },
    //"颜色"的选择
    colorChoose(event){
      const color = event.currentTarget.dataset.size
      this.setData({
        choosedColor: color
      })
      if(!this.data.choosedSize){
        this.setData({
          choosedStyle: '颜色:'+color+'，未选择尺码',
          isChooseStyle: true
        })
      } else {
        const style = "尺码:" + this.data.choosedSize + "，颜色:"+ color
        this.setData({
          choosedStyle: style,
          isChooseStyle: true
        })
      }
    }

  }
})
