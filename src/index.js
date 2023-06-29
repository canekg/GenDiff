import path from 'path';
import fs from 'fs';
import parsers from './parsers.js';
import getFormat from './formatters/index.js';
import getTree from './diffTree.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const formatType = (filePath) => path.extname(filePath).slice(1);

const readFile = (filePath) => {
  const readData = fs.readFileSync(getFullPath(filePath), 'utf-8');
  return parsers(readData, formatType(filePath));
};

const genDiff = (filePath1, filePath2, formatType = 'stylish') => {
  const fileData1 = readFile(filePath1);
  const fileData2 = readFile(filePath2);
  const tree = getTree(fileData1, fileData2);
  return getFormat(tree, formatType);
};
export default genDiff;
