import {Avatar, HStack, VStack, Text} from "@chakra-ui/react";

interface Props {
  name: string,
  message: string,
}

export const ChatMessage = ({name, message}: Props) => {
  return (
    <HStack width="100%" alignItems="flex-start">
      <Avatar name={name} />
      <VStack width="100%" alignItems="flex-start">
        <Text style={{fontWeight: "bold"}}>{name}</Text>
        <Text width="100%">{message}</Text>
      </VStack>
    </HStack>
  );
}