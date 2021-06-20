import React from "react";
import { DroppableProvided, DroppableProvidedProps } from "react-beautiful-dnd";

type DropChildProps = Partial<
  {
    provided: DroppableProvided;
  } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;

const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
        {props.provided?.placeholder}
      </div>
    );
  }
);

export default DropChild;
