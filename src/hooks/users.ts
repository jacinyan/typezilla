import { useConfigureFetch } from "./api";
import { User } from "types";
import { useQuery } from "react-query";

export const useUsers = (params?: Partial<User>) => {
  const $fetch = useConfigureFetch();

  return useQuery<User[]>(["users", params], () => $fetch("users", { params }));
};
