import { Link } from "react-router-dom";
import { Dropdown, Menu, Table } from "antd";
import { TableProps } from "antd/lib/table";
import { useEditProject } from "hooks/projects";
import Marking from "../misc/Marking";
import { User, Project } from "types";
import dayjs from "dayjs";
import { StyledButton } from "../misc/GeneralComps";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

//pseudo: type RestPropsType = Omit<ListProps, 'users'>
const List = ({ users, ...restProps }: ListProps) => {
  // console.log(users, restProps);
  const { mutate } = useEditProject();
  // curried point free because of existing projectId awaiting a marked prop later
  const markProject = (id: number) => (marked: boolean) =>
    //refresh on updates
    mutate({ id, marked }).then(restProps.refresh);

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Marking checked disabled />,
          render(value, project) {
            return (
              <Marking
                checked={project.marked}
                onCheckedChange={markProject(project.id)}
              />
            );
          },
        },
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
                {users.find((user) => user.id === project.supervisorId)?.name ||
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}></Menu.Item>
                  </Menu>
                }
              >
                <StyledButton type={"link"}>...</StyledButton>
              </Dropdown>
            );
          },
        },
      ]}
      {...restProps}
    ></Table>
  );
};

export default List;
