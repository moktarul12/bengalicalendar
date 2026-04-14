import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface BottomNavBarProps {
  activeTab: 'calendar' | 'festivals' | 'panchang' | 'settings';
  onTabChange: (tab: 'calendar' | 'festivals' | 'panchang' | 'settings') => void;
}

const tabs = [
  { id: 'calendar', icon: 'calendar', label: 'Calendar', labelBn: 'ক্যালেন্ডার' },
  { id: 'festivals', icon: 'ribbon', label: 'Festivals', labelBn: 'উৎসব' },
  { id: 'panchang', icon: 'moon', label: 'Panchang', labelBn: 'পঞ্জিকা' },
  { id: 'settings', icon: 'settings', label: 'Settings', labelBn: 'সেটিংস' },
] as const;

export default function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <SafeAreaView edges={['bottom']}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                <Ionicons
                  name={tab.icon as any}
                  size={24}
                  color={isActive ? COLORS.primary : COLORS.textSecondary}
                />
              </View>
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {tab.label}
              </Text>
              <Text style={[styles.labelBn, isActive && styles.activeLabelBn]}>
                {tab.labelBn}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: SPACING.sm,
    paddingBottom: SPACING.md,
    marginBottom: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: `${COLORS.primary}15`,
  },
  label: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  labelBn: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  activeLabelBn: {
    color: COLORS.primary,
  },
});
