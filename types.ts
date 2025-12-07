export interface ItineraryItem {
  time: string;
  activity: string;
  locationCN: string;
  locationJP: string;
  note?: string;
  transport?: string;
  isSpecial?: boolean; // For the SEVENTEEN concert
}

export interface DaySchedule {
  date: string;
  displayDate: string;
  weekday: string;
  items: ItineraryItem[];
}

export interface WeatherData {
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow';
  location: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}