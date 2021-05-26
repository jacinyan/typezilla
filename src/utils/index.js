// take into account when value equals 0
export const isFalsy = (value) => (value === 0 ? false : !value);

export const removeURLEmptyValues = (object) => {
  // no mutation in original objects
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    const value = newObject[key];
    if (isFalsy(value)) {
      delete newObject[key];
    }
  });

  return newObject;
};
