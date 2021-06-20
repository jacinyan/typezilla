import { useEffect } from "react";
import { Drawer, Spin, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  useCreateProject,
  useEditProject,
  useProjectModal,
  useProjectsQueryKey,
} from "hooks/projects";
import ErrorBox from "app/components/common/ErrorBox";
import UserSelect from "../project-list/UserSelect";

const ProjectModal = () => {
  const { projectModalOpen, close, projectDetails, isLoading } =
    useProjectModal();
  const useMutateProject = projectDetails ? useEditProject : useCreateProject;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  //control the form instance below
  const [form] = useForm();
  const onFinish = (values: any) => {
    //when creating a project, projectDetails is undefined
    mutateAsync({ ...projectDetails, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  // if the modal is closed without submitting any data, form will still be reset
  const closeModal = () => {
    form.resetFields();
    close();
  };

  // after being mounted or updated, data will be refilled
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
      <div
        style={{
          flexDirection: "column",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
              <Form.Item label={"Project Lead"} name={"projectLeadId"}>
                <UserSelect defaultOption={"Project Lead"} />
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
      </div>
    </Drawer>
  );
};

export default ProjectModal;
