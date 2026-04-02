// Bengali Calendar (Panjika) Constants
// Bengali year starts from Pohela Boishakh (April 14/15)

export const BENGALI_MONTHS = [
  { name: 'বৈশাখ', nameEn: 'Boishakh', days: 31 },
  { name: 'জ্যৈষ্ঠ', nameEn: 'Joishtho', days: 31 },
  { name: 'আষাঢ়', nameEn: 'Asharh', days: 31 },
  { name: 'শ্রাবণ', nameEn: 'Shrabon', days: 31 },
  { name: 'ভাদ্র', nameEn: 'Bhadro', days: 31 },
  { name: 'আশ্বিন', nameEn: 'Ashwin', days: 30 },
  { name: 'কার্তিক', nameEn: 'Kartik', days: 30 },
  { name: 'অগ্রহায়ণ', nameEn: 'Agrahayan', days: 30 },
  { name: 'পৌষ', nameEn: 'Poush', days: 30 },
  { name: 'মাঘ', nameEn: 'Magh', days: 30 },
  { name: 'ফাল্গুন', nameEn: 'Falgun', days: 30 },
  { name: 'চৈত্র', nameEn: 'Chaitra', days: 30 },
];

export const BENGALI_DAYS = [
  { name: 'রবিবার', nameEn: 'Sunday' },
  { name: 'সোমবার', nameEn: 'Monday' },
  { name: 'মঙ্গলবার', nameEn: 'Tuesday' },
  { name: 'বুধবার', nameEn: 'Wednesday' },
  { name: 'বৃহস্পতিবার', nameEn: 'Thursday' },
  { name: 'শুক্রবার', nameEn: 'Friday' },
  { name: 'শনিবার', nameEn: 'Saturday' },
];

export const BENGALI_NUMBERS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const TITHIS = [
  { name: 'প্রতিপদ', nameEn: 'Pratipada' },
  { name: 'দ্বিতীয়া', nameEn: 'Dwitiya' },
  { name: 'তৃতীয়া', nameEn: 'Tritiya' },
  { name: 'চতুর্থী', nameEn: 'Chaturthi' },
  { name: 'পঞ্চমী', nameEn: 'Panchami' },
  { name: 'ষষ্ঠী', nameEn: 'Sashthi' },
  { name: 'সপ্তমী', nameEn: 'Saptami' },
  { name: 'অষ্টমী', nameEn: 'Ashtami' },
  { name: 'নবমী', nameEn: 'Navami' },
  { name: 'দশমী', nameEn: 'Dashami' },
  { name: 'একাদশী', nameEn: 'Ekadashi' },
  { name: 'দ্বাদশী', nameEn: 'Dwadashi' },
  { name: 'ত্রয়োদশী', nameEn: 'Trayodashi' },
  { name: 'চতুর্দশী', nameEn: 'Chaturdashi' },
  { name: 'পূর্ণিমা', nameEn: 'Purnima' },
  { name: 'অমাবস্যা', nameEn: 'Amavasya' },
];

export const NAKSHATRAS = [
  { name: 'অশ্বিনী', nameEn: 'Ashwini' },
  { name: 'ভরণী', nameEn: 'Bharani' },
  { name: 'কৃত্তিকা', nameEn: 'Krittika' },
  { name: 'রোহিণী', nameEn: 'Rohini' },
  { name: 'মৃগশিরা', nameEn: 'Mrigashira' },
  { name: 'আর্দ্রা', nameEn: 'Ardra' },
  { name: 'পুনর্বসু', nameEn: 'Punarvasu' },
  { name: 'পুষ্য', nameEn: 'Pushya' },
  { name: 'অশ্লেষা', nameEn: 'Ashlesha' },
  { name: 'মঘা', nameEn: 'Magha' },
  { name: 'পূর্বফল্গুনী', nameEn: 'Purva Phalguni' },
  { name: 'উত্তরফল্গুনী', nameEn: 'Uttara Phalguni' },
  { name: 'হস্ত', nameEn: 'Hasta' },
  { name: 'চিত্রা', nameEn: 'Chitra' },
  { name: 'স্বাতী', nameEn: 'Swati' },
  { name: 'বিশাখা', nameEn: 'Vishakha' },
  { name: 'অনুরাধা', nameEn: 'Anuradha' },
  { name: 'জ্যেষ্ঠা', nameEn: 'Jyeshtha' },
  { name: 'মূল', nameEn: 'Mula' },
  { name: 'পূর্বাষাঢ়া', nameEn: 'Purva Ashadha' },
  { name: 'উত্তরাষাঢ়া', nameEn: 'Uttara Ashadha' },
  { name: 'শ্রবণ', nameEn: 'Shravana' },
  { name: 'ধনিষ্ঠা', nameEn: 'Dhanishta' },
  { name: 'শতভিষা', nameEn: 'Shatabhisha' },
  { name: 'পূর্বভাদ্রপদ', nameEn: 'Purva Bhadrapada' },
  { name: 'উত্তরভাদ্রপদ', nameEn: 'Uttara Bhadrapada' },
  { name: 'রেবতী', nameEn: 'Revati' },
];

