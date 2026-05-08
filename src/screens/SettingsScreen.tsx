import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const SETTINGS_KEY = '@app_settings';

interface SettingItemProps {
  icon: string;
  iconColor: string;
  title: string;
  titleBn: string;
  value?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

function SettingItem({
  icon,
  iconColor,
  title,
  titleBn,
  value,
  hasSwitch,
  switchValue,
  onSwitchChange,
  onPress,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress && !hasSwitch}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <Ionicons name={icon as any} size={22} color={iconColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingTitleBn}>{titleBn}</Text>
      </View>
      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#ccc', true: COLORS.primary }}
          thumbColor="#FFFFFF"
        />
      )}
      {value && !hasSwitch && (
        <Text style={styles.settingValue}>{value}</Text>
      )}
      {onPress && !hasSwitch && (
        <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    festivalReminders: true,
    darkMode: false,
    bengaliDefault: false,
    showPanchang: true,
    showHolidays: true,
    calendarStyle: 'traditional', // 'modern' | 'traditional'
    calendarType: 'gregorian', // 'gregorian' | 'bengali'
  });

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.log('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Save settings to storage whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        console.log('Error saving settings:', error);
      }
    };
    saveSettings();
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRateApp = () => {
    Alert.alert('Rate App', 'Enjoying Bengali Calendar? Please rate us on Play Store!', [
      { text: 'Later', style: 'cancel' },
      { text: 'Rate Now', onPress: () => Linking.openURL('market://details?id=com.dromominds.bengalienglishcalendar') },
    ]);
  };

  const handleShareApp = () => {
    Alert.alert('Share App', 'Share Bengali English Calendar with friends and family!');
  };

  const handleAbout = () => {
    Alert.alert(
      'About App',
      'Bengali English Calendar v1.0.0\n\nA beautiful dual calendar app featuring Bengali Panjika and Gregorian calendar with festivals, holidays, and panchang.\n\nFeatures:\n• Dual Calendar View\n• Festival & Holiday Tracking\n• Panchang Information\n• Bengali & English Support\n\nDeveloped by DromoMinds\n\nMade with ❤️ for Bengali community',
      [{ text: 'OK' }]
    );
  };

  const handleAboutUs = () => {
    Linking.openURL('https://dromominds.in');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Ionicons name="settings" size={40} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>সেটিংস</Text>
      </LinearGradient>

      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications / বিজ্ঞপ্তি</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="notifications"
            iconColor="#FF6B6B"
            title="Push Notifications"
            titleBn="পুশ বিজ্ঞপ্তি"
            hasSwitch
            switchValue={settings.notifications}
            onSwitchChange={() => toggleSetting('notifications')}
          />
          <SettingItem
            icon="ribbon"
            iconColor="#E91E63"
            title="Festival Reminders"
            titleBn="উৎসব স্মরণ"
            hasSwitch
            switchValue={settings.festivalReminders}
            onSwitchChange={() => toggleSetting('festivalReminders')}
          />
        </View>
      </View>

      {/* Calendar Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Calendar / ক্যালেন্ডার</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="grid"
            iconColor="#3F51B5"
            title={settings.calendarStyle === 'traditional' ? 'Traditional Style' : 'Modern Style'}
            titleBn={settings.calendarStyle === 'traditional' ? 'ঐতিহ্যবাহী স্টাইল' : 'আধুনিক স্টাইল'}
            value={settings.calendarStyle === 'traditional' ? 'Traditional' : 'Modern'}
            onPress={() => {
              Alert.alert(
                'Calendar Style',
                'Choose your preferred calendar style',
                [
                  { text: 'Modern', onPress: () => setSettings(prev => ({ ...prev, calendarStyle: 'modern' })) },
                  { text: 'Traditional', onPress: () => setSettings(prev => ({ ...prev, calendarStyle: 'traditional' })) },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }}
          />
          <SettingItem
            icon="calendar"
            iconColor="#4CAF50"
            title={settings.calendarType === 'gregorian' ? 'English Calendar' : 'Bengali Calendar'}
            titleBn={settings.calendarType === 'gregorian' ? 'ইংরেজি ক্যালেন্ডার' : 'বাংলা ক্যালেন্ডার'}
            value={settings.calendarType === 'gregorian' ? 'English' : 'Bengali'}
            onPress={() => {
              Alert.alert(
                'Default Calendar',
                'Choose your default calendar',
                [
                  { text: 'English', onPress: () => setSettings(prev => ({ ...prev, calendarType: 'gregorian' })) },
                  { text: 'Bengali', onPress: () => setSettings(prev => ({ ...prev, calendarType: 'bengali' })) },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }}
          />
        </View>
      </View>

      {/* Display Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display / প্রদর্শন</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="moon"
            iconColor="#3F51B5"
            title="Dark Mode"
            titleBn="ডার্ক মোড"
            hasSwitch
            switchValue={settings.darkMode}
            onSwitchChange={() => toggleSetting('darkMode')}
          />
          <SettingItem
            icon="calendar-clear"
            iconColor="#FF9800"
            title="Show Panchang"
            titleBn="পঞ্জিকা দেখুন"
            hasSwitch
            switchValue={settings.showPanchang}
            onSwitchChange={() => toggleSetting('showPanchang')}
          />
          <SettingItem
            icon="today"
            iconColor="#00BCD4"
            title="Show Holidays"
            titleBn="ছুটির দিন দেখুন"
            hasSwitch
            switchValue={settings.showHolidays}
            onSwitchChange={() => toggleSetting('showHolidays')}
          />
        </View>
      </View>

      {/* Language Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language / ভাষা</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="globe"
            iconColor="#9C27B0"
            title="App Language"
            titleBn="অ্যাপ ভাষা"
            value="English"
            onPress={() => Alert.alert('Language', 'Language selection coming soon!')}
          />
          <SettingItem
            icon="translate"
            iconColor="#673AB7"
            title="Region"
            titleBn="অঞ্চল"
            value="West Bengal"
            onPress={() => Alert.alert('Region', 'Region selection coming soon!')}
          />
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About / সম্পর্কে</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="information-circle"
            iconColor="#2196F3"
            title="About App"
            titleBn="অ্যাপ সম্পর্কে"
            onPress={handleAbout}
          />
          <SettingItem
            icon="business"
            iconColor="#9C27B0"
            title="About Us"
            titleBn="আমাদের সম্পর্কে"
            onPress={handleAboutUs}
          />
          <SettingItem
            icon="star"
            iconColor="#FFD700"
            title="Rate App"
            titleBn="অ্যাপ রেট করুন"
            onPress={handleRateApp}
          />
          <SettingItem
            icon="share-social"
            iconColor="#00BCD4"
            title="Share App"
            titleBn="অ্যাপ শেয়ার করুন"
            onPress={handleShareApp}
          />
          <SettingItem
            icon="mail"
            iconColor="#F44336"
            title="Contact Us"
            titleBn="যোগাযোগ করুন"
            onPress={() => Linking.openURL('mailto:admin@dromominds.com')}
          />
          <SettingItem
            icon="document-text"
            iconColor="#607D8B"
            title="Privacy Policy"
            titleBn="গোপনীয়তা নীতি"
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy coming soon!')}
          />
          <SettingItem
            icon="clipboard"
            iconColor="#795548"
            title="Terms of Service"
            titleBn="সেবার শর্তাবলী"
            onPress={() => Alert.alert('Terms', 'Terms of service coming soon!')}
          />
        </View>
      </View>

      {/* Version Info */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.versionTextBn}>সংস্করণ ১.০.০</Text>
        <Text style={styles.copyright}>© 2024 Bengali Calendar</Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  settingsGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  settingTitleBn: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  settingValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  versionTextBn: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  copyright: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 8,
  },
});
