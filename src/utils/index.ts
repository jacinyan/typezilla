export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const removeEmptyQueryValues = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }

  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    const value = newObject[key];
    if (isVoid(value)) {
      delete newObject[key];
    }
  });

  return newObject;
};

export const resetRoutes = () =>
  (window.location.href = window.location.origin);

/**
 * inputs an object and returns a corresponding key-value pair
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
