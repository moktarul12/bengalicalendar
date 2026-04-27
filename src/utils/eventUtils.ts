import { Festival, getFestivalsByDate } from '../constants/festivals';
import historicalEventsData from '../data/historicalEvents.json';
import famousPeopleData from '../data/famousPeople.json';
import { HistoricalEvent, FamousPerson, DayEvent } from '../types/events';

const historicalEvents: HistoricalEvent[] = historicalEventsData as HistoricalEvent[];
const famousPeople: FamousPerson[] = famousPeopleData as FamousPerson[];

const API_BASE_URL = 'http://104.248.202.152:3000/api';

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

export const getEventsByDate = async (day: number, month: number, year: number): Promise<DayEvent[]> => {
  const events: DayEvent[] = [];
  
  try {
    // Fetch from API
    const response = await fetch(`${API_BASE_URL}/date/${day}/${month}`);
    const data = await response.json();
    
    // Process events from API
    if (data.events && Array.isArray(data.events)) {
      data.events.forEach((event: any) => {
        events.push({
          id: event.id,
          type: event.type,
          titleBn: event.titleBn,
          titleEn: event.titleEn,
          date: `${day}/${month}/${event.year || year}`,
          color: event.color,
          data: event,
        });
      });
    }
    
    // Process festivals from API
    if (data.festivals && Array.isArray(data.festivals)) {
      data.festivals.forEach((festival: any) => {
        events.push({
          id: festival.id,
          type: 'festival',
          titleBn: festival.titleBn,
          titleEn: festival.titleEn,
          date: `${day}/${month}/${festival.year || year}`,
          color: festival.color,
          data: festival,
        });
      });
    }
    
    return events.sort((a, b) => {
      // Sort by type: festival first, then historical, then person
      const typeOrder = { festival: 1, historical: 2, person: 3 };
      return typeOrder[a.type] - typeOrder[b.type];
    });
  } catch (error) {
    console.error('Error fetching events from API:', error);
    
    // Fallback to local data if API fails
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
  }
};

export const hasEventsOnDate = async (day: number, month: number, year: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/date/${day}/${month}`);
    const data = await response.json();
    return (data.events && data.events.length > 0) || (data.festivals && data.festivals.length > 0);
  } catch (error) {
    console.error('Error checking events from API:', error);
    // Fallback to local data
    const festivals = getFestivalsByDate(month, day, year);
    const histEvents = getHistoricalEventsByDate(day, month);
    const people = getFamousPeopleByDate(day, month);
    return festivals.length > 0 || histEvents.length > 0 || people.length > 0;
  }
};
