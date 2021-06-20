import styled from "@emotion/styled";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjectModal, useProjects } from "hooks/projects";

const ProjectPopover = () => {
  const { open } = useProjectModal();
  //fetched all the projects then sort out marked projects
  const { data: projects } = useProjects();
  const markedProjects = projects?.filter((project) => project.marked === true);

  const content = (
    <Container>
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
    </Container>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>Projects</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
