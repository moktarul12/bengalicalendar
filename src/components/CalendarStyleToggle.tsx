import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../constants/theme';

interface CalendarStyleToggleProps {
  value: 'modern' | 'traditional';
  onChange: (style: 'modern' | 'traditional') => void;
  language: 'bn' | 'en';
}

export default function CalendarStyleToggle({ value, onChange, language }: CalendarStyleToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          value === 'modern' && styles.activeTab,
        ]}
        onPress={() => onChange('modern')}
        activeOpacity={0.8}
      >
        <Ionicons
          name="grid-outline"
          size={16}
          color={value === 'modern' ? COLORS.textInverse : COLORS.textSecondary}
        />
        <Text style={value === 'modern' ? styles.activeText : styles.inactiveText}>
          {language === 'bn' ? 'আধুনিক' : 'Modern'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          value === 'traditional' && styles.activeTab,
        ]}
        onPress={() => onChange('traditional')}
        activeOpacity={0.8}
      >
        <Ionicons
          name="calendar-outline"
          size={16}
          color={value === 'traditional' ? COLORS.textInverse : COLORS.textSecondary}
        />
        <Text style={value === 'traditional' ? styles.activeText : styles.inactiveText}>
          {language === 'bn' ? 'ঐতিহ্যবাহী' : 'Traditional'}
        </Text>
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
    alignSelf: 'flex-end',
    marginRight: SPACING.md,
  },
  tab: {
    width: 90,
    height: 36,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.sm,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  inactiveText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
