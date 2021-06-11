import { DevTools } from "typezilla-mockserver";
import styled from "@emotion/styled";
import { Spin } from "antd";
import { ErrorBox } from "./General";

export const FullPageLoader = (): JSX.Element => {
  return (
    <FullPageStyles>
      <Spin size="large" />
    </FullPageStyles>
  );
};

export const FullPageError = ({
  error,
}: {
  error?: Error | null;
}): JSX.Element => {
  return (
    <FullPageStyles>
      <DevTools />
      <ErrorBox error={error}></ErrorBox>
    </FullPageStyles>
  );
};

const FullPageStyles = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
