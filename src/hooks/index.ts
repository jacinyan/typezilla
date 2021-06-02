import { useContext, useEffect, useState } from "react";
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

//embed token
export const useConfigureFetch = () => {
  const { user } = useAuth();
  //Parameters match configureFetch
  //spread the tuple once and for all when myFetch [from useConfigureFetch()] is called
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
  const execute = async (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("Please pass in a Promise type ");
    }
    setState({ ...state, status: "loading" });

    try {
      const data = await promise;
      setData(data);
      return data;
    } catch (error) {
      setError(error);
      //two strategies for error handling WRT Promises in sequence
      if (config.throwOnError) {
        return Promise.reject(error);
      }
      return error;
    }
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isRejected: state.status === "error",
    isResolved: state.status === "success",
    setData,
    setError,
    execute,
    ...state,
  };
};

// Partial
export const useProjects = (params?: Partial<Project>) => {
  const client = useConfigureFetch();
  const { execute, ...result } = useAsync<Project[]>();

  useEffect(() => {
    execute(
      client("projects", {
        params: removeEmptyQueryValues(params || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};

export const useUsers = (params?: Partial<User>) => {
  const client = useConfigureFetch();
  const { execute, ...result } = useAsync<User[]>();

  useEffect(() => {
    execute(
      client("users", {
        params: removeEmptyQueryValues(params || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
