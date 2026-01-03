import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Bible from '../../assets/images/bible.svg';
import Explore from '../../assets/images/explore.svg';
import Home from '../../assets/images/home.svg';
import Notifications from '../../assets/images/notifications.svg';
import Profile from '../../assets/images/profile.svg';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  const iconMap: Record<string, (props: any) => ReactElement> = { 
    explore: (props: any) => < Explore width={24} height={24} {...props} />,
    bible: (props: any) => < Bible width={24} height={24} {...props} />,
    notifications: (props: any) => < Notifications width={24} height={24} {...props} />,
    index: (props: any) => < Home width={24} height={24} {...props} />,
    profile: (props: any) => < Profile width={24} height={24} {...props} />, 
  }

  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const themeColors = colors;

  const screenWidth = Dimensions.get('window').width;
  const tabBarWidth = screenWidth * 0.6; // 60% of screen width
  const paddingHorizontal = 10;
  const tabWidth = (tabBarWidth - paddingHorizontal * 2) / 5;
  const indicatorWidth = 20;

  const indicatorPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(indicatorPosition, {
      toValue: state.index * tabWidth + (tabWidth - indicatorWidth) / 2,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [state.index, tabWidth]);

  const styles = StyleSheet.create({
    tabBar: {
      position: 'absolute',
      height: 39,
      width: tabBarWidth,
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: themeColors.card,
      alignSelf: 'center',
      paddingHorizontal: paddingHorizontal,
      borderRadius: 60,
      elevation: 2,
    },
    tabBarItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    indicator: {
      position: 'absolute',
      bottom: 6,
      left: paddingHorizontal,
      height: 2,
      width: indicatorWidth,
      backgroundColor: themeColors.primary,
      borderRadius: 1.5,
    },
  });

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style= {styles.tabBarItem}
          >
            {iconMap[route.name]({
              color: themeColors.text
            })}
          </PlatformPressable>
        );
      })}
      <Animated.View 
        style={[
          styles.indicator,
          {
            transform: [{ translateX: indicatorPosition }]
          }
        ]} 
      />
    </View>
  );
}