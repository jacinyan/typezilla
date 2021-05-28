import { useState } from "react";
import LoginScreen from "app/screens/LoginScreen";
import RegisterScreen from "app/screens/RegisterScreen";
import { Card, Divider, Button } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import right from "assets/right.svg";
import left from "assets/left.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem;
  background-size: 16rem;
  background-position-x: 49%;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left 0 bottom 0, right 0 top 0;
  background-size: 35%, 35%, contain;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const UnAuthenticatedApp = () => {
  const [registered, setRegistered] = useState(false);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{registered ? "Sign Up" : "Login"}</Title>
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
      </ShadowCard>
    </Container>
  );
};

export default UnAuthenticatedApp;
