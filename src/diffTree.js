import _ from 'lodash';

const getTree = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = keys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return {
        key,
        children: getTree(file1[key], file2[key]),
        type: 'nested',
      };
    }
    if (!_.has(file1, key)) {
      return {
        key,
        type: 'added',
        value: file2[key],
      };
    }
    if (!_.has(file2, key)) {
      return {
        key,
        type: 'deleted',
        value: file1[key],
      };
    }
    if (_.isEqual(file1[key], file2[key])) {
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
  });
  return result;
};
export default getTree;
