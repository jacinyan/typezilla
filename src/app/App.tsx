import React from "react";
import "./App.css";
import Loading from "app/components/Loading";
import { useAuth } from "hooks";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

function App() {
  //https://kentcdodds.com/blog/authentication-in-react-applications
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<Loading />}>
      <div className="App">
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </React.Suspense>
  );
}

export default App;
