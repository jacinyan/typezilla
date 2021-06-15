import styled from "@emotion/styled";
import { Card } from "antd";
import { useTasks, useTasksSearchParams } from "hooks/tasks";
import { Swimlane } from "types";
import TaskType from "./TaskType";

const KanbanLane = ({ swimlane }: { swimlane: Swimlane }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());

  const tasks = allTasks?.filter((task) => task.swimlaneId === swimlane.id);

  return (
    <Container>
      <Wrapper>
        <h3>{swimlane.name}</h3>
        <div>
          {tasks?.map((task) => (
            <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
              <div>{task.name}</div>
              <TaskType id={task.typeId} />
            </Card>
          ))}
        </div>
      </Wrapper>
    </Container>
  );
};

export default KanbanLane;

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const Wrapper = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
