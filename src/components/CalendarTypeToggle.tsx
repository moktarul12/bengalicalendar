import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

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
        activeOpacity={0.7}
      >
        {value === 'gregorian' && (
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.activeText}>English</Text>
          </LinearGradient>
        )}
        {value !== 'gregorian' && (
          <Text style={styles.inactiveText}>English</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          value === 'bengali' && styles.activeTab,
        ]}
        onPress={() => onChange('bengali')}
        activeOpacity={0.7}
      >
        {value === 'bengali' && (
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.activeText}>বাংলা</Text>
          </LinearGradient>
        )}
        {value !== 'bengali' && (
          <Text style={styles.inactiveText}>বাংলা</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.round,
    padding: 4,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
  },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  activeTab: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  activeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inactiveText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
});
