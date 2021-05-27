// simulate auth provider
import { User } from "app/screens/project_list/SearchPanel";

const api_URL = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth__provider__token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  const response = await fetch(`${api_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(data);
  }
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${api_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(data);
  }
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
