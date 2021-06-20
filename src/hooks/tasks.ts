import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useConfigureFetch,
  useCreateQueryConfig,
  useDeleteQueryConfig,
  useEditQueryConfig,
  useReorderQueryConfig,
} from "./api";
import { SortProps, Task } from "types";
import { useProjectIdInURL } from "./projects";
import { useDebounce, useURLSearchParams } from "./_helpers";
import { useCallback, useMemo } from "react";

export const useTasks = (params?: Partial<Task>) => {
  const $fetch = useConfigureFetch();
  const debouncedParams = { ...params, name: useDebounce(params?.name, 500) };

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
    useCreateQueryConfig(queryKey)
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<Task>) =>
      $fetch(`tasks/${params.id}`, { method: "PATCH", params }),
    useEditQueryConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    ({ id }: { id: number }) => $fetch(`tasks/${id}`, { method: "DELETE" }),
    useDeleteQueryConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: SortProps) =>
      $fetch("tasks/reorder", {
        params,
        method: "POST",
      }),
    useReorderQueryConfig(queryKey)
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
