export const arrayToObject = <T>(array: T[], keyField: string) =>
  array.reduce(
    (obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    },
    {}
  );
