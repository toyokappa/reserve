export const toSnake = (str) => {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

export const toSnakeKey = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[toSnake(key)] = obj[key];
  });
  return result;
};
