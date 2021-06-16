import { Typography } from "antd";

const ErrorBox = ({ error }: { error: unknown }) => {
  //type guard to restrict a returned value type to a maximum with 'is'
  const isError = (value: any): value is Error => value?.message;
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};

export default ErrorBox;
