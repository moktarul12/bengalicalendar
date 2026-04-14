import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { BENGALI_MONTHS, toBengaliNumber } from '../../constants/bengaliCalendar';

interface CalendarHeaderProps {
  year: number;
  month: number;
  monthName: string;
  bengaliYear: number;
  bengaliMonth: number;
  calendarType: 'gregorian' | 'bengali';
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  isCurrentMonth: boolean;
  onMonthYearPress: () => void;
}

export default function CalendarHeader({
  year,
  month,
  monthName,
  bengaliYear,
  bengaliMonth,
  calendarType,
  onPrevMonth,
  onNextMonth,
  onToday,
  isCurrentMonth,
  onMonthYearPress,
}: CalendarHeaderProps) {
  const bengaliMonthData = BENGALI_MONTHS[bengaliMonth];
  const bengaliWeekDaysShort = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Navigation Controls */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={onPrevMonth}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons name="arrow-back-circle-outline" size={32} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dateContainer} onPress={onMonthYearPress} activeOpacity={0.7}>
            {calendarType === 'gregorian' ? (
              <>
                <Text style={styles.monthText}>{monthName}</Text>
                <Text style={styles.yearText}>{year}</Text>
              </>
            ) : (
              <>
                <Text style={styles.monthText}>{bengaliMonthData?.name}</Text>
                <Text style={styles.yearText}>{toBengaliNumber(bengaliYear)}</Text>
                <Text style={styles.secondaryDateText}>{monthName} {year}</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={onNextMonth}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Today Button - Only show when not in current month */}
        {!isCurrentMonth && (
          <TouchableOpacity
            style={styles.todayButton}
            onPress={onToday}
            activeOpacity={0.7}
          >
            <Ionicons name="today-outline" size={14} color={COLORS.primary} />
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>
        )}

        {/* Bengali Date Display (when in Gregorian mode) */}
        {calendarType === 'gregorian' && (
          <View style={styles.bengaliDateContainer}>
            <Text style={styles.bengaliDateText}>
              {bengaliMonthData?.name} {toBengaliNumber(bengaliYear)}
            </Text>
          </View>
        )}
      </LinearGradient>

      {/* Week Day Headers */}
      <View style={styles.weekDaysRow}>
        {calendarType === 'gregorian'
          ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <View key={day} style={styles.weekDayCell}>
                <Text
                  style={[
                    styles.weekDayText,
                    index === 0 && styles.weekendText,
                    index === 6 && styles.weekendText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))
          : bengaliWeekDaysShort.map((day, index) => (
              <View key={day} style={styles.weekDayCell}>
                <Text
                  style={[
                    styles.weekDayText,
                    index === 0 && styles.weekendText,
                    index === 6 && styles.weekendText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
  },
  gradient: {
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    minHeight: 100,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    flex: 1,
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  yearText: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.95)',
    marginTop: 1,
    fontWeight: '500',
  },
  secondaryDateText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    fontWeight: '400',
  },
  bengaliDateContainer: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BORDER_RADIUS.round,
  },
  bengaliDateText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
  },
  todayButton: {
    position: 'absolute',
    bottom: 8,
    right: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.round,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  todayText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  weekDaysRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },
  weekendText: {
    color: COLORS.weekend,
  },
});
