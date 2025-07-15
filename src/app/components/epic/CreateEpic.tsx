import { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { DrawerProps } from "antd/es/drawer";
import { useCreateEpic, useEpicsQueryKey } from "hooks/epics";
import { useProjectIdInURL } from "hooks/projects";
import { useSwimlanes, useSwimlanesSearchParams } from "hooks/kanban";
import ErrorBox from "app/components/common/ErrorBox";

export const CreateEpic = (
  // ‘visible' props is passed down from its parent comp and locally managed
  // override default onClose type
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const {
    mutateAsync: createEpic,
    isLoading,
    error,
  } = useCreateEpic(useEpicsQueryKey());
  const [form] = Form.useForm();
  const projectId = useProjectIdInURL();
  const { data: swimlanes } = useSwimlanes(useSwimlanesSearchParams());

  const onFinish = async (values: any) => {
    const epicData = {
      ...values,
      projectId,
      swimlaneId: swimlanes?.[0]?.id || 1, 
      start: Date.now(), 
      end: Date.now() + 30 * 24 * 60 * 60 * 1000, 
    };
    await createEpic(epicData);
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <div
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>Create Epic</h1>
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
                  { required: true, message: "Please enter the epic name" },
                ]}
              >
                <Input placeholder={"Epic Name"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
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
