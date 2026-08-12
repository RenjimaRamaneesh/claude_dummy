var app = getApp();

Page({
  data: {
    statusBarHeight: 44,
    scrollHeight: 0,
    currentBanner: 0,
    activeTab: 'all',
    vegOnly: false,
    carouselCollapsed: false,
    carouselHeight: 190,
    banners: [
      {
        id: 1,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Kitchen Combo',
        subtitle: 'Any 2 meals for just AED 50 • Save up to AED 20'
      },
      {
        id: 2,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Kitchen Combo',
        subtitle: 'Any 2 meals for just AED 50 • Save up to AED 20'
      },
      {
        id: 3,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Combo',
        subtitle: 'Any 2 meals for just AED 50'
      },
      {
        id: 4,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Kitchen Combo',
        subtitle: 'Any 2 meals for just AED 50 • Save up to AED 20'
      },
      {
        id: 5,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Kitchen Combo',
        subtitle: 'Any 2 meals for just AED 50 • Save up to AED 20'
      }
    ],
    filterTabs: [
      { label: 'All', value: 'all' },
      { label: 'Break Fast', value: 'breakfast' },
      { label: 'Lunch', value: 'lunch' },
      { label: 'Dinner', value: 'dinner' }
    ],
    healthySavings: [],
    proteinPicks: [],
    allMenuItems: [],
    loadingPopular: true,
    loadingProtein: true,
    loadingAll: true
  },

  onLoad: function () {
    var systemInfo = wx.getWindowInfo();
    var statusBarHeight = systemInfo.statusBarHeight || 44;
    var screenHeight = systemInfo.windowHeight;
    var carouselHeight = 190;

    /* Fixed elements: status bar + header(~50) + search(~45) + filter tabs(~50) + bottom nav(~55) */
    var fixedHeight = statusBarHeight + 50 + 45 + 50 + 55;
    var baseScrollHeight = screenHeight - fixedHeight;

    this.setData({
      statusBarHeight: statusBarHeight,
      scrollHeight: baseScrollHeight - carouselHeight,
      carouselHeight: carouselHeight
    });

    this._screenHeight = screenHeight;
    this._statusBarHeight = statusBarHeight;
    this._baseScrollHeight = baseScrollHeight;
    this._carouselHeight = carouselHeight;
    this._lastScrollTop = 0;
    this._scrollTimer = null;

    this.fetchPopularMenu();
    this.fetchHighProteinMenu();
    this.fetchAllMenu();
  },

  onPullDownRefresh: function () {
    this.fetchPopularMenu();
    this.fetchHighProteinMenu();
    this.fetchAllMenu();
    wx.stopPullDownRefresh();
  },

  buildImageUrl: function (imagePath) {
    if (!imagePath) {
      return '/images/food-placeholder.png';
    }
    if (imagePath.indexOf('http') === 0) {
      return imagePath;
    }
    return 'https://mealplanneruat.eateasy.ae/' + imagePath;
  },

  formatMenuItem: function (item) {
    var self = this;
    var dietType = 'nonveg';
    if (item.is_veg) {
      dietType = 'veg';
    } else if (item.is_vegan) {
      dietType = 'veg';
    }
    return {
      id: parseInt(item.id),
      name: item.name || '',
      restaurant: item.restaurant_name || '',
      calories: item.kcal || '0',
      image: self.buildImageUrl(item.image),
      dietType: dietType,
      liked: false,
      price: item.price || '0',
      discountPerc: item.discount_perc || 0
    };
  },

  fetchPopularMenu: function () {
    var self = this;
    self.setData({ loadingPopular: true });

    wx.request({
      url: 'https://mealplanneruat.eateasy.ae/v1/menu/get-popular-menu',
      method: 'GET',
      header: {
        'api-id': '9dfcfe71e1dd2920e197c9880b203d12',
        'lang': 'en'
      },
      success: function (res) {
        if (res.data && res.data.results) {
          var items = res.data.results.map(function (item) {
            return self.formatMenuItem(item);
          });
          self.setData({ healthySavings: items, loadingPopular: false });
        } else {
          self.setData({ loadingPopular: false });
        }
      },
      fail: function (err) {
        console.error('[home] popular menu error:', err);
        self.setData({ loadingPopular: false });
        wx.showToast({ title: 'Failed to load popular menu', icon: 'none' });
      }
    });
  },

  fetchHighProteinMenu: function () {
    var self = this;
    self.setData({ loadingProtein: true });

    wx.request({
      url: 'https://mealplanneruat.eateasy.ae/v1/menu/get-high-protien-menu',
      method: 'GET',
      header: {
        'api-id': '9dfcfe71e1dd2920e197c9880b203d12',
        'lang': 'en'
      },
      success: function (res) {
        if (res.data && res.data.results) {
          var items = res.data.results.map(function (item) {
            var formatted = self.formatMenuItem(item);
            formatted.protein = (item.nutritional_info && item.nutritional_info.protein) || null;
            return formatted;
          });
          self.setData({ proteinPicks: items, loadingProtein: false });
        } else {
          self.setData({ loadingProtein: false });
        }
      },
      fail: function (err) {
        console.error('[home] protein menu error:', err);
        self.setData({ loadingProtein: false });
        wx.showToast({ title: 'Failed to load protein menu', icon: 'none' });
      }
    });
  },

  fetchAllMenu: function () {
    var self = this;
    self.setData({ loadingAll: true });

    wx.request({
      url: 'https://mealplanneruat.eateasy.ae/v1/menu/get-all-menu',
      method: 'GET',
      header: {
        'api-id': '9dfcfe71e1dd2920e197c9880b203d12',
        'lang': 'en'
      },
      success: function (res) {
        if (res.data && res.data.results) {
          var items = res.data.results.map(function (item) {
            var formatted = self.formatMenuItem(item);
            formatted.description = item.description || '';
            formatted.tags = item.tags || [];
            formatted.protein = (item.nutritional_info && item.nutritional_info.protein) || null;
            formatted.priceVat = item.price_vat || 0;
            formatted.finalPrice = item.final_price || 0;
            return formatted;
          });
          self.setData({ allMenuItems: items, loadingAll: false });
        } else {
          self.setData({ loadingAll: false });
        }
      },
      fail: function (err) {
        console.error('[home] all menu error:', err);
        self.setData({ loadingAll: false });
        wx.showToast({ title: 'Failed to load menu', icon: 'none' });
      }
    });
  },

  /* Banner */
  onBannerChange: function (e) {
    this.setData({ currentBanner: e.detail.current });
  },

  /* Content Scroll - collapse/expand carousel */
  onContentScroll: function (e) {
    var self = this;
    var scrollTop = e.detail.scrollTop;
    var lastScrollTop = this._lastScrollTop || 0;
    var diff = scrollTop - lastScrollTop;

    if (this._scrollTimer) {
      clearTimeout(this._scrollTimer);
    }

    this._scrollTimer = setTimeout(function () {
      if (diff > 5 && !self.data.carouselCollapsed && scrollTop > 20) {
        /* Scrolling down - collapse carousel, reclaim its space for scroll */
        self.setData({
          carouselCollapsed: true,
          scrollHeight: self._baseScrollHeight
        });
      } else if (diff < -5 && self.data.carouselCollapsed && scrollTop < 10) {
        /* Scrolling up near top - show carousel again, shrink scroll area */
        self.setData({
          carouselCollapsed: false,
          scrollHeight: self._baseScrollHeight - self._carouselHeight
        });
      }
      self._lastScrollTop = scrollTop;
    }, 50);
  },

  /* Filter Tabs */
  onTabChange: function (e) {
    var value = e.currentTarget.dataset.value;
    this.setData({ activeTab: value });
  },

  onFilterTap: function () {
    wx.showToast({ title: 'Filter', icon: 'none' });
  },

  /* Veg Toggle */
  toggleVeg: function () {
    this.setData({ vegOnly: !this.data.vegOnly });
  },

  /* Search */
  onSearchTap: function () {
    wx.navigateTo({ url: '/pages/search/search' });
  },

  /* Header Actions */
  onFavoriteTap: function () {
    wx.navigateTo({ url: '/pages/favorites/favorites' });
  },

  onNotificationTap: function () {
    wx.navigateTo({ url: '/pages/notifications/notifications' });
  },

  /* Meal Actions */
  onMealTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/meal-detail/meal-detail?id=' + id });
  },

  onHeartTap: function (e) {
    var id = e.currentTarget.dataset.id;
    var lists = ['healthySavings', 'proteinPicks', 'allMenuItems'];
    var self = this;

    lists.forEach(function (listName) {
      var list = self.data[listName];
      var updated = list.map(function (item) {
        if (item.id === id) {
          item.liked = !item.liked;
        }
        return item;
      });
      var data = {};
      data[listName] = updated;
      self.setData(data);
    });
  },

  onAddMeal: function (e) {
    wx.showToast({ title: 'Added to cart', icon: 'success' });
  },

  /* Plan My Meal */
  onPlanMealTap: function () {
    wx.redirectTo({ url: '/pages/multicart/multicart' });
  },

  /* Bottom Navigation */
  onNavTap: function (e) {
    var tab = e.currentTarget.dataset.tab;
    if (tab === 'home') {
      return;
    }
    if (tab === 'plan') {
      wx.redirectTo({ url: '/pages/multicart/multicart' });
    } else if (tab === 'activity') {
      wx.redirectTo({ url: '/pages/activity/activity' });
    }
  }
});
