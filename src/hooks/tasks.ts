import { useQuery } from "react-query";
import { useConfigureFetch } from "./api";
import { Task } from "types";
import { useProjectIdInURL } from "./projects";
import { useURLSearchParams } from "./_helpers";
import { useMemo } from "react";

export const useTasks = (params?: Partial<Task>) => {
  const $fetch = useConfigureFetch();

  return useQuery<Task[]>(["tasks", params], () => $fetch("tasks", { params }));
};

export const useTasksSearchParams = () => {
  const [params, setParams] = useURLSearchParams([
    "name",
    "typeId",
    "assigneeId",
    "tagId",
  ]);

  const projectId = useProjectIdInURL();

  return useMemo(
    () => ({
      projectId,
      typeId: Number(params.typeId) || undefined,
      assigneeId: Number(params.assigneeId) || undefined,
      tagId: Number(params.tagId) || undefined,
      name: params.name,
    }),
    [projectId, params]
  );
};

export const useTaskQueryKey = () => ["tasks", useTasksSearchParams()];
