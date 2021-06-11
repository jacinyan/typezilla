import { Form, Input } from "antd";
import { useDocumentTitle } from "hooks/_helpers";
import { useAuth } from "hooks/auth";
import { useAsyncTask } from "hooks/api";
import { Button } from "./index.styles";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  useDocumentTitle("Log in", false);

  const { login } = useAuth();
  const { asyncRun, isLoading } = useAsyncTask(undefined, {
    throwOnError: true,
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await asyncRun(login(values));
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input type={"text"} id={"username"} placeholder={"Username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input type={"text"} id={"password"} placeholder={"Password"} />
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
