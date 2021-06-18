import styled from "@emotion/styled";
import FlexRow from "app/components/common/FlexRow";
import { useTasks, useTasksSearchParams } from "hooks/tasks";
import { Fragment } from "react";
import { SwimlaneProps } from "types";
import CreateTask from "./CreateTask";
import More from "./More";
import TaskCard from "./TaskCard";

const Swimlane = ({ swimlane }: { swimlane: SwimlaneProps }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.swimlaneId === swimlane.id);

  return (
    <Container>
      <FlexRow spaceBetween>
        <h4>{swimlane.name}</h4>
        <More swimlane={swimlane} />
      </FlexRow>
      <TasksWrapper>
        {tasks?.map((task) => (
          <Fragment key={task.id}>
            <TaskCard task={task} />
          </Fragment>
        ))}
        <CreateTask swimlaneId={swimlane.id} />
      </TasksWrapper>
    </Container>
  );
};

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
