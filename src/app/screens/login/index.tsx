import { useAuth } from "hooks";
import { Form, Input } from "antd";
import * as S from "./index.styles";

const LoginScreen = () => {
  const { login } = useAuth();

  //HTMLFormElement extends Elements
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input type="text" id={"username"} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input type="text" id={"password"} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <S.WideButton type={"primary"} htmlType={"submit"}>
          Sign In
        </S.WideButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
