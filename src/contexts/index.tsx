import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider children={children}> */}
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
