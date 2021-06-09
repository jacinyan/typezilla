import { useEffect } from "react";
import { useAsyncTask, useConfigureFetch } from "./api";
import { User } from "types";
import { removeEmptyQueryValues } from "utils";

export const useUsers = (params?: Partial<User>) => {
  const $fetch = useConfigureFetch();
  const { asyncRun, ...result } = useAsyncTask<User[]>();

  useEffect(() => {
    asyncRun(
      $fetch("users", {
        params: removeEmptyQueryValues(params || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
