import { Tabs } from 'expo-router';
import FloatingTabBar from '../../components/FloatingTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: '知识辞典',
        }}
      />
      <Tabs.Screen
        name="treatment"
        options={{
          title: '治疗决策',
        }}
      />
    </Tabs>
  );
}
