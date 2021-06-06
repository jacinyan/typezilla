import { ListProps } from "types";
import { Link } from "react-router-dom";
import { Table } from "antd";
import dayjs from "dayjs";

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
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            //https://reacttraining.com/blog/react-router-v6-pre/
            // declare relative paths to append them to the current location
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
