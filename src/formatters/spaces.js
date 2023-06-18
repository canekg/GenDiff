const spacesCount = 4;
const replacer = ' ';
const getSpacesForChanged = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize - 2);
};
const getSpacesForUnchanged = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize);
};
export { getSpacesForChanged, getSpacesForUnchanged };
