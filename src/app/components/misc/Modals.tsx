import { useEffect } from "react";
import { Drawer, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  useEditProject,
  useCreateProject,
  useProjectModal,
  useProjectsQueryKey,
} from "hooks/projects";
import styled from "@emotion/styled";
import UserSelect from "../project-list/UserSelect";
import { Button, ErrorBox } from "./General";

const ProjectModal = () => {
  const {
    projectModalOpen,
    projectDetails,
    isLoading: modalLoading,
    close,
  } = useProjectModal();
  //determine whether editing or creating a project
  const useMutateProject = projectDetails ? useEditProject : useCreateProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();
  const onFinish = (values: any) => {
    //reset the form and close the modal only after async tasks are done
    mutateAsync({ ...projectDetails, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  //reset project details
  useEffect(() => {
    //console.log("useEffect in modals");
    form.setFieldsValue(projectDetails);
  }, [projectDetails, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {modalLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{projectDetails ? "Edit Project" : "Create Project"}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"Name"}
                name={"name"}
                rules={[
                  { required: true, message: "Please enter the project name" },
                ]}
              >
                <Input placeholder={"Please enter the project name"} />
              </Form.Item>
              <Form.Item
                label={"Team"}
                name={"team"}
                rules={[
                  { required: true, message: "Please enter the team name" },
                ]}
              >
                <Input placeholder={"Please enter the team name"} />
              </Form.Item>
              <Form.Item label={"Supervisor"} name={"supervisorId"}>
                <UserSelect defaultOption={"Supervisor"} />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

export default ProjectModal;

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
