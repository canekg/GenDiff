import _ from 'lodash';

const val = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getFullPath = (path, currentPath) => {
  if (currentPath !== '') {
    return `${currentPath}.${path}`;
  }
  return `${path}`;
};

const iter = (diff, path) => diff
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const currentPath = getFullPath(node.key, path);
    switch (node.type) {
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'added':
        return `Property '${currentPath}' was added with value: ${val(node.value)}`;
      case 'changed': {
        return `Property '${currentPath}' was updated. From ${val(node.value1)} to ${val(node.value2)}`;
      }
      case 'nested': {
        const lines = iter(node.children, currentPath);
        return `${lines.join('\n')}`;
      }
      default:
        throw new Error(`Unknown type of node '${node.type}'.`);
    }
  });
const formatPlain = (tree) => {
  const result = iter(tree, '');
  return `${result.join('\n')}`;
};
export default formatPlain;
