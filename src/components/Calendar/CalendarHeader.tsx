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
}: CalendarHeaderProps) {
  const bengaliMonthData = BENGALI_MONTHS[bengaliMonth];
  const bengaliWeekDaysShort = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {/* Navigation Controls */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={onPrevMonth}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.dateContainer}>
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
          </View>

          <TouchableOpacity
            style={styles.navButton}
            onPress={onNextMonth}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Bengali Date Display (when in Gregorian mode) */}
        {calendarType === 'gregorian' && (
          <View style={styles.bengaliDateContainer}>
            <Text style={styles.bengaliDateText}>
              {bengaliMonthData?.name} {toBengaliNumber(bengaliYear)}
            </Text>
          </View>
        )}

        {/* Today Button */}
        <TouchableOpacity
          style={styles.todayButton}
          onPress={onToday}
          activeOpacity={0.7}
        >
          <Ionicons name="today" size={16} color={COLORS.primary} />
          <Text style={styles.todayText}>Today</Text>
        </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center',
  },
  monthText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  yearText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  secondaryDateText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
  },
  bengaliDateContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BORDER_RADIUS.round,
  },
  bengaliDateText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  todayButton: {
    position: 'absolute',
    right: 16,
    bottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.round,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  todayText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  weekDaysRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  weekendText: {
    color: COLORS.weekend,
  },
});
