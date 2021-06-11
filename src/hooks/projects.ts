import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useConfigureFetch } from "./api";
import { useUrlQueryParams } from "./_helpers";
import { Project } from "types";
import { useSearchParams } from "react-router-dom";

// fetches projects when ProjectScreen loads
export const useProjects = (params?: Partial<Project>) => {
  const $fetch = useConfigureFetch();

  return useQuery<Project[]>(["projects", params], () =>
    $fetch("projects", { params })
  );
};

export const useProjectDetails = (id?: number) => {
  const $fetch = useConfigureFetch();

  return useQuery<Project>(
    ["project", { id }],
    () => $fetch(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};

export const useEditProject = () => {
  const $fetch = useConfigureFetch();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      $fetch(`projects/${params.id}`, { method: "PATCH", params }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};

export const useAddProject = () => {
  const $fetch = useConfigureFetch();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      $fetch(`projects`, { method: "POST", params }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};

// handles id data type in conjunction with the IdSelect comp
export const useProjectsSearchParams = () => {
  const [paramsObj, setParamsObj] = useUrlQueryParams(["name", "supervisorId"]);
  return [
    useMemo(
      () => ({
        ...paramsObj,
        supervisorId: Number(paramsObj.supervisorId) || undefined,
      }),
      [paramsObj]
    ),
    setParamsObj,
  ] as const;
};

// manages the modal states with URL
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProjectDetails(
    Number(editingProjectId)
  );
  const [, setUrlParams] = useSearchParams();

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
