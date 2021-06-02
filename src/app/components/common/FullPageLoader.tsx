import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "typezilla-mockserver";

const FullPageLoader = ({ error }: { error?: Error | null }): JSX.Element => {
  return error === undefined ? (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  ) : (
    <FullPage>
      <DevTools />
      <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    </FullPage>
  );
};

export default FullPageLoader;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
