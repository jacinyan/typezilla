import { Spin } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import { useDragEnd } from "hooks/dragndrop";
import { useSwimlanes, useSwimlanesSearchParams } from "hooks/kanban";
import { useProjectInURL } from "hooks/projects";
import { useTasks, useTasksSearchParams } from "hooks/tasks";
import { useDocumentTitle } from "hooks/_helpers";
import { Container, LanesContainer } from "./index.styles";
import Drag from "app/components/common/Drag";
import Drop from "app/components/common/Drop";
import DropChild from "app/components/common/DropChild";
import TaskModal from "app/components/common/TaskModal";
import CreateSwimLane from "app/components/kanban/CreateSwimLane";
import SearchPanel from "app/components/kanban/SearchPanel";
import Swimlane from "app/components/kanban/swimlane";
import { Profiler } from "app/components/common/Profiler";

const KanbanScreen = () => {
  useDocumentTitle("Kanban");

  const { data: currProject } = useProjectInURL();
  const { data: swimlanes, isLoading: swimlaneLoading } = useSwimlanes(
    useSwimlanesSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskLoading || swimlaneLoading;

  const onDragEnd = useDragEnd();

  return (
    <Profiler id={"kanban"}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <h1>{currProject?.name} Kanban</h1>
          <SearchPanel />
          {isLoading ? (
            <Spin size={"large"}></Spin>
          ) : (
            <LanesContainer>
              <Drop
                type={"COLUMN"}
                direction={"horizontal"}
                droppableId={"swimlanes"}
              >
                <DropChild style={{ display: "flex" }}>
                  {swimlanes?.map((swimlane, index) => (
                    <Drag
                      key={swimlane.id}
                      draggableId={"swimlane" + swimlane.id}
                      index={index}
                    >
                      <Swimlane swimlane={swimlane} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateSwimLane />
            </LanesContainer>
          )}
          <TaskModal />
        </Container>
      </DragDropContext>
    </Profiler>
  );
};

export default KanbanScreen;
