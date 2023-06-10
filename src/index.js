import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const getAbsolutPath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(getAbsolutPath(filePath), 'utf-8');
const getObject = (filePath) => JSON.parse(readFile(filePath));
const gendiff = (filePath1, filePath2) => {
  const file1 = getObject(filePath1);
  const file2 = getObject(filePath2);
  const keys = [...Object.keys(file1), ...Object.keys(file2)];
  const uniqueKeys = _.sortBy(_.uniq(keys));
  const result = {};
  uniqueKeys.forEach((key) => {
    if (!Object.hasOwn(file1, [key])) {
      result[`+ ${key}`] = file2[key];
      return result;
    }
    if (!Object.hasOwn(file2, [key])) {
      result[`- ${key}`] = file1[key];
      return result;
    }
    if (file1[key] === file2[key]) {
      result[`  ${key}`] = file2[key];
    } else {
      result[`- ${key}`] = file1[key];
      result[`+ ${key}`] = file2[key];
    }
    return result;
  });
  return result;
};
export default gendiff;
