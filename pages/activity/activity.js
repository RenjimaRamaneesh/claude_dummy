Page({
  data: {
    statusBarHeight: 44
  },

  onLoad: function () {
    var systemInfo = wx.getWindowInfo();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight || 44
    });
  },

  onNavTap: function (e) {
    var tab = e.currentTarget.dataset.tab;
    if (tab === 'activity') {
      return;
    }
    if (tab === 'home') {
      wx.redirectTo({ url: '/pages/home/home' });
    } else if (tab === 'plan') {
      wx.redirectTo({ url: '/pages/plan/plan' });
    }
  }
});
