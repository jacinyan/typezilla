import React from "react";
import { User } from "screens/project_list/SearchPanel";

interface Project {
  id: string;
  name: string;
  teamLeadId: string;
  pin: boolean;
  team: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Team Lead</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/* async, there can be 'undefined.name' */}
            <td>
              {users.find((user) => user.id === project.teamLeadId)?.name ||
                "Unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
