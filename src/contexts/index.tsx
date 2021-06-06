import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {/* <AuthProvider children={children}> */}
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
