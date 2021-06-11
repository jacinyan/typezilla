import React from "react";
import { Select } from "antd";
import { StringOrNumber } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

//'value' accepts various types
//'onChange' calls callbacks that accept only 'number|undefined'
//when isNan(Number(value)) is true, defaultOption is selected and subsequently 'onChange' calls callbacks that accept undefined only
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: StringOrNumber | null | undefined;
  onChange?: (value?: number) => void;
  defaultOption?: string;
  options?: { name: string; id: number }[];
}

const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOption, options, ...restProps } = props;
  const toNumber = (value: unknown) =>
    isNaN(Number(value)) ? 0 : Number(value);

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOption && (
        <Select.Option value={0}>{defaultOption}</Select.Option>
      )}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IdSelect;
