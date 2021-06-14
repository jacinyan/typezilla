//infinitely simplified simulation of a 3rd party auth provider
import { createContext, ReactNode } from "react";
import { useQueryClient } from "react-query";
import {
  getToken,
  configureFetch,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
} from "api";
import { useAsyncTask } from "hooks/api";
import { useMount } from "hooks/_helpers";
import { User } from "types";
import {
  FullPageLoader,
  FullPageError,
} from "app/components/misc/FullPageFallBacks";

interface AuthForm {
  username: string;
  password: string;
}

//pre-loads the user log in/out state for persistency
const bootstrapUser = async () => {
  let user = null;
  //fetches token from localStorage
  const token = getToken();
  if (token) {
    //specifies the token instead of calling the useConfigureFetch hook for general purposes
    const data = await configureFetch("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthContext =
  //avoids the value type in AuthProvider being undefined from default when it is obviously not
  createContext<
    | {
        user: User | null;
        register: (form: AuthForm) => Promise<void>;
        login: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isError,
    isLoading,
    isIdle,
    asyncRun,
    setData: setUser,
  } = useAsyncTask<User | null>();
  const queryClient = useQueryClient();

  //point free for (user)=> setUser(user)
  const login = (form: AuthForm) => authLogin(form).then(setUser);
  const register = (form: AuthForm) => authRegister(form).then(setUser);
  const logout = () =>
    authLogout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  //checks token whenever the app mounts
  useMount(() => {
    asyncRun(bootstrapUser());
  });

  return isIdle || isLoading ? (
    <FullPageLoader />
  ) : isError ? (
    <FullPageError error={error} />
  ) : (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};
