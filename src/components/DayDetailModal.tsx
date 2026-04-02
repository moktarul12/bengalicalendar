import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { toBengaliNumber } from '../constants/bengaliCalendar';
import { CalendarDay, Festival } from '../types';
import FestivalCard from './FestivalCard';

const { height } = Dimensions.get('window');

interface DayDetailModalProps {
  visible: boolean;
  day: CalendarDay | null;
  onClose: () => void;
}

export default function DayDetailModal({ visible, day, onClose }: DayDetailModalProps) {
  if (!day) return null;

  const { gregorian, bengali, festivals, isToday, isHoliday } = day;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.dateContainer}>
              <Text style={styles.dayNumber}>{gregorian.day}</Text>
              <Text style={styles.dayName}>{gregorian.dayName}</Text>
              <Text style={styles.monthYear}>
                {gregorian.monthName} {gregorian.year}
              </Text>
            </View>

            {/* Bengali Date */}
            <View style={styles.bengaliContainer}>
              <Text style={styles.bengaliDate}>
                {bengali.monthName} {toBengaliNumber(bengali.day)}, {toBengaliNumber(bengali.year)}
              </Text>
              <Text style={styles.bengaliDayName}>{bengali.dayName}</Text>
            </View>

            {/* Badges */}
            <View style={styles.badgesContainer}>
              {isToday && (
                <View style={styles.todayBadge}>
                  <Ionicons name="today" size={14} color="#FFFFFF" />
                  <Text style={styles.badgeText}>Today</Text>
                </View>
              )}
              {isHoliday && (
                <View style={styles.holidayBadge}>
                  <Ionicons name="calendar" size={14} color="#FFFFFF" />
                  <Text style={styles.badgeText}>Holiday</Text>
                </View>
              )}
            </View>
          </LinearGradient>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Panchang Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Panchang / পঞ্জিকা</Text>
              <View style={styles.panchangGrid}>
                <View style={styles.panchangItem}>
                  <Text style={styles.panchangLabel}>Tithi</Text>
                  <Text style={styles.panchangValue}>প্রতিপদ</Text>
                </View>
                <View style={styles.panchangItem}>
                  <Text style={styles.panchangLabel}>Nakshatra</Text>
                  <Text style={styles.panchangValue}>অশ্বিনী</Text>
                </View>
                <View style={styles.panchangItem}>
                  <Text style={styles.panchangLabel}>Sunrise</Text>
                  <Text style={styles.panchangValue}>05:45</Text>
                </View>
                <View style={styles.panchangItem}>
                  <Text style={styles.panchangLabel}>Sunset</Text>
                  <Text style={styles.panchangValue}>18:15</Text>
                </View>
              </View>
            </View>

            {/* Festivals */}
            {festivals.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Festivals ({festivals.length}) / উৎসব
                </Text>
                {festivals.map((festival) => (
                  <FestivalCard
                    key={festival.id}
                    festival={festival}
                    compact
                  />
                ))}
              </View>
            )}

            {/* No Festivals */}
            {festivals.length === 0 && (
              <View style={styles.noFestivals}>
                <Ionicons name="calendar-outline" size={48} color={COLORS.textMuted} />
                <Text style={styles.noFestivalsText}>No festivals on this day</Text>
                <Text style={styles.noFestivalsTextBn}>এই দিনে কোনো উৎসব নেই</Text>
              </View>
            )}

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Actions</Text>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="notifications-outline" size={20} color={COLORS.primary} />
                  <Text style={styles.actionText}>Set Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={20} color={COLORS.primary} />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 50 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    maxHeight: height * 0.85,
  },
  header: {
    padding: SPACING.lg,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  dayNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dayName: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  monthYear: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  bengaliContainer: {
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.round,
  },
  bengaliDate: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bengaliDayName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  todayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.round,
    marginHorizontal: 5,
  },
  holidayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.round,
    marginHorizontal: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  panchangGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  panchangItem: {
    width: '50%',
    padding: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
    marginHorizontal: 2,
  },
  panchangLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  panchangValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  noFestivals: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  noFestivalsText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  noFestivalsTextBn: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS.round,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
});
