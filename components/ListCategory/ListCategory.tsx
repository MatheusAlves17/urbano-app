import { GlobalLink, GlobalSubtitle } from '@/global/styles';
import { View } from 'react-native';
import { ClockCategories } from '@/assets/pictures';
import { CategoryImage, CategoryItem, Row } from './styles';

const Categories = [
  {
    id: 'srf145',
    title: 'Relógios',
    image: ClockCategories,
  },
];

const ListCategory = () => {
  return (
    <View>
      <Row>
        <GlobalSubtitle>Categorias</GlobalSubtitle>
        <GlobalLink>Ver todas</GlobalLink>
      </Row>
      <Row>
        {Categories.map(item => (
          <CategoryItem key={item.id}>
            <CategoryImage source={item.image} />
            <GlobalLink align="center">{item.title}</GlobalLink>
          </CategoryItem>
        ))}
      </Row>
    </View>
  );
};

export default ListCategory;
