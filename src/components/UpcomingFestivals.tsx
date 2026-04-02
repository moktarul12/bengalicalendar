import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { getUpcomingFestivals } from '../constants/festivals';
import { Festival } from '../types';

interface UpcomingFestivalsProps {
  currentMonth: number;
  currentDay: number;
  onFestivalPress?: (festival: Festival) => void;
}

export default function UpcomingFestivals({
  currentMonth,
  currentDay,
  onFestivalPress,
}: UpcomingFestivalsProps) {
  const upcomingFestivals = getUpcomingFestivals(currentMonth, currentDay, 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
        <Text style={styles.title}>Upcoming Festivals</Text>
        <Text style={styles.subtitle}>আসন্ন উৎসব</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {upcomingFestivals.map((festival, index) => (
          <TouchableOpacity
            key={festival.id}
            style={[styles.festivalItem, { backgroundColor: festival.color }]}
            onPress={() => onFestivalPress?.(festival)}
            activeOpacity={0.8}
          >
            <Text style={styles.festivalIcon}>{festival.icon}</Text>
            <Text style={styles.festivalName} numberOfLines={1}>
              {festival.nameEn}
            </Text>
            <Text style={styles.festivalNameBn} numberOfLines={1}>
              {festival.nameBn}
            </Text>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar" size={12} color="rgba(255,255,255,0.8)" />
              <Text style={styles.dateText}>
                {festival.day}/{festival.month}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
  },
  festivalItem: {
    width: 130,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.sm,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  festivalIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  festivalName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  festivalNameBn: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  dateText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
});
