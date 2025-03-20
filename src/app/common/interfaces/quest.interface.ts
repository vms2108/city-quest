import { Screen } from './screen.interface';

// quest.interface.ts
export interface Quest {
  id: string;
  title: string;
  description?: string;
  is_paid: number;
  free_screens_count: number;
  screens_count?: number;
  city_id?: string | null;
  city_link?: string;
  city_name?: string;
  screens?: Screen[];
  created_at?: string;
  updated_at?: string;
}