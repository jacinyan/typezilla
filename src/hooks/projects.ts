import { useMemo } from "react";
import { useLocation } from "react-router";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useConfigureFetch,
  useEditQueriesConfig,
  useCreateQueriesConfig,
  useDeleteQueriesConfig,
} from "./api";
import { useSetSearchParams, useURLSearchParams } from "./_helpers";
import { Project } from "types";

// fetches projects when ProjectScreen loads, when no params are specified the whole project list is returned
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
    //enabled prop is to prevent react-query from running this callback if the id is undefined
    {
      enabled: Boolean(id),
    }
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<Project>) =>
      $fetch(`projects/${params.id}`, { method: "PATCH", params }),
    useEditQueriesConfig(queryKey)
  );
};

export const useCreateProject = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<Project>) =>
      $fetch(`projects`, { method: "POST", params }),
    useCreateQueriesConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    ({ id }: { id: number }) => $fetch(`projects/${id}`, { method: "DELETE" }),
    useDeleteQueriesConfig(queryKey)
  );
};

export const useProjectsQueryKey = () => {
  const [paramsObj] = useProjectsSearchParams();
  return ["projects", paramsObj];
};

// final process to confine the data type of projectLeadId to number
export const useProjectsSearchParams = () => {
  const [paramsObj, setParamsObj] = useURLSearchParams([
    "name",
    "projectLeadId",
  ]);

  return [
    useMemo(
      () => ({
        ...paramsObj,
        projectLeadId: Number(paramsObj.projectLeadId) || undefined,
      }),
      [paramsObj]
    ),
    setParamsObj,
  ] as const;
};

export const useProjectIdInURL = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};

export const useProjecInURL = () => useProjectDetails(useProjectIdInURL());

// manages the modal open/close states with URL, where create/edit are taken care of respectively
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useURLSearchParams([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useURLSearchParams([
    "editingProjectId",
  ]);
  // comes from useSetSearchParams only
  const setSearchParams = useSetSearchParams();

  //if editing a project, its details are fetched first
  const { data: projectDetails, isLoading } = useProjectDetails(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setSearchParams({ projectCreate: "", editingProjectId: "" });

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    // open the modal immediately without waiting for project details to be in place
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    projectDetails,
    isLoading,
  };
};
