import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { toBengaliNumber } from '../../constants/bengaliCalendar';
import { CalendarDay as CalendarDayType } from '../../types';

interface CalendarDayProps {
  day: CalendarDayType | null;
  isCurrentMonth: boolean;
  calendarType: 'gregorian' | 'bengali';
  onPress: (day: CalendarDayType) => void;
}

export default function CalendarDayComponent({ day, isCurrentMonth, calendarType, onPress }: CalendarDayProps) {
  if (!day || !day.gregorian) {
    return <View style={styles.emptyCell} />;
  }

  const { gregorian, bengali, festivals, isToday, isHoliday, isWeekend } = day;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isToday && styles.todayCell,
        isHoliday && styles.holidayCell,
      ]}
      onPress={() => onPress(day)}
      activeOpacity={0.7}
    >
      {/* Main Day Number */}
      <View style={styles.dayNumberContainer}>
        <Text
          style={[
            styles.dayNumber,
            isToday && styles.todayText,
            isWeekend && styles.weekendText,
            !isCurrentMonth && styles.otherMonthText,
          ]}
        >
          {calendarType === 'bengali' ? toBengaliNumber(bengali.day) : gregorian.day}
        </Text>

        {/* Bengali Day Number */}
        <Text
          style={[
            styles.bengaliDay,
            isToday && styles.todayBengaliText,
          ]}
        >
          {calendarType === 'bengali' ? gregorian.day : toBengaliNumber(bengali.day)}
        </Text>
      </View>

      {/* Festival Indicators */}
      {festivals.length > 0 && (
        <View style={styles.festivalIndicators}>
          {festivals.slice(0, 2).map((festival, index) => (
            <View
              key={festival.id}
              style={[
                styles.festivalDot,
                { backgroundColor: festival.color },
              ]}
            />
          ))}
          {festivals.length > 2 && (
            <Text style={styles.moreText}>+{festivals.length - 2}</Text>
          )}
        </View>
      )}

      {/* Holiday Badge */}
      {isHoliday && (
        <View style={styles.holidayBadge}>
          <Text style={styles.holidayText}>🏛️</Text>
        </View>
      )}

      {/* Today Indicator */}
      {isToday && <View style={styles.todayIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emptyCell: {
    flex: 1,
    aspectRatio: 1,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    padding: 2,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  todayCell: {
    backgroundColor: '#FFF3F3',
    borderWidth: 2,
    borderColor: COLORS.today,
  },
  holidayCell: {
    backgroundColor: '#FFF8E1',
  },
  dayNumberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  bengaliDay: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  todayText: {
    color: COLORS.today,
    fontWeight: 'bold',
  },
  todayBengaliText: {
    color: COLORS.today,
  },
  weekendText: {
    color: COLORS.weekend,
  },
  otherMonthText: {
    color: COLORS.textMuted,
  },
  festivalIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  festivalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  moreText: {
    fontSize: 8,
    color: COLORS.textMuted,
    marginLeft: 2,
  },
  holidayBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  holidayText: {
    fontSize: 10,
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.today,
  },
});
