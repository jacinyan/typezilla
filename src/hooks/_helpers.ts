import { useEffect, useMemo, useRef, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { removeEmptyQueryValues } from "utils";

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
