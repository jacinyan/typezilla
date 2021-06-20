import { useMemo } from "react";
import { useLocation } from "react-router";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useConfigureFetch,
  useEditQueryConfig,
  useCreateQueryConfig,
  useDeleteQueryConfig,
} from "./api";
import { useSetSearchParams, useURLSearchParams } from "./_helpers";
import { Project } from "types";

// fetches projects when ProjectScreen loads, when no params are input, the whole project list is returned
export const useProjects = (params?: Partial<Project>) => {
  const $fetch = useConfigureFetch();

  // useQuery's second type param TError is default to unknown, which should have been explicitly declared 'Error' for any component that consumes the returned QueryResult
  // An ErrorBox is abstracted for this reason without having to do so
  return useQuery<Project[]>(["projects", params], () =>
    $fetch("projects", { params })
  );
};

export const useProjectDetails = (id?: number) => {
  const $fetch = useConfigureFetch();

  return useQuery<Project>(
    ["project", { id }],
    () => $fetch(`projects/${id}`),
    //enabled prop is to prevent useQuery from running the above callback if the id param is undefined
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
    useEditQueryConfig(queryKey)
  );
};

export const useCreateProject = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    (params: Partial<Project>) =>
      $fetch(`projects`, { method: "POST", params }),
    useCreateQueryConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const $fetch = useConfigureFetch();

  return useMutation(
    ({ id }: { id: number }) => $fetch(`projects/${id}`, { method: "DELETE" }),
    useDeleteQueryConfig(queryKey)
  );
};

// transform the type in the id of select option of searchParams from useURLSearchParams of string to number, this hook is to act as the final refinement. //// similar logic will be used in, e.g, useSwimlanesSearchParams and useTasksSearchParams with a little tweaking
export const useProjectsSearchParams = () => {
  const [params, setParams] = useURLSearchParams(["name", "projectLeadId"]);

  return [
    useMemo(
      () => ({
        ...params,
        projectLeadId: Number(params.projectLeadId) || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

// used in conjunction with previously defined hooks where useMutation is used to act as the input queryKey param, and ultimately passed in their respective query config hooks
export const useProjectsQueryKey = () => {
  //the second item of the query key array is from useProjectsSearchParams
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

// globally manages the modal open/close states with URL, which is going to be used in ProjectModal.tsx for its own open/close state management.
// shared across More.tsx in components/project-list for 'Edit' initiation, and index.tsx in screens/project-list and ProjectPopover.tsx for 'Create' initiation (create/edit are taken care of concurrently in this hook)
export const useProjectModal = () => {
  //calling useURLSearchParams for specifying the keys in the URL for value manipulation later
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
  //call setEditingProjectId if editing a project
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    // with ' editingProjectId', open the modal immediately without waiting for project details to be in place
    // summarizes the open/close state with 'projectModalOpen'
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    projectDetails,
    isLoading,
  };
};

//The following two hooks are specifically for swimlanes in kanban and the tasks in each swimlane under a specific project resource
export const useProjectIdInURL = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};
export const useProjectInURL = () => useProjectDetails(useProjectIdInURL());
