import _ from 'lodash';

const getDiff = (file1, file2, key) => {
  if (!Object.hasOwn(file1, key)) {
    return {
      key,
      type: 'added',
      value: file2[key],
    };
  }
  if (!Object.hasOwn(file2, key)) {
    return {
      key,
      type: 'deleted',
      value: file1[key],
    };
  }
  if (file1[key] === file2[key]) {
    return {
      key,
      type: 'unchanged',
      value: file1[key],
    };
  }
  return {
    key,
    type: 'changed',
    value1: file1[key],
    value2: file2[key],
  };
};
const getTree = (file1, file2) => {
  const iter = (node1, node2) => {
    const keys = _.sortBy(_.union([...Object.keys(node1), ...Object.keys(node2)]));
    const result = keys.map((key) => {
      if ((typeof node1[key] === 'object') && (typeof node2[key] === 'object')) {
        return {
          key,
          children: iter(node1[key], node2[key]),
          type: 'nested',
        };
      }
      return getDiff(node1, node2, key);
    });
    return result;
  };
  return iter(file1, file2);
};
export default getTree;
