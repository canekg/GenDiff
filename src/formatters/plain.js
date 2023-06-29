import _ from 'lodash';

const stringify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (value === null) {
    return value;
  }
  return value;
};

const getFullPath = (key, currentPath) => (!currentPath ? `${key}` : `${currentPath}.${key}`);

const iter = (diff, path) => diff
  .map((node) => {
    const currentPath = getFullPath(node.key, path);
    switch (node.type) {
      case 'deleted':
        return `Property '${currentPath}' was removed\n`;
      case 'unchanged':
        return null;
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}\n`;
      case 'changed': {
        return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}\n`;
      }
      case 'nested': {
        const lines = iter(node.children, currentPath);
        return `${lines.join('')}`;
      }
      default:
        throw new Error(`Unknown type of node '${node.type}'.`);
    }
  });
const formatPlain = (tree) => {
  const result = iter(tree, '');
  return `${result.join('').trim()}`;
};
export default formatPlain;
