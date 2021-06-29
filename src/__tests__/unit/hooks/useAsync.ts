import { useAsyncTask } from "hooks/api";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

const defaultState: ReturnType<typeof useAsyncTask> = {
  status: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  asyncRun: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsyncTask> = {
  ...defaultState,
  status: "loading",

  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsyncTask> = {
  ...defaultState,
  status: "success",

  isIdle: false,
  isSuccess: true,
};

test("useAsyncTask handles async tasks", async () => {
  let resolveFn: any;
  // let rejectFn: any;

  const promise = new Promise((resolve, reject) => {
    resolveFn = resolve;
    // rejectFn = reject;
  });

  const { result } = renderHook(() => useAsyncTask());

  //result current equals the returned value of useAsyncTask
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  act(() => {
    p = result.current.asyncRun(promise);
  });

  expect(result.current).toEqual(loadingState);

  const resolvedValue = { mockedValue: "resolved" };
  await act(async () => {
    resolveFn(resolvedValue);
    await p;
  });

  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue,
  });
});