// Convert English number to Bengali
export function toBengaliNumber(num: number): string {
  return num
    .toString()
    .split('')
    .map((d) => BENGALI_NUMBERS[parseInt(d)] || d)
    .join('');
}

// Bengali year starts on April 14/15
// Current Bengali year: 1431 (2024-2025)
export function getBengaliYear(gregorianYear: number, gregorianMonth: number): number {
  // Bengali year = Gregorian year - 593 (approximately)
  // But need adjustment based on month
  if (gregorianMonth >= 4) {
    // April onwards
    return gregorianYear - 593;
  }
  return gregorianYear - 594;
}

// Get Bengali month and day from Gregorian date
export function gregorianToBengali(
  gregorianDay: number,
  gregorianMonth: number,
  gregorianYear: number
): { month: number; day: number; year: number } {
  // Simplified conversion - in production, use accurate algorithms
  const BENGALI_YEAR_START_MONTH = 4; // April
  const BENGALI_YEAR_START_DAY = 14; // 14th April typically
  
  let bengaliYear = getBengaliYear(gregorianYear, gregorianMonth);
  let bengaliMonth: number;
  let bengaliDay: number;
  
  if (gregorianMonth === BENGALI_YEAR_START_MONTH) {
    if (gregorianDay >= BENGALI_YEAR_START_DAY) {
      bengaliMonth = 0; // Boishakh
      bengaliDay = gregorianDay - BENGALI_YEAR_START_DAY + 1;
    } else {
      bengaliMonth = 11; // Chaitra
      bengaliDay = gregorianDay + 17; // Days remaining in Chaitra
      bengaliYear--;
    }
  } else if (gregorianMonth > BENGALI_YEAR_START_MONTH) {
    // Calculate month offset
    const monthOffset = gregorianMonth - BENGALI_YEAR_START_MONTH;
    bengaliMonth = monthOffset;
    
    // Days calculation (simplified)
    let cumulativeDays = 0;
    for (let i = 0; i < monthOffset; i++) {
      cumulativeDays += BENGALI_MONTHS[i].days;
    }
    bengaliDay = cumulativeDays + gregorianDay - BENGALI_YEAR_START_DAY + 1;
    
    // Adjust month based on day overflow
    let tempDay = bengaliDay;
    bengaliMonth = 0;
    for (let i = 0; i < BENGALI_MONTHS.length; i++) {
      if (tempDay <= BENGALI_MONTHS[i].days) {
        bengaliMonth = i;
        break;
      }
      tempDay -= BENGALI_MONTHS[i].days;
    }
    bengaliDay = tempDay;
  } else {
    // January to March (previous Bengali year)
    bengaliYear--;
    const daysInPrevMonths = [31, 28, 31];
    let totalDays = 0;
    for (let i = BENGALI_YEAR_START_MONTH; i <= 12; i++) {
      totalDays += i === 2 ? (gregorianYear % 4 === 0 ? 29 : 28) : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i - 1];
    }
    for (let i = 0; i < gregorianMonth - 1; i++) {
      totalDays += daysInPrevMonths[i];
    }
    totalDays += gregorianDay;
    
    // Convert to Bengali date
    let tempDay = totalDays - (BENGALI_MONTHS[11].days - 13); // Adjust for Chaitra start
    bengaliMonth = 11;
    for (let i = 0; i < BENGALI_MONTHS.length; i++) {
      if (tempDay <= BENGALI_MONTHS[i].days) {
        bengaliMonth = i;
        break;
      }
      tempDay -= BENGALI_MONTHS[i].days;
    }
    bengaliDay = tempDay;
  }
  
  // Ensure day is within valid range
  if (bengaliDay < 1) bengaliDay = 1;
  if (bengaliMonth < 0) bengaliMonth = 0;
  if (bengaliMonth > 11) bengaliMonth = 11;
  
  return { month: bengaliMonth, day: bengaliDay, year: bengaliYear };
}

// Check if leap year
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
