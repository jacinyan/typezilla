import { Project, User } from "types";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import dayjs from "dayjs";

// access the Project types
interface ListProps extends TableProps<Project> {
  users: User[];
}
//pseudo: type RestPropsType = Omit<ListProps, 'users'>
const List = ({ users, ...restProps }: ListProps) => {
  // console.log(users, restProps);

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Team",
          dataIndex: "team",
          sorter: (a, b) => a.team.localeCompare(b.team),
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
        {
          title: "Created At",
          render(value, project) {
            return (
              <span>
                {project.createdAt
                  ? dayjs(project.createdAt).format("DD-MM-YYYY")
                  : "Null"}
              </span>
            );
          },
        },
      ]}
      {...restProps}
    ></Table>
  );
};

export default List;
