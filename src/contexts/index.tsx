import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {/* <AuthProvider children={children}> */}
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
