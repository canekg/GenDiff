import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormat = (tree, formatType) => {
  const formats = {
    stylish: (data) => formatStylish(data),
    plain: (data) => formatPlain(data),
    json: (data) => JSON.stringify(data),
  };
  return formats[formatType] !== undefined ? formats[formatType](tree) : `Unknown format! ${formatType}`;
};
export default getFormat;
