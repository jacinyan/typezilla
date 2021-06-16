import React from "react";
import {
  FullPageError,
  FullPageLoader,
} from "app/components/common/FullPageFallBacks";
import ErrorBoundary from "app/components/common/ErrorBoundary";
import "./App.css";
import { useAuth } from "hooks/auth";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

function App() {
  //https://kentcdodds.com/blog/authentication-in-react-applications
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageLoader />}>
      <div className="App">
        <ErrorBoundary fallbackRender={FullPageError}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </div>
    </React.Suspense>
  );
}

export default App;
