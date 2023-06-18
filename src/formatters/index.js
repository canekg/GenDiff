import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormat = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    default:
      throw new Error(`'Unknown format! ${formatName}'`);
  }
};
export default getFormat;
