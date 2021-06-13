import { useCallback, useReducer, useState } from "react";
import { useAuth } from "./auth";
import { configureFetch } from "api";
import { AsyncState } from "types";
import { useSafeDispatch } from "./_helpers";
import { QueryKey, useQueryClient } from "react-query";

//embeds the token if it exists when $fetch is instantiated from configureFetch
export const useConfigureFetch = () => {
  const { user } = useAuth();

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
  //prevents no ops after comps being unmounted
  const safeDispatch = useSafeDispatch(dispatch);
  //refreshes on updates using lazy initialization, but here we are to cache a function
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

  //triggers async code;
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

//general config for optimistic updates with methods except 'GET'
export const useQueriesConfig = (
  queryKey: QueryKey,
  //given the complexity of types , the infamous 'any' has to show up :(
  //yet optimistic updates is an isolate feature so we can live with that
  callback: (target: any, prev?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    //https://react-query.tanstack.com/reference/useMutation
    onMutate: async (target: any) => {
      // fetch the local data beforehand
      const prevItems = queryClient.getQueryData(queryKey);
      // console.log((prevItems as any[]).map((prevItem: any) => prevItem.marked));
      queryClient.setQueryData(queryKey, (prev?: any[]) => {
        return callback(target, prev);
      });
      return { prevItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.prevItems);
    },
  };
};

export const useDeleteQueriesConfig = (queryKey: QueryKey) =>
  useQueriesConfig(
    queryKey,
    (target, prev) => prev?.filter((item) => item.id !== target.id) || []
  );

export const useEditQueriesConfig = (queryKey: QueryKey) =>
  useQueriesConfig(
    queryKey,
    (target, prev) =>
      prev?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useCreateQueriesConfig = (queryKey: QueryKey) =>
  useQueriesConfig(queryKey, (target, prev) =>
    prev ? [...prev, target] : [target]
  );
