import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { getUpcomingFestivals, Festival } from '../constants/festivals';
import FestivalIcon from './FestivalIcon';

interface UpcomingFestivalsProps {
  currentMonth: number;
  currentDay: number;
  currentYear: number;
  onFestivalPress?: (festival: Festival) => void;
}

export default function UpcomingFestivals({
  currentMonth,
  currentDay,
  currentYear,
  onFestivalPress,
}: UpcomingFestivalsProps) {
  const upcomingFestivals = getUpcomingFestivals(currentMonth, currentDay, currentYear, 10);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="sparkles" size={22} color={COLORS.primary} />
          <Text style={styles.title}>Upcoming Festivals</Text>
        </View>
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
            style={styles.festivalItem}
            onPress={() => onFestivalPress?.(festival)}
            activeOpacity={0.7}
          >
            <FestivalIcon iconPath={festival.icon} color={festival.color} size={48} marginRight={SPACING.md} />
            <View style={styles.festivalInfo}>
              <Text style={styles.festivalName} numberOfLines={1}>{festival.nameEn}</Text>
              <Text style={styles.festivalNameBn} numberOfLines={1}>{festival.nameBn}</Text>
              <View style={styles.dateBadge}>
                <Ionicons name="calendar" size={12} color={COLORS.textSecondary} />
                <Text style={styles.dateText}>{festival.day}/{festival.month}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  festivalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.sm,
    minWidth: 200,
    ...SHADOWS.sm,
  },
  festivalInfo: {
    flex: 1,
  },
  festivalName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  festivalNameBn: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});
