import { Spin } from "antd";
import TaskModal from "app/components/common/TaskModal";
import { CreateSwimLane } from "app/components/kanban/CreateSwimLane";
import SearchPanel from "app/components/kanban/SearchPanel";
import Swimlane from "app/components/kanban/swimlane/Swimlane";
import { useSwimlanes, useSwimlanesSearchParams } from "hooks/kanban";
import { useProjectInURL } from "hooks/projects";
import { useTasks, useTasksSearchParams } from "hooks/tasks";
import { useDocumentTitle } from "hooks/_helpers";
import { Fragment } from "react";
import { Container, LanesContainer } from "./index.styles";

const KanbanScreen = () => {
  useDocumentTitle("Kanban");

  const { data: currProject } = useProjectInURL();
  const { data: swimlanes, isLoading: swimlaneLoading } = useSwimlanes(
    useSwimlanesSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskLoading || swimlaneLoading;

  return (
    <Container>
      <h1>{currProject?.name} Kanban</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"}></Spin>
      ) : (
        <LanesContainer>
          {swimlanes?.map((swimlane) => (
            <Fragment key={swimlane.id}>
              <Swimlane swimlane={swimlane} />
            </Fragment>
          ))}
          <CreateSwimLane />
        </LanesContainer>
      )}
      <TaskModal />
    </Container>
  );
};

export default KanbanScreen;
