import genDiff from '../src/index.js';

const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';

test('genDiff', () => {
  const actual1 = genDiff(file1, file2);
  expect(actual1).toStrictEqual(
    '- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true',
  );
});
