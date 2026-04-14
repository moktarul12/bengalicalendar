import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import CalendarDay from './CalendarDay';
import { CalendarDay as CalendarDayType } from '../../types';

interface CalendarGridProps {
  days: CalendarDayType[];
  calendarType: 'gregorian' | 'bengali';
  onDayPress: (day: CalendarDayType) => void;
}

export default function CalendarGrid({ days, calendarType, onDayPress }: CalendarGridProps) {
  // Group days into weeks (7 days each)
  const weeks: (CalendarDayType | null)[][] = [];
  let currentWeek: (CalendarDayType | null)[] = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Add remaining days if any
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <CalendarDay
                key={`${weekIndex}-${dayIndex}`}
                day={day}
                isCurrentMonth={day !== null}
                calendarType={calendarType}
                onPress={onDayPress}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  grid: {
    paddingHorizontal: SPACING.xs,
    paddingTop: SPACING.xs,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
});
