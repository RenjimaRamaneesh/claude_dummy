// pages/myactivity/myactivity.js
Page({
  data: {
    statusBarHeight: 44,
    activeTab: 'myactivity'
  },

  onLoad: function () {
    var systemInfo = wx.getWindowInfo();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight || 44
    });
  },

  switchTab: function (e) {
    var tab = e.currentTarget.dataset.tab;
    if (tab === this.data.activeTab) return;
    if (tab === 'home') {
      wx.navigateBack({ delta: 10, fail: function () { wx.reLaunch({ url: '/pages/index/index' }); } });
    } else if (tab === 'myplan') {
      wx.redirectTo({ url: '/pages/myplan/myplan' });
    }
  },

  goBack: function () {
    wx.navigateBack({
      delta: 1,
      fail: function () {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  }
});
