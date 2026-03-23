// pages/index/index.js
Page({
  data: {
    statusBarHeight: 44,
    scrollTop: 0,
    lastScrollTop: 0,
    bannerCollapsed: false,
    activeTab: 'home',
    activeFilter: 'all',

    filters: [
      { id: 'all', label: 'All' },
      { id: 'breakfast', label: 'Break Fast' },
      { id: 'lunch', label: 'Lunch' },
      { id: 'dinner', label: 'Dinner' }
    ],

    promoBanners: [
      {
        id: 1,
        discount: '20',
        title: 'Healthy Kitchen Combo',
        description: 'Any 2 meals for just AED 50 • Save up to AED 20'
      }
    ],

    healthySavings: [
      {
        id: 1,
        name: 'TestImage',
        vendor: 'Pizzalicious',
        calories: '0+',
        image: '',
        isFavorite: false
      },
      {
        id: 2,
        name: 'qq',
        vendor: 'Pizzalicious',
        calories: '0+',
        image: '',
        isFavorite: false
      },
      {
        id: 3,
        name: 'Grilled Chicken',
        vendor: 'FitFuel Kitchen',
        calories: '280',
        image: '',
        isFavorite: false
      },
      {
        id: 4,
        name: 'Protein Bowl',
        vendor: 'NutriBox',
        calories: '350',
        image: '',
        isFavorite: false
      }
    ],

    proteinPicks: [
      {
        id: 1,
        name: 'Chicken Breast',
        vendor: 'FitFuel Kitchen',
        calories: '220',
        image: '',
        isFavorite: false
      },
      {
        id: 2,
        name: 'Egg White Omelette',
        vendor: 'NutriBox',
        calories: '180',
        image: '',
        isFavorite: false
      }
    ]
  },

  onLoad: function () {
    var systemInfo = wx.getWindowInfo();
    var statusBarHeight = systemInfo.statusBarHeight || 44;
    this.setData({
      statusBarHeight: statusBarHeight
    });
  },

  onScroll: function (e) {
    var scrollTop = e.detail.scrollTop;
    var lastScrollTop = this.data.lastScrollTop;
    var bannerCollapsed = this.data.bannerCollapsed;

    // Scrolling down => collapse, scrolling up => expand
    if (scrollTop > lastScrollTop && scrollTop > 50 && !bannerCollapsed) {
      this.setData({ bannerCollapsed: true, lastScrollTop: scrollTop });
    } else if (scrollTop < lastScrollTop && bannerCollapsed) {
      this.setData({ bannerCollapsed: false, lastScrollTop: scrollTop });
    } else {
      this.setData({ lastScrollTop: scrollTop });
    }
  },

  selectFilter: function (e) {
    var filter = e.currentTarget.dataset.filter;
    this.setData({ activeFilter: filter });
  },

  toggleFavorite: function (e) {
    var id = e.currentTarget.dataset.id;
    var section = e.currentTarget.dataset.section;
    var items = this.data[section].map(function (item) {
      if (item.id === id) {
        item.isFavorite = !item.isFavorite;
      }
      return item;
    });
    var data = {};
    data[section] = items;
    this.setData(data);
  },

  addItem: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.showToast({
      title: 'Added to cart',
      icon: 'success'
    });
  },

  switchTab: function (e) {
    var tab = e.currentTarget.dataset.tab;
    if (tab === this.data.activeTab) return;
    if (tab === 'home') {
      this.setData({ activeTab: 'home' });
    } else if (tab === 'myplan') {
      wx.navigateTo({ url: '/pages/myplan/myplan' });
    } else if (tab === 'myactivity') {
      wx.navigateTo({ url: '/pages/myactivity/myactivity' });
    }
  },

  goToSearch: function () {
    wx.showToast({ title: 'Search', icon: 'none' });
  },

  goToPlanMeal: function () {
    wx.navigateTo({ url: '/pages/myplan/myplan' });
  },

  openFilterMenu: function () {
    wx.showToast({ title: 'Filter Menu', icon: 'none' });
  },

  openCamera: function () {
    wx.showToast({ title: 'Camera', icon: 'none' });
  }
});
