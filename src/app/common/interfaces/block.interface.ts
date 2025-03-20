import { BlockTypeEnum } from "src/app/ui/constructor-distribution/enums/block-type.enum";

export interface Block {
  id: string;
  title: string;
  type: BlockTypeEnum;
  subtype?: string;
  content: TextContent | ImageContent | AudioContent | InputContent | ChoiceContent;
  order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TextContent {
  text: string;
  text_type: 'header' | 'subheader' | 'quote';
}

export interface ImageContent {
  url: string;
}

export interface AudioContent {
  url: string;
}

export interface InputContent {
  question: string;
  correct_answer: string;
}

export interface ChoiceContent {
  question: string;
  options: string[];
  correct_answer: string;
}