import { createContext, ReactNode, useState } from "react";
import {
  getToken,
  configureFetch,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
} from "api";
import { useMount } from "hooks";
import { User } from "types";

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
  const [user, setUser] = useState<User | null>(null);

  //point free setUser
  const login = (form: AuthForm) => authLogin(form).then(setUser);
  const register = (form: AuthForm) => authRegister(form).then(setUser);
  const logout = () => authLogout().then(() => setUser(null));

  //check token whenever the app loads
  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};
