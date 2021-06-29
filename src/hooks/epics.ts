import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useConfigureFetch,
  useCreateQueryConfig,
  useDeleteQueryConfig,
} from "./api";
import { Epic } from "types";
import { useProjectIdInURL } from "./projects";

export const useEpics = (params?: Partial<Epic>) => {
  const $fetch = useConfigureFetch();

  return useQuery<Epic[]>(["epics", params], () => $fetch("epics", { params }));
};

export const useCreateEpic = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<Epic>) => $fetch(`epics`, { method: "POST", params }),
    useCreateQueryConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    ({ id }: { id: number }) => $fetch(`epics/${id}`, { method: "DELETE" }),
    useDeleteQueryConfig(queryKey)
  );
};

export const useEpicsSearchParams = () => ({
  projectId: useProjectIdInURL(),
});

export const useEpicsQueryKey = () => ["epics", useEpicsSearchParams()];
