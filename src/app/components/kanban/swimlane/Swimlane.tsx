import React from "react";
import styled from "@emotion/styled";
import Drop from "app/components/common/Drop";
import Drag from "app/components/common/Drag";
import FlexRow from "app/components/common/FlexRow";
import { useTasks, useTasksSearchParams } from "hooks/tasks";
import { SwimlaneProps } from "types";
import CreateTask from "./CreateTask";
import More from "./More";
import TaskCard from "./TaskCard";
import DropChild from "app/components/common/DropChild";

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
            <DropChild>
              {tasks?.map((task, index) => (
                <Drag
                  key={task.id}
                  index={index}
                  draggableId={"task" + task.id}
                >
                  {/* HTMLDivElement to forward ref */}
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

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksWrapper = styled.div`
  overflow-x: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
