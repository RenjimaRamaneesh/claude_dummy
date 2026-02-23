// pages/meal-detail/meal-detail.js
Page({
  data: {
    // Meal Data
    mealData: {
      name: 'Chicken Keema Rice..',
      description: 'Fragrant basmati rice cooked with spiced minced chicken, onions, and aromatic Indian spices.',
      image: '/images/video-thumbnail.png',
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
      image: '/images/video-thumbnail.png',
      description: 'FitFuel Kitchen offers healthy, gym-friendly meals focused on clean eating and fitness nutrition. Specializes in high-protein options like grilled chicken, fresh salads, and balanced bowls for active lifestyles.',
      standards: [
        { icon: '/images/video-thumbnail.png', text: 'Freshly Prepared Daily' },
        { icon: '/images/video-thumbnail.png', text: 'Sealed Packaging' },
        { icon: '/images/video-thumbnail.png', text: 'Hot Meals, Delivered Fresh' },
        { icon: '/images/video-thumbnail.png', text: 'FSSAI Certified Kitchen.' }
      ],
      specials: [
        {
          image: '/images/video-thumbnail.png',
          category: 'Breakfast',
          price: '12',
          name: 'Veg Wraps',
          description: 'low carb, high fiber'
        },
        {
          image: '/images/video-thumbnail.png',
          category: 'Starter, Lunch',
          price: '18',
          name: 'Grilled Chicken',
          description: 'Herb chicken, quinoa'
        },
        {
          image: '/images/video-thumbnail.png',
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
        description: 'High fiber · Keeps you full longer'
      },
      {
        id: 'cauliflower',
        name: 'Cauliflower Rice',
        description: 'High fiber · Keeps you full longer'
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
        name: 'Sautéed Vegetables',
        description: 'Seasonal veggies · Lightly cooked',
        selected: false,
        recommended: false
      },
      {
        id: 'raita',
        name: 'Raita',
        description: 'Cooling yogurt side · Aids digestion',
        selected: true,
        recommended: true
      }
    ],
    drinksOptions: [
      {
        id: 'lemon',
        name: 'Fresh Lemon Juice',
        description: 'Helps digestion · Balances spices',
        selected: true
      },
      {
        id: 'buttermilk',
        name: 'Buttermilk',
        description: 'Cooling · Gut-friendly',
        selected: false
      }
    ],
    // UI State
    showNutritionTable: false,
    showRestaurant: false,
    showCustomize: false,
    itemAdded: false,
    hasNotification: true,
    isRecording: false,
    selectedBase: 'basmati',
    quantity: 1
  },

  onLoad(options) {
    // Draw the nutrition chart after a brief delay to ensure canvas is ready
    setTimeout(() => {
      this.drawNutritionChart();
    }, 300);
  },

  // Draw nutrition chart as COMPLETE CIRCLES with colored SEGMENTS
  drawNutritionChart() {
    // Get system info to calculate proper canvas size
    const systemInfo = wx.getSystemInfoSync();
    // Canvas dimensions in rpx (matched to WXSS)
    const canvasRpx = 350;
    // Convert rpx to px (750rpx = screen width)
    const canvasPx = (canvasRpx / 750) * systemInfo.windowWidth;

    const ctx = wx.createCanvasContext('nutritionChart', this);

    // Use pixel-based coordinates
    const centerX = canvasPx / 2;
    const centerY = canvasPx / 2;

    // Calculate nutritional percentages
    const protein = this.data.mealData.protein;
    const carbs = this.data.mealData.carbs;
    const fat = this.data.mealData.fat;
    const total = protein + carbs + fat;

    // Calculate percentages
    const proteinPercent = protein / total;
    const carbsPercent = carbs / total;
    const fatPercent = fat / total;

    // Convert to angles (full circle = 2 * PI)
    const proteinAngle = proteinPercent * 2 * Math.PI;
    const carbsAngle = carbsPercent * 2 * Math.PI;
    const fatAngle = fatPercent * 2 * Math.PI;

    // Ring configuration - scale based on canvas size
    const scale = canvasPx / 280;
    const rings = [
      { radius: 120 * scale, color: '#54EAE7' }, // Outer ring - Protein
      { radius: 95 * scale, color: '#ffb74d' },  // Middle ring - Carbs
      { radius: 70 * scale, color: '#e57373' }   // Inner ring - Fat
    ];

    // Draw background gray circles first
    ctx.setLineCap('round');
    rings.forEach(ring => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, ring.radius, 0, 2 * Math.PI);
      ctx.setStrokeStyle('#e8e8e8');
      ctx.setLineWidth(22 * scale);
      ctx.stroke();
    });

    // Starting angle for all segments (top center = -PI/2)
    const startAngle = -Math.PI / 2;

    // Draw Protein segment (outer ring)
    if (proteinPercent > 0) {
      const proteinEndAngle = startAngle + proteinAngle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[0].radius, startAngle, proteinEndAngle);
      ctx.setStrokeStyle(rings[0].color);
      ctx.setLineWidth(22 * scale);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    // Draw Carbs segment (middle ring)
    if (carbsPercent > 0) {
      const carbsEndAngle = startAngle + carbsAngle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[1].radius, startAngle, carbsEndAngle);
      ctx.setStrokeStyle(rings[1].color);
      ctx.setLineWidth(22 * scale);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    // Draw Fat segment (inner ring)
    if (fatPercent > 0) {
      const fatEndAngle = startAngle + fatAngle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, rings[2].radius, startAngle, fatEndAngle);
      ctx.setStrokeStyle(rings[2].color);
      ctx.setLineWidth(22 * scale);
      ctx.setLineCap('round');
      ctx.stroke();
    }

    // Optional: Draw percentage labels in the center
    this.drawNutritionLabels(ctx, centerX, centerY, proteinPercent, carbsPercent, fatPercent, scale);

    ctx.draw();
  },

  // Optional helper method for labels
  drawNutritionLabels(ctx, centerX, centerY, proteinPercent, carbsPercent, fatPercent, scale) {
    // Only draw if there's enough space
    if (scale > 1.5) {
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');

      // Protein label
      ctx.setFontSize(12 * scale);
      ctx.setFillStyle('#54EAE7');
      ctx.fillText(`${Math.round(proteinPercent * 100)}%`, centerX, centerY - 15 * scale);

      // Carbs label
      ctx.setFontSize(10 * scale);
      ctx.setFillStyle('#ffb74d');
      ctx.fillText(`${Math.round(carbsPercent * 100)}%`, centerX, centerY);

      // Fat label
      ctx.setFontSize(8 * scale);
      ctx.setFillStyle('#e57373');
      ctx.fillText(`${Math.round(fatPercent * 100)}%`, centerX, centerY + 15 * scale);
    }
  },

  // Toggle between chart and table view
  toggleHealthCard() {
    this.setData({
      showNutritionTable: !this.data.showNutritionTable
    });
  },

  // Show restaurant bottom sheet
  showRestaurantSheet() {
    this.setData({
      showRestaurant: true
    });
  },

  // Hide restaurant bottom sheet
  hideRestaurantSheet() {
    this.setData({
      showRestaurant: false
    });
  },

  // Show customize meal bottom sheet
  showCustomizeSheet() {
    this.setData({
      showCustomize: true,
      // Reset itemAdded when opening customize again
      itemAdded: false
    });
  },

  // Hide customize meal bottom sheet
  hideCustomizeSheet() {
    this.setData({
      showCustomize: false
    });
  },

  // Stop propagation for bottom sheet content
  stopPropagation() {
    // Prevents closing when tapping inside the sheet
  },

  // Base selection
  selectBase(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      selectedBase: id
    });
  },

  // Toggle side selection
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

  // Toggle drink selection
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

  // Decrease quantity
  decreaseQuantity() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  // Increase quantity
  increaseQuantity() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  // Confirm customization and show item added state
  confirmCustomization() {
    // Get selected options
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

    // Close customize sheet
    this.setData({
      showCustomize: false
    });

    // Show item added state after a brief delay
    setTimeout(() => {
      this.setData({
        itemAdded: true
      });
    }, 300);
  },

  // Proceed to cart - when button is clicked after item is added
  proceedToCart() {
    if (!this.data.itemAdded) {
      // If item not added yet, show customize sheet
      this.showCustomizeSheet();
      return;
    }

    // Item is added, proceed to cart
    wx.showToast({
      title: 'Going to cart!',
      icon: 'success',
      duration: 1500
    });

    // Navigate to cart page
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/cart/cart'
      });
    }, 1500);
  },

  // Back navigation
  onBack() {
    wx.navigateBack();
  }
});
