import {ChatMessageType} from '../enums';

export interface Document {
  _id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Chat extends Document{
  name: string;
  sessionId: string;
  messages: ChatMessage[];
}

export interface ChatMessage extends Document{
  type: ChatMessageType;
  data: {
    content: string;
  }
}

export interface UserChatMessage extends Document{
  content: string;
}

export interface ResponseError {
  statusCode: number;
  error: string;
  message?: string[];
}

export interface DeleteResult {
  /**
   * Raw SQL result returned by executed query.
   */
  raw: any;
  /**
   * Number of affected rows/documents
   * Not all drivers support this
   */
  affected?: number | null;
}