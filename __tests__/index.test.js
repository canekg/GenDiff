import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';
const correctResult = readFile('result.txt');

test('genDiff', () => {
  const actual1 = genDiff(file1, file2);
  expect(actual1).toStrictEqual(correctResult);
});
