import {Select} from "@chakra-ui/react";

interface Props<T> {
  options: T[];
  getLabel: (option: any) => string;
  getValue: (option: any) => string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  hiddenValues?: string[]
}

export const CustomSelect = <T,>({options, getLabel, getValue, value, placeholder, onChange, hiddenValues}: Props<T>) => {

  return (
    <Select value={value} size="md" onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}>
      {
        options.map((option) => (
          <option hidden={hiddenValues?.includes(getValue(option))} key={getValue(option)} value={getValue(option)}>
            {getLabel(option)}
          </option>
        ))
      }
    </Select>
  );
}