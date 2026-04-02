import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { generateCalendarGrid, getMonthName } from '../utils/calendarUtils';
import { gregorianToBengali } from '../constants/bengaliCalendar';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import CalendarTypeToggle from '../components/CalendarTypeToggle';
import UpcomingFestivals from '../components/UpcomingFestivals';
import DayDetailModal from '../components/DayDetailModal';
import { CalendarDay } from '../types';

interface CalendarScreenProps {
  onDaySelect?: (day: CalendarDay) => void;
}

export default function CalendarScreen({ onDaySelect }: CalendarScreenProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarType, setCalendarType] = useState<'gregorian' | 'bengali'>('gregorian');
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  // Get Bengali date for current month
  const bengaliDate = gregorianToBengali(today.getDate(), currentMonth, currentYear);

  useEffect(() => {
    const days = generateCalendarGrid(currentYear, currentMonth);
    setCalendarDays(days);
  }, [currentYear, currentMonth]);

  const goToPrevMonth = useCallback(() => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth() + 1);
    setCurrentYear(now.getFullYear());
  }, []);

  const handleDayPress = useCallback((day: CalendarDay) => {
    setSelectedDay(day);
    setIsModalVisible(true);
    onDaySelect?.(day);
  }, [onDaySelect]);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCalendarTypeChange = useCallback((type: 'gregorian' | 'bengali') => {
    setCalendarType(type);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Calendar Type Toggle */}
        <CalendarTypeToggle
          value={calendarType}
          onChange={handleCalendarTypeChange}
        />

        {/* Calendar Header */}
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          monthName={getMonthName(currentMonth)}
          bengaliYear={bengaliDate.year}
          bengaliMonth={bengaliDate.month}
          calendarType={calendarType}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />

        {/* Calendar Grid */}
        <CalendarGrid
          days={calendarDays}
          calendarType={calendarType}
          onDayPress={handleDayPress}
        />

        {/* Upcoming Festivals */}
        <UpcomingFestivals
          currentMonth={today.getMonth() + 1}
          currentDay={today.getDate()}
        />
      </ScrollView>

      {/* Day Detail Modal */}
      <DayDetailModal
        visible={isModalVisible}
        day={selectedDay}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
