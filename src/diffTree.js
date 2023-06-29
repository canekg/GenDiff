import _ from 'lodash';

const getTree = (fileData1, fileData2) => {
  const keys = _.sortBy(_.union(Object.keys(fileData1), Object.keys(fileData2)));
  const result = keys.map((key) => {
    if (_.isPlainObject(fileData1[key]) && _.isPlainObject(fileData2[key])) {
      return {
        key,
        children: getTree(fileData1[key], fileData2[key]),
        type: 'nested',
      };
    }
    if (!_.has(fileData1, key)) {
      return {
        key,
        type: 'added',
        value: fileData2[key],
      };
    }
    if (!_.has(fileData2, key)) {
      return {
        key,
        type: 'deleted',
        value: fileData1[key],
      };
    }
    if (_.isEqual(fileData1[key], fileData2[key])) {
      return {
        key,
        type: 'unchanged',
        value: fileData1[key],
      };
    }
    return {
      key,
      type: 'changed',
      value1: fileData1[key],
      value2: fileData2[key],
    };
  });
  return result;
};
export default getTree;
