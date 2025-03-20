import { Quest } from './quest.interface';

export interface City {
  id: string;
  name: string;
  link: string;
  quests?: Quest[];
  parameters?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}
