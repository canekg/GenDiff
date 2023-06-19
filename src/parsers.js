import path from 'path';
import yaml from 'js-yaml';

const parsers = (data, filePath) => {
  const extension = path.extname(filePath);
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`'Unknown format! ${extension}'`);
  }
};
export default parsers;
