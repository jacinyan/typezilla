import Column from "app/components/kanban/Column";
import { useKanbans, useKanbansSearchParams } from "hooks/kanbans";
import { useProjectDetailsFromURL } from "hooks/projects";
import { useDocumentTitle } from "hooks/_helpers";
import { Container } from "./index.styles";

const KanbanScreen = () => {
  useDocumentTitle("Kanban List");

  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  const { data: currProject } = useProjectDetailsFromURL();

  return (
    <div>
      <h3>{currProject?.name} Kanban</h3>
      <Container>
        {kanbans?.map((kanban) => (
          <Column key={kanban.id} kanban={kanban} />
        ))}
      </Container>
    </div>
  );
};

export default KanbanScreen;
