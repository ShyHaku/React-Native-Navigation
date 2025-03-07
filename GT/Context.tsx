import React, { createContext, useState, useContext } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: { [key: string]: CartItem };
  addToCart: (product: { id: string; name: string; price: number; quantity: number }) => void;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  const addToCart = (product: { id: string; name: string; price: number; quantity: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart[product.id];
      if (existingItem) {
        
        return {
          ...prevCart,
          [product.id]: {
            ...existingItem,
            quantity: existingItem.quantity + product.quantity,
          },
        };
      } else {
        
        return {
          ...prevCart,
          [product.id]: {
            ...product,
            quantity: product.quantity,
          },
        };
      }
    });
  };

  const updateCartItem = (id: string, quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: {
        ...prevCart[id],
        quantity,
      },
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const { [id]: removedItem, ...newCart } = prevCart;
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
