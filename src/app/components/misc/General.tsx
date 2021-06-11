import styled from "@emotion/styled";
import { Button as BaseButton, Typography } from "antd";

export const Button = styled(BaseButton)`
  padding: 0;
`;

export const Row = styled.div<{
  gap?: number | boolean;
  spaceBetween?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : undefined};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export const ErrorBox = ({ error }: { error: unknown }) => {
  //type guard
  const isError = (value: any): value is Error => value?.message;
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};
