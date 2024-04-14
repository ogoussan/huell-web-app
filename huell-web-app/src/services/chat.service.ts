import request from "./api.service.ts";
import {Chat, Message} from "../interfaces";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

export const useChats = <T extends Chat[]>(
): UseQueryResult<Chat[]> =>
  useQuery({
    queryKey: ['chat'],
    queryFn: () => request<Chat[]>(`/chat`),
  });

export const useMessagesByChatId = <T extends Chat[]>(
  chatId?: string
): UseQueryResult<Message[]> =>
  useQuery({
    queryKey: ['message', 'chat', chatId],
    queryFn: () => request(`/message/chat/${chatId}`),
    enabled: !!chatId,
  });