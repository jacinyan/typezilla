import React, { ReactNode } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

// replace the default Droppable children prop type with a ReactNode one
type DropProps = Omit<DroppableProps, "children"> & {
  children: ReactNode;
};

const Drop = ({ children, ...restProps }: DropProps) => {
  return (
    <Droppable {...restProps}>
      {(provided) => {
        // clone the children of the DragAndDrop comp, and call cloneElement to add to it some props without explicitly passing them in
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};

export default Drop;
