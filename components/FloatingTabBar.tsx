import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';

type TabBarRoute = {
  name: string;
  key: string;
};

// Approximate rendered height of the capsule (padding + icon + label) plus its
// bottom offset, so screens can reserve enough scroll padding to clear it.
export const TAB_BAR_CLEARANCE = 96;

export default function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const pathname = usePathname();

  const animatedValues = useRef<Animated.Value[]>(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((anim, idx) => {
      Animated.timing(anim, {
        toValue: idx === state.index ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [state.index, animatedValues]);

  if (pathname === '/treatment/session') {
    return null;
  }

  const getTabConfig = (routeName: string) => {
    if (routeName === 'dictionary') {
      return { icon: 'book', label: '知识辞典', iconOutline: 'book-outline' };
    } else if (routeName === 'treatment') {
      return { icon: 'git-network', label: '治疗决策', iconOutline: 'git-network-outline' };
    }
    return { icon: 'help-circle', label: routeName, iconOutline: 'help-circle-outline' };
  };

  const visibleRoutes = state.routes.filter((route: TabBarRoute) => {
    const { options } = descriptors[route.key];
    return options.href !== null;
  });

  const capsuleWidth = Math.min(width * 0.75, 320);

  return (
    <View style={[styles.container, { bottom: insets.bottom + spacing.md }]}>
      <View style={[styles.capsule, { width: capsuleWidth }]}>
        {visibleRoutes.map((route: TabBarRoute) => {
          const index = state.routes.findIndex((r: TabBarRoute) => r.key === route.key);
          const isFocused = state.index === index;
          const config = getTabConfig(route.name);

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const highlightOpacity = animatedValues[index];
          const highlightScale = highlightOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          });

          return (
            <Pressable
              key={route.key}
              onPress={handlePress}
              style={[styles.tabItem, { outlineStyle: 'none' } as any]}
            >
              <View style={styles.iconWrap}>
                <Animated.View
                  style={[
                    styles.highlight,
                    {
                      opacity: highlightOpacity,
                      transform: [{ scale: highlightScale }],
                    },
                  ]}
                />
                <Ionicons
                  name={isFocused ? (config.icon as any) : (config.iconOutline as any)}
                  size={24}
                  color={isFocused ? colors.primaryDark : 'rgba(255,255,255,0.65)'}
                  style={styles.icon}
                />
              </View>
              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? '#FFFFFF' : 'rgba(255,255,255,0.75)',
                    fontWeight: isFocused ? '700' : '500',
                  },
                ]}
              >
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  capsule: {
    flexDirection: 'row',
    backgroundColor: colors.primaryDark,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  highlight: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    zIndex: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    zIndex: 2,
  },
});
