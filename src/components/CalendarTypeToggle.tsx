import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface CalendarTypeToggleProps {
  value: 'gregorian' | 'bengali';
  onChange: (type: 'gregorian' | 'bengali') => void;
}

export default function CalendarTypeToggle({ value, onChange }: CalendarTypeToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          value === 'gregorian' && styles.activeTab,
        ]}
        onPress={() => onChange('gregorian')}
        activeOpacity={0.8}
      >
        <View style={styles.tabContent}>
          <Ionicons
            name="language"
            size={14}
            color={value === 'gregorian' ? COLORS.textInverse : COLORS.textSecondary}
          />
          <Text style={value === 'gregorian' ? styles.activeText : styles.inactiveText}>EN</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          value === 'bengali' && styles.activeTab,
        ]}
        onPress={() => onChange('bengali')}
        activeOpacity={0.8}
      >
        <View style={styles.tabContent}>
          <Ionicons
            name="book"
            size={14}
            color={value === 'bengali' ? COLORS.textInverse : COLORS.textSecondary}
          />
          <Text style={value === 'bengali' ? styles.activeText : styles.inactiveText}>বাংলা</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: BORDER_RADIUS.round,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.xs,
  },
  tab: {
    flex: 1,
    height: 38,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.sm,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  activeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textInverse,
    letterSpacing: 0.2,
  },
  inactiveText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
  },
});
