import React from "react";

const List = ({ list, users }) => {
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
