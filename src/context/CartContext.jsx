import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    LOAD_CART: 'LOAD_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const existingItem = state.items.find(item => 
                item.id === action.payload.id && 
                JSON.stringify(item.selectedVariant) === JSON.stringify(action.payload.selectedVariant)
            );

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id && 
                        JSON.stringify(item.selectedVariant) === JSON.stringify(action.payload.selectedVariant)
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, cartId: Date.now() }]
            };
        }

        case CART_ACTIONS.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.cartId !== action.payload.cartId)
            };

        case CART_ACTIONS.UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.cartId === action.payload.cartId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ).filter(item => item.quantity > 0)
            };

        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: []
            };

        case CART_ACTIONS.LOAD_CART:
            return {
                ...state,
                items: action.payload
            };

        default:
            return state;
    }
};

// Initial state
const initialState = {
    items: [],
    isOpen: false
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('fashe-cart');
        if (savedCart) {
            try {
                const cartItems = JSON.parse(savedCart);
                dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartItems });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('fashe-cart', JSON.stringify(state.items));
    }, [state.items]);

    // Cart actions
    const addToCart = (product, quantity = 1, selectedVariant = null) => {
        dispatch({
            type: CART_ACTIONS.ADD_ITEM,
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images?.[0] || '/images/placeholder.jpg',
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                quantity,
                selectedVariant
            }
        });
    };

    const removeFromCart = (cartId) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_ITEM,
            payload: { cartId }
        });
    };

    const updateQuantity = (cartId, quantity) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { cartId, quantity }
        });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    // Cart calculations
    const getCartTotal = () => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return state.items.reduce((count, item) => count + item.quantity, 0);
    };

    const getCartSubtotal = () => {
        return getCartTotal();
    };

    const getCartTax = (taxRate = 0.08) => {
        return getCartSubtotal() * taxRate;
    };

    const getCartGrandTotal = (taxRate = 0.08) => {
        return getCartSubtotal() + getCartTax(taxRate);
    };

    // Check if item is in cart
    const isInCart = (productId, selectedVariant = null) => {
        return state.items.some(item => 
            item.id === productId && 
            JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
        );
    };

    // Get item quantity in cart
    const getItemQuantity = (productId, selectedVariant = null) => {
        const item = state.items.find(item => 
            item.id === productId && 
            JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
        );
        return item ? item.quantity : 0;
    };

    const value = {
        // State
        items: state.items,
        isOpen: state.isOpen,
        
        // Actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        
        // Calculations
        getCartTotal,
        getCartCount,
        getCartSubtotal,
        getCartTax,
        getCartGrandTotal,
        
        // Utilities
        isInCart,
        getItemQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
