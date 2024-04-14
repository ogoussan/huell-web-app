import { MessageType } from '../enums';

export interface Document {
  _id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Message extends Document{
  type: MessageType;
  content: string;
  date: Date;
}

export interface Chat extends Document{
  name: string;
}

export interface ResponseError {
  statusCode: number;
  error: string;
  message?: string[];
}