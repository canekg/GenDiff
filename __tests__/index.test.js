import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import parsers from '../src/parsers.js';
import getFormat from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const formats = ['json', 'yml'];

test.each(formats)('testing throw gendiff', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);
  const stylishResult = readFile('stylishResult.txt');
  const plainResult = readFile('plainResult.txt');
  const jsonResult = readFile('jsonResult.txt');
  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(stylishResult);
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plainResult);
  expect(genDiff(filePath1, filePath2, 'json')).toEqual(jsonResult);
});
test('testing throw parsers', () => {
  const readData = [{ key: 'group2', type: 'deleted', value: { abc: 12345, deep: [Object] } }];
  expect(parsers(readData, 'txt')).toEqual('Unknown format! txt');
});
test('testing throw formatters', () => {
  const tree = [{ key: 'group2', type: 'deleted', value: { abc: 12345, deep: [Object] } }];
  expect(getFormat(tree, 'unix')).toEqual('Unknown format! unix');
});
