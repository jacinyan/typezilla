import { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { configureFetch } from "api";

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

interface State<D> {
  status: "idle" | "loading" | "error" | "success";
  data: D | null;
  error: Error | null;
}
export const useAsync = <D>(
  initialState: State<D> = {
    status: "idle",
    data: null,
    error: null,
  }
) => {
  const [state, setState] = useState<State<D>>({
    ...initialState,
  });

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
  const call = async (promise: Promise<D>) => {
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
      return error;
    }
  };

  return {
    idle: state.status === "idle",
    loading: state.status === "loading",
    error: state.status === "error",
    success: state.status === "success",
    setData,
    setError,
    call,
    ...state,
  };
};
