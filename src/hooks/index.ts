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
  const exeAsync = async (promise: Promise<D>) => {
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
    exeAsync,
    ...state,
  };
};

// Partial
export const useProjects = (params?: Partial<Project>) => {
  const client = useConfigureFetch();
  const { exeAsync, ...result } = useAsync<Project[]>();

  useEffect(() => {
    exeAsync(
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
  const { exeAsync, ...result } = useAsync<User[]>();

  useEffect(() => {
    exeAsync(
      client("users", {
        params: removeEmptyQueryValues(params || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
