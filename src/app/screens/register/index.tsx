import { Form, Input } from "antd";
import { useAuth } from "hooks/auth";
import { useAsyncTask } from "hooks/api";
import { useDocumentTitle } from "hooks/_helpers";
import { Button } from "./index.styles";

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  useDocumentTitle("Sign Up");

  const { register } = useAuth();
  const { asyncRun, isLoading } = useAsyncTask(undefined, {
    throwOnError: true,
  });

  const handleSubmit = async ({
    confirm_password,
    ...rest
  }: {
    username: string;
    password: string;
    confirm_password: string;
  }) => {
    const trimmedRest = {
      ...rest,
      username: rest.username.trim(),
      password: rest.password.trim(),
    };
    confirm_password = confirm_password.trim();

    if (confirm_password !== trimmedRest.password) {
      onError(new Error("Passwords do not match"));
      return;
    }
    try {
      await asyncRun(register(trimmedRest));
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
        <Input type="text" id={"username"} placeholder={"Username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input type="text" id={"password"} placeholder={"Password"} />
      </Form.Item>
      <Form.Item
        name={"confirm_password"}
        rules={[{ required: true, message: "Please confirm your password" }]}
      >
        <Input
          type="text"
          id={"confirm_password"}
          placeholder={"Confirm Password"}
        />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"} loading={isLoading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
