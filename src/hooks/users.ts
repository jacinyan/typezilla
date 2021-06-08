import { useEffect } from "react";
import { useAsync, useConfigureFetch } from "./api";
import { User } from "types";
import { removeEmptyQueryValues } from "utils";

export const useUsers = (params?: Partial<User>) => {
  const $fetch = useConfigureFetch();
  const { runAsync, ...result } = useAsync<User[]>();

  useEffect(() => {
    runAsync(
      $fetch("users", {
        params: removeEmptyQueryValues(params || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
