import {VStack, Box, Button, Text, Spinner, HStack, Center, useDisclosure} from "@chakra-ui/react"
import {CustomInput} from "../../components/input/CustomInput.tsx";
import {Send, Trash2} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage.tsx";
import {activeStyle} from "../../theme/style.ts";
import {useChatStream, useDeleteChat} from "../../services/chat.service.ts";
import {CustomSelect} from "../../components/input/CustomSelect.tsx";
import {Chat} from "../../interfaces";
import {ChatMessageType} from "../../enums";
import {SimpleModal} from "../../components/container/SimpleModal.tsx";

export const ChatPage = () => {
  const [selectedSessionId, setSelectedSessionId]
    = useState<string>();
  const {chats = [], isChatsPending, messages = [], isStreaming, fetchData} = useChatStream(selectedSessionId);
  const { mutate: deleteChat } = useDeleteChat();
  const [input, setInput] = useState('');
  const [ isFirstChatFetched, setIsFirstChatFetched ] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    if (chats.length && !isFirstChatFetched) {
      const [firstChat]: Chat[] = chats;
      setSelectedSessionId(firstChat.sessionId);
      setIsFirstChatFetched(true);
    }
  }, [chats]);

  useEffect(() => {
    if (messages.length) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim()) {
      return
    }

    fetchData!(input);
    setInput('');
  }

  const handleNewChat = () => {
    setIsNewChat(true);
    setSelectedSessionId(undefined);
  }

  const handleDelete = () => {
    deleteChat(selectedSessionId);
    setSelectedSessionId(undefined);
    onClose();
  }

  return (
      <>
        <SimpleModal
          title="Delete Chat"
          isOpen={isOpen}
          onClose={onClose}
          primaryButton={{label: 'delete', onClick: handleDelete}}
          secondaryButton={{label: 'cancel', onClick: onClose}}
        >
          <Text>Are you sure you want to delete this chat?</Text>
        </SimpleModal>
        <VStack w="100%" h="100%" bg="gray.600" p={12} rounded="md">
          {isChatsPending ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              <Button p={4} w="100%" onClick={handleNewChat}>
                <Text>New Chat</Text>
              </Button>
              <HStack w="100%">
                <CustomSelect
                  options={[...chats, {name: 'New Chat', sessionId: ''}]}
                  getValue={(chat: Chat) => chat.sessionId}
                  getLabel={(chat: Chat) => chat.name}
                  onChange={(value) => setSelectedSessionId(value)}
                  value={selectedSessionId || ''}
                  hiddenValues={isNewChat ? [] : ['']}
                />
                <Button colorScheme={'red'} onClick={onOpen}><Trash2 size={32} /></Button>
              </HStack>
              <VStack gap={2} w="100%" overflow="scroll" py={8} px={4} ref={scrollContainerRef}>
                {messages.map((message, i) => (
                  <Box p={4} borderRadius={8} w="100%" key={i} bg="gray.700">
                    <ChatMessage
                      name={message.type === ChatMessageType.HUMAN ? 'You' : 'Assistant'}
                      message={message.data.content}
                    />
                  </Box>
                ))}
              </VStack>
              <VStack w="100%" mt="auto">
                <CustomInput
                  placeholder="Ask me anything..."
                  placeholderColor={"gray.400"}
                  value={input}
                  onChange={(value) => setInput(value)}
                  onEnterKeyPressed={handleSubmit}
                  rightElement={
                    <Button isDisabled={!input.trim() || isStreaming} onClick={handleSubmit} p={2} cursor="pointer" _hover={activeStyle}>
                      {isStreaming ? (<Spinner />) : (<Send />)}
                    </Button>
                  }
                />
              </VStack>
            </>
          )}
        </VStack>
      </>
  )
}