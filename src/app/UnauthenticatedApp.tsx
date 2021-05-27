import { useState } from "react";
import LoginScreen from "app/screens/auth/Login";
import RegisterScreen from "app/screens/auth/Register";

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
