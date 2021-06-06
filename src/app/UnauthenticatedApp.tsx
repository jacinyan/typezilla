import { useState } from "react";
import { Divider, Button, Typography } from "antd";
import LoginScreen from "app/screens/login";
import RegisterScreen from "app/screens/register";
import * as S from "./UnunthenticatedApp.styles";

const UnAuthenticatedApp = () => {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <S.Container>
      <S.Header />
      <S.Background />
      <S.ShadowCard>
        <S.Title>{registered ? "Sign Up" : "Login"}</S.Title>
        {error && (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        )}
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
      </S.ShadowCard>
    </S.Container>
  );
};

export default UnAuthenticatedApp;
