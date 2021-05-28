import { useState } from "react";
import LoginScreen from "app/screens/LoginScreen";
import RegisterScreen from "app/screens/RegisterScreen";
import { Card } from "antd";

const UnAuthenticatedApp = () => {
  const [registered, setRegistered] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {registered ? <RegisterScreen /> : <LoginScreen />}
        <button
          onClick={() => {
            setRegistered(!registered);
          }}
        >
          Switch to {registered ? "Sign In" : "Sign Up"}
        </button>
      </Card>
    </div>
  );
};

export default UnAuthenticatedApp;
