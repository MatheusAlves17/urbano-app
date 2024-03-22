import { theme } from '@/global/theme';
import { View } from 'react-native';

interface ITabIconProps {
  isFocused?: boolean;
  icon: JSX.Element;
}
const TabIcon = ({ isFocused, icon }: ITabIconProps) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: isFocused
          ? theme.colors.primary_01
          : theme.colors.white,
        padding: 6,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </View>
  );
};

export default TabIcon;
