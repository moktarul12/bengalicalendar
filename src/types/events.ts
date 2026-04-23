export interface HistoricalEvent {
  id: string;
  day: number;
  month: number;
  year: number;
  titleBn: string;
  titleEn: string;
  type: 'historical' | 'cultural';
  color: string;
  details: {
    descriptionBn: string;
    descriptionEn: string;
    significanceBn: string;
    significanceEn: string;
    keyFiguresBn: string;
    keyFiguresEn: string;
    legacyBn: string;
    legacyEn: string;
  };
}

export interface FamousPerson {
  id: string;
  nameBn: string;
  nameEn: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  deathDay?: number;
  deathMonth?: number;
  deathYear?: number;
  type: 'person';
  color: string;
  category: 'literature' | 'politics' | 'science' | 'arts' | 'sports';
  details: {
    biographyBn: string;
    biographyEn: string;
    achievementsBn: string;
    achievementsEn: string;
    worksBn: string;
    worksEn: string;
    legacyBn: string;
    legacyEn: string;
  };
}

export interface DayEvent {
  id: string;
  type: 'festival' | 'historical' | 'person';
  titleBn: string;
  titleEn: string;
  date: string;
  color: string;
  data: HistoricalEvent | FamousPerson | any;
}
