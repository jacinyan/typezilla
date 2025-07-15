import { useEffect } from "react";
import { Form, Input, Modal, Button } from "antd";
import {
  useDeleteTask,
  useEditTask,
  useTaskModal,
  useTasksQueryKey,
} from "hooks/tasks";
import UserSelect from "../project-list/UserSelect";
import TaskTypeSelect from "../kanban/TaskTypeSelect";
import EpicSelect from "./EpicSelect";

const TaskModal = () => {
  const [form] = Form.useForm();
  const { editingTaskId, taskDetails, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...taskDetails, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: "Are you sure you want to delete this task?",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(taskDetails);
  }, [form, taskDetails]);

  return (
    <Modal
      forceRender
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
        <Form.Item label={"Epic"} name={"epicId"}>
          <EpicSelect defaultOption={"Select Epic"} />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          onClick={startDelete}
          size={"small"}
          style={{ fontSize: "14px" }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
