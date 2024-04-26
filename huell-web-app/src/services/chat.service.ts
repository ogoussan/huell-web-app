import request, {RequestError, requestWithResponse} from "./api.service.ts";
import {Chat, ChatMessage, DeleteResult} from "../interfaces";
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {useEffect, useMemo, useState} from "react";
import {ChatMessageType} from "../enums";

export const useChats = (
): UseQueryResult<Chat[]> =>
  useQuery({
    queryKey: ['chats'],
    queryFn: () => request<Chat[]>(`/chat`),
  });

export const useDeleteChat = (): UseMutationResult<
  DeleteResult,
  RequestError,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['chats', 'delete'],
    mutationFn: (sessionId: string) =>
      request<DeleteResult>(`/chat/${sessionId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'], exact: true });
    },
  });
};

export const useChatStream = (sessionId?: string) => {
  const { data: chats = [] as Chat[], isPending: isChatsPending } = useChats();
  const retrievedMessages =
    useMemo(() => chats.find(chat => chat.sessionId === sessionId)?.messages || [], [chats, sessionId]);
  const [storedMessages, setStoredMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const storeMessage = (input: string, type: ChatMessageType) => {
    if (sessionId) {
      setStoredMessages(prev => [...prev, {
        type,
        data: {
          content: input,
        },
      }] as ChatMessage[]);
    }
  };

  const fetchData = async (input: string) => {
    try {
      setIsStreaming(true);
      storeMessage(input, ChatMessageType.HUMAN);
      const response = await requestWithResponse<string>(`/chat/${sessionId}`, {
        method: 'POST',
        data: { content: input },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const answer = response.data; // Assuming response.data is a single string

      storeMessage(answer, ChatMessageType.AI);
    } catch (error) {
      console.error('Error receiving chat stream:', error);
    } finally {
      setIsStreaming(false);
    }
  };



  useEffect(() => {

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [sessionId]);

  return {
    chats,
    isChatsPending,
    messages: [...retrievedMessages, ...storedMessages],
    isStreaming,
    fetchData,
  };
};

