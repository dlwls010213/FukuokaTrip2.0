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

// PWA Install Event Types
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}