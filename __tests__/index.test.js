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

const data = [
  [file1, file2, 'stylish', correctFormatStylish],
  [file1, file2, 'plain', correctFormatPlain],
  [file1, file2, 'json', correctFormatJson],
  [file3, file4, 'stylish', correctFormatStylish],
  [file3, file4, 'plain', correctFormatPlain],
  [file3, file4, 'json', correctFormatJson],
];

test.each(data)('testing throw gendiff', (a, b, c, expected) => {
  expect(genDiff(a, b, c)).toBe(expected);
});

test('testing throw parsers', () => {
  expect(parsers('txt')).toStrictEqual('Unknown format! txt');
});
test('testing throw formatters', () => {
  const tree = [{ key: 'group2', type: 'deleted', value: { abc: 12345, deep: [Object] } }];
  expect(getFormat(tree, 'unix')).toStrictEqual('Unknown format! unix');
});
