import { useState, useEffect } from "react";
import qs from "qs";

import List from "screens/project_list/List";
import SearchPanel from "screens/project_list/SearchPanel";
import { removeURLEmptyValues } from "utils";

const api_URL = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    teamLeadId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${api_URL}/projects?${qs.stringify(removeURLEmptyValues(params))}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.json());
        }
      })
      .then((data) => setList(data))
      .catch((error) => console.dir(error.message));
  }, [params]);

  useEffect(() => {
    fetch(`${api_URL}/users`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.json());
        }
      })
      .then((data) => setUsers(data))
      .catch((error) => console.dir(error.message));
  }, []);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
