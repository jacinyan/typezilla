import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { removeEmptyQueryValues, subset } from "utils";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

// 'useURLSearchParams' accesses the values of specific keys from the address bar and returns them in the form of objects with the help of react-router-dom v6 using URLSearchParams API
export const useURLSearchParams = <K extends string>(
  keys: K[]
): readonly [
  { [key in K]: string },
  (params: Partial<{ [key in K]: unknown }>) => void
] => {
  const [searchParams] = useSearchParams();
  //calling another custom hook, only whom controls the state of search params
  const setSearchParams = useSetSearchParams();

  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    //reason for this anonymous func is to restrict the type of input params to a narrower range instead of a plain 'set' method, where the keys are dependent on the generic K
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
