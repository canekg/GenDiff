import _ from 'lodash';

const getSpaceCount = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getSpaceCount(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getSpaceCount(depth)}  }`;
};

const iter = (tree, depth = 1) => tree.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getSpaceCount(depth)}- ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'added':
      return `${getSpaceCount(depth)}+ ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'changed': {
      return `${getSpaceCount(depth)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${getSpaceCount(depth)}+ ${node.key}: ${stringify(
        node.value2,
        depth,
      )}`;
    }
    case 'unchanged':
      return `${getSpaceCount(depth)}  ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getSpaceCount(depth)}  ${node.key}: {\n${lines.join(
        '\n',
      )}\n${getSpaceCount(depth)}  }`;
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
