import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
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
      {/* Navigation Controls */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onPrevMonth}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateContainer} onPress={onMonthYearPress} activeOpacity={0.7}>
          {calendarType === 'gregorian' ? (
            <>
              <Text style={styles.monthText}>{monthName}</Text>
              <Text style={styles.yearText}>{year}</Text>
              <Text style={styles.bengaliDateText}>
                {bengaliMonthData?.name} {toBengaliNumber(bengaliYear)}
              </Text>
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
          <Ionicons name="chevron-forward" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

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
    paddingVertical: SPACING.sm,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    flex: 1,
  },
  monthText: {
    fontSize: FONTS.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  yearText: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  bengaliDateText: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  secondaryDateText: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  weekDaysRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  weekendText: {
    color: COLORS.festivalNational,
  },
});
