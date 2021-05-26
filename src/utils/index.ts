// take into account when value equals 0
export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const removeEmptyQueryValues = (object: object) => {
  // no mutation in original objects
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    //@ts-ignore
    const value = newObject[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete newObject[key];
    }
  });

  return newObject;
};
