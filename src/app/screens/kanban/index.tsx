import { Spin } from "antd";
import { CreateSwimLane } from "app/components/kanban/CreateSwimLane";
import SearchPanel from "app/components/kanban/SearchPanel";
import Swimlane from "app/components/kanban/Swimlane";
import { useSwimlanes, useSwimlanesSearchParams } from "hooks/kanban";
import { useProjectInURL } from "hooks/projects";
import { useTasks, useTasksSearchParams } from "hooks/tasks";
import { useDocumentTitle } from "hooks/_helpers";
import { Container, LanesWrapper } from "./index.styles";

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
        <LanesWrapper>
          {swimlanes?.map((swimlane) => (
            <Swimlane key={swimlane.id} swimlane={swimlane} />
          ))}
          <CreateSwimLane />
        </LanesWrapper>
      )}
    </Container>
  );
};

export default KanbanScreen;
