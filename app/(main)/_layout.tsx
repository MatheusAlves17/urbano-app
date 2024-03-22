import React from 'react';
import { Tabs } from 'expo-router';
import { theme } from '@/global/theme';
import { Platform } from 'react-native';
import { Bag, BasketIcon, HomeIcon, ProfileIcon } from '@/assets/icons';
import TabIcon from '@/components/TabIcon/TabIcon';

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.primary_01,
        tabBarStyle: {
          width: '90%',
          height: 60,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 56,
          left: '5%',
          right: '5%',
          borderRadius: 32,
          paddingVertical: Platform.OS === 'ios' ? 15 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home/index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon isFocused={focused} icon={<HomeIcon fill={color} />} />
          ),
        }}
      />
      <Tabs.Screen
        name="Basket/index"
        options={{
          tabBarLabel: 'Basket',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon isFocused={focused} icon={<BasketIcon fill={color} />} />
          ),
        }}
      />
      <Tabs.Screen
        name="History/index"
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon isFocused={focused} icon={<Bag fill={color} />} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings/index"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon isFocused={focused} icon={<ProfileIcon fill={color} />} />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
