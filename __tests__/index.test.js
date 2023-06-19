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
const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';
const file3 = './__fixtures__/file1.yml';
const file4 = './__fixtures__/file2.yml';
const correctFormatStylish = readFile('resultFormatStylish.txt');
const correctFormatPlain = readFile('resultFormatPlain.txt');
const correctFormatJson = readFile('resultFortmatJson.txt');

test('genDiff', () => {
  const actual1 = genDiff(file1, file2);
  expect(actual1).toStrictEqual(correctFormatStylish);
  const actual2 = genDiff(file3, file4);
  expect(actual2).toStrictEqual(correctFormatStylish);
  const actual3 = genDiff(file1, file2, 'plain');
  expect(actual3).toStrictEqual(correctFormatPlain);
  const actual4 = genDiff(file3, file4, 'plain');
  expect(actual4).toStrictEqual(correctFormatPlain);
  const actual5 = genDiff(file1, file2, 'json');
  expect(actual5).toStrictEqual(correctFormatJson);
  const actual6 = genDiff(file3, file4, 'json');
  expect(actual6).toStrictEqual(correctFormatJson);
});
test('testing throw parsers', () => {
  const data = '{ "key": "value" }';
  expect(() => parsers(data, 'file2.txt')).toThrow('Unknown format! .txt');
});
test('testing throw formatters', () => {
  const data = { key: 'value' };
  expect(() => getFormat(data, 'unix')).toThrow('Unknown format! unix');
});
