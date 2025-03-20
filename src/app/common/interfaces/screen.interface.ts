import { Block } from './block.interface';

export interface Screen {
  id: string;
  title: string;
  button_text?: string;
  parameters?: Record<string, any>;
  type: string;
  blocks?: Block[];
  created_at?: string;
  updated_at?: string;
}
