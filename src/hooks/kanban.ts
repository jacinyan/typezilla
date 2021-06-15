import { useQuery } from "react-query";
import { useConfigureFetch } from "./api";
import { Swimlane } from "types";
import { useProjectIdInURL } from "./projects";

export const useSwimlanes = (params?: Partial<Swimlane>) => {
  const $fetch = useConfigureFetch();

  return useQuery<Swimlane[]>(["swimlanes", params], () =>
    $fetch("swimlanes", { params })
  );
};

export const useSwimlanesSearchParams = () => ({
  projectId: useProjectIdInURL(),
});

export const useSwimlaneQueryKey = () => [
  "swimlanes",
  useSwimlanesSearchParams(),
];
