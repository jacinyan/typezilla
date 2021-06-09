import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "typezilla-mockserver";

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
      <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    </FullPageStyles>
  );
};

const FullPageStyles = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
