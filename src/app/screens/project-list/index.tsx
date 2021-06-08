import { Typography } from "antd";
import SearchPanel from "app/components/project-list/SearchPanel";
import List from "app/components/project-list/List";
import { useProjects, useProjectsSearchParams } from "hooks/projects";
import { useDebounce, useDocumentTitle } from "hooks/_helpers";
import { useUsers } from "hooks/users";
import * as S from "./index.styles";

const ProjectListScreen = () => {
  // console.count("ProjectListScreen");
  useDocumentTitle("Project List", false);

  const [paramsObj, setParamsObj] = useProjectsSearchParams();
  const {
    isLoading,
    data: list,
    error,
    retry,
  } = useProjects(useDebounce(paramsObj, 500));
  const { data: users } = useUsers();

  return (
    <S.Container>
      <h1>Project List</h1>
      <SearchPanel
        paramsObj={paramsObj}
        setParamsObj={setParamsObj}
        users={users || []}
      />
      {error && (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      )}
      <List
        refresh={retry}
        users={users || []}
        loading={isLoading}
        dataSource={list || []}
      />
    </S.Container>
  );
};

ProjectListScreen.whyDidYouRender = false;
// class ProjectListScreen extends React.Component<any, any>{
// static whyDidYouRender = true
// }

export default ProjectListScreen;
