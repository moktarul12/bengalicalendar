import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { COLORS } from './src/constants/theme';

import SplashScreenComponent from './src/components/SplashScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import FestivalsScreen from './src/screens/FestivalsScreen';
import PanchangScreen from './src/screens/PanchangScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BottomNavBar from './src/components/BottomNavBar';
import { LanguageProvider } from './src/contexts/LanguageContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

type TabType = 'calendar' | 'festivals' | 'panchang' | 'settings';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('calendar');

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync({
          // Add any custom fonts here
        });
        // Minimal delay for app initialization
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  if (!appIsReady) {
    return null;
  }

  if (showSplash) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'calendar':
        return <CalendarScreen />;
      case 'festivals':
        return <FestivalsScreen />;
      case 'panchang':
        return <PanchangScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <CalendarScreen />;
    }
  };

  return (
    <LanguageProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
          {renderScreen()}
          <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
        </View>
      </SafeAreaProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
