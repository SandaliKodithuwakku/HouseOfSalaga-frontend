// API Routes
export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PRODUCTS: '/products',
  CART: '/cart',
  WISHLIST: '/wishlist',
  ORDERS: '/orders',
  REVIEWS: '/reviews',
  CATEGORIES: '/categories',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
};

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  PHONE_REGEX: /^[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 6,
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    REGISTER: 'Registration successful!',
    LOGIN: 'Login successful!',
    LOGOUT: 'Logged out successfully',
    PRODUCT_ADDED: 'Product added successfully',
    CART_UPDATED: 'Cart updated',
    ORDER_PLACED: 'Order placed successfully',
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please login to continue.',
  },
};

// Default shipping fee
export const SHIPPING_FEE = 50;