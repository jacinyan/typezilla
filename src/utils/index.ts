// take into account when value equals 0
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// specify key-value pairs (rather than the rest of object types, i.e. functions, arrays etc.)
export const removeEmptyQueryValues = (object: { [key: string]: unknown }) => {
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
