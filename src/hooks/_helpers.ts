import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { removeEmptyQueryValues } from "utils";

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

// 'useUrlQueryParams' accesses the values of specific keys from the address bar and returns them in the form of object
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  //with the help of react-router-dom
  const [searchParams, setSearchParams] = useSearchParams();
  //Array.prototype.reduce obviously returns a new object on each render and has its very 1s impart on useEffect in useDebounce and many more upcoming ones
  return [
    // A memoized state object from useSearchParams is safe, but also 'keys' this plain non-state object param is omitted from the useMemo deps in this case for this reason
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    //reason for this anonymous func is to restrict the type of input params to a narrower range instead of a plain 'set' method, where the keys are dependent on the generic K
    (params: Partial<{ [key in K]: unknown }>) => {
      const newSearchParams = removeEmptyQueryValues({
        //transforms the searchParams iterable(array) into an object with the iterator interface
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(newSearchParams);
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
