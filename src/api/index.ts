// simulate auth provider
import qs from "qs";
import { User } from "app/screens/project_list/SearchPanel";

const api_URL = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth__provider__token__";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const configureFetch = async (
  endpoint: string,
  { data, token, headers, ...rest }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...rest,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  const response = await window.fetch(`${api_URL}/${endpoint}`, config);
  if (response.status === 401) {
    await logout();
    window.location.reload();
    return Promise.reject({ message: "Please log in again" });
  }
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return Promise.reject(data);
  }
};

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
