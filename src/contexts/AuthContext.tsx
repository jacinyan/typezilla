//simple simulation of 3rd party auth provider
import { createContext, ReactNode } from "react";
import {
  getToken,
  configureFetch,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
} from "api";
import { useAsync, useMount } from "hooks";
import { User } from "types";
import {
  FullPageLoader,
  FullPageError,
} from "app/components/misc/FullPageFallBack";

interface AuthForm {
  username: string;
  password: string;
}

//preload user log in/out state for persistency
const bootstrapUser = async () => {
  let user = null;
  //fetch token from localStorage
  const token = getToken();
  if (token) {
    //specify token
    const data = await configureFetch("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthContext =
  //avoid value type in AuthProvider being undefined from default when it is not
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

//(alias) const AuthProvider: () => JSX.Element
//import AuthProvider
//Type '{ children: ReactNode; }' has no properties in common with type 'IntrinsicAttributes'
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isError,
    isLoading,
    isIdle,
    runAsync,
    setData: setUser,
  } = useAsync<User | null>();

  //point free setUser
  const login = (form: AuthForm) => authLogin(form).then(setUser);
  const register = (form: AuthForm) => authRegister(form).then(setUser);
  const logout = () => authLogout().then(() => setUser(null));

  //check token whenever the app mounts
  useMount(() => {
    runAsync(bootstrapUser());
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
