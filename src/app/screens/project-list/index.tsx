import { Button } from "antd";
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
import ErrorBox from "app/components/common/ErrorBox";
import FlexRow from "app/components/common/FlexRow";
import { Profiler } from "app/components/common/Profiler";

const ProjectListScreen = () => {
  useDocumentTitle("Project List", false);
  // console.count("ProjectListScreen");
  const { open } = useProjectModal();

  const [params, setParams] = useProjectsSearchParams();
  const {
    isLoading,
    data: list,
    error,
  } = useProjects(useDebounce(params, 500));

  const { data: users } = useUsers();

  return (
    <Profiler id={"project-list"}>
      <Container>
        <FlexRow spaceBetween marginBottom={2}>
          <h1>Project List</h1>
          <Button onClick={open}>Create Project</Button>
        </FlexRow>
        <SearchPanel
          params={params}
          setParams={setParams}
          users={users || []}
        />
        {error && <ErrorBox error={error} />}
        <List users={users || []} loading={isLoading} dataSource={list || []} />
      </Container>
    </Profiler>
  );
};

// ProjectListScreen.whyDidYouRender = true;
// class ProjectListScreen extends React.Component<any, any>{
// static whyDidYouRender = true
//....
// }

export default ProjectListScreen;
