import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { configureFetch } from "api";
import { Project, State, User } from "types";
import { removeEmptyQueryValues } from "utils";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initArr: T[]) => {
  const [value, setValue] = useState(initArr);
  return {
    value,
    setValue,
    add: (item: T) => {
      setValue([...value, item]);
    },
    clear: () => {
      setValue([]);
    },
    removeIndex: (index: number) => {
      const newValue = [...value];
      newValue.splice(index, 1);
      setValue(newValue);
    },
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

//embed token if it exists for every request when calling when myFetch is instantiated from configureFetch in api/index
export const useConfigureFetch = () => {
  const { user } = useAuth();
  //Parameters match configureFetch
  //spread the tuple once and for all
  return (...[endpoint, config]: Parameters<typeof configureFetch>) =>
    configureFetch(endpoint, { ...config, token: user?.token });
};

export const useAsync = <D>(
  initialState: State<D> = {
    status: "idle",
    data: null,
    error: null,
  },
  initialConfig = { throwOnError: false }
) => {
  const [state, setState] = useState<State<D>>({
    ...initialState,
  });
  // useState lazy initialization
  const [retry, setRetry] = useState(() => () => {});
  const config = { ...initialConfig };

  const setData = (data: D) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  //trigger async requests
  const runAsync = async (
    promise: Promise<D>,
    runAsyncConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("Please pass in a Promise type ");
    }

    setRetry(() => () => {
      if (runAsyncConfig?.retry) {
        runAsync(runAsyncConfig?.retry(), runAsyncConfig);
      }
    });
    setState({ ...state, status: "loading" });

    try {
      const data = await promise;
      setData(data);
      return data;
    } catch (error) {
      setError(error);
      //throw error on occasion
      if (config.throwOnError) {
        return Promise.reject(error);
      }
      return error;
    }
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    setData,
    setError,
    runAsync,
    retry,
    ...state,
  };
};

// Partial
export const useProjects = (params?: Partial<Project>) => {
  const $fetch = useConfigureFetch();
  const { runAsync, ...result } = useAsync<Project[]>();

  const fetchProjects = () =>
    $fetch("projects", {
      params: removeEmptyQueryValues(params || {}),
    });

  useEffect(() => {
    runAsync(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};

export const useUsers = (params?: Partial<User>) => {
  const $fetch = useConfigureFetch();
  const { runAsync, ...result } = useAsync<User[]>();

  useEffect(() => {
    runAsync(
      $fetch("users", {
        params: removeEmptyQueryValues(params || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};

export const useDocumentTitle = (title: string, persistOnUnmount = false) => {
  const prevTitle = useRef(document.title).current;
  //rending: prevTitle
  //onmount: a new title

  useEffect(() => {
    document.title = title;
  }, [title, prevTitle, persistOnUnmount]);

  useEffect(() => {
    return () => {
      if (!persistOnUnmount) {
        document.title = prevTitle;
      }
    };
  }, [persistOnUnmount, prevTitle]);
};

//return values of keys in query params dynamically with generics
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // memoized state values from useSearchParams and also omit 'keys' this plain non-state object from useMemo deps in this case
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const obj = removeEmptyQueryValues({
        //iterator interface
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(obj);
    },
  ] as const;
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
  const { runAsync, ...result } = useAsync();
  const $fetch = useConfigureFetch();
  const mutate = (params: Partial<Project>) => {
    return runAsync(
      $fetch(`projects/${params.id}`, {
        params,
        method: "PATCH",
      })
    );
  };
  return { mutate, ...result };
};

export const useAddProject = () => {
  const { runAsync, ...result } = useAsync();
  const $fetch = useConfigureFetch();
  const mutate = (params: Partial<Project>) => {
    return runAsync(
      $fetch(`projects/${params.id}`, {
        params,
        method: "POST",
      })
    );
  };
  return { mutate, ...result };
};
