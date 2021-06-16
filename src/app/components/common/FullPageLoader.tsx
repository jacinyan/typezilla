import { Spin } from "antd";

const FullPageLoader = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default FullPageLoader;
