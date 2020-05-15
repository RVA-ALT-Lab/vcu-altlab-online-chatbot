import { Message } from './Message';
export interface Statement {
  messages: Message[];
  responseCard: string;
}