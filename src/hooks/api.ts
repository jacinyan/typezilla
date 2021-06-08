import { useState } from "react";
import { useAuth } from "./auth";
import { configureFetch } from "api";
import { State } from "types";

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
  //refresh on updates
  // using lazy initialization, but to cache a function
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

  //trigger async code;
  //runAsyncConfig to retrigger async code on updates automatically
  const runAsync = async (
    promise: Promise<D>,
    runAsyncConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("Please pass in a Promise type ");
    }
    //recursive calls
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
