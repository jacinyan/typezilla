import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { removeEmptyQueryValues, subset } from "utils";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

//returns the status that indicates whether or not a comp is mounted, false by default
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

export const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useDebounce = <P>(params: P, timeout?: number) => {
  const [debouncedParams, setDebouncedParams] = useState(params);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedParams(params);
    }, timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [params, timeout]);

  return debouncedParams;
};

export const useDocumentTitle = (title: string, persistOnUnmount = false) => {
  const defaultTitle = useRef(document.title).current;
  //loading: prevTitle
  //onUnmount: a new title

  useEffect(() => {
    document.title = title;
  }, [title, defaultTitle, persistOnUnmount]);

  useEffect(() => {
    return () => {
      if (!persistOnUnmount) {
        document.title = defaultTitle;
      }
    };
  }, [persistOnUnmount, defaultTitle]);
};

// accesses the values of given input specific keys, and eventually returns these key-value pairs in the form of objects and a method.
export const useURLSearchParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  //calling another custom hook, only whom controls the state of search params
  const setSearchParams = useSetSearchParams();
  //memoized keys from input, e.g. projectCreate, editingProjectId...
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    //instead of a plain 'set' method, this func is to restrict the type of input params to a narrower range of string literals depending on the keys in the generic K so that only the input keys in useURLSearchParams are valid whenever setSearchParams is called
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

// only this hooks is able to manipulate the state of searchParams instead of multiple entries
export const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const newSearchParams = removeEmptyQueryValues({
      //transforms the searchParams iterable(array) into an object with the iterator interface
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(newSearchParams);
  };
};
