import { useDeleteSwimlane, useSwimlanesQueryKey } from "hooks/kanban";
import { SwimlaneProps } from "types";
import { Button, Dropdown, Menu } from "antd";
import { Modal } from "antd";

const More = ({ swimlane }: { swimlane: SwimlaneProps }) => {
  const { mutateAsync } = useDeleteSwimlane(useSwimlanesQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: "Are you sure you want to delete this swimlane?",
      onOk() {
        return mutateAsync({ id: swimlane.id });
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startEdit}>
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export default More;
