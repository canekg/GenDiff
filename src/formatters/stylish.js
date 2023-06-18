import _ from 'lodash';
import { getSpacesForChanged, getSpacesForUnchanged } from './spaces.js';

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getSpacesForUnchanged(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getSpacesForUnchanged(depth)}}`;
};

const iter = (tree, depth = 1) => tree.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getSpacesForChanged(depth)}- ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'added':
      return `${getSpacesForChanged(depth)}+ ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'changed': {
      return `${getSpacesForChanged(depth)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${getSpacesForChanged(depth)}+ ${node.key}: ${stringify(
        node.value2,
        depth,
      )}`;
    }
    case 'unchanged':
      return `${getSpacesForUnchanged(depth)}${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getSpacesForUnchanged(depth)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${getSpacesForUnchanged(depth)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});
const formatStylish = (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
export default formatStylish;
