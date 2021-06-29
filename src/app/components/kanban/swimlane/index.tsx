import React from "react";
import { SwimlaneProps } from "types";
import { useTasks, useTasksSearchParams } from "hooks/tasks";
import Drop from "app/components/common/Drop";
import Drag from "app/components/common/Drag";
import DropChild from "app/components/common/DropChild";
import FlexRow from "app/components/common/FlexRow";
import CreateTask from "../CreateTask";
import More from "../More";
import TaskCard from "../TaskCard";
import { Container, TasksWrapper } from "./index.styles";

const Swimlane = React.forwardRef<HTMLDivElement, { swimlane: SwimlaneProps }>(
  ({ swimlane, ...restProps }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter((task) => task.swimlaneId === swimlane.id);

    return (
      <Container ref={ref} {...restProps}>
        <FlexRow spaceBetween>
          <h4>{swimlane.name}</h4>
          <More swimlane={swimlane} key={swimlane.id} />
        </FlexRow>
        <TasksWrapper>
          <Drop
            type={"ROW"}
            direction={"vertical"}
            droppableId={String(swimlane.id)}
          >
            {/* the style prop avoids replacing a task being rejected when a swimlane is empty */}
            <DropChild style={{ minHeight: "5px" }}>
              {tasks?.map((task, index) => (
                <Drag
                  key={task.id}
                  index={index}
                  draggableId={"task" + task.id}
                >
                  {/* HTMLDivElement to forward the ref */}
                  <div>
                    <TaskCard task={task} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask swimlaneId={swimlane.id} />
        </TasksWrapper>
      </Container>
    );
  }
);

export default Swimlane;
