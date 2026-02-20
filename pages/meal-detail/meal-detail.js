// pages/meal-detail/meal-detail.js
Page({
  data: {
    // Meal Data
    mealData: {
      name: 'Chicken Keema Rice..',
      description: 'Fragrant basmati rice cooked with spiced minced chicken, onions, and aromatic Indian spices.',
      image: '/images/food-placeholder.png',
      restaurant: 'FitFuel Kitchen',
      rating: 4.6,
      calories: 280,
      protein: 22,
      carbs: 14,
      fat: 14,
      price: '32.00',
      isVeg: false,
      allergens: ['Soy', 'Gluten', 'Egg', 'Diary']
    },

    // Restaurant Data
    restaurantData: {
      name: 'FitFuel Kitchen',
      category: 'Healthy Indian Meals',
      rating: 4.6,
      reviewCount: '1.2k',
      location: 'Al Furjan, Dubai',
      distance: '3.2km',
      image: '/images/food-placeholder.png',
      description: 'FitFuel Kitchen offers healthy, gym-friendly meals focused on clean eating and fitness nutrition. Specializes in high-protein options like grilled chicken, fresh salads, and balanced bowls for active lifestyles.',
      standards: [
        { text: 'Freshly Prepared Daily' },
        { text: 'Sealed Packaging' },
        { text: 'Hot Meals, Delivered Fresh' },
        { text: 'FSSAI Certified Kitchen.' }
      ],
      specials: [
        {
          image: '/images/food-placeholder.png',
          category: 'Break Fast',
          price: '12',
          name: 'Veg Wraps',
          description: 'low carb, high fiber'
        },
        {
          image: '/images/food-placeholder.png',
          category: 'Starter, Lunch',
          price: '18',
          name: 'Grilled Chicken',
          description: 'Herb chicken, quinoa'
        },
        {
          image: '/images/food-placeholder.png',
          category: 'Lunch, Dinner',
          price: '16',
          name: 'Chicken Fry',
          description: 'Chicken breast, veggies'
        }
      ]
    },

    // Nutrition Target
    nutritionTarget: {
      protein: 20,
      carbs: 11,
      fat: 12
    },

    // Customization Options
    baseOptions: [
      {
        id: 'basmati',
        name: 'Basmati Rice (Default)',
        description: 'Light, aromatic & balanced',
        isDefault: true
      },
      {
        id: 'brown',
        name: 'Brown Rice',
        description: 'High fiber \u00b7 Keeps you full longer'
      },
      {
        id: 'cauliflower',
        name: 'Cauliflower Rice (Low-carb)',
        description: 'High fiber \u00b7 Keeps you full longer'
      }
    ],
    sidesOptions: [
      {
        id: 'extra-chicken',
        name: 'Extra chicken keema',
        description: 'Adds more protein & satiety',
        selected: true,
        recommended: false
      },
      {
        id: 'vegetables',
        name: 'Saut\u00e9ed Vegetables',
        description: 'Seasonal veggies \u00b7 Lightly cooked',
        selected: false,
        recommended: false
      },
      {
        id: 'raita',
        name: 'Raita',
        description: 'Cooling yogurt side \u00b7 Aids digestion',
        selected: true,
        recommended: true
      }
    ],
    drinksOptions: [
      {
        id: 'lemon',
        name: 'Fresh Lemon Juice',
        description: 'Helps digestion \u00b7 Balances spices',
        selected: true
      },
      {
        id: 'buttermilk',
        name: 'Buttermilk',
        description: 'Cooling \u00b7 Gut-friendly',
        selected: false
      }
    ],

    // UI State
    showNutritionTable: false,
    showRestaurant: false,
    showCustomize: false,
    itemAdded: false,
    hasNotification: true,
    selectedBase: 'basmati',
    quantity: 1
  },

  onLoad: function (options) {
    setTimeout(function () {
      this.drawNutritionChart();
    }.bind(this), 300);
  },

  drawNutritionChart: function () {
    var systemInfo = wx.getSystemInfoSync();
    var canvasRpx = 280;
    var canvasPx = (canvasRpx / 750) * systemInfo.windowWidth;
    var ctx = wx.createCanvasContext('nutritionChart', this);

    var centerX = canvasPx / 2;
    var centerY = canvasPx / 2;

    var protein = this.data.mealData.protein;
    var carbs = this.data.mealData.carbs;
    var fat = this.data.mealData.fat;
    var total = protein + carbs + fat;

    var proteinPercent = protein / total;
    var carbsPercent = carbs / total;
    var fatPercent = fat / total;

    var proteinAngle = proteinPercent * 2 * Math.PI;
    var carbsAngle = carbsPercent * 2 * Math.PI;
    var fatAngle = fatPercent * 2 * Math.PI;

    var scale = canvasPx / 280;

    var rings = [
      { radius: 120 * scale, color: '#54EAE7', bgShadow: 'rgba(84, 234, 231, 0.2)' },
      { radius: 95 * scale, color: '#FAC58B', bgShadow: 'rgba(250, 197, 139, 0.2)' },
      { radius: 70 * scale, color: '#F28893', bgShadow: 'rgba(242, 136, 147, 0.2)' }
    ];

    var lineWidth = 22 * scale;
    var startAngle = -Math.PI / 2;

    ctx.setLineCap('round');

    // Draw background circles
    rings.forEach(function (ring) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, ring.radius, 0, 2 * Math.PI);
      ctx.setStrokeStyle('#EEEEEE');
      ctx.setLineWidth(lineWidth);
      ctx.stroke();
    });

    // Protein segment (outer)
    if (proteinPercent > 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[0].radius, startAngle, startAngle + proteinAngle);
      ctx.setStrokeStyle(rings[0].color);
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    // Carbs segment (middle)
    if (carbsPercent > 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[1].radius, startAngle, startAngle + carbsAngle);
      ctx.setStrokeStyle(rings[1].color);
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    // Fat segment (inner)
    if (fatPercent > 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[2].radius, startAngle, startAngle + fatAngle);
      ctx.setStrokeStyle(rings[2].color);
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    ctx.draw();
  },

  toggleHealthCard: function () {
    this.setData({
      showNutritionTable: !this.data.showNutritionTable
    });
  },

  showRestaurantSheet: function () {
    this.setData({
      showRestaurant: true
    });
  },

  hideRestaurantSheet: function () {
    this.setData({
      showRestaurant: false
    });
  },

  showCustomizeSheet: function () {
    this.setData({
      showCustomize: true,
      itemAdded: false
    });
  },

  hideCustomizeSheet: function () {
    this.setData({
      showCustomize: false
    });
  },

  stopPropagation: function () {
    // Prevents closing when tapping inside the sheet
  },

  selectBase: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      selectedBase: id
    });
  },

  toggleSide: function (e) {
    var id = e.currentTarget.dataset.id;
    var sides = this.data.sidesOptions.map(function (side) {
      if (side.id === id) {
        return Object.assign({}, side, { selected: !side.selected });
      }
      return side;
    });
    this.setData({
      sidesOptions: sides
    });
  },

  toggleDrink: function (e) {
    var id = e.currentTarget.dataset.id;
    var drinks = this.data.drinksOptions.map(function (drink) {
      if (drink.id === id) {
        return Object.assign({}, drink, { selected: !drink.selected });
      }
      return drink;
    });
    this.setData({
      drinksOptions: drinks
    });
  },

  decreaseQuantity: function () {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  increaseQuantity: function () {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  confirmCustomization: function () {
    this.setData({
      showCustomize: false
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        itemAdded: true
      });
    }, 300);
  },

  proceedToCart: function () {
    if (!this.data.itemAdded) {
      this.showCustomizeSheet();
      return;
    }
    wx.showToast({
      title: 'Going to cart!',
      icon: 'success',
      duration: 1500
    });
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/cart/cart'
      });
    }, 1500);
  },

  onBack: function () {
    wx.navigateBack();
  }
});
