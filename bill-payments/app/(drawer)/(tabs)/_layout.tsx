import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useTranslation } from 'react-i18next';

const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <TopTabs
      screenOptions={{
        tabBarActiveTintColor: 'rgb(247, 244, 68)',
        tabBarInactiveTintColor: 'rgb(189, 189, 189)',
        tabBarStyle: {
          backgroundColor: 'rgb(75,75,75)',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'rgb(247, 244, 68)',
          height: 3,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    >
      <TopTabs.Screen
        name="categories"
        options={{
          title: t('tabs.categories'),
        }}
      />
      <TopTabs.Screen
        name="products"
        options={{
          title: t('tabs.products'),
        }}
      />
    </TopTabs>
  );
}