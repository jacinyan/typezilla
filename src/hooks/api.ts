import { useCallback, useReducer, useState } from "react";
import { useAuth } from "./auth";
import { configureFetch } from "api";
import { AsyncState } from "types";
import { useSafeDispatch } from "./_helpers";

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

export const useAsyncTask = <D>(
  initialState: AsyncState<D> = {
    status: "idle",
    data: null,
    error: null,
  },
  initialConfig = { throwOnError: false }
) => {
  const [state, dispatch] = useReducer(
    (state: AsyncState<D>, action: Partial<AsyncState<D>>) => ({
      ...state,
      ...action,
    }),
    {
      ...initialState,
    }
  );
  const config = { ...initialConfig };
  //no ops after comps being unmounted
  const safeDispatch = useSafeDispatch(dispatch);
  //  refresh on updates using lazy initialization, but to cache a function
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        status: "error",
        data: null,
      }),
    [safeDispatch]
  );

  //trigger async code;
  //asyncRunConfig to retrigger async code on updates automatically
  const asyncRun = useCallback(
    async (
      promise: Promise<D>,
      asyncRunConfig?: { retry: () => Promise<D> }
    ) => {
      if (!promise || !promise.then) {
        throw new Error("Please pass in a Promise type ");
      }
      //recursive calls
      setRetry(() => () => {
        if (asyncRunConfig?.retry) {
          asyncRun(asyncRunConfig?.retry(), asyncRunConfig);
        }
      });
      safeDispatch({ status: "loading" });
      //TODO: test minimum request time, followed by refactoring with useCallback for setData ops
      try {
        const data = await promise;
        setData(data);
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
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    setData,
    setError,
    asyncRun,
    retry,
    ...state,
  };
};
