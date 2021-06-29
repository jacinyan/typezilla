import { useCallback, useReducer, useState } from "react";
import { QueryKey, useQueryClient } from "react-query";
import { useAuth } from "./auth";
import { configureFetch } from "api";
import { AsyncState, Task } from "types";
import { useSafeDispatch } from "./_helpers";
import { reorder } from "./reorder";

//simply for the use of useAuth so that a token can be embedded if it exists, when $fetch is instantiated from configureFetch
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

//Queries factory with all other methods except 'GET', where onMutate is also configured for optimistic updates
export const useQueriesConfig = (
  queryKey: QueryKey,
  //given the complexity of the types in here , the infamous 'any' has to show up a lot of times :(
  //yet optimistic updates is an isolated feature so we can live with that
  callback: (target: any, old?: any[]) => any[]
) => {
  //create queryClient
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    //https://react-query.tanstack.com/guides/optimistic-updates
    onMutate: async (target: any) => {
      await queryClient.cancelQueries(queryKey);

      const prevItems = queryClient.getQueryData(queryKey);

      //for multiple queries
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });

      return { prevItems };
    },
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(queryKey, context.prevItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  };
};

// the following config hooks are the products of the useQueriesConfig
export const useCreateQueryConfig = (queryKey: QueryKey) =>
  useQueriesConfig(queryKey, (target, old) =>
    old ? [...old, target] : [target]
  );

export const useEditQueryConfig = (queryKey: QueryKey) =>
  useQueriesConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useDeleteQueryConfig = (queryKey: QueryKey) =>
  useQueriesConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useReorderSwimlaneQueryConfig = (queryKey: QueryKey) =>
  useQueriesConfig(queryKey, (target, old) =>
    reorder({ list: old, ...target })
  );

export const useReorderTaskQueryConfig = (queryKey: QueryKey) =>
  useQueriesConfig(queryKey, (target, old) => {
    // optimistic updates on the order of tasks
    const orderedList = reorder({ list: old, ...target }) as Task[];
    // task sort has also an impact on the swimlane where the task belongs
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, swimlaneId: target.toSwimlaneId }
        : item
    );
  });
