import {VStack, Box, Divider} from "@chakra-ui/react"
import {CustomInput} from "../../components/input/CustomInput.tsx";
import {Send} from "lucide-react";
import {useMemo, useState} from "react";
import {ChatMessage} from "./ChatMessage.tsx";
import {activeStyle} from "../../theme/style.ts";
import {useChats, useMessagesByChatId} from "../../services/chat.service.ts";
import {CustomSelect} from "../../components/input/CustomSelect.tsx";
import {Chat} from "../../interfaces";

export const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const {data: chats = []} = useChats();
  const defaultSelectedChatId = useMemo(() => {
    const [defaultChat] = chats;
    return defaultChat?._id;
  }, [chats]);
  const [selectedChatId, setSelectedChatId]
    = useState<string | undefined>(defaultSelectedChatId);
  const {data: messages = []} = useMessagesByChatId(selectedChatId);

  console.log('chats: ', chats);

  const handleSendMessage = (message: string) => {

  }

    return (
        <VStack w="100%" h="100%" bg="gray.600" p={12} rounded="md">
            <CustomSelect
              options={chats}
              getValue={(chat: Chat) => chat.name}
              getLabel={(chat: Chat) => chat.name}
              onChange={(value) => setSelectedChatId(value)}
              value={selectedChatId}
            />
            <VStack gap={2} w="100%" overflow="scroll" pb={12} divider={<Divider />}>
              {messages.map((message, i) => (
                <Box p={4} borderRadius={8} w="100%" key={i} bg="gray.700">
                  <ChatMessage
                    name={message.type === 'user' ? 'You' : 'Assistant'}
                    message={message.content}
                    date={new Date(message.created_at).toLocaleDateString()}
                  />
                </Box>
              ))}
            </VStack>
            <VStack w="100%" mt="auto">
              <CustomInput
                placeholder="Ask me anything..."
                placeholderColor={"gray.400"}
                onChange={(value) => setInputValue(value)}
                rightElement={<Box p={2} cursor="pointer" _hover={activeStyle} onClick={() => handleSendMessage(inputValue)}><Send /></Box>}
              />
            </VStack>
        </VStack>
    )
}