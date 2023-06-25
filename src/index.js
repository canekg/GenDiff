import path from 'path';
import fs from 'fs';
import parsers from './parsers.js';
import getFormat from './formatters/index.js';
import getTree from './diffTree.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (filePath) => {
  const readData = fs.readFileSync(getFullPath(filePath), 'utf-8');
  const formatType = path.extname(filePath).slice(1);
  const object = parsers(formatType)(readData);
  return object;
};

const genDiff = (filePath1, filePath2, formatType = 'stylish') => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);
  const tree = getTree(file1, file2);
  return getFormat(formatType)(tree);
};
export default genDiff;
