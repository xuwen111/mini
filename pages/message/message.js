// pages/message/message.js
const app = getApp()

Page({

  data: {

  },
  onLoad: function (options) {

  },
  getUserInfo: function(e) {
    if (e.detail.userInfo){
      console.log('授权通过')
      app.globalData.userInfo = e.detail.userInfo;
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }else{
      console.log('拒绝授权')
      wx.reLaunch({
        url: '/pages/checkAgain/checkAgain',
      })
    }
  },
  onReady: function () {

  },
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
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