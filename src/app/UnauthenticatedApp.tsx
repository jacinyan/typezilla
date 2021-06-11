import { useState } from "react";
import { Divider } from "antd";
import LoginScreen from "app/screens/login";
import RegisterScreen from "app/screens/register";
import {
  Container,
  Card,
  Header,
  Background,
  Title,
} from "./UnunthenticatedApp.styles";
import { Button, ErrorBox } from "app/components/misc/General";

const UnAuthenticatedApp = () => {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Container>
      <Header />
      <Background />
      <Card>
        <Title>{registered ? "Sign Up" : "Login"}</Title>
        {error && <ErrorBox error={error}></ErrorBox>}
        {registered ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <span>{registered ? "Already a user?" : "Not a user?"}</span>
        <Button
          type="link"
          size={"small"}
          onClick={() => {
            setRegistered(!registered);
          }}
        >
          {registered ? "Sign In" : "Sign Up"}
        </Button>
      </Card>
    </Container>
  );
};

export default UnAuthenticatedApp;
