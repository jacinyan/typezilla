import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  team: string;
}

interface SearchPanelProps {
  users: User[];
  params: {
    name: string;
    teamLeadId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
}
const SearchPanel = ({ params, setParams, users }: SearchPanelProps) => {
  return (
    <form>
      <input
        type="text"
        value={params.name}
        onChange={(e) =>
          setParams({
            ...params,
            name: e.target.value,
          })
        }
        placeholder="Project Name"
      />
      <select
        value={params.teamLeadId}
        onChange={(e) =>
          setParams({
            ...params,
            teamLeadId: e.target.value,
          })
        }
      >
        <option value="">Select Team Lead</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchPanel;
