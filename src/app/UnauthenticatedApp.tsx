import { useState } from "react";
import LoginScreen from "app/screens/login";
import RegisterScreen from "app/screens/register";
import { Divider, Button } from "antd";
import * as S from "./UnunthenticatedApp.styles";

const UnAuthenticatedApp = () => {
  const [registered, setRegistered] = useState(false);
  return (
    <S.Container>
      <S.Header />
      <S.Background />
      <S.ShadowCard>
        <S.Title>{registered ? "Sign Up" : "Login"}</S.Title>
        {registered ? <RegisterScreen /> : <LoginScreen />}
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
