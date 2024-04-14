import {VStack, Box, Divider, Button, Text, Spinner} from "@chakra-ui/react"
import {CustomInput} from "../../components/input/CustomInput.tsx";
import {Send} from "lucide-react";
import {useEffect, useState} from "react";
import {ChatMessage} from "./ChatMessage.tsx";
import {activeStyle} from "../../theme/style.ts";
import {useChats, useCreateMessage, useMessagesByChatId} from "../../services/chat.service.ts";
import {CustomSelect} from "../../components/input/CustomSelect.tsx";
import {Chat} from "../../interfaces";
import {MessageType} from "../../enums";

export const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const {data: chats = []} = useChats();
  const [ isFirstChatFetched, setIsFirstChatFetched ] = useState(false);
  const [selectedChatId, setSelectedChatId]
    = useState<string>('new');
  const {data: messages = []} = useMessagesByChatId(selectedChatId);
  const { mutate: sendMessage,isPending } = useCreateMessage();

  useEffect(() => {
    if (chats.length && !isFirstChatFetched) {
      const [firstChat] = chats;
      setSelectedChatId(firstChat._id);
      setIsFirstChatFetched(false);
    }
  }, [chats]);

  const handleSend = (): void => {
    sendMessage({
      type: MessageType.USER,
      chatId: selectedChatId,
      content: inputValue
    });
  }

  return (
      <VStack w="100%" h="100%" bg="gray.600" p={12} rounded="md">
          <Button w="100%">
            <Text>New Chat</Text>
          </Button>
          <CustomSelect
            options={[...chats, {name: 'New Chat', _id: 'new'}]}
            getValue={(chat: Chat) => chat._id}
            getLabel={(chat: Chat) => chat.name}
            onChange={(value) => setSelectedChatId(value)}
            value={selectedChatId}
            hiddenValues={['new']}
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
              value={inputValue}
              onChange={(value) => setInputValue(value)}
              rightElement={
                <Box onClick={handleSend} p={2} cursor="pointer" _hover={activeStyle}>
                  {isPending ? (<Spinner />) : (<Send />)}
                </Box>
              }
            />
          </VStack>
      </VStack>
  )
}