import { Festival, getFestivalsByDate } from '../constants/festivals';
import historicalEventsData from '../data/historicalEvents.json';
import famousPeopleData from '../data/famousPeople.json';
import { HistoricalEvent, FamousPerson, DayEvent } from '../types/events';

const historicalEvents: HistoricalEvent[] = historicalEventsData as HistoricalEvent[];
const famousPeople: FamousPerson[] = famousPeopleData as FamousPerson[];

export const getHistoricalEventsByDate = (day: number, month: number): HistoricalEvent[] => {
  return historicalEvents.filter(event => event.day === day && event.month === month);
};

export const getFamousPeopleByDate = (day: number, month: number): FamousPerson[] => {
  return famousPeople.filter(person => {
    const isBirthDay = person.birthDay === day && person.birthMonth === month;
    const isDeathDay = person.deathDay === day && person.deathMonth === month;
    return isBirthDay || isDeathDay;
  });
};

export const getEventsByDate = (day: number, month: number, year: number): DayEvent[] => {
  const events: DayEvent[] = [];
  
  // Get festivals
  const festivals = getFestivalsByDate(month, day, year);
  festivals.forEach(festival => {
    events.push({
      id: `festival-${festival.id}`,
      type: 'festival',
      titleBn: festival.nameBn,
      titleEn: festival.nameEn,
      date: `${day}/${month}/${year}`,
      color: festival.color,
      data: festival,
    });
  });
  
  // Get historical events
  const histEvents = getHistoricalEventsByDate(day, month);
  histEvents.forEach(event => {
    events.push({
      id: `historical-${event.id}`,
      type: 'historical',
      titleBn: event.titleBn,
      titleEn: event.titleEn,
      date: `${day}/${month}/${event.year}`,
      color: event.color,
      data: event,
    });
  });
  
  // Get famous people (birthdays and death anniversaries)
  const people = getFamousPeopleByDate(day, month);
  people.forEach(person => {
    const isBirthDay = person.birthDay === day && person.birthMonth === month;
    const isDeathDay = person.deathDay === day && person.deathMonth === month;
    
    events.push({
      id: `person-${person.id}`,
      type: 'person',
      titleBn: isBirthDay ? `${person.nameBn} জন্মদিন` : `${person.nameBn} স্মৃতি দিবস`,
      titleEn: isBirthDay ? `${person.nameEn} Birthday` : `${person.nameEn} Memorial`,
      date: isBirthDay ? `${person.birthDay}/${person.birthMonth}/${person.birthYear}` : `${person.deathDay}/${person.deathMonth}/${person.deathYear}`,
      color: person.color,
      data: person,
    });
  });
  
  return events.sort((a, b) => {
    // Sort by type: festival first, then historical, then person
    const typeOrder = { festival: 1, historical: 2, person: 3 };
    return typeOrder[a.type] - typeOrder[b.type];
  });
};

export const hasEventsOnDate = (day: number, month: number, year: number): boolean => {
  const festivals = getFestivalsByDate(month, day, year);
  const histEvents = getHistoricalEventsByDate(day, month);
  const people = getFamousPeopleByDate(day, month);
  
  return festivals.length > 0 || histEvents.length > 0 || people.length > 0;
};
