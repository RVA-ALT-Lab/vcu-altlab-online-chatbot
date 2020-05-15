import { Prompt } from './Prompt'
import { Statement } from './Statement'

export interface Bot {
  name: string;
  description: string;
  intents?: [];
  clarificationPrompt?: Prompt;
  abortStatement: Statement;
  processBehavior: ProcessBehavior;
  status: Status;
  lastUpdatedDate: string;
  createdDate: string;
  idleSessionTTLInSeconds: number;
  voiceId: string;
  locale: string;
  childDirected: boolean;
}

export enum ProcessBehavior {
  BUILD = 'BUILD',
  SAVE = 'SAVE'
}

export enum Status {
  BUILDING = 'BUILDING',
  READY = 'READY',
  READY_BASIC_TESTING = 'READY_BASIC_TESTING',
  FAILED = 'FAILED',
  NOT_BUILT = 'NOT_BUILT'
}