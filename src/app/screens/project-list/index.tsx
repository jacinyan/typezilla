import { useState, useEffect } from "react";
import List from "app/components/project-list/List";
import SearchPanel from "app/components/project-list/SearchPanel";
import { removeEmptyQueryValues } from "utils";
import { useDebounce, useMount, useConfigureFetch } from "hooks";
import * as S from "./index.styles";

const ProjectListScreen = () => {
  //query params
  const [paramsObj, setParamsObj] = useState({
    name: "",
    teamLeadId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const myFetch = useConfigureFetch();
  const debouncedParams = useDebounce(paramsObj, 500);

  useEffect(() => {
    myFetch("projects", {
      params: removeEmptyQueryValues(debouncedParams),
    }).then(setList);
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
      <List list={list} users={users} />
    </S.Container>
  );
};

export default ProjectListScreen;
