import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Less, Plus } from '@/assets/icons';
import { imageURL } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import { prettyLog } from '@/services/prettyLog';
import { formatCurrency } from '@/utils/format';
import { IProduct } from '@/interfaces/Product';
import {
  ActionsRow,
  CardContainer,
  CardPrice,
  CardQuantity,
  CardTitle,
  ImageContainer,
  ProductImage,
} from './styles';

interface CartProps {
  item: IProduct;
}

export const CartCard = ({ item }: CartProps) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  prettyLog(cartItems);
  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage source={`${imageURL}${item.path}`} contentFit="contain" />
      </ImageContainer>
      <View style={{ width: '70%' }}>
        <CardTitle>{item.name}</CardTitle>
        <CardPrice>
          {formatCurrency(item.quantity * parseFloat(item.price))}
        </CardPrice>
      </View>
      <ActionsRow>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Less />
        </TouchableOpacity>
        <CardQuantity>{item.quantity}</CardQuantity>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Plus />
        </TouchableOpacity>
      </ActionsRow>
    </CardContainer>
  );
};
