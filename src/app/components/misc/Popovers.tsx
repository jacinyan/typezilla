import styled from "@emotion/styled";
import { Popover, Typography, List, Divider } from "antd";
import { useProjectModal, useProjects } from "hooks/projects";
import { StyledButton } from "./GeneralComps";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const { open } = useProjectModal();
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
      <StyledButton onClick={open} type={"link"}>
        Create Project
      </StyledButton>
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
