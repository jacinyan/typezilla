import { Typography } from "antd";

const ErrorBox = ({ error }: { error: unknown }) => {
  //type guard used to explicitly declare a returned value type Error with 'is' as long as it has a message member
  const isError = (value: any): value is Error => value?.message;

  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};

export default ErrorBox;
