import { useState } from "react";
import LoginScreen from "app/screens/LoginScreen";
import RegisterScreen from "app/screens/RegisterScreen";

export const UnAuthenticatedApp = () => {
  const [registered, setRegistered] = useState(false);
  return (
    <div>
      {registered ? <RegisterScreen /> : <LoginScreen />}
      <button
        onClick={() => {
          setRegistered(!registered);
        }}
      >
        Switch to {registered ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
};
