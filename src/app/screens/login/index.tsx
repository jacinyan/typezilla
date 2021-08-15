import { Form, Input } from "antd";
import { useDocumentTitle } from "hooks/_helpers";
import { useAuth } from "hooks/auth";
import { useAsyncTask } from "hooks/api";
import { Button } from "./index.styles";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  useDocumentTitle("Log in");

  const { login } = useAuth();
  const { asyncRun, isLoading } = useAsyncTask(undefined, {
    throwOnError: true,
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const trimmedValues = {
      ...values,
      username: values.username.trim(),
      password: values.password.trim(),
    };
    // console.log(trimmedValues);

    try {
      await asyncRun(login(trimmedValues));
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        //type inference for input in handleSubmit with the name prop
        name={"username"}
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input
          type={"text"}
          id={"username"}
          placeholder={"Username"}
          style={{ fontSize: 14 }}
        />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input
          type={"password"}
          id={"password"}
          placeholder={"Password"}
          style={{ fontSize: 14 }}
        />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"} loading={isLoading}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
