import {
  useDebounce,
  useDocumentTitle,
  useProjects,
  useUrlQueryParams,
  useUsers,
} from "hooks";
import List from "app/components/project-list/List";
import SearchPanel from "app/components/project-list/SearchPanel";
import { Typography } from "antd";
import * as S from "./index.styles";

const ProjectListScreen = () => {
  // console.count("ProjectListScreen");
  useDocumentTitle("Project List", false);
  //#region
  //   (alias) useUrlQueryParams<"name" | "teamLeadId">(keys: ("name" | "teamLeadId")[]//): readonly [{
  //     name: string;
  //     teamLeadId: string;
  // }, (params: Partial<{
  //     name: unknown;
  //     teamLeadId: unknown;
  // }>) => void]
  //#endregion

  const [paramsObj, setParamsObj] = useUrlQueryParams(["name", "teamLeadId"]);
  const debouncedParams = useDebounce(paramsObj, 500);
  const { isLoading, data: list, error } = useProjects(debouncedParams);
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
      <List users={users || []} loading={isLoading} dataSource={list || []} />
    </S.Container>
  );
};

ProjectListScreen.whyDidYouRender = false;
// class ProjectListScreen extends React.Component<any, any>{
// static whyDidYouRender = true
// }

export default ProjectListScreen;
