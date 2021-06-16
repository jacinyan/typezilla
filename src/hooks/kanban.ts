import { QueryKey, useMutation, useQuery } from "react-query";
import { useConfigureFetch, useCreateQueriesConfig } from "./api";
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

export const useSwimlanesSearchParams = () => ({
  projectId: useProjectIdInURL(),
});

export const useSwimlaneQueryKey = () => [
  "swimlanes",
  useSwimlanesSearchParams(),
];
