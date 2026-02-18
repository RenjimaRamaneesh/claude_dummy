// pages/welcome/welcome.js
Page({
  data: {
    statusBarHeight: 44,
    currentDot: 0,
    cards: [
      {
        type: 'how-it-works',
        icon: 'target',
        title: 'How It Works',
        items: [
          'Tailored Meal Plan based on your goal and BMI',
          'Zero commitments - order for one day at a time',
          'Fresh meals cooked 60 min prior to delivery',
          'Delivery across UAE with different locations',
          'Easy, hassle-free cancellation & replacements'
        ]
      },
      {
        type: 'varieties',
        icon: 'food',
        title: 'Varieties We Provide',
        items: [
          'Choose from 5000+ brands offering healthy meal choices',
          'Options: Vegan, Keto, High Protein, and more',
          'We have cheat days covered too!',
          'Variety so good, taste buds will never get bored',
          'Easy, hassle-free cancellation & replacements'
        ]
      },
      {
        type: 'varieties-alt',
        icon: 'food',
        title: 'Varieties We Provide',
        items: [
          'Choose from 5000+ brands offering healthy meal choices',
          'Options: Vegan, Keto, High Protein, and more',
          'We have cheat days covered too!',
          'Variety so good, taste buds will never get bored',
          'Easy, hassle-free cancellation & replacements'
        ]
      }
    ]
  },

  onLoad: function () {
    const systemInfo = wx.getWindowInfo();
    const statusBarHeight = systemInfo.statusBarHeight || 44;

    this.setData({
      statusBarHeight: statusBarHeight
    });
  },

  handleGetStarted: function () {
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  },

  onCardScroll: function (e) {
    const scrollLeft = e.detail.scrollLeft;
    const cardWidth = 340;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    const clamped = Math.min(Math.max(currentIndex, 0), this.data.cards.length - 1);

    if (clamped !== this.data.currentDot) {
      this.setData({
        currentDot: clamped
      });
    }
  }
});
