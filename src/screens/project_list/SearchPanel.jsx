import React from "react";

const SearchPanel = ({ params, setParams, users }) => {
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
        <option value="">Team Lead</option>
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
