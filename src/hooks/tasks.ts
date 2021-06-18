import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useConfigureFetch,
  useCreateQueriesConfig,
  useDeleteQueriesConfig,
  useEditQueriesConfig,
} from "./api";
import { Task } from "types";
import { useProjectIdInURL } from "./projects";
import { useDebounce, useURLSearchParams } from "./_helpers";
import { useCallback, useMemo } from "react";

export const useTasks = (params?: Partial<Task>) => {
  const $fetch = useConfigureFetch();
  const debouncedParams = { ...params, name: useDebounce(params?.name, 200) };

  return useQuery<Task[]>(["tasks", params], () =>
    $fetch("tasks", { params: debouncedParams })
  );
};

export const useTaskDetails = (id?: number) => {
  const $fetch = useConfigureFetch();

  return useQuery<Task>(
    ["task", { id }],
    () => $fetch(`tasks/${id}`),
    //enabled prop is to prevent react-query from running this callback if the id is undefined
    {
      enabled: Boolean(id),
    }
  );
};

export const useCreateTask = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<Task>) => $fetch(`tasks`, { method: "POST", params }),
    useCreateQueriesConfig(queryKey)
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<Task>) =>
      $fetch(`tasks/${params.id}`, { method: "PATCH", params }),
    useEditQueriesConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    ({ id }: { id: number }) => $fetch(`tasks/${id}`, { method: "DELETE" }),
    useDeleteQueriesConfig(queryKey)
  );
};

export const useTasksSearchParams = () => {
  const [params] = useURLSearchParams([
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

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useURLSearchParams([
    "editingTaskId",
  ]);

  const { data: taskDetails, isLoading } = useTaskDetails(
    Number(editingTaskId)
  );

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    taskDetails,
    startEdit,
    close,
    isLoading,
    editingTaskId,
  };
};
