import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Festival } from '../types';

interface FestivalCardProps {
  festival: Festival;
  onPress?: () => void;
  compact?: boolean;
}

export default function FestivalCard({ festival, onPress, compact = false }: FestivalCardProps) {
  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compactContainer, { borderLeftColor: festival.color }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.compactIcon}>{festival.icon}</Text>
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {festival.nameEn}
          </Text>
          <Text style={styles.compactBengali} numberOfLines={1}>
            {festival.nameBn}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[festival.color, `${festival.color}CC`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{festival.icon}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{festival.nameEn}</Text>
          <Text style={styles.bengaliTitle}>{festival.nameBn}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {festival.description}
          </Text>
        </View>

        {/* Date Badge */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>
            {festival.day}/{festival.month}
          </Text>
        </View>

        {/* Holiday Badge */}
        {festival.isPublicHoliday && (
          <View style={styles.holidayBadge}>
            <Ionicons name="calendar" size={12} color="#FFFFFF" />
            <Text style={styles.holidayText}>Holiday</Text>
          </View>
        )}

        {/* Type Badge */}
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(festival.type) }]}>
          <Text style={styles.typeText}>{festival.type}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function getTypeColor(type: Festival['type']): string {
  const colors = {
    religious: 'rgba(156, 39, 176, 0.8)',
    cultural: 'rgba(233, 30, 99, 0.8)',
    national: 'rgba(0, 106, 78, 0.8)',
    seasonal: 'rgba(76, 175, 80, 0.8)',
  };
  return colors[type];
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  gradient: {
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bengaliTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  dateBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  holidayBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  holidayText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  typeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    ...SHADOWS.sm,
  },
  compactIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  compactContent: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  compactBengali: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
});
