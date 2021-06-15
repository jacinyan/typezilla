import SearchPanel from "app/components/kanban/SearchPanel";
import KanbanLane from "app/components/kanban/Swimlane";
import { useSwimlanes, useSwimlanesSearchParams } from "hooks/kanban";
import { useProjecInURL } from "hooks/projects";
import { useDocumentTitle } from "hooks/_helpers";
import { Container, Wrapper } from "./index.styles";

const KanbanScreen = () => {
  useDocumentTitle("Kanban");

  const { data: currProject } = useProjecInURL();
  const { data: swimlanes } = useSwimlanes(useSwimlanesSearchParams());

  return (
    <Container>
      <h1>{currProject?.name} Kanban</h1>
      <SearchPanel />
      <Wrapper>
        {swimlanes?.map((swimlane) => (
          <KanbanLane key={swimlane.id} swimlane={swimlane} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default KanbanScreen;
