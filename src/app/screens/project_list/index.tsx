import { useState, useEffect } from "react";

import List from "app/screens/project_list/List";
import SearchPanel from "app/screens/project_list/SearchPanel";
import { removeEmptyQueryValues } from "utils";
import { useDebounce, useMount, useConfigureFetch } from "hooks";

const ProjectListScreen = () => {
  //query params
  const [params, setParams] = useState({
    name: "",
    teamLeadId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const configuredFetch = useConfigureFetch();

  const debouncedParams = useDebounce(params, 500);

  useEffect(() => {
    configuredFetch("projects", {
      data: removeEmptyQueryValues(debouncedParams),
    }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams]);

  useMount(() => {
    configuredFetch("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
