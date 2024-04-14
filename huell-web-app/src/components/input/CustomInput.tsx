import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement
} from "@chakra-ui/react";
import {HTMLInputTypeAttribute, ReactNode} from "react";

interface Props {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  placeholderColor?: string;
  inputLeftAddon?: ReactNode;
  inputRightAddon?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  onChange?: (value: string) => void;
}

export const CustomInput = ({
                              type = 'text',
                              placeholder,
                              placeholderColor,
                              inputLeftAddon,
                              inputRightAddon,
                              leftElement,
                              rightElement,
                              onChange
}: Props) => {
  return (
    <InputGroup size='md'>
      {
        inputRightAddon && <InputLeftAddon>{inputLeftAddon}</InputLeftAddon>
      }
      {
        leftElement && <InputLeftElement>{leftElement}</InputLeftElement>
      }
      <Input
        type={type}
        pr='4.5rem'
        placeholder={placeholder}
        _placeholder={{
          color: placeholderColor
        }}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {
        rightElement && <InputRightElement>{rightElement}</InputRightElement>
      }
      {
        inputRightAddon && <InputRightAddon>{inputRightAddon}</InputRightAddon>
      }
    </InputGroup>
  );
}