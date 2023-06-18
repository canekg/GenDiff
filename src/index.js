import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getFormat from './formatters/index.js';
import getTree from './diffTree.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const readData = fs.readFileSync(fullPath, 'utf-8');
  const object = parse(readData, filePath);
  return object;
};

const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);
  const tree = getTree(file1, file2);
  return getFormat(tree, formatName);
};
export default gendiff;
