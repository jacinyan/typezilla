import React, { ReactNode } from "react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";

// replace the default Droppable children prop type with a ReactNode one
type DragProps = Omit<DraggableProps, "children"> & {
  children: ReactNode;
};

const Drag = ({ children, ...restProps }: DragProps) => {
  return (
    <Draggable {...restProps}>
      {(provided) => {
        // clone the children of the DragAndDrop comp, and call cloneElement to add to it some props without explicitly passing them in
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};

export default Drag;
