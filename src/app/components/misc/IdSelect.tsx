import { Select } from "antd";
import React from "react";
import { StringOrNumber } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: StringOrNumber | null | undefined;
  onChange: (value?: number) => void;
  defaultOption?: string;
  options?: { name: string; id: number }[];
}

/**
 * values accepts various types
 * onChange takes callbacks that accepts only 'number|undefined'
 * when isNan(Number(value)) is true, defaultOption is selected
 * when defaultOption is selected, onChange takes undefined
 * @param props
 * @returns
 */
const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOption, options, ...restProps } = props;
  const toNumber = (value: unknown) =>
    isNaN(Number(value)) ? 0 : Number(value);

  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
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
