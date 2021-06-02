import { useAsync, useAuth } from "hooks";
import { Form, Input } from "antd";
import * as S from "./index.styles";

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { execute, loading } = useAsync(undefined, { throwOnError: true });

  //HTMLFormElement extends Elements
  const handleSubmit = async ({
    confirm_password,
    ...values
  }: {
    username: string;
    password: string;
    confirm_password: string;
  }) => {
    if (confirm_password !== values.password) {
      onError(new Error("Passwords do not match"));
      return;
    }
    try {
      await execute(register(values));
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
        <S.WideButton type={"primary"} htmlType={"submit"} loading={loading}>
          Sign Up
        </S.WideButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
