// pages/confirmation/confirmation.js
Page({
  data: {
    statusBarHeight: 44
  },

  onLoad: function () {
    const systemInfo = wx.getWindowInfo();
    const statusBarHeight = systemInfo.statusBarHeight || 44;

    this.setData({
      statusBarHeight: statusBarHeight
    });
  },

  goToHome: function () {
    wx.reLaunch({
      url: '/pages/cart/cart'
    });
  }
});
