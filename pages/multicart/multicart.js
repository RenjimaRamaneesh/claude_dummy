// pages/multicart/multicart.js
Page({
  data: {
    statusBarHeight: 44,
    scrollHeight: 0,
    activeView: 'day',
    activeCardIndex: 0,
    scheduleEnabled: true,
    dateRangeLabel: 'Mon,13 Jan - Fri,17 Jan',

    weekDays: [
      { id: 1, day: 'MON', date: '13', active: true },
      { id: 2, day: 'TUE', date: '14', active: false },
      { id: 3, day: 'WED', date: '15', active: false },
      { id: 4, day: 'THU', date: '16', active: false },
      { id: 5, day: 'FRI', date: '17', active: false }
    ],

    mealItems: [
      {
        id: 1,
        date: 'Mon 13',
        mealType: 'Lunch',
        showTimeTag: true,
        timeSlot: '1:00 to 2:00 PM',
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
      },
      {
        id: 2,
        date: 'Mon 13',
        mealType: 'Lunch',
        showTimeTag: false,
        timeSlot: '1:00 to 2:00 PM',
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
      },
      {
        id: 3,
        date: 'Mon 13',
        mealType: 'Lunch',
        showTimeTag: false,
        timeSlot: '1:00 to 2:00 PM',
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
    ]
  },

  onLoad: function () {
    var systemInfo = wx.getWindowInfo();
    var statusBarHeight = systemInfo.statusBarHeight || 44;
    var screenHeight = systemInfo.windowHeight;
    // Estimate header area height: status bar + header + toggle + info banner
    var headerAreaHeight = statusBarHeight + 64 + 72 + 56;
    var scrollHeight = screenHeight - headerAreaHeight;

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
    var view = e.currentTarget.dataset.view;
    this.setData({ activeView: view });
  },

  // Meal Card Carousel Scroll
  onMealCardScroll: function (e) {
    var scrollLeft = e.detail.scrollLeft;
    // Each card is approximately 670rpx + 20rpx gap = 690rpx
    // Convert rpx to px: 690rpx * (screenWidth / 750)
    var systemInfo = wx.getWindowInfo();
    var cardWidthPx = 690 * (systemInfo.windowWidth / 750);
    var index = Math.round(scrollLeft / cardWidthPx);
    if (index !== this.data.activeCardIndex && index >= 0 && index < this.data.mealItems.length) {
      this.setData({ activeCardIndex: index });
    }
  },

  // Day Selection
  selectDay: function (e) {
    var id = e.currentTarget.dataset.id;
    var weekDays = this.data.weekDays.map(function (day) {
      return {
        id: day.id,
        day: day.day,
        date: day.date,
        active: day.id === id
      };
    });
    this.setData({ weekDays: weekDays });
  },

  editDays: function () {
    wx.showToast({
      title: 'Edit Days',
      icon: 'none'
    });
  },

  // Delivery
  editDelivery: function () {
    wx.navigateTo({ url: '/pages/delivery/delivery' });
  },

  // Meal Item Actions
  editMeal: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/meal/meal?id=' + id + '&mode=edit' });
  },

  deleteMeal: function (e) {
    var id = e.currentTarget.dataset.id;
    var self = this;
    wx.showModal({
      title: 'Remove Item',
      content: 'Are you sure you want to remove this item from your cart?',
      confirmColor: '#456401',
      success: function (res) {
        if (res.confirm) {
          var mealItems = self.data.mealItems.filter(function (item) {
            return item.id !== id;
          });
          self.setData({ mealItems: mealItems });
        }
      }
    });
  },

  // Quantity
  increaseQty: function (e) {
    var id = e.currentTarget.dataset.id;
    var mealItems = this.data.mealItems.map(function (item) {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    this.setData({ mealItems: mealItems });
  },

  decreaseQty: function (e) {
    var id = e.currentTarget.dataset.id;
    var mealItems = this.data.mealItems.map(function (item) {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    this.setData({ mealItems: mealItems });
  },

  // Meal Coverage
  addMealType: function (e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({ url: '/pages/meals/meals?type=' + type });
  },

  // Schedule
  toggleSchedule: function (e) {
    this.setData({ scheduleEnabled: e.detail.value });
  },

  planSchedule: function () {
    wx.navigateTo({ url: '/pages/confirmation/confirmation' });
  },

  // Add-ons
  addAddon: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.showToast({
      title: 'Add-on Added',
      icon: 'success'
    });
  },

  // Payment
  goToPayment: function () {
    wx.navigateTo({ url: '/pages/payment/payment' });
  }
});
