import { Message } from './Message';
export interface Prompt {
  maxAttempts: number;
  messages: Message[];
  responseCard?: string;
}