import { useState, useEffect } from "react";
import qs from "qs";

import List from "app/screens/project_list/List";
import SearchPanel from "app/screens/project_list/SearchPanel";
import { removeEmptyQueryValues } from "utils";
import { useDebounce, useMount } from "hooks";

const api_URL = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  //query params
  const [params, setParams] = useState({
    name: "",
    teamLeadId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const debouncedParams = useDebounce(params, 700);

  useEffect(() => {
    fetch(
      `${api_URL}/projects?${qs.stringify(
        removeEmptyQueryValues(debouncedParams)
      )}`
    )
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error(await response.json());
        }
      })
      .then((data) => setList(data))
      .catch((error) => console.dir(error.message));
  }, [debouncedParams]);

  useMount(() => {
    fetch(`${api_URL}/users`)
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error(await response.json());
        }
      })
      .then((data) => setUsers(data))
      .catch((error) => console.dir(error));
  });

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
