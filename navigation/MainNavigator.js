import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import GalleryScreen from '../screens/GalleryScreen';
import ViewScreen from '../screens/ViewScreen';

export default TabNavigator(
  {
    Camera: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarVisible: false,
      }
    },
    Edit: {
      screen: EditScreen,
    },
    View: {
      screen: ViewScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Camera':
            iconName = Platform.OS === 'ios'
              ? `ios-camera${focused ? '' : '-outline'}`
              : 'md-camera';
            break;
          case 'Edit':
            iconName = Platform.OS === 'ios'
              ? `ios-albums${focused ? '' : '-outline'}`
              : 'md-albums';
            break;
          case 'View':
            iconName = Platform.OS === 'ios'
              ? `ios-photos${focused ? '' : '-outline'}`
              : 'md-photos';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
