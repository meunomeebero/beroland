export const removeEmptyKeys = (obj: Record<string, any>) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (!newObj[key]) {
      delete newObj[key];
    }
  });

  return newObj;
}
