import SearchPanel from "app/components/project-list/SearchPanel";
import List from "app/components/project-list/List";
import {
  useProjectModal,
  useProjects,
  useProjectsSearchParams,
} from "hooks/projects";
import { useDebounce, useDocumentTitle } from "hooks/_helpers";
import { useUsers } from "hooks/users";
import { Container } from "./index.styles";
import { Button, ErrorBox, Row } from "app/components/misc/General";

const ProjectListScreen = () => {
  useDocumentTitle("Project List", false);
  // console.count("ProjectListScreen");
  const { open } = useProjectModal();

  const [paramsObj, setParamsObj] = useProjectsSearchParams();
  const {
    isLoading,
    data: list,
    error,
  } = useProjects(useDebounce(paramsObj, 500));

  const { data: users } = useUsers();

  return (
    <Container>
      <Row spaceBetween marginBottom={2}>
        <h1>Project List</h1>
        <Button onClick={open} type={"link"}>
          Create Project
        </Button>
      </Row>
      <SearchPanel
        paramsObj={paramsObj}
        setParamsObj={setParamsObj}
        users={users || []}
      />
      {error && <ErrorBox error={error}></ErrorBox>}
      <List users={users || []} loading={isLoading} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;
// class ProjectListScreen extends React.Component<any, any>{
// static whyDidYouRender = true
//....
// }

export default ProjectListScreen;
