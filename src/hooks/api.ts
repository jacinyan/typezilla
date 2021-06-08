import { useCallback, useState } from "react";
import { useAuth } from "./auth";
import { configureFetch } from "api";
import { State } from "types";
import { useMountedRef } from "./_helpers";

//embed token if it exists for every request when calling when myFetch is instantiated from configureFetch in api/index
export const useConfigureFetch = () => {
  const { user } = useAuth();
  //Parameters match configureFetch
  //spread the tuple once and for all
  return useCallback(
    (...[endpoint, config]: Parameters<typeof configureFetch>) =>
      configureFetch(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
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

  const mountedRef = useMountedRef();
  //  refresh on updates using lazy initialization, but to cache a function
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        status: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        status: "error",
        data: null,
      }),
    []
  );

  //trigger async code;
  //runAsyncConfig to retrigger async code on updates automatically
  const runAsync = useCallback(
    async (
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
      setState((prevState) => ({ ...prevState, status: "loading" }));
      //TODO: test minimum request time, followed by refactoring with useCallback for setData ops
      try {
        const data = await promise;
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      } catch (error) {
        setError(error);
        //throw errors in case of being swallowed by the catch block
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      }
    },
    //callback func in setState instead of direct reference
    [config.throwOnError, mountedRef, setData, setError]
  );

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
