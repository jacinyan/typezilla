import { useAuth } from "hooks";
import { Button, Form, Input } from "antd";

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
        <Button type={"primary"} htmlType={"submit"}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
