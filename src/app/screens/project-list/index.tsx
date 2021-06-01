import { useState } from "react";
import { useDebounce, useProjects, useUsers } from "hooks";
import List from "app/components/project-list/List";
import SearchPanel from "app/components/project-list/SearchPanel";
import { Typography } from "antd";
import * as S from "./index.styles";

const ProjectListScreen = () => {
  // console.count("ProjectListScreen");

  //query params
  const [paramsObj, setParamsObj] = useState({
    name: "",
    teamLeadId: "",
  });

  const debouncedParams = useDebounce(paramsObj, 500);
  const { loading, data: list, error } = useProjects(debouncedParams);
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
      <List users={users || []} loading={loading} dataSource={list || []} />
    </S.Container>
  );
};

export default ProjectListScreen;
