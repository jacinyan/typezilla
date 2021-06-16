import React from "react";
import { useAuth } from "hooks/auth";
import FullPageLoader from "./components/common/FullPageLoader";
import FullPageError from "./components/common/FullPageError";
import ErrorBoundary from "app/components/common/ErrorBoundary";
import "./App.css";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

function App() {
  //https://kentcdodds.com/blog/authentication-in-react-applications
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        <React.Suspense fallback={<FullPageLoader />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
