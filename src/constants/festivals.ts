// Bengali Festivals and Holidays Data
// Each festival has Bengali name, English name, date, type, and icon

export interface Festival {
  id: string;
  nameBn: string;
  nameEn: string;
  description: string;
  month: number; // 1-12 for Gregorian
  day: number;
  bengaliMonth?: number; // 0-11 for Bengali months
  bengaliDay?: number;
  type: 'religious' | 'cultural' | 'national' | 'seasonal';
  icon: string;
  color: string;
  isPublicHoliday: boolean;
}

export const FESTIVALS: Festival[] = [
  // Major Bengali Festivals
  {
    id: 'pohela-boishakh',
    nameBn: 'পহেলা বৈশাখ',
    nameEn: 'Pohela Boishakh',
    description: 'Bengali New Year - The first day of the Bengali calendar',
    month: 4,
    day: 14,
    bengaliMonth: 0,
    bengaliDay: 1,
    type: 'cultural',
    icon: '🎉',
    color: '#FF6B6B',
    isPublicHoliday: true,
  },
  {
    id: 'nabanna',
    nameBn: 'নবান্ন',
    nameEn: 'Nabanna',
    description: 'Harvest festival celebrating new rice crop',
    month: 11,
    day: 1,
    bengaliMonth: 7,
    bengaliDay: 1,
    type: 'seasonal',
    icon: '🌾',
    color: '#4CAF50',
    isPublicHoliday: false,
  },
  {
    id: 'poush-mela',
    nameBn: 'পৌষ মেলা',
    nameEn: 'Poush Mela',
    description: 'Annual fair at Santiniketan celebrating harvest season',
    month: 12,
    day: 23,
    bengaliMonth: 9,
    bengaliDay: 9,
    type: 'cultural',
    icon: '🎪',
    color: '#FF9800',
    isPublicHoliday: false,
  },
  {
    id: 'basanta-utsav',
    nameBn: 'বসন্ত উৎসব',
    nameEn: 'Basanta Utsav',
    description: 'Spring festival celebrating the arrival of spring',
    month: 3,
    day: 21,
    bengaliMonth: 11,
    bengaliDay: 6,
    type: 'cultural',
    icon: '🌸',
    color: '#E91E63',
    isPublicHoliday: false,
  },

  // Hindu Religious Festivals
  {
    id: 'durga-puja',
    nameBn: 'দুর্গা পূজা',
    nameEn: 'Durga Puja',
    description: 'Major Hindu festival worshiping Goddess Durga',
    month: 10,
    day: 10,
    bengaliMonth: 6,
    bengaliDay: 10,
    type: 'religious',
    icon: '🪔',
    color: '#FF5722',
    isPublicHoliday: true,
  },
  {
    id: 'kali-puja',
    nameBn: 'কালী পূজা',
    nameEn: 'Kali Puja',
    description: 'Worship of Goddess Kali, usually on Diwali night',
    month: 10,
    day: 24,
    bengaliMonth: 7,
    bengaliDay: 1,
    type: 'religious',
    icon: '🔥',
    color: '#9C27B0',
    isPublicHoliday: true,
  },
  {
    id: 'lakshmi-puja',
    nameBn: 'লক্ষ্মী পূজা',
    nameEn: 'Lakshmi Puja',
    description: 'Worship of Goddess Lakshmi on Kojagari Purnima',
    month: 10,
    day: 17,
    bengaliMonth: 6,
    bengaliDay: 15,
    type: 'religious',
    icon: '💰',
    color: '#FFD700',
    isPublicHoliday: false,
  },
  {
    id: 'saraswati-puja',
    nameBn: 'সরস্বতী পূজা',
    nameEn: 'Saraswati Puja',
    description: 'Worship of Goddess Saraswati, goddess of knowledge',
    month: 2,
    day: 14,
    bengaliMonth: 10,
    bengaliDay: 5,
    type: 'religious',
    icon: '📚',
    color: '#FFEB3B',
    isPublicHoliday: true,
  },
  {
    id: 'shivaratri',
    nameBn: 'শিবরাত্রি',
    nameEn: 'Maha Shivaratri',
    description: 'Great night of Lord Shiva',
    month: 2,
    day: 26,
    bengaliMonth: 11,
    bengaliDay: 13,
    type: 'religious',
    icon: '🔱',
    color: '#3F51B5',
    isPublicHoliday: false,
  },
  {
    id: 'janmashtami',
    nameBn: 'জন্মাষ্টমী',
    nameEn: 'Janmashtami',
    description: 'Birth anniversary of Lord Krishna',
    month: 8,
    day: 19,
    bengaliMonth: 4,
    bengaliDay: 4,
    type: 'religious',
    icon: '🦚',
    color: '#00BCD4',
    isPublicHoliday: true,
  },
  {
    id: 'rath-yatra',
    nameBn: 'রথ যাত্রা',
    nameEn: 'Rath Yatra',
    description: 'Chariot festival of Lord Jagannath',
    month: 6,
    day: 20,
    bengaliMonth: 3,
    bengaliDay: 7,
    type: 'religious',
    icon: '🛕',
    color: '#FF9800',
    isPublicHoliday: false,
  },
  {
    id: 'ganesh-chaturthi',
    nameBn: 'গণেশ চতুর্থী',
    nameEn: 'Ganesh Chaturthi',
    description: 'Birthday of Lord Ganesha',
    month: 8,
    day: 27,
    bengaliMonth: 5,
    bengaliDay: 4,
    type: 'religious',
    icon: '🐘',
    color: '#FF5722',
    isPublicHoliday: false,
  },

  // Islamic Festivals
  {
    id: 'eid-ul-fitr',
    nameBn: 'ঈদুল ফিতর',
    nameEn: 'Eid ul-Fitr',
    description: 'Festival marking end of Ramadan fasting',
    month: 4,
    day: 10,
    type: 'religious',
    icon: '🌙',
    color: '#4CAF50',
    isPublicHoliday: true,
  },
  {
    id: 'eid-ul-adha',
    nameBn: 'ঈদুল আযহা',
    nameEn: 'Eid ul-Adha',
    description: 'Festival of Sacrifice',
    month: 6,
    day: 17,
    type: 'religious',
    icon: '🐐',
    color: '#8BC34A',
    isPublicHoliday: true,
  },
  {
    id: 'muharram',
    nameBn: 'মুহররম',
    nameEn: 'Muharram',
    description: 'Islamic New Year',
    month: 7,
    day: 17,
    type: 'religious',
    icon: '📿',
    color: '#607D8B',
    isPublicHoliday: true,
  },
  {
    id: 'milad-un-nabi',
    nameBn: 'মিলাদুন্নবী',
    nameEn: 'Milad un-Nabi',
    description: 'Birthday of Prophet Muhammad',
    month: 9,
    day: 16,
    type: 'religious',
    icon: '🕌',
    color: '#2196F3',
    isPublicHoliday: true,
  },

  // National Holidays
  {
    id: 'independence-day',
    nameBn: 'স্বাধীনতা দিবস',
    nameEn: 'Independence Day',
    description: 'Independence Day of Bangladesh',
    month: 3,
    day: 26,
    type: 'national',
    icon: '🇧🇩',
    color: '#006A4E',
    isPublicHoliday: true,
  },
  {
    id: 'victory-day',
    nameBn: 'বিজয় দিবস',
    nameEn: 'Victory Day',
    description: 'Victory Day of Bangladesh',
    month: 12,
    day: 16,
    type: 'national',
    icon: '🏆',
    color: '#F42A41',
    isPublicHoliday: true,
  },
  {
    id: 'language-martyrs-day',
    nameBn: 'ভাষা শহীদ দিবস',
    nameEn: 'International Mother Language Day',
    description: 'Language Movement Day / Shaheed Dibash',
    month: 2,
    day: 21,
    type: 'national',
    icon: '🖤',
    color: '#000000',
    isPublicHoliday: true,
  },
  {
    id: 'republic-day',
    nameBn: 'প্রজাতন্ত্র দিবস',
    nameEn: 'Republic Day',
    description: 'Republic Day of India (West Bengal)',
    month: 1,
    day: 26,
    type: 'national',
    icon: '🇮🇳',
    color: '#FF9933',
    isPublicHoliday: true,
  },
  {
    id: 'independence-day-india',
    nameBn: 'স্বাধীনতা দিবস (ভারত)',
    nameEn: 'Independence Day (India)',
    description: 'Independence Day of India',
    month: 8,
    day: 15,
    type: 'national',
    icon: '🇮🇳',
    color: '#138808',
    isPublicHoliday: true,
  },
  {
    id: 'gandhi-jayanti',
    nameBn: 'গান্ধী জয়ন্তী',
    nameEn: 'Gandhi Jayanti',
    description: 'Birthday of Mahatma Gandhi',
    month: 10,
    day: 2,
    type: 'national',
    icon: '☮️',
    color: '#4CAF50',
    isPublicHoliday: true,
  },

  // Seasonal Festivals
  {
    id: 'bhai-tika',
    nameBn: 'ভাই ফোঁটা',
    nameEn: 'Bhai Tika / Bhai Dooj',
    description: 'Brother-sister festival after Kali Puja',
    month: 10,
    day: 26,
    bengaliMonth: 7,
    bengaliDay: 3,
    type: 'cultural',
    icon: '👫',
    color: '#9C27B0',
    isPublicHoliday: false,
  },
  {
    id: 'chhat-puja',
    nameBn: 'ছঠ পূজা',
    nameEn: 'Chhath Puja',
    description: 'Ancient Hindu festival dedicated to Sun God',
    month: 11,
    day: 7,
    bengaliMonth: 7,
    bengaliDay: 27,
    type: 'religious',
    icon: '☀️',
    color: '#FFC107',
    isPublicHoliday: false,
  },
  {
    id: 'holi',
    nameBn: 'দোলযাত্রা',
    nameEn: 'Dol Yatra / Holi',
    description: 'Festival of colors',
    month: 3,
    day: 14,
    bengaliMonth: 11,
    bengaliDay: 29,
    type: 'cultural',
    icon: '🎨',
    color: '#E91E63',
    isPublicHoliday: true,
  },
  {
    id: 'rakhi',
    nameBn: 'রক্ষাবন্ধন',
    nameEn: 'Raksha Bandhan',
    description: 'Brother-sister bond festival',
    month: 8,
    day: 19,
    bengaliMonth: 5,
    bengaliDay: 4,
    type: 'cultural',
    icon: '🎀',
    color: '#E91E63',
    isPublicHoliday: false,
  },
  {
    id: 'mahalaya',
    nameBn: 'মহালয়া',
    nameEn: 'Mahalaya',
    description: 'Beginning of Devi Paksha, before Durga Puja',
    month: 10,
    day: 2,
    bengaliMonth: 5,
    bengaliDay: 15,
    type: 'religious',
    icon: '🔔',
    color: '#FF5722',
    isPublicHoliday: false,
  },
];

