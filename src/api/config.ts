import qs from "qs";
import * as auth from "api/auth";

const api_URL = process.env.REACT_APP_API_URL;

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
    await auth.logout();
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
