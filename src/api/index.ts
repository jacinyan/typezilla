import qs from "qs";
import { User } from "types";

const api_URL = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth__provider__token__";

interface Config extends RequestInit {
  params?: object;
  token?: string;
}
//centralize requests except auth
export const configureFetch = async (
  endpoint: string,
  { params, token, headers, ...restConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": params ? "application/json" : "",
    },
    //overrides the method prop depending on the input config
    ...restConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(params)}`;
  } else {
    config.body = JSON.stringify(params || {});
  }

  const response = await window.fetch(`${api_URL}/${endpoint}`, config);
  if (response.ok) {
    return await response.json();
  } else {
    if (response.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject({ message: "Please log in again" });
    } else {
      return Promise.reject(await response.json());
    }
  }
};

//auth separately
export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (params: { username: string; password: string }) => {
  const response = await fetch(`${api_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(await response.json());
  }
};

export const register = async (params: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${api_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(await response.json());
  }
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
