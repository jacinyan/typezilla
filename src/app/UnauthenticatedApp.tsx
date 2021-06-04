import { useState } from "react";
import LoginScreen from "app/screens/login";
import RegisterScreen from "app/screens/register";
import { Divider, Button, Typography } from "antd";
import * as S from "./UnunthenticatedApp.styles";
import { useDocumentTitle } from "hooks";

const UnAuthenticatedApp = () => {
  useDocumentTitle("Please log in to continue");

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
        {registered ? (
          <>
            <span>Already a user? </span>
            <Button
              type="link"
              size={"small"}
              onClick={() => {
                setRegistered(!registered);
              }}
            >
              Sign In
            </Button>
          </>
        ) : (
          <>
            <span>Not a user? </span>
            <Button
              type="link"
              size={"small"}
              onClick={() => {
                setRegistered(!registered);
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </S.ShadowCard>
    </S.Container>
  );
};

export default UnAuthenticatedApp;
