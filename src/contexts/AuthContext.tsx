import { createContext, ReactNode, useState } from "react";
import * as auth from "auth";

import { User } from "screens/project_list/SearchPanel";

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

interface AuthForm {
  username: string;
  password: string;
}

//(alias) const AuthProvider: () => JSX.Element
//import AuthProvider
//Type '{ children: ReactNode; }' has no properties in common with type 'IntrinsicAttributes'
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  //point free setUser
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};
