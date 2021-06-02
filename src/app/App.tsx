import React from "react";
import { useAuth } from "hooks";
import FullPageLoader from "app/components/common/FullPageLoader";
import "./App.css";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

function App() {
  //https://kentcdodds.com/blog/authentication-in-react-applications
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageLoader />}>
      <div className="App">
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </React.Suspense>
  );
}

export default App;
