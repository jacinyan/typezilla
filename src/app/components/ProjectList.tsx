import React from "react";
import { User } from "app/components/SearchPanel";
import { Table } from "antd";

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
    <Table
      pagination={false}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Team Lead",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.teamLeadId)?.name ||
                  "Unknown"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};

export default List;
