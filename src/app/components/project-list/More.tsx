import { Dropdown, Menu } from "antd";
import { Modal } from "antd";
import {
  useDeleteProject,
  useProjectModal,
  useProjectsQueryKey,
} from "hooks/projects";
import { Project } from "types";
import { Button } from "../misc/General";

export const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete the project?",
      content: "Click to confirm",
      okText: "Confirm",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            Edit
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key={"delete"}
          >
            Delete
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};
