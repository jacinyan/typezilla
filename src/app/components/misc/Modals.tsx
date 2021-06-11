import styled from "@emotion/styled";
import { Drawer, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEditProject, useAddProject, useProjectModal } from "hooks/projects";
import { useEffect } from "react";
import UserSelect from "../project-list/UserSelect";
import { Button, ErrorBox } from "./General";

const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    console.log("useEffect in modals");

    if (editingProject) {
      form.setFieldsValue(editingProject);
    }
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{editingProject ? "Edit Project" : "Create Project"}</h1>
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
