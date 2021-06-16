import { DevTools } from "typezilla-mockserver";
import ErrorBox from "app/components/common/ErrorBox";

const FullPageError = ({ error }: { error?: Error | null }): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DevTools />
      <ErrorBox error={error}></ErrorBox>
    </div>
  );
};

export default FullPageError;
