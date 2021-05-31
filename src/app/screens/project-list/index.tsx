import { useState, useEffect } from "react";
import { useDebounce, useMount, useConfigureFetch, useAsync } from "hooks";

import List from "app/components/project-list/List";
import SearchPanel from "app/components/project-list/SearchPanel";
import { Project } from "types";
import { removeEmptyQueryValues } from "utils";
import * as S from "./index.styles";

const ProjectListScreen = () => {
  //query params
  const [paramsObj, setParamsObj] = useState({
    name: "",
    teamLeadId: "",
  });
  const [users, setUsers] = useState([]);

  const { call, loading, error, data: list } = useAsync<Project[]>();
  const myFetch = useConfigureFetch();
  const debouncedParams = useDebounce(paramsObj, 500);

  useEffect(() => {
    call(
      myFetch("projects", {
        params: removeEmptyQueryValues(debouncedParams),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams]);

  useMount(() => {
    myFetch("users").then(setUsers);
  });

  return (
    <S.Container>
      <h1>Project List</h1>
      <SearchPanel
        paramsObj={paramsObj}
        setParamsObj={setParamsObj}
        users={users}
      />
      <List users={users} loading={loading} dataSource={list || []} />
    </S.Container>
  );
};

export default ProjectListScreen;
