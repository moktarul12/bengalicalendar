// Calendar utility functions

import { BENGALI_MONTHS, BENGALI_DAYS, gregorianToBengali, toBengaliNumber } from '../constants/bengaliCalendar';
import { getFestivalsByDate } from '../constants/festivals';
import { CalendarDay, GregorianDate, BengaliDate } from '../types';

// Get days in a Gregorian month
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

// Get day of week (0-6, Sunday = 0)
export function getDayOfWeek(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getDay();
}

// Get month name
export function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
}

// Get day name
export function getDayName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
}

// Generate calendar grid for a month
export function generateCalendarGrid(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getDayOfWeek(year, month, 1);
  
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({} as CalendarDay); // Empty placeholder
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = getDayOfWeek(year, month, day);
    const festivals = getFestivalsByDate(month, day);
    const bengaliDate = gregorianToBengali(day, month, year);
    
    const isToday = day === todayDate && month === todayMonth && year === todayYear;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = festivals.some(f => f.isPublicHoliday);
    
    const gregorian: GregorianDate = {
      year,
      month,
      day,
      dayOfWeek,
      monthName: getMonthName(month),
      dayName: getDayName(dayOfWeek),
    };
    
    const bengali: BengaliDate = {
      year: bengaliDate.year,
      month: bengaliDate.month,
      day: bengaliDate.day,
      monthName: BENGALI_MONTHS[bengaliDate.month]?.name || '',
      monthNameEn: BENGALI_MONTHS[bengaliDate.month]?.nameEn || '',
      dayName: BENGALI_DAYS[dayOfWeek]?.name || '',
      dayNameEn: BENGALI_DAYS[dayOfWeek]?.nameEn || '',
    };
    
    days.push({
      gregorian,
      bengali,
      festivals,
      isToday,
      isSelected: false,
      isHoliday,
      isWeekend,
    });
  }
  
  return days;
}

// Get Bengali month calendar grid
export function generateBengaliCalendarGrid(bengaliYear: number, bengaliMonth: number): CalendarDay[] {
  // Convert Bengali month start to Gregorian
  // This is a simplified version - in production, use accurate algorithms
  const days: CalendarDay[] = [];
  
  // For now, return empty - this would need proper Bengali to Gregorian conversion
  return days;
}

// Format date for display
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

// Format Bengali date for display
export function formatBengaliDate(bengaliDate: BengaliDate): string {
  const day = toBengaliNumber(bengaliDate.day);
  const month = bengaliDate.monthName;
  const year = toBengaliNumber(bengaliDate.year);
  return `${day} ${month} ${year}`;
}

// Get week number of the year
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Check if date is today
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

// Get relative time string
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 1) return `In ${days} days`;
  return `${Math.abs(days)} days ago`;
}

// Generate Panchang data (simplified)
export function generatePanchang(date: Date) {
  // In production, this would use accurate astronomical calculations
  return {
    tithi: 'প্রতিপদ',
    tithiEn: 'Pratipada',
    nakshatra: 'অশ্বিনী',
    nakshatraEn: 'Ashwini',
    yoga: 'বিষ্ণু',
    karana: 'বব',
    sunrise: '05:45',
    sunset: '18:15',
    moonrise: '06:30',
    moonset: '19:00',
    rahuKaal: '09:00 - 10:30',
    yamaganda: '12:30 - 14:00',
    gulika: '15:00 - 16:30',
  };
}
