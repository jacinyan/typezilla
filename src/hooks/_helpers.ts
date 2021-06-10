import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { REDO, RESET, SET, UNDO } from "redux/constants";
import { undoReducer } from "redux/reducers";
import { UndoState } from "types";
import { removeEmptyQueryValues } from "utils";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

//return the status that indicates whether or not a comp is mounted, false by default
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
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

export const useDocumentTitle = (title: string, persistOnUnmount = false) => {
  const prevTitle = useRef(document.title).current;
  //rending: prevTitle
  //onUnmount: a new title

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

//https://github.com/homerchen19/use-undo
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as UndoState<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(
    () =>
      dispatch({
        type: UNDO,
      }),
    []
  );

  const redo = useCallback(
    () =>
      dispatch({
        type: REDO,
      }),
    []
  );

  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );

  return [
    state,
    {
      set,
      reset,
      undo,
      redo,
      canUndo,
      canRedo,
    },
  ] as const;
};

export const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};
