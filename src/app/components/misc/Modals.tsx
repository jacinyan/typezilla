import styled from "@emotion/styled";
import { Drawer, Spin, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  useEditProject,
  useCreateProject,
  useProjectModal,
  useProjectsQueryKey,
} from "hooks/projects";
import { useEditTask, useTaskModal, useTaskQueryKey } from "hooks/tasks";
import { useEffect } from "react";
import UserSelect from "../project-list/UserSelect";
import TaskTypeSelect from "../kanban/TaskTypeSelect";
import { Button, ErrorBox } from "./General";

export const ProjectModal = () => {
  const { projectModalOpen, close, projectDetails, isLoading } =
    useProjectModal();
  const useMutateProject = projectDetails ? useEditProject : useCreateProject;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...projectDetails, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(projectDetails);
  }, [projectDetails, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
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

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, taskDetails, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTaskQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...taskDetails, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(taskDetails);
  }, [form, taskDetails]);

  return (
    <Modal
      onCancel={onCancel}
      onOk={onOk}
      okText={"Confirm"}
      cancelText={"Cancel"}
      confirmLoading={editLoading}
      title={"Edit Task"}
      visible={!!editingTaskId}
    >
      <Form
        initialValues={taskDetails}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label={"Task Name"}
          name={"name"}
          rules={[{ required: true, message: "Please enter the task name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"Assignee"} name={"assigneeId"}>
          <UserSelect defaultOption={"Assignee"} />
        </Form.Item>
        <Form.Item label={"Type"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
