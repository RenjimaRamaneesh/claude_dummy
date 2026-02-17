// pages/home/home.js
Page({
  data: {
    statusBarHeight: 44,
    scrollHeight: 0,
    currentBanner: 0,
    activeTab: 'all',
    vegOnly: false,

    banners: [
      {
        id: 1,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Kitchen Combo',
        subtitle: 'Any 2 meals for just AED 50 \u2022 Save up to AED 20'
      },
      {
        id: 2,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Kitchen Combo',
        subtitle: 'Any 2 meals for just AED 50 \u2022 Save up to AED 20'
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
        subtitle: 'Any 2 meals for just AED 50 \u2022 Save up to AED 20'
      },
      {
        id: 5,
        image: '/images/banner-placeholder.png',
        discountNum: '20',
        title: 'Healthy Kitchen Combo',
        subtitle: 'Any 2 meals for just AED 50 \u2022 Save up to AED 20'
      }
    ],

    filterTabs: [
      { label: 'All', value: 'all' },
      { label: 'Break Fast', value: 'breakfast' },
      { label: 'Lunch', value: 'lunch' },
      { label: 'Dinner', value: 'dinner' }
    ],

    healthySavings: [
      {
        id: 1,
        name: 'Chicken Keema Rice',
        restaurant: 'FitFuel Kitchen',
        calories: '280',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false
      },
      {
        id: 2,
        name: 'Lentil Veg Soup',
        restaurant: 'Clean Eats Dubai',
        calories: '250',
        image: '/images/food-placeholder.png',
        dietType: 'veg',
        liked: false
      },
      {
        id: 3,
        name: 'Spicy Shrimp Salad',
        restaurant: 'Green Bowl Co.',
        calories: '512',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false
      },
      {
        id: 4,
        name: 'Lemon Fish Rice',
        restaurant: 'Alsafadi',
        calories: '320',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false
      },
      {
        id: 5,
        name: 'Chickpea',
        restaurant: 'Nayab Haandi',
        calories: '220',
        image: '/images/food-placeholder.png',
        dietType: 'veg',
        liked: false
      },
      {
        id: 6,
        name: 'Keto Crunch Wrap',
        restaurant: 'Green Bowl Co.',
        calories: '420',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false
      },
      {
        id: 7,
        name: 'Grilled Chicken Salad',
        restaurant: 'FitFuel Kitchen',
        calories: '535',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false
      },
      {
        id: 8,
        name: 'Tofu Burger',
        restaurant: 'Clean Eats Dubai',
        calories: '460',
        image: '/images/food-placeholder.png',
        dietType: 'egg',
        liked: false
      }
    ],

    proteinPicks: [
      {
        id: 101,
        name: 'Tofu Power Bowl',
        restaurant: 'Allo Beirut',
        calories: '240',
        image: '/images/food-placeholder.png',
        dietType: 'egg',
        liked: false
      },
      {
        id: 102,
        name: 'Grilled Fish',
        restaurant: 'Nayab Haandi',
        calories: '286',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false
      },
      {
        id: 103,
        name: 'Chicken Kebab',
        restaurant: 'Alsafadi',
        calories: '322',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false
      },
      {
        id: 104,
        name: 'Egg White Meal',
        restaurant: 'Urban Protein',
        calories: '296',
        image: '/images/food-placeholder.png',
        dietType: 'egg',
        liked: false
      },
      {
        id: 105,
        name: 'Paneer Butter Masala',
        restaurant: 'FitFuel Kitchen',
        calories: '350',
        image: '/images/food-placeholder.png',
        dietType: 'veg',
        liked: false
      },
      {
        id: 106,
        name: 'Lemon Rice Meal',
        restaurant: 'Lean Eats',
        calories: '370',
        image: '/images/food-placeholder.png',
        dietType: 'veg',
        liked: false
      },
      {
        id: 107,
        name: 'Lemon Fish Curry',
        restaurant: 'Green Bowl Co.',
        calories: '320',
        image: '/images/food-placeholder.png',
        dietType: 'veg',
        liked: false
      },
      {
        id: 108,
        name: 'Soya Chunk Curry',
        restaurant: 'Clean Cravings',
        calories: '290',
        image: '/images/food-placeholder.png',
        dietType: 'veg',
        liked: false
      }
    ],

    lightEasy: [
      {
        id: 201,
        name: 'Veg Clear Soup',
        restaurant: 'Allo Beirut',
        calories: '280',
        price: '18',
        image: '/images/food-placeholder.png',
        dietType: 'veg',
        liked: false,
        tags: ['Low Oil', 'Gut Friendly', 'No Cream', 'Light Dinner']
      },
      {
        id: 202,
        name: 'Veg Clear Soup',
        restaurant: 'Allo Beirut',
        calories: '280',
        price: '18',
        image: '/images/food-placeholder.png',
        dietType: 'nonveg',
        liked: false,
        tags: ['Low Oil', 'High Protein', 'No Cream', 'Light Dinner']
      }
    ]
  },

  onLoad: function () {
    var systemInfo = wx.getWindowInfo();
    var statusBarHeight = systemInfo.statusBarHeight || 44;
    var screenHeight = systemInfo.windowHeight;
    // Header + search + some padding
    var topAreaHeight = statusBarHeight + 60 + 80 + 20;
    var bottomNavHeight = 100;
    var scrollHeight = screenHeight - topAreaHeight;

    this.setData({
      statusBarHeight: statusBarHeight,
      scrollHeight: scrollHeight
    });
  },

  // Banner
  onBannerChange: function (e) {
    this.setData({ currentBanner: e.detail.current });
  },

  // Content Scroll
  onContentScroll: function () {
    // Can be used for sticky filter bar behavior
  },

  // Filter Tabs
  onTabChange: function (e) {
    var value = e.currentTarget.dataset.value;
    this.setData({ activeTab: value });
  },

  onFilterTap: function () {
    wx.showToast({ title: 'Filter', icon: 'none' });
  },

  // Veg Toggle
  toggleVeg: function () {
    this.setData({ vegOnly: !this.data.vegOnly });
  },

  // Search
  onSearchTap: function () {
    wx.navigateTo({ url: '/pages/search/search' });
  },

  // Header Actions
  onFavoriteTap: function () {
    wx.navigateTo({ url: '/pages/favorites/favorites' });
  },

  onNotificationTap: function () {
    wx.navigateTo({ url: '/pages/notifications/notifications' });
  },

  // Meal Actions
  onMealTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/meal-detail/meal-detail?id=' + id });
  },

  onHeartTap: function (e) {
    var id = e.currentTarget.dataset.id;
    // Toggle liked state across all meal arrays
    var lists = ['healthySavings', 'proteinPicks', 'lightEasy'];
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
    var id = e.currentTarget.dataset.id;
    wx.showToast({ title: 'Added to cart', icon: 'success' });
  },

  // Plan My Meal
  onPlanMealTap: function () {
    wx.navigateTo({ url: '/pages/multicart/multicart' });
  },

  // Bottom Navigation
  onNavTap: function (e) {
    var tab = e.currentTarget.dataset.tab;
    if (tab === 'home') {
      return;
    }
    if (tab === 'plan') {
      wx.navigateTo({ url: '/pages/multicart/multicart' });
    } else if (tab === 'activity') {
      wx.navigateTo({ url: '/pages/activity/activity' });
    }
  }
});
