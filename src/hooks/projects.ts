import { useCallback, useEffect, useMemo } from "react";
import { useAsyncTask, useConfigureFetch } from "./api";
import { useUrlQueryParams } from "./_helpers";
import { Project } from "types";
import { removeEmptyQueryValues } from "utils";

// projects fetching
export const useProjects = (params?: Partial<Project>) => {
  const $fetch = useConfigureFetch();
  const { asyncRun, ...result } = useAsyncTask<Project[]>();

  //wrapped $fetch(...) in a function as a callback instead of asyncRun handling its returned value only, for triggering auto refresh on updates
  //#region
  //e.g.
  //var getPromise = () => new Promise()
  // var asyncRun = (callback) => {}
  // asyncRun(getPromise()) // callback missing on the way
  //#endregion
  const fetchProjects = useCallback(
    () =>
      $fetch("projects", {
        params: removeEmptyQueryValues(params || {}),
      }),
    [$fetch, params]
  );

  useEffect(() => {
    asyncRun(fetchProjects(), { retry: fetchProjects });
  }, [params, asyncRun, fetchProjects]);

  return result;
};

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

export const useEditProject = () => {
  const $fetch = useConfigureFetch();

  const { asyncRun, ...result } = useAsyncTask();
  const mutate = (params: Partial<Project>) => {
    return asyncRun(
      $fetch(`projects/${params.id}`, {
        params,
        method: "PATCH",
      })
    );
  };

  return { mutate, ...result };
};

export const useAddProject = () => {
  const $fetch = useConfigureFetch();
  const { asyncRun, ...result } = useAsyncTask();

  const mutate = (params: Partial<Project>) => {
    return asyncRun(
      $fetch(`projects/${params.id}`, {
        params,
        method: "POST",
      })
    );
  };

  return { mutate, ...result };
};

//using url to manage modal states
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
