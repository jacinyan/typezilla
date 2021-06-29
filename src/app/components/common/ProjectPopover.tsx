import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjectModal, useProjects } from "hooks/projects";

const ProjectPopover = () => {
  const { open } = useProjectModal();
  //different queryKey for different caches in useProjects, hence refetch
  const { data: projects, refetch } = useProjects();
  const markedProjects = projects?.filter((project) => project.marked);

  const content = (
    <div style={{ minWidth: "30rem" }}>
      <Typography.Text type={"secondary"}>Marked Projects</Typography.Text>
      <List>
        {markedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button onClick={open} type={"link"} style={{ padding: 0 }}>
        Create Project
      </Button>
    </div>
  );

  return (
    <Popover
      placement={"bottom"}
      content={content}
      onVisibleChange={() => refetch()}
    >
      <span style={{ fontSize: "1.8rem", color: "#fff" }}>Projects</span>
    </Popover>
  );
};

export default ProjectPopover;
