import { useDocumentTitle } from "hooks/_helpers";
import { Form, Input } from "antd";
import * as S from "./index.styles";
import { useAuth } from "hooks/auth";
import { useAsyncTask } from "hooks/api";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  useDocumentTitle("Log in", false);

  const { login } = useAuth();
  const { asyncRun, isLoading } = useAsyncTask(undefined, {
    throwOnError: true,
  });
  //HTMLFormElement extends Elements
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
        <S.WideButton type={"primary"} htmlType={"submit"} loading={isLoading}>
          Sign In
        </S.WideButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
