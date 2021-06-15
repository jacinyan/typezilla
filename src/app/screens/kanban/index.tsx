import SearchPanel from "app/components/kanban/SearchPanel";
import KanbanLane from "app/components/kanban/Swimlane";
import { useSwimlanes, useSwimlanesSearchParams } from "hooks/kanban";
import { useProjecInURL } from "hooks/projects";
import { useDocumentTitle } from "hooks/_helpers";
import { Container } from "./index.styles";

const KanbanScreen = () => {
  useDocumentTitle("Kanban");

  const { data: currProject } = useProjecInURL();
  const { data: swimlanes } = useSwimlanes(useSwimlanesSearchParams());

  return (
    <div>
      <h3>{currProject?.name} Kanban</h3>
      <SearchPanel />
      <Container>
        {swimlanes?.map((swimlane) => (
          <KanbanLane key={swimlane.id} swimlane={swimlane} />
        ))}
      </Container>
    </div>
  );
};

export default KanbanScreen;
