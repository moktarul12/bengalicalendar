// Bengali Festivals and Holidays Data
// Each festival has Bengali name, English name, date, type, and icon

export interface Festival {
  id: string;
  nameBn: string;
  nameEn: string;
  description: string;
  year: number;
  month: number; // 1-12 for Gregorian
  day: number;
  bengaliMonth?: number; // 0-11 for Bengali months
  bengaliDay?: number;
  type: 'religious' | 'cultural' | 'national' | 'seasonal';
  icon: string;
  color: string;
  isPublicHoliday: boolean;
  imageUrl?: string;
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

// Import festival data from JSON
import festivalsData from '../data/festivals.json';

// Convert JSON data to Festival array with year information
export const FESTIVALS: Festival[] = festivalsData.festivals.flatMap((festival: any) => {
  return Object.entries(festival.dates).map(([year, date]: [string, any]) => ({
    id: festival.id,
    nameBn: festival.nameBn,
    nameEn: festival.nameEn,
    description: festival.description,
    year: parseInt(year),
    month: date.month,
    day: date.day,
    type: festival.type,
    icon: festival.icon,
    color: festival.color,
    isPublicHoliday: festival.isPublicHoliday,
    imageUrl: festival.imageUrl,
    details: festival.details,
  }));
});

// Get festivals for a specific month and year
export function getFestivalsByMonth(month: number, year?: number): Festival[] {
  if (year) {
    return FESTIVALS.filter((f) => f.month === month && f.year === year);
  }
  return FESTIVALS.filter((f) => f.month === month);
}

// Get festivals for a specific date
export function getFestivalsByDate(month: number, day: number, year?: number): Festival[] {
  if (year) {
    return FESTIVALS.filter((f) => f.month === month && f.day === day && f.year === year);
  }
  return FESTIVALS.filter((f) => f.month === month && f.day === day);
}

// Get festivals by type
export function getFestivalsByType(type: Festival['type']): Festival[] {
  return FESTIVALS.filter((f) => f.type === type);
}

// Get public holidays for a month
export function getPublicHolidaysByMonth(month: number, year?: number): Festival[] {
  if (year) {
    return FESTIVALS.filter((f) => f.month === month && f.year === year && f.isPublicHoliday);
  }
  return FESTIVALS.filter((f) => f.month === month && f.isPublicHoliday);
}

// Get upcoming festivals for next 12 months
export function getUpcomingFestivals(currentMonth: number, currentDay: number, currentYear: number, count: number = 10): Festival[] {
  const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
  const futureDate = new Date(currentYear, currentMonth + 11, 0); // 12 months from now

  const upcoming = FESTIVALS.filter((f) => {
    const festivalDate = new Date(f.year, f.month - 1, f.day);
    return festivalDate >= currentDate && festivalDate <= futureDate;
  });

  // Sort by date
  const sorted = upcoming.sort((a, b) => {
    const dateA = new Date(a.year, a.month - 1, a.day);
    const dateB = new Date(b.year, b.month - 1, b.day);
    return dateA.getTime() - dateB.getTime();
  });

  return sorted.slice(0, count);
}
