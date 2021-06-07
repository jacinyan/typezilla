import React from "react";
import { Rate } from "antd";

interface MarkingProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Marking = ({ checked, onCheckedChange, ...restProps }: MarkingProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    ></Rate>
  );
};

export default Marking;
