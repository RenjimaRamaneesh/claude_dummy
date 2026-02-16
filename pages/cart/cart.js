// pages/cart/cart.js
Page({
  data: {
    statusBarHeight: 44,
    scrollHeight: 0,
    activeView: 'day',
    selectedDate: 'today',
    scheduleEnabled: false,

    mealItems: [
      {
        id: 1,
        date: 'Mon 13',
        mealType: 'Lunch',
        showTimeTag: true,
        timeSlot: '12:00 to 1:00 PM',
        name: 'Chicken Keema Rice',
        vendor: 'FitFuel Kitchen',
        rating: 4.6,
        quantity: 1,
        price: '30',
        base: 'Basmati Rice',
        sides: 'Extra keema, Raita',
        drink: 'Lemo',
        calories: '280',
        protein: '22g',
        carbs: '14g',
        fat: '14g'
      }
    ],

    addOnItems: [
      {
        id: 1,
        name: 'Extra Chicken Keema',
        benefit: '+10g protein',
        image: '/images/addon-placeholder.png'
      },
      {
        id: 2,
        name: 'Grilled Chicken Tikka',
        benefit: 'Lean protein',
        image: '/images/addon-placeholder.png'
      },
      {
        id: 3,
        name: 'Egg Omelette (Plain)',
        benefit: 'Quick protein',
        image: '/images/addon-placeholder.png'
      },
      {
        id: 4,
        name: 'Boiled Egg (Protein)',
        benefit: 'Adds protein',
        image: '/images/addon-placeholder.png'
      },
      {
        id: 5,
        name: 'Extra Chicken Keema',
        benefit: '+10g protein',
        image: '/images/addon-placeholder.png'
      }
    ],

    otherMealBanners: [
      {
        id: 1,
        mealLabel: 'Calorie Smart',
        brandName: 'CalorieFit',
        backgroundImage: '/images/banner-placeholder.png',
        foodImage: '/images/food-placeholder.png'
      },
      {
        id: 2,
        mealLabel: 'Calorie Smart',
        brandName: 'CalorieFit',
        backgroundImage: '/images/banner-placeholder.png',
        foodImage: '/images/food-placeholder.png'
      }
    ]
  },

  onLoad: function () {
    const systemInfo = wx.getWindowInfo();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const statusBarHeight = systemInfo.statusBarHeight || 44;
    const navBarHeight = menuButtonInfo.bottom + menuButtonInfo.top - statusBarHeight * 2 + 8;
    const screenHeight = systemInfo.windowHeight;
    const bottomNavHeight = 92 + (systemInfo.safeArea ? (screenHeight - systemInfo.safeArea.bottom) : 0);
    // Estimate header area height: status bar + header + toggle + info banner
    const headerAreaHeight = statusBarHeight + 64 + 72 + 56;
    const scrollHeight = screenHeight - headerAreaHeight;

    this.setData({
      statusBarHeight: statusBarHeight,
      scrollHeight: scrollHeight
    });
  },

  // Navigation
  goBack: function () {
    wx.navigateBack({
      delta: 1,
      fail: function () {
        wx.switchTab({ url: '/pages/index/index' });
      }
    });
  },

  // View Toggle
  switchView: function (e) {
    const view = e.currentTarget.dataset.view;
    this.setData({ activeView: view });
  },

  // Date Selection
  selectDate: function (e) {
    const date = e.currentTarget.dataset.date;
    if (date === 'pick') {
      this.pickCustomDate();
      return;
    }
    this.setData({ selectedDate: date });
  },

  pickCustomDate: function () {
    this.setData({ selectedDate: 'pick' });
    // In a real app, open a date picker here
  },

  // Delivery
  editDelivery: function () {
    wx.navigateTo({ url: '/pages/delivery/delivery' });
  },

  // Meal Item Actions
  editMeal: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/meal/meal?id=' + id + '&mode=edit' });
  },

  deleteMeal: function (e) {
    const id = e.currentTarget.dataset.id;
    const self = this;
    wx.showModal({
      title: 'Remove Item',
      content: 'Are you sure you want to remove this item from your cart?',
      confirmColor: '#456401',
      success: function (res) {
        if (res.confirm) {
          const mealItems = self.data.mealItems.filter(function (item) {
            return item.id !== id;
          });
          self.setData({ mealItems: mealItems });
        }
      }
    });
  },

  // Quantity
  increaseQty: function (e) {
    const id = e.currentTarget.dataset.id;
    const mealItems = this.data.mealItems.map(function (item) {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    this.setData({ mealItems: mealItems });
  },

  decreaseQty: function (e) {
    const id = e.currentTarget.dataset.id;
    const mealItems = this.data.mealItems.map(function (item) {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    this.setData({ mealItems: mealItems });
  },

  // Meal Coverage
  addMealType: function (e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({ url: '/pages/meals/meals?type=' + type });
  },

  // Schedule
  toggleSchedule: function (e) {
    this.setData({ scheduleEnabled: e.detail.value });
  },

  scheduleOrder: function () {
    wx.showToast({
      title: 'Order Scheduled',
      icon: 'success'
    });
  },

  // Add-ons
  addAddon: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: 'Add-on Added',
      icon: 'success'
    });
  },

  // Other Meals
  viewOffers: function () {
    wx.navigateTo({ url: '/pages/offers/offers' });
  },

  selectOtherMeal: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/meal-detail/meal-detail?id=' + id });
  },

  // Payment
  goToPayment: function () {
    wx.navigateTo({ url: '/pages/payment/payment' });
  }
});
