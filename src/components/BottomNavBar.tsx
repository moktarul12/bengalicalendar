import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../constants/theme';

type TabType = 'calendar' | 'festivals' | 'panchang' | 'settings';

const tabs: { id: TabType; icon: string; label: string; labelBn: string }[] = [
  { id: 'calendar', icon: 'calendar', label: 'Calendar', labelBn: 'বর্ষপঞ্জি' },
  { id: 'festivals', icon: 'ribbon', label: 'Festivals', labelBn: 'উৎসব' },
  { id: 'panchang', icon: 'book', label: 'Panchang', labelBn: 'পঞ্চাঙ্গ' },
  { id: 'settings', icon: 'settings', label: 'Settings', labelBn: 'সেটিং' },
];

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tabId: TabType) => void;
}

export default function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabChange(tab.id as TabType)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive ? COLORS.primary : COLORS.textMuted}
            />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>
            <Text style={[styles.tabLabelBn, isActive && styles.activeTabLabelBn]}>
              {tab.labelBn}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    // borderTopWidth: 1, // Removed top border
    // borderTopColor: COLORS.border, // Removed top border
     paddingBottom: 8, // Removed to eliminate spacing
     marginBottom: 30, // Removed to eliminate black space above navigation
    // ...SHADOWS.md, // Removed shadow
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  activeTab: {
    backgroundColor: COLORS.primarySoft,
  },
  tabLabel: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  tabLabelBn: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  activeTabLabelBn: {
    color: COLORS.primary,
  },
});
