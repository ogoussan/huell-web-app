import {
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement, Textarea
} from "@chakra-ui/react";
import {HTMLInputTypeAttribute, ReactNode} from "react";

interface Props {
  type?: HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  placeholderColor?: string;
  inputLeftAddon?: ReactNode;
  inputRightAddon?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  onChange?: (value: string) => void;
  onEnterKeyPressed?: () => void;
}

export const CustomInput = ({
                              type = 'text',
                              value,
                              placeholder,
                              placeholderColor,
                              inputLeftAddon,
                              inputRightAddon,
                              leftElement,
                              rightElement,
                              onChange,
                              onEnterKeyPressed,
}: Props) => {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onEnterKeyPressed?.();
    }
  }

  return (
    <InputGroup size='md'>
      {
        inputRightAddon && <InputLeftAddon>{inputLeftAddon}</InputLeftAddon>
      }
      {
        leftElement && <InputLeftElement>{leftElement}</InputLeftElement>
      }
      <Textarea
        type={type}
        resize='none'
        pr='4.5rem'
        placeholder={placeholder}
        _placeholder={{
          color: placeholderColor
        }}
        value={value}
        onKeyDown={handleKeyDown}
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