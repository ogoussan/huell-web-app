import request, {RequestError} from "./api.service.ts";
import {Chat, Message} from "../interfaces";
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {RequestBody} from "../types";

export const useChats = (
): UseQueryResult<Chat[]> =>
  useQuery({
    queryKey: ['chat'],
    queryFn: () => request<Chat[]>(`/chat`),
  });

export const useMessagesByChatId = (
  chatId?: string
): UseQueryResult<Message[]> =>
  useQuery({
    queryKey: ['message', 'chat', chatId],
    queryFn: () => request(`/message/chat/${chatId}`),
    enabled: !!chatId,
  });

export const useCreateMessage = (): UseMutationResult<
  Message,
  RequestError,
  RequestBody<Partial<Message>>
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['message', 'create'],
    mutationFn: (data) => {
      return request<Message>(`/message`, {
        method: 'POST',
        data,
      });
    },

    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['message', 'chat', message.chatId] });
    },
    onError: (e) => {
      console.error(e);
    },
  });
};