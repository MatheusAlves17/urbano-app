import { ICardPayment } from '@/interfaces/Payment';
import { IProduct } from '@/interfaces/Product';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type AddressId = string;
type Coupon = { id: string; value: number };

interface CardContextProps {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product_id: string) => void;
  valueTotal: number;
  valueWithDiscount: number;
  addDelivery: (address_id: string) => void;
  addressId?: AddressId;
  addCoupon: (coupon: Coupon) => void;
  coupon?: Coupon;
}

const CartContext = createContext({} as CardContextProps);

interface ChildrenProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: ChildrenProps) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [valueTotal, setValueTotal] = useState(0);
  const [valueWithDiscount, setValueWithDiscount] = useState(valueTotal);
  const [addressId, setAddressId] = useState('');
  const [coupon, setCoupon] = useState<Coupon>();

  const addDelivery = (address_id: string) => {
    setAddressId(address_id);
  };

  const addCoupon = (couponSelected: Coupon) => {
    setCoupon(couponSelected);
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

  useEffect(() => {
    calculateTotalValue();
  }, [coupon]);

  const sumValueCart = () => {
    const total = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + parseFloat(currentItem.price) * currentItem.quantity;
    }, 0);
    setValueTotal(total);
    setValueWithDiscount(total);
  };

  const calculateTotalValue = () => {
    if (coupon?.value) {
      setValueWithDiscount(valueTotal - coupon.value);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        valueTotal,
        valueWithDiscount,
        addDelivery,
        addCoupon,
        addressId,
        coupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
