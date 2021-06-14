import { useQuery } from "react-query";
import { useConfigureFetch } from "./api";
import { Task } from "types";
import { useProjectIdInURL } from "./projects";

export const useTasks = (params?: Partial<Task>) => {
  const $fetch = useConfigureFetch();

  return useQuery<Task[]>(["tasks", params], () => $fetch("tasks", { params }));
};

export const useTasksSearchParams = () => ({
  projectId: useProjectIdInURL(),
});

export const useTaskQueryKey = () => ["tasks", useTasksSearchParams()];
