import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useConfigureFetch,
  useCreateQueriesConfig,
  useDeleteQueriesConfig,
} from "./api";
import { SwimlaneProps } from "types";
import { useProjectIdInURL } from "./projects";

export const useSwimlanes = (params?: Partial<SwimlaneProps>) => {
  const $fetch = useConfigureFetch();

  return useQuery<SwimlaneProps[]>(["swimlanes", params], () =>
    $fetch("swimlanes", { params })
  );
};

export const useCreateSwimlane = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<SwimlaneProps>) =>
      $fetch(`swimlanes`, { method: "POST", params }),
    useCreateQueriesConfig(queryKey)
  );
};

export const useDeleteSwimlane = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    ({ id }: { id: number }) => $fetch(`swimlanes/${id}`, { method: "DELETE" }),
    useDeleteQueriesConfig(queryKey)
  );
};

export const useSwimlanesSearchParams = () => ({
  projectId: useProjectIdInURL(),
});

export const useSwimlanesQueryKey = () => [
  "swimlanes",
  useSwimlanesSearchParams(),
];
