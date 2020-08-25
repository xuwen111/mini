// pages/category/category.js
import { getCategory, getsubCategory } from '../../network/category'
Page({
  data: {
    topPosition: 0,
    categories: [],
    categoryData: [],
    subCategories: [],
    currentIndex: 0
  },
  //----------------------------------------------- 事件监听 -------------------------------------------------
  scrollPosition: function(e){
    // console.log(e);
  },
  handleClickItem(e){
    const index = e.detail.index
    this.setData({
      currentIndex: index
    })
    this._getsubCategory(index)
    // console.log(this.data.subCategories);
    
  },

  //----------------------------------------------- 数据请求 -------------------------------------------------
  _getCategory(){
    getCategory().then(res => {
      const categories = res.data.data.category.list
      // console.log(categories)
      //遍历categories,给每一个item定义一个subCategories属性
      const categoryData = {}
      for(let i=0; i<categories.length; i++){
        categoryData[i] = {
          subCategories: {}
        }
      }
      this.setData({
        categories: categories,
        categoryData: categoryData
      })
      //获取默认的item数据(第一栏)
      this._getsubCategory(0)
    })
  },
  _getsubCategory(index){
    const maitkey = this.data.categories[index].maitKey
    // console.log(maitkey);
    getsubCategory(maitkey).then(res => {
      const categoryData = this.data.categoryData
      categoryData[index].subCategories = res.data.data.list
      const subCategories = res.data.data.list
      this.setData({
        categoryData: categoryData,
        subCategories: subCategories
      })
    })
  },


  //---------------------------------------------- 生命周期函数 ------------------------------------------------
  onLoad: function (options) {
    //1.获取分类边栏数据
    this._getCategory()
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

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