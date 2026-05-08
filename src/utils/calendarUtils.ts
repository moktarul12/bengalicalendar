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

// Convert Bengali date to Gregorian date
function bengaliToGregorian(
  bengaliDay: number,
  bengaliMonth: number,
  bengaliYear: number
): { day: number; month: number; year: number } {
  // Bengali year starts from Pohela Boishakh (April 14/15)
  const BENGALI_YEAR_START_DAY = 14; // April 14 typically
  const BENGALI_YEAR_START_MONTH = 4; // April

  // Calculate approximate Gregorian year
  let gregorianYear = bengaliYear + 593;

  // Calculate days from start of Bengali year
  let daysFromBengaliStart = 0;
  for (let i = 0; i < bengaliMonth; i++) {
    daysFromBengaliStart += BENGALI_MONTHS[i].days;
  }
  daysFromBengaliStart += bengaliDay - 1;

  // Calculate the date
  let gregorianDay = BENGALI_YEAR_START_DAY + daysFromBengaliStart;
  let gregorianMonth = BENGALI_YEAR_START_MONTH;

  // Adjust for month overflow
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // Handle leap year for February
  const isLeap = (gregorianYear % 4 === 0 && gregorianYear % 100 !== 0) || (gregorianYear % 400 === 0);
  daysInMonth[1] = isLeap ? 29 : 28;

  while (gregorianDay > daysInMonth[gregorianMonth - 1]) {
    gregorianDay -= daysInMonth[gregorianMonth - 1];
    gregorianMonth++;
    if (gregorianMonth > 12) {
      gregorianMonth = 1;
      gregorianYear++;
    }
  }

  return { day: gregorianDay, month: gregorianMonth, year: gregorianYear };
}

// Get Bengali month calendar grid
export function generateBengaliCalendarGrid(bengaliYear: number, bengaliMonth: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  
  // Get first day of Bengali month in Gregorian
  const firstGregorianDate = bengaliToGregorian(1, bengaliMonth, bengaliYear);
  const firstDayOfWeek = getDayOfWeek(firstGregorianDate.year, firstGregorianDate.month, firstGregorianDate.day);
  
  // Get number of days in this Bengali month
  const daysInBengaliMonth = BENGALI_MONTHS[bengaliMonth].days;
  
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({} as CalendarDay);
  }
  
  // Add days of the Bengali month
  for (let bengaliDay = 1; bengaliDay <= daysInBengaliMonth; bengaliDay++) {
    // Convert this Bengali day to Gregorian
    const gregorianDate = bengaliToGregorian(bengaliDay, bengaliMonth, bengaliYear);
    const dayOfWeek = getDayOfWeek(gregorianDate.year, gregorianDate.month, gregorianDate.day);
    
    // Get festivals for this Gregorian date
    const festivals = getFestivalsByDate(gregorianDate.month, gregorianDate.day);
    
    const isToday = gregorianDate.day === todayDate && 
                     gregorianDate.month === todayMonth && 
                     gregorianDate.year === todayYear;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = festivals.some(f => f.isPublicHoliday);
    
    const gregorian: GregorianDate = {
      year: gregorianDate.year,
      month: gregorianDate.month,
      day: gregorianDate.day,
      dayOfWeek,
      monthName: getMonthName(gregorianDate.month),
      dayName: getDayName(dayOfWeek),
    };
    
    const bengali: BengaliDate = {
      year: bengaliYear,
      month: bengaliMonth,
      day: bengaliDay,
      monthName: BENGALI_MONTHS[bengaliMonth]?.name || '',
      monthNameEn: BENGALI_MONTHS[bengaliMonth]?.nameEn || '',
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
