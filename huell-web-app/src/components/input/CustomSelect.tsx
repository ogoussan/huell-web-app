import {Select} from "@chakra-ui/react";

interface Props<T> {
  options: T[];
  getLabel: (option: unknown) => string;
  getValue: (option: unknown) => string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const CustomSelect = <T,>({options, getLabel, getValue, value, placeholder, onChange}: Props<T>) => {

  return (
    <Select value={value} size="md" onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}>
      {
        options.map((option) => (
          <option key={getValue(option)} value={getValue(option)}>
            {getLabel(option)}
          </option>
        ))
      }
    </Select>
  );
}