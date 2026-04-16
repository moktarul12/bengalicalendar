// Type definitions for the Bengali English Calendar App

export interface BengaliDate {
  year: number;
  month: number; // 0-11
  day: number;
  monthName: string;
  monthNameEn: string;
  dayName: string;
  dayNameEn: string;
  tithi?: string;
  nakshatra?: string;
}

export interface GregorianDate {
  year: number;
  month: number; // 1-12
  day: number;
  dayOfWeek: number; // 0-6
  monthName: string;
  dayName: string;
}

export interface CalendarDay {
  gregorian: GregorianDate;
  bengali: BengaliDate;
  festivals: Festival[];
  isToday: boolean;
  isSelected: boolean;
  isHoliday: boolean;
  isWeekend: boolean;
}

export interface Festival {
  id: string;
  nameBn: string;
  nameEn: string;
  description: string;
  year: number;
  month: number;
  day: number;
  bengaliMonth?: number;
  bengaliDay?: number;
  type: 'religious' | 'cultural' | 'national' | 'seasonal';
  icon: string;
  color: string;
  isPublicHoliday: boolean;
  details?: {
    longDescription: { bn: string; en: string };
    significance: { bn: string; en: string };
    traditions: { bn: string; en: string };
    history?: { bn: string; en: string };
    rituals?: { bn: string; en: string };
    food?: { bn: string; en: string };
    celebrations?: { bn: string; en: string };
    regionalVariations?: { bn: string; en: string };
    duration: string;
    monthBn: string;
    monthEn: string;
  };
}

export interface Panchang {
  tithi: string;
  tithiEn: string;
  nakshatra: string;
  nakshatraEn: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKaal: string;
  yamaganda: string;
  gulika: string;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
}

export interface Reminder {
  id: string;
  title: string;
  titleBn?: string;
  date: string; // ISO date string
  time?: string;
  type: 'festival' | 'personal' | 'holiday';
  isRecurring: boolean;
  notes?: string;
}

export interface CalendarState {
  currentMonth: number;
  currentYear: number;
  selectedDate: CalendarDay | null;
  viewMode: 'month' | 'week' | 'day';
  calendarType: 'gregorian' | 'bengali';
}

export interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  reset: (state: any) => void;
}

export interface HolidayInfo {
  name: string;
  nameBn: string;
  type: 'public' | 'optional' | 'regional';
}
