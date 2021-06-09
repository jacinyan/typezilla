import styled from "@emotion/styled";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "hooks/projects";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();
  const markedProjects = projects?.filter((project) => project.marked);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Marked Projects</Typography.Text>
      <List>
        {markedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button
        type={"link"}
        style={{ padding: 0 }}
        onClick={() => props.setProjectModalOpen(true)}
      >
        Create Project
      </Button>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>Projects</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
