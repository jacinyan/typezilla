import { createContext, ReactNode, useState } from "react";
import * as auth from "api/auth";

import { User } from "app/screens/project_list/SearchPanel";
import { configureFetch } from "api/config";
import { useMount } from "hooks";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
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
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

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