// Get festivals for a specific month
export function getFestivalsByMonth(month: number): Festival[] {
  return FESTIVALS.filter((f) => f.month === month);
}

// Get festivals for a specific date
export function getFestivalsByDate(month: number, day: number): Festival[] {
  return FESTIVALS.filter((f) => f.month === month && f.day === day);
}

// Get festivals by type
export function getFestivalsByType(type: Festival['type']): Festival[] {
  return FESTIVALS.filter((f) => f.type === type);
}

// Get public holidays for a month
export function getPublicHolidaysByMonth(month: number): Festival[] {
  return FESTIVALS.filter((f) => f.month === month && f.isPublicHoliday);
}

// Get upcoming festivals
export function getUpcomingFestivals(currentMonth: number, currentDay: number, count: number = 5): Festival[] {
  const sortedFestivals = [...FESTIVALS].sort((a, b) => {
    const dateA = a.month * 100 + a.day;
    const dateB = b.month * 100 + b.day;
    return dateA - dateB;
  });

  const currentDate = currentMonth * 100 + currentDay;
  const upcoming = sortedFestivals.filter((f) => {
    const festivalDate = f.month * 100 + f.day;
    return festivalDate >= currentDate;
  });

  if (upcoming.length < count) {
    const remaining = count - upcoming.length;
    const nextYear = sortedFestivals.slice(0, remaining);
    return [...upcoming, ...nextYear];
  }

  return upcoming.slice(0, count);
}
