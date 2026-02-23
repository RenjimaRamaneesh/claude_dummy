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
        { icon: '/images/sun.svg', text: 'Freshly Prepared Daily' },
        { icon: '/images/tick-circle.svg', text: 'Sealed Packaging' },
        { icon: '/images/fire.svg', text: 'Hot Meals, Delivered Fresh' },
        { icon: '/images/tick-circle.svg', text: 'FSSAI Certified Kitchen.' }
      ],
      specials: [
        {
          image: '/images/food-placeholder.png',
          category: 'Breakfast',
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
          category: 'Lunch, D',
          price: '15',
          name: 'Chicken Salad',
          description: 'Chicken breast, greens'
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
        name: 'Basmati Rice',
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
        name: 'Cauliflower Rice',
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
    quantity: 1,

    // Dynamic scroll heights (px)
    restScrollHeight: 400,
    custScrollHeight: 400
  },

  onLoad(options) {
    this.calculateScrollHeights();
    setTimeout(() => {
      this.drawNutritionChart();
    }, 300);
  },

  calculateScrollHeights() {
    var systemInfo = wx.getSystemInfoSync();
    var windowHeight = systemInfo.windowHeight;
    var rpxToPx = systemInfo.windowWidth / 750;

    var restSheetMax = windowHeight * 0.85;
    var restImgHeight = 475 * rpxToPx;
    var restScrollH = restSheetMax - restImgHeight;

    var custSheetMax = windowHeight * 0.85;
    var custHeaderHeight = 200 * rpxToPx;
    var custFooterHeight = 120 * rpxToPx;
    var custScrollH = custSheetMax - custHeaderHeight - custFooterHeight;

    this.setData({
      restScrollHeight: Math.floor(restScrollH),
      custScrollHeight: Math.floor(custScrollH)
    });
  },

  // Draw nutrition chart as concentric ring segments
  drawNutritionChart() {
    const systemInfo = wx.getSystemInfoSync();
    const canvasRpx = 350;
    const canvasPx = (canvasRpx / 750) * systemInfo.windowWidth;
    const ctx = wx.createCanvasContext('nutritionChart', this);

    const centerX = canvasPx / 2;
    const centerY = canvasPx / 2;

    const protein = this.data.mealData.protein;
    const carbs = this.data.mealData.carbs;
    const fat = this.data.mealData.fat;
    const total = protein + carbs + fat;

    const proteinPercent = protein / total;
    const carbsPercent = carbs / total;
    const fatPercent = fat / total;

    const proteinAngle = proteinPercent * 2 * Math.PI;
    const carbsAngle = carbsPercent * 2 * Math.PI;
    const fatAngle = fatPercent * 2 * Math.PI;

    const scale = canvasPx / 280;

    const rings = [
      { radius: 120 * scale, color: '#54EAE7' },  // Outer ring - Protein
      { radius: 95 * scale, color: '#FAC58B' },    // Middle ring - Carbs
      { radius: 70 * scale, color: '#F28893' }     // Inner ring - Fat
    ];

    const lineWidth = 22 * scale;
    const startAngle = -Math.PI / 2;

    ctx.setLineCap('round');

    // Draw background gray circles
    rings.forEach(ring => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, ring.radius, 0, 2 * Math.PI);
      ctx.setStrokeStyle('#e8e8e8');
      ctx.setLineWidth(lineWidth);
      ctx.stroke();
    });

    // Draw Protein segment (outer ring)
    if (proteinPercent > 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[0].radius, startAngle, startAngle + proteinAngle);
      ctx.setStrokeStyle(rings[0].color);
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    // Draw Carbs segment (middle ring)
    if (carbsPercent > 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[1].radius, startAngle, startAngle + carbsAngle);
      ctx.setStrokeStyle(rings[1].color);
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    // Draw Fat segment (inner ring)
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

  toggleHealthCard() {
    this.setData({
      showNutritionTable: !this.data.showNutritionTable
    });
  },

  showRestaurantSheet() {
    this.setData({
      showRestaurant: true
    });
  },

  hideRestaurantSheet() {
    this.setData({
      showRestaurant: false
    });
  },

  showCustomizeSheet() {
    this.setData({
      showCustomize: true,
      itemAdded: false
    });
  },

  hideCustomizeSheet() {
    this.setData({
      showCustomize: false
    });
  },

  stopPropagation() {
    // Prevents closing when tapping inside the sheet
  },

  selectBase(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      selectedBase: id
    });
  },

  toggleSide(e) {
    const id = e.currentTarget.dataset.id;
    const sides = this.data.sidesOptions.map(side => {
      if (side.id === id) {
        return { ...side, selected: !side.selected };
      }
      return side;
    });
    this.setData({
      sidesOptions: sides
    });
  },

  toggleDrink(e) {
    const id = e.currentTarget.dataset.id;
    const drinks = this.data.drinksOptions.map(drink => {
      if (drink.id === id) {
        return { ...drink, selected: !drink.selected };
      }
      return drink;
    });
    this.setData({
      drinksOptions: drinks
    });
  },

  decreaseQuantity() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  increaseQuantity() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  confirmCustomization() {
    const selectedSides = this.data.sidesOptions
      .filter(side => side.selected)
      .map(side => side.name);
    const selectedDrinks = this.data.drinksOptions
      .filter(drink => drink.selected)
      .map(drink => drink.name);

    console.log('Customization:', {
      base: this.data.selectedBase,
      sides: selectedSides,
      drinks: selectedDrinks,
      quantity: this.data.quantity
    });

    this.setData({
      showCustomize: false
    });

    setTimeout(() => {
      this.setData({
        itemAdded: true
      });
    }, 300);
  },

  proceedToCart() {
    if (!this.data.itemAdded) {
      this.showCustomizeSheet();
      return;
    }
    wx.showToast({
      title: 'Going to cart!',
      icon: 'success',
      duration: 1500
    });
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/cart/cart'
      });
    }, 1500);
  },

  onBack() {
    wx.navigateBack();
  }
});
