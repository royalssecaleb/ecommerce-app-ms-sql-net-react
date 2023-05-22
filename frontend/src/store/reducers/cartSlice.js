import { createSlice } from '@reduxjs/toolkit';

export const DELIVERY_THRESHOLD = 1200;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],    
      subtotal: 0,
      delivery: 0,
      discount: 0,
      total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, size, quantity = 1, price } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id && item.size === size);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, size, quantity, price });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action) => {
      const { product, size } = action.payload; 
      state.items = state.items.filter(item => item.product.id !== product.id || item.size !== size); 
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const cartItemIndex = state.items.findIndex(item => item.product.id === productId && item.size === size);
      if (cartItemIndex !== -1) { 
        state.items[cartItemIndex].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },  
    clearCart: (state, action) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    calculateSubtotal: (state, action) => {
      const subtotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      
      if (subtotal >= DELIVERY_THRESHOLD) {
        state.delivery = 0;
        state.subtotal = subtotal;
      } else {
        state.delivery = 60;
        state.subtotal = subtotal;
      }
    },   
    updateDelivery: (state, action) => {
      state.delivery = action.payload.deliveryCost;
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload.discount;
      console.log("discount sat:",state.discount)
    },
    getTotal: (state) => {
      state.total =  state.subtotal - (state.subtotal * state.discount) + state.delivery;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateSubtotal, updateDelivery, applyDiscount, getTotal } = cartSlice.actions;

export default cartSlice.reducer;
