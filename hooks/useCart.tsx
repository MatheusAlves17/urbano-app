import { IProduct } from '@/interfaces/Product';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type AddressId = string;
interface CardContextProps {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product_id: string) => void;
  valueTotal: number;
  addDelivery: (address_id: string) => void;
  addressId?: AddressId;
}

const CartContext = createContext({} as CardContextProps);

interface ChildrenProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: ChildrenProps) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [valueTotal, setValueTotal] = useState(0);
  const [addressId, setAddressId] = useState('');

  const addDelivery = (address_id: string) => {
    setAddressId(address_id);
  };

  const addToCart = (item: IProduct) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: (cartItem.quantity || 0) + 1,
            }
          : cartItem,
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (product_id: string) => {
    const existingItem = cartItems.find(item => item.id === product_id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(cartItem =>
        cartItem.id === product_id
          ? {
              ...cartItem,
              quantity: cartItem.quantity && cartItem.quantity - 1,
            }
          : cartItem,
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.filter(
        cartItem => cartItem.id !== product_id,
      );
      setCartItems(updatedCartItems);
    }
  };

  useEffect(() => {
    sumValueCart();
  }, [cartItems]);

  const sumValueCart = () => {
    const total = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + parseFloat(currentItem.price) * currentItem.quantity;
    }, 0);
    setValueTotal(total);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        valueTotal,
        addDelivery,
        addressId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
