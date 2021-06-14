import { useQuery } from "react-query";
import { useConfigureFetch } from "./api";
import { Kanban } from "types";
import { useProjectIdInURL } from "./projects";

export const useKanbans = (params?: Partial<Kanban>) => {
  const $fetch = useConfigureFetch();

  return useQuery<Kanban[]>(["kanbans", params], () =>
    $fetch("kanbans", { params })
  );
};

export const useKanbansSearchParams = () => ({
  projectId: useProjectIdInURL(),
});

export const useKanbanQueryKey = () => ["kanbans", useKanbansSearchParams()];
